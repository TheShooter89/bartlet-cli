import inquirer from "inquirer";
import selectPath from "inquirer-file-tree-selection-prompt";

export default {
    name: 'react',
    alias: ['r', ],
    description: 'Create a React functional component, hook or context',
    run: async toolbox => {
        const {
            parameters,
            template: { generate },
            print: { info },
            strings,
        } = toolbox;
        const colorprint = toolbox.print.colors;

        console.log('testing \'react\' command');
        toolbox.printHeader();

        const name = parameters.first;
        //console.log('first parameter is: ', name);

        const questions = toolbox.reactSteps();

        inquirer.registerPrompt('path', selectPath);

        inquirer.prompt(questions).then(answers => {
            answers.type = 'react';

            toolbox.print.info(`New ${answers.name} ${strings.startCase(answers.template)} will be created!`);
            toolbox.print.info(JSON.stringify(answers, null, '  '));

            // TESTING
            toolbox.reactCreate(answers).then(() => {
                //console.log('doneeeeeeeeeee');
            });
        }).finally(() => {
            //
            process.exit();
        });
        
        //
    },
};