export default {
    name: 'component',
    description: 'Create a React functional component',
    dashed: true,
    run: async toolbox => {
        const generate = toolbox.createReact();
        generate({
            name: 'bla',
            path: 'prova',
        });
        console.log('testing \'react component\' command');
    },
};