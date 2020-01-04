import inquirer from "inquirer";
import selectPath from "inquirer-file-tree-selection-prompt";

export default {
    name: 'component',
    description: 'Create a React functional component',
    dashed: true,
    __DEBUG_MODE: true,
    run: async toolbox => {
        const {
            parameters,
            template: { generate },
            print: { info },
            strings,
        } = toolbox;
        
        // Print app header
        toolbox.printHeader();

        // Select React prompt steps
        const questions = toolbox.reactSteps('component');
        
        // Remove the prompt about template selection, we already know is: component
        questions.shift();

        // Inject file selection support to inquirer
        inquirer.registerPrompt('path', selectPath);

        // Simple debug switcher
        const __DEBUG_MODE = false;

        inquirer.prompt(questions).then(async answers => {
            // Set root template type
            answers.type = 'react';

            // DEBUGGING
            if (__DEBUG_MODE) {
                //
                toolbox.print.info(`New ${answers.name} ${strings.startCase(answers.template)} will be created!`);
                toolbox.print.info(JSON.stringify(answers, null, '  '));
            }

            // ### Setting 'component' back inside answers obj
            answers.template = 'component';
            // [DEBUG] Check it is correctly added
            __DEBUG_MODE ? toolbox.print.info('new answers.template: ' + JSON.stringify(answers.template)) : null;
            
            // Write a new folder containing index.js and component code file
            await toolbox.writeOut({
                props: answers,
                outPath: `${answers.path}/${answers.name}`,
                name: answers.name,
                template: 'react-component',
                needCSS: true,
                indexType: 'react',
            });

            /* await toolbox.fileOut({
                props: answers,
                target: `${answers.path}/${answers.name}/${answers.name}.css`,
                template: `${answers.type}-${answers.template}-css`,
            }); */

            process.exit();
        });
        
        //
    },
};