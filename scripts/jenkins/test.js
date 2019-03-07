const { execa, Log } = require('@anejs/anne-utils')
const executeCommand = require('./utils/executeCommand')
const sendNotify = require('./utils/sendNotify')

const RegistryURL = `https://registry.npm.taobao.org`
const TaobaoDistURL = 'https://npm.taobao.org/dist'

/**
 *
 * jenkins 接入脚本 测试环境
 * @class Build
 */
class Build {
  constructor (cwd = process.cwd()) {
    this.context = cwd
    this.run = this.run.bind(this)
    this.init()
  }

  async init () {
    try {
      const LAST_COMMIT_USER = await this.shell(`git log --skip=1 -1 | grep -i author | awk '{print $2}' | xargs`)

      await this.install()

      try {
        await executeCommand('yarn', ['build'], this.context)
      } catch (error) {
        Log.fatal(`Build 出错: ${error}`)
      }

      const RECEIVER = `xierenhong|${LAST_COMMIT_USER}`
      const CONTENT = await this.shell('echo "自动构建完成：$BUILD_TAG，构建详情：$BUILD_URL"')

      // 发送钉钉通知
      sendNotify(RECEIVER, CONTENT)
    } catch (error) {
      Log.fatal(error)
    }
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
