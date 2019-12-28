import inquirer from "inquirer";
import selectPath from "inquirer-file-tree-selection-prompt";

export default {
    name: 'context',
    description: 'Create a React context',
    dashed: true,
    run: async toolbox => {
        const {
            parameters,
            template: { generate },
            print: { info },
            strings,
        } = toolbox;
        const colorprint = toolbox.print.colors;

        console.log('testing \'react component\' command');
        toolbox.printHeader();

        const name = parameters.first;
        //console.log('first parameter is: ', name);

        const questions = toolbox.reactSteps();
        // herebelow happens the magic...
        questions.shift();

        inquirer.registerPrompt('path', selectPath);

        inquirer.prompt(questions).then(answers => {
            answers.type = 'react';

            toolbox.print.info(`New ${answers.name} ${strings.startCase(answers.template)} will be created!`);
            toolbox.print.info(JSON.stringify(answers, null, '  '));

            // TESTING
            // ### setting the default step
            answers.template = 'context';

            const out_template = 'react-' + answers.template;
            const out_target = answers.path + '/' + answers.name;
            toolbox.fileOut(answers, out_target + `/index.js`, 'react-index').then(() => {
                //console.log('doneeeeeeeeeee');
                //process.exit();
                toolbox.fileOut(answers, out_target + `/${answers.name}.js`, out_template).then(() => {
                    //
                });
            }).finally(() => {
                process.exit();
                //
            });
        });
        
        //
    },
};