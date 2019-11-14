export default {
    name: 'script',
    description: 'Create a vanilla ES6 Javascript file',
    dashed: true,
    run: async toolbox => {
        console.log('testing script command');
        const name = toolbox.parameters.first
        console.log('name is: ', name);
        await toolbox.template.generate({
            template: 'test_vanilla.js.ejs',
            target: `models/${name}/${name}.js`,
            props: {
                name: name
            }
        });
    },
};