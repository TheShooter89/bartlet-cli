import inquirer from "inquirer";
import selectPath from "inquirer-file-tree-selection-prompt";

export default {
    name: 'hook',
    description: 'Create a React Hook',
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
            answers.template = 'hook';
            toolbox.print.info('new answers.template: ' + JSON.stringify(answers.template));
            toolbox.folderOut({
                props: answers,
                target: answers.path,
                folder_name: answers.name,
                index_template: `${answers.type}-index`,
                file_template: `${answers.type}-${answers.template}`,
            }).then(() => {
                //console.log('doneeeeeeeeeee');
            });
        }).finally(() => {
            //
            //process.exit();
        });
        
        //
    },
};