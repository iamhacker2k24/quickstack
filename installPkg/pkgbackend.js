import { execa } from 'execa'
import fs from 'fs-extra'



//this will help to create proper folder structure and help to install all libray ok 
export const pkgbackend = async (input) => {
  try {
    const { projectName, npmPackage } = input

    // first initilzed pkg.json
    await execa('npm', ['init', '-y'], {
      stdio: 'inherit',
      cwd: `./${projectName}`
    })

    //converting common js to module 
    await fs.outputFile(`./${projectName}/package.json`, JSON.stringify({
      name: `${projectName}`,
      version: '1.0.0',
      type: 'module',  // ← ESM!
      main: 'index.js',
      scripts: {
        start: 'node index.js',
        dev: 'nodemon index.js'
      }
    }, null, 2))
    if ((npmPackage.length > 0)) {
      // console.log(input)
      await execa('npm', ['i', ...npmPackage], {
        stdio: 'inherit',
        cwd: `./${projectName}`
      })
    }
  } catch (error) {
    console.log(error.message)
  }
}
