export default (toolbox) => {
    toolbox.folderOut = async ({ props, target, folder_name, index_template, file_template, }) => {
        
        toolbox.fileOut(props, `${target}/${folder_name}/index.js`, index_template, ).then(() => {
            //
            return toolbox.fileOut(props, `${target}/${folder_name}/${folder_name}.js`, file_template).then(() => {
                //
            });
        }).finally(() => {
            //
            process.exit();
        });
        
        //
    };
};