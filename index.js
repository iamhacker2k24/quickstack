#!/usr/bin/env node
import chalk from 'chalk'
import inquirer from 'inquirer'
import { createBackendProject } from './getProjecStructure/backendCreations.js'
import { createFrontedProject } from './getProjecStructure/frontedcreation.js'
import { BackendfileFolderCreations } from './createFolder_File/BackendCreations.js'
import { pkgbackend } from './installPkg/pkgbackend.js'
import { pkgfront } from './installPkg/pkgfront.js'


const main = async () => {
    const getprojectType = await inquirer.prompt([
        {
            type: 'input',
            name: 'projectType',
            message: chalk.green("Which project do you want to build? Frontend (1) or Backend (0)? Default is Full Stack, just press Enter."),
        }
    ])


    if (getprojectType.projectType == "") {
        console.log(chalk.blue('You chose Full Stack. Please wait, we are working on it...'))
    }


    //if backend only
    if (getprojectType.projectType == "0") {
        const backendStructure = await createBackendProject()    // get input of pkg for backend 
        await BackendfileFolderCreations(backendStructure)  // this will create pkg.json & others folders 
        await pkgbackend(backendStructure) // this will install all libray 
        console.log("done")
    }


    //if fronted only
    else if (getprojectType.projectType == "1") {
        const frontedStructure = await createFrontedProject()
        // console.log(frontedStructure)
        await pkgfront(frontedStructure)
        // await tawluinInstall(frontedStructure)
    }
    else {
        const backendStructure = await createBackendProject()    // get input of pkg etc of backend 
        await BackendfileFolderCreations(backendStructure)  // this will create pkg.json & others folders 
        await pkgbackend(backendStructure) // this will install all libray 
        // console.log("backdone")
        const frontedStructure = await createFrontedProject()
        // console.log(frontedStructure)
        await pkgfront(frontedStructure)
        // await tawluinInstall(frontedStructure)
    }

}

main()