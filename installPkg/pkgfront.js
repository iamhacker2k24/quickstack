import { execa } from 'execa'
import fs from 'fs-extra'

//this will help to create proper folder structure and help to install all libray ok 
export const pkgfront = async (input) => {
  try {

    const template = input.variant === 'TypeScript'
      ? `${input.framework}-ts`
      : input.framework;

    // console.log(input)

    await execa(
      'npm',
      ['create', 'vite@latest', input.projectName, '--', '--template', template, '--no-immediate', '--no-interactive'],
      { stdio: 'inherit' }
    )


    const hasTailwindcss = input.pkg.includes("tailwindcss")

    const otherspkg = input.pkg.filter((p) => p !== 'tailwindcss')
    // console.log(otherspkg)
    const pkgTotal = hasTailwindcss ? ['tailwindcss', '@tailwindcss/vite', ...otherspkg] : otherspkg
    // console.log(pkgTotal)
    if (pkgTotal.length > 0) {
      // console.log("working")
      await execa('npm', ['i', ...pkgTotal], {
        stdio: 'inherit',
        cwd: `./${input.projectName}`
      })
    }


    if (hasTailwindcss) {
      const ext = input.variant === 'TypeScript' ? 'ts' : 'js'
      const viteConfigPath = `./${input.projectName}/vite.config.${ext}`

      if (await fs.pathExists(viteConfigPath)) {
        let config = await fs.readFile(viteConfigPath, 'utf-8')
        if (!config.includes('@tailwindcss/vite')) {
          config = `import tailwindcss from '@tailwindcss/vite'\n${config}`
          if (/plugins:\s*\[/.test(config)) {
            config = config.replace(/plugins:\s*\[/, 'plugins: [tailwindcss(), ')
          } else {
            config = config.replace(/defineConfig\(\{/, 'defineConfig({\n  plugins: [tailwindcss()],')
          }
          await fs.outputFile(viteConfigPath, config)
        }
      } else {
        const defaultConfig = `import { defineConfig } from 'vite'\nimport tailwindcss from '@tailwindcss/vite'\n\nexport default defineConfig({\n  plugins: [tailwindcss()],\n})\n`
        await fs.outputFile(viteConfigPath, defaultConfig)
      }

      for (const cssRelPath of ['src/index.css', 'src/style.css']) {
        const cssPath = `./${input.projectName}/${cssRelPath}`
        if (await fs.pathExists(cssPath)) {
          const css = await fs.readFile(cssPath, 'utf-8')
          if (!css.includes('@import "tailwindcss"')) {
            await fs.outputFile(cssPath, `@import "tailwindcss";\n${css}`)
          }
          break
        }
      }
    }

    else {
      await execa('npm', ['install'], // like user ne koi pkg select neihi kiya tab to react ka pkg to install karna hoga 
        {
          stdio: 'inherit',
          cwd: `./ ${input.projectName}`
        })
    }
  }
  catch (error) {
    console.log(error.message)
  }

}