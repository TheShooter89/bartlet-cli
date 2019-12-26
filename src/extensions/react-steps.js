import inquirer from "inquirer";

export default (toolbox) => {
    toolbox.reactSteps = () => {
        //toolbox.print.info(`called 'print-header' extension`)
        const colorprint = toolbox.print.colors;

        //
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
                onlyShowDir: true,
                message: 'Press \'Enter\' to create into current directory or select one:',
            },
        ];

        //
        return questions;
    };
};