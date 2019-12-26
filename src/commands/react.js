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

        const questions = [
            {
                // Choose React template to use
                type: 'list',
                name: 'template',
                message: 'Which kind of React entity do you want to create?',
                choices:[
                    new inquirer.Separator(colorprint.bold.italic.green('     == React Templates ==     ')),
                    {
                        name: 'Component (functional)',
                        value: 'component',
                        checked: true,
                    },
                    {
                        name: 'Hook',
                        value: 'hook',
                    },
                    {
                        name: 'Context',
                        value: 'context',
                    },
                ],
            },
            {
                type: 'checkbox',
                name: 'features',
                message: 'Choose what you want to include:',
                choices: [
                    new inquirer.Separator(colorprint.bold.italic.green('     == React  Features ==     ')),
                    {
                        name: 'React Router',
                        value: 'router',
                    },
                    {
                        name: 'RbxJs Bulma React Components',
                        value: 'rbx',
                        checked: true,
                    },
                    {
                        name: 'Firebase Auth',
                        value: 'firebaseAuth',
                    },
                    {
                        name: 'useState',
                        value: 'state',
                        checked: true,
                    },
                    {
                        name: 'useContext',
                        value: 'context',
                    },
                ],
            },
            {
                type: 'input',
                name: 'name',
                message: 'Choose a name (force camelCase):',
                filter: (answer) => {
                    return toolbox.strings.camelCase(answer);
                },
            },
            {
                type: 'path',
                name: 'path',
                message: 'Press \'Enter\' to create into current directory or select one:',
            },
        ];

        inquirer.registerPrompt('path', selectPath);

        inquirer.prompt(questions).then(answers => {
            answers.type = 'react';

            toolbox.print.info(`New ${answers.name} ${strings.startCase(answers.template)} will be created!`);
            toolbox.print.info(JSON.stringify(answers, null, '  '));

            // TESTING
            toolbox.createReact(answers).then(() => {
                console.log('dasdswffse');
            });
            return 0;
        });
    },
};