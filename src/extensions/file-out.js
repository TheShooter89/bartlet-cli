export default (toolbox) => {
    toolbox.fileOut = async (conf, target, template) => {
        //toolbox.print.info(`called 'print-header' extension`)

        const colorprint = toolbox.print.colors;

        // creating output index.js
        const index_spinner = toolbox.print.spin(colorprint.bold.italic.cyan(`creating '${target}' file...`));
        const isCreatedIndexJS = await toolbox.template.generate({
            //template: target + 'react-index.js.ejs',
            template: template + '.js.ejs',
            target:`${target}`,
            props: conf,
        });
        if (!isCreatedIndexJS) {
            index_spinner.fail(colorprint.bold.italic.red(`[ERROR] creating file: '${target}'`));
        }
        index_spinner.succeed(colorprint.bold.italic.green(`[SUCCESS] created file: '${target}'`));
        
        //
    };
};