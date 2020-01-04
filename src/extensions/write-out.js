export default (toolbox) => {
    toolbox.writeOut = async ({
        props,
        outPath,
        name,
        template,
        needCSS = false,
        indexType,
    }) => {
        
        indexType && await toolbox.fileOut({
            props: props,
            target: `${outPath}/index.js`,
            template: `${indexType}-index`,
        });

        needCSS && await toolbox.fileOut({
            props: props,
            target: `${outPath}/${name}.css`,
            template: `${template}-css`,
        });

        await toolbox.fileOut({
            props: props,
            target: `${outPath}/${name}.js`,
            template: `${template}`,
        });

        //
    };
};