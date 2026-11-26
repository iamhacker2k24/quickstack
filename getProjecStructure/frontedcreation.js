import inquirer from 'inquirer'

export const createFrontedProject = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'Enter project name:',
            default: 'frontend'
        },
        {
            type: 'select',
            name: 'framework',
            message: 'Select framework:',
            choices: [
                'vanilla',
                'vue',
                'react',
                'preact',
                'lit',
                'svelte',
                'solid',
                'qwik'
            ]
        },
        {
            type: 'select',
            name: 'variant',
            message: 'Select variant:',
            choices: ['JavaScript', 'TypeScript']
        }
        , {
            type: 'checkbox',
            name: 'pkg',
            message: 'Select the packages you want to install...',
            choices: [
                'tailwindcss',
                'react-router-dom',
                'axios',
                'react-icons',
                'lucide-react',
                'bootstrap-icons',
                'zustand',
                '@reduxjs/toolkit',
                '@tanstack/react-query',
                'react-hook-form',
                'framer-motion',
                'react-hot-toast',
                'clsx'
            ],
            default: [
                'tailwindcss',
                'react-router-dom',
                'axios',
                'react-icons',
                'lucide-react'
            ]
        }
    ]);

    if (answers.pkg.includes("tailwindcss")) {
        console.log("We will automatically configure your Tailwind CSS config...")
    }
    return answers;
}

