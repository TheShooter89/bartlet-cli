export default (toolbox) => {
    toolbox.printHeader = () => {
        //toolbox.print.info(`called 'print-header' extension`)

        const colorprint = toolbox.print.colors;

        toolbox.print.info(colorprint.bgBrightYellow.bold.italic.underline.red('                   BARTLET-CLI '));
        toolbox.print.info(colorprint.bgBrightYellow.bold.italic.red('by tanque                      '));
    };
};