export default (toolbox) => {
    toolbox.reactCreate = async (config) => {
        //toolbox.print.info(`called 'print-header' extension`)

        const colorprint = toolbox.print.colors;
        
        switch (config.template) {
            case 'component':
                toolbox.print.info(colorprint.bold.italic.underline.green(`creating component!`));
                const spinner = toolbox.print.spin(colorprint.bold.italic.cyan('creating...'));
                const isCreated = await toolbox.template.generate({
                    template: 'react-model.js.ejs',
                    target:`${config.path}/${config.name}.js`,
                    props: config,
                });
                
                if (!isCreated) {
                    spinner.fail(colorprint.bold.italic.red(`ERROR CREATING FILE`));
                }

                spinner.succeed(colorprint.bold.italic.green(`File created! Ready to go!`));
                break;

            case 'hook':
                toolbox.print.info(colorprint.bold.italic.underline.cyan(`creating hook!`));
                break;

            case 'context':
                toolbox.print.info(colorprint.bold.italic.underline.magenta(`creating context!`));
                break;
        
            default:
                // this is breaking stuff
                return
                break;
        }

        // LEGACY - to remove

        toolbox.print.info(colorprint.bold.italic.underline.red(`called 'create-react' extension`));
        toolbox.print.info(colorprint.bold.italic.underline.red(`config: `, JSON.stringify(config, null, '  ')));
    };
};