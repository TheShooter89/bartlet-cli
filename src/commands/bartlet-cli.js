const command = {
  name: 'bartlet-cli',
  run: async toolbox => {
    const {
      print
    } = toolbox;
    print.info('Welcome to your CLI')
    toolbox.printHeader();
  }
}

module.exports = command