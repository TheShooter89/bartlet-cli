export default (toolbox) => {
    toolbox.OLD_reactCreate = async (conf) => {
        //toolbox.print.info(`called 'print-header' extension`)

        const colorprint = toolbox.print.colors;

        // creating output index.js
        toolbox.print.info(colorprint.bold.italic.underline.green(`creating '${conf.name}/index.js' file...`));
        const index_spinner = toolbox.print.spin(colorprint.bold.italic.cyan(`creating '${conf.name}/index.js' file...`));
        const isCreatedIndexJS = await toolbox.template.generate({
            template: 'react-index.js.ejs',
            target:`${conf.path}/${conf.name}/index.js`,
            props: conf,
        });
        if (!isCreatedIndexJS) {
            index_spinner.fail(colorprint.bold.italic.red(`ERROR CREATING DIRECTORY`));
        }
        index_spinner.succeed(colorprint.bold.italic.green(`'/${conf.name}/index.js' created!`));

        // creating actual js code file
        toolbox.print.info(colorprint.bold.italic.underline.green(`creating '${conf.name}' ${conf.template}..`));
        const model_spinner = toolbox.print.spin(colorprint.bold.italic.cyan(`creating ${conf.name}/${conf.name}.js...`));
        const isCreated = await toolbox.template.generate({
            template: 'react-model.js.ejs',
            target:`${conf.path}/${conf.name}/${conf.name}.js`,
            props: conf,
        });
        
        if (!isCreated) {
            model_spinner.fail(colorprint.bold.italic.red(`ERROR CREATING FILE`));
        }

        model_spinner.succeed(colorprint.bold.italic.green(`${conf.name}.js file created!`));
        
        //
    };
};