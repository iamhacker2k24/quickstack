import inquirer from 'inquirer'
import { execSync } from 'child_process'
import chalk from 'chalk';

export const createBackendProject = async () => {

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'Enter project name:',
            default: 'my-backend'
        },
        {
            type: 'checkbox',
            name: 'npmPackage',
            message: chalk.green("For the Express backend, which packages do you want to select or deselect?"),
            choices: ['express', 'mongoose', 'jsonwebtoken', 'bcrypt', 'cookie-parser', 'dotenv', 'nodemon', 'multer', 'axios', 'socket.io', 'redis', 'nodemailer', 'cors'],
            default: ['express', 'mongoose', 'jsonwebtoken', 'bcrypt', 'cookie-parser', 'dotenv', 'nodemon']
        },
        {
            type: 'confirm',
            name: 'folderStructure',
            message: chalk.green("Do you want to create a proper folder structure?"),
        }
        , {
            type: 'confirm',
            name: 'demoCode',
            message: chalk.green("Do you want to add demo code? (e.g., index.js)"),
        },
    ]);
    return answers
    // console.log(answers)
    // console.log('Project created successfully!');
}

// createProject();