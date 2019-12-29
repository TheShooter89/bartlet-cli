export default (toolbox) => {
    toolbox.folderOut = async ({
        props,
        target,
        folder_name,
        index_template,
        file_template,
    }) => {
        
        await toolbox.fileOut({
            props: props,
            target: `${target}/${folder_name}/index.js`,
            template: index_template,
        });

        await toolbox.fileOut({
            props: props,
            target: `${target}/${folder_name}/${folder_name}.js`,
            template: file_template,
        });
        //
    };
};