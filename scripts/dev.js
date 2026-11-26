const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

const projectRoot = path.join(__dirname, '..')
const env = { ...process.env }

if (process.platform === 'win32') {
  const shimDir = path.join(process.env.LOCALAPPDATA || '', 'npm-spawn')
  if (fs.existsSync(path.join(shimDir, 'npm.exe'))) {
    env.PATH = `${shimDir}${path.delimiter}${env.PATH || ''}`
  }
}

const nextBin = path.join(projectRoot, 'node_modules', 'next', 'dist', 'bin', 'next')
const child = spawn(process.execPath, [nextBin, 'dev', '--webpack', ...process.argv.slice(2)], {
  cwd: projectRoot,
  env,
  stdio: 'inherit',
})

child.on('exit', (code) => {
  process.exit(code == null ? 1 : code)
})
