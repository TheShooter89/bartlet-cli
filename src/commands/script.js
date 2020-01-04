import inquirer from "inquirer";
import selectPath from "inquirer-file-tree-selection-prompt";

export default {
    name: 'script',
    alias: ['s', ],
    description: 'Create a React , Node, vanillaJS or CSS standalone file',
    run: async toolbox => {
        const {
            parameters,
            template: { generate },
            print: { info },
            strings,
        } = toolbox;

        const colorprint = toolbox.print.colors;
        
        // Print app header
        toolbox.printHeader();

        // Select React prompt steps
        const react_questions = toolbox.reactSteps();
        
        // Remove the prompt about template selection, we already know is: context
        // ### [TESTING]
        let questions = [];
        const additional_step = {
            type: 'list',
            name: 'type',
            message: '',
            choices: [
                new inquirer.Separator(colorprint.bold.italic.green('     == React Templates ==     ')),
                {
                    name: 'React',
                    value: 'react',
                    checked: true,
                },
                {
                    name: 'Node',
                    value: 'node',
                },
                {
                    name: 'Next',
                    value: 'next',
                },
                {
                    name: 'CSS',
                    value: 'css',
                },
            ],
        };
        questions = [additional_step, ...react_questions];

        // Inject file selection support to inquirer
        inquirer.registerPrompt('path', selectPath);

        // Simple debug switcher
        const __DEBUG_MODE = true;

        inquirer.prompt(questions).then(async (answers) => {
            // Set root template type
            answers.type = 'react';

            // DEBUGGING
            if (__DEBUG_MODE) {
                //
                toolbox.print.info(`New ${answers.name} ${strings.startCase(answers.template)} will be created!`);
                toolbox.print.info(JSON.stringify(answers, null, '  '));
            }

            // ### Setting 'context' back inside answers obj
            // ### [TESTING] answers.template = 'context';
            // [DEBUG] Check it is correctly added
            __DEBUG_MODE ? toolbox.print.info('new answers.template: ' + JSON.stringify(answers.template)) : null;
            
            // Write a new folder containing index.js and context code file
            const hasCss = [
                'component'
            ];

            await toolbox.writeOut({
                props: answers,
                outPath: answers.path,
                name: answers.name,
                template: `${answers.type}-${answers.template}`,
                needCSS: hasCss.includes(answers.template) ? true : false,
            });
            
            process.exit();
        });
        
        //
    },
};