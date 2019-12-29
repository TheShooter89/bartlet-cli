import path from "path";

export default (toolbox) => {
    toolbox.fileOut = async ({
        props,
        target,
        template,
    }) => {
        //toolbox.print.info(`called 'print-header' extension`)

        const colorprint = toolbox.print.colors;
        
        // Trim path to relative to current directory for better rendering on screen
        const rel_path = path.relative(process.cwd(), target);

        // creating output index.js
        const index_spinner = toolbox.print.spin(colorprint.bold.italic.cyan(`creating '${rel_path}' file...`));
        const isCreatedIndexJS = await toolbox.template.generate({
            //template: target + 'react-index.js.ejs',
            template: template + '.js.ejs',
            target:`${target}`,
            props: props,
        });
        if (!isCreatedIndexJS) {
            index_spinner.fail(colorprint.bold.italic.red(`[ERROR] creating file: '${rel_path}'`));
            return Promise.resolve(false);
        }
        index_spinner.succeed(colorprint.bold.italic.green(`[SUCCESS] created file: '${rel_path}'`));
        
        //return Promise.resolve(isCreatedIndexJS);
    };
};