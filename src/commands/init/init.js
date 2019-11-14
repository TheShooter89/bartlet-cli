export default {
    name: 'init',
    alias: ['i',],
    description: 'Initialize a new project, creating project config file and defaults',
    dashed: true,
    run: async toolbox => {
        console.log('testing init command');
    },
};