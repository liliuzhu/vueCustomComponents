const readline = require('readline')
const { execa, chalk } = require('@anejs/anne-utils')

function toStartOfLine (stream) {
  if (!chalk.supportsColor) {
    stream.write('\r')
    return
  }
  readline.cursorTo(stream, 0)
}

function renderProgressBar (curr, total) {
  const ratio = Math.min(Math.max(curr / total, 0), 1)
  const bar = ` ${curr}/${total}`
  const availableSpace = Math.max(0, process.stderr.columns - bar.length - 3)
  const width = Math.min(total, availableSpace)
  const completeLength = Math.round(width * ratio)
  const complete = `#`.repeat(completeLength)
  const incomplete = `-`.repeat(width - completeLength)
  toStartOfLine(process.stderr)
  process.stderr.write(`[${complete}${incomplete}]${bar}`)
}

/**
 *
 * 执行一个命令操作
 * @export
 * @param {string} command 执行的命令
 * @param {*} args 参数 使用数组形式 ['add', '@rrc/utils']
 * @param {string} targetDir cwd 执行目录
 * @returns
 */
module.exports = function executeCommand (command, args, targetDir) {
  return new Promise((resolve, reject) => {
    const child = execa(command, args, {
      cwd: targetDir,
      stdio: ['inherit', 'inherit', 'pipe']
    })

    command === 'yarn' && child.stderr.on('data', buf => {
      const str = buf.toString()
      if (/warning/.test(str)) {
        return
      }

      // progress bar
      const progressBarMatch = str.match(/\[.*\] (\d+)\/(\d+)/)
      if (progressBarMatch) {
        // since yarn is in a child process, it's unable to get the width of
        // the terminal. reimplement the progress bar ourselves!
        renderProgressBar(progressBarMatch[1], progressBarMatch[2])
        return
      }

      process.stderr.write(buf)
    })

    child.on('close', code => {
      if (code !== 0) {
        // eslint-disable-next-line
        reject(`command failed: ${command} ${args.join(' ')}`)
        return
      }
      resolve()
    })
  })
}
