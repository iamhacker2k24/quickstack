import fs from 'fs-extra';


const stdCodeIndex = `import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Server is running!')
})

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`)                      
})`

const stdGitignore = `node_modules/
.env
.env.local
dist/
*.log
`
const License = `
MIT License

Copyright (c) 2026 Your_Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`
export const BackendfileFolderCreations = async (backendStructure) => {

  // crate file and folder 
  //     ─ controllers/
  // │   ├── routes/
  // │   ├── models/      ← MongoDB models
  // │   ├── middleware/
  // │   ├── config/
  // │   └── index.js
  const mainFoldername = backendStructure.projectName
  await fs.ensureDir(`./${mainFoldername}`)
  try {
    if (backendStructure.folderStructure) {
      await fs.ensureDir(`./${mainFoldername}/controllers`);
      await fs.ensureDir(`./${mainFoldername}/routes`);
      await fs.ensureDir(`./${mainFoldername}/models`);
      await fs.ensureDir(`./${mainFoldername}/middleware`);
      await fs.ensureDir(`./${mainFoldername}/config`);
      await fs.outputFile(`./${mainFoldername}/index.js`, " ");
      await fs.outputFile(`./${mainFoldername}/.gitignore`, " ");
      await fs.outputFile(`./${mainFoldername}/.env`, "");
      await fs.outputFile(`./${mainFoldername}/.env.local`, "");
      await fs.outputFile(`./${mainFoldername}/LICENSE`, "");
      await fs.outputFile(`./${mainFoldername}/Readme.md`, "");
    }
    if (backendStructure.demoCode) {
      await fs.outputFile(`./${mainFoldername}/index.js`, stdCodeIndex);
      await fs.outputFile(`./${mainFoldername}/.gitignore`, stdGitignore);
      await fs.outputFile(`./${mainFoldername}/.env`, "PORT=5000\nMONGO_URI=");
      await fs.outputFile(`./${mainFoldername}/.env.local`, "PORT=5000\nMONGO_URI=");
      await fs.outputFile(`./${mainFoldername}/LICENSE`, License);
    }
  } catch (error) {
    console.log("error from folder creating ")
  }
}

