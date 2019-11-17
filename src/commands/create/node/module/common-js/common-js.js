export default {
    name: 'common-js',
    description: 'Create a NodeJS CommonJS module',
    dashed: true,
    run: async toolbox => {
        const {
            print,
            parameters,
            filesystem,
        } = toolbox;

        //

        console.log(`
testing common-js command
---| parameters.array: ${JSON.stringify(parameters.array)}
---| parameters.first: ${JSON.stringify(parameters.first)}
---| parameters.string: ${JSON.stringify(parameters.string)}
        `);
        if (!filesystem.inspectTree(parameters.first)) {
            print.error(`Using default dir: ${JSON.stringify(filesystem.cwd())}`);
            return
        }
        print.warning('testing common-js command with print');
        print.success(`New cjs module path: ${JSON.stringify(parameters.first)}`);
    },
};