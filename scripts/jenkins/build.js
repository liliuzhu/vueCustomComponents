const path = require('path')
const { readFileSync } = require('fs')
const { execa, Log, chalk, writeFileTree } = require('@anejs/anne-utils')
const dateFormat = require('./utils/dateFormat')
const executeCommand = require('./utils/executeCommand')
const sendNotify = require('./utils/sendNotify')

const RegistryURL = `https://registry.npm.taobao.org`
const TaobaoDistURL = 'https://npm.taobao.org/dist'

/**
 *
 * jenkins 接入脚本线上环境
 * @class Build
 */
class Build {
  constructor (cwd = process.cwd()) {
    this.context = cwd
    // tag 前缀
    this.TAG_PREFIX = `jb_${dateFormat(new Date(), 'yyyyMMddhhmmss')}`
    this.run = this.run.bind(this)
    this.init()
  }

  async init () {
    try {
      await this.initGit()
      await this.initTag()
    } catch (error) {
      Log.error(`请检查项目是否有 git 拉取权限, 需要给 ${chalk.cyan('bis-platform')}, ${chalk.cyan('jenkins')} 账号增加git 权限。`)
      Log.fatal(error)
    }
  }

  async initTag () {
    const { run } = this
    const LAST_COMMIT_USER = await this.shell(`git log --skip=1 -1 | grep -i author | awk '{print $2}' | xargs`)
    const LAST_COMMIT_BRANCH = await this.shell(`git log -1 | grep -i 'merge branch' | awk '{print $3}' | xargs`)
    this.LAST_COMMIT_BRANCH = LAST_COMMIT_BRANCH

    // 如果不是git flow 的代码 不允许上线
    if (!this.LAST_COMMIT_BRANCH.trim()) {
      Log.fatal(`abort jenkins build because its not a merge`)
      return
    }
    // 生成 tag 名字
    const TAG_NAME = `${this.TAG_PREFIX}${this.LAST_COMMIT_BRANCH}`
      .replace(/-/g, '_')
      .replace(/__/g, '_')
      .replace(/\//g, '_')

    this.TAG_NAME = TAG_NAME

    // 如果 tag 存在先去远程删除
    try {
      await run('git', ['show', TAG_NAME])
      await run('git', ['tag', '-d', TAG_NAME])
      await run('git', ['pull', 'origin', `:${TAG_NAME}`])
    } catch (error) {
    } finally {
      Log.info(`force delete exist tag both local and remote`)
    }

    await this.install()

    try {
      await executeCommand('yarn', ['build:qiniu'], this.context)
    } catch (error) {
      Log.fatal(`Build 出错: ${error}`)
    }

    await this.copyPublic()

    await this.shell(`rm -f ${this.context}/yarn-error.*`)
    await this.shell(`cd ${this.context}`)

    try {
      await this.shell(`git status --porcelain`)
      await run('git', ['status'])
      await run('git', ['add', '.'])
      await run('git', ['commit', '-am', `chore(release): build { author: ${LAST_COMMIT_USER}, branch: ${LAST_COMMIT_BRANCH} }`])
      await run('git', ['push', 'origin', 'master'])
    } catch (error) {
      Log.info(`no changes to commit`)
    }

    await run('git', ['push'])
    await run('git', ['push', '--tags'])

    // 标记当前 tag 并推送到远程
    await run('git', ['tag', TAG_NAME])
    await run('git', ['push', 'origin', TAG_NAME])

    const RECEIVER = `xierenhong|${LAST_COMMIT_USER}`
    const CONTENT = await this.shell(`echo "自动构建完成：$BUILD_TAG，版本号：${TAG_NAME}，构建详情：$BUILD_URL"`)

    // 发送钉钉通知
    sendNotify(RECEIVER, CONTENT)
  }

  /**
   *
   * 初始化 git 账号配置
   * @memberof Build
   */
  async initGit () {
    const { run } = this

    await run('git', ['config', 'user.name', 'jenkins'])
    await run('git', ['config', 'user.email', 'jenkins@renrenche.com'])

    // go to latest master
    await run('git', ['checkout', 'master'])
    await run('git', ['pull', 'origin', 'master'])
  }

  /**
   *
   * 安装项目依赖
   * @memberof Build
   */
  async install () {
    try {
      const args = ['install']
      args.push(`--registry=${RegistryURL}`)
      args.push(`--disturl=${TaobaoDistURL}`)
      await executeCommand('yarn', args, this.context)
    } catch (error) {
      Log.error(`安装依赖包出错. 如未能排除出原因, 请联系仁洪。`)
      Log.fatal(error)
    }
  }

  /**
   *
   * 复制文件到 发布目录
   * @memberof Build
   */
  async copyPublic () {
    await writeFileTree(this.context, {
      'public/index.html': readFileSync(path.join(this.context, 'dist/index.html'))
    })
  }

  run (command, args) {
    try {
      if (!args) { [command, ...args] = command.split(/\s+/) }
      return execa(command, args, { cwd: this.context })
    } catch (error) {
      return null
    }
  }

  async shell (command) {
    try {
      const { stdout } = await execa.shell(command, { cwd: this.context })
      return stdout
    } catch (error) {
      return null
    }
  }
}

// eslint-disable-next-line
new Build()
