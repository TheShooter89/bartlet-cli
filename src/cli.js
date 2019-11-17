import omelette from 'omelette';
import {
  build,
  filesystem,
} from "gluegun";

const fs = require('fs');
const readline = require('readline');
const util = require('util');

/**
 * Create the cli and kick it off
 */
async function run () {
  let complete = omelette(`bartlet-cli <create | add | init | import | config>`);
  const comp_tree = {
    create: {
      react: {
        component: ['src/components/',],
        hook: ['src/hooks/',],
        context: ['src/contexts/',],
      },
      node: {
        module: {
          es6: ['src/',],
          'common-js': ['src/',],
        }
      },
      vanilla: {
        script: ['workdir',]
      },
    },
    add: {
      template: ['fake/template/path/']
    },
    init: ['alternative/project/dir/',],
    //config: ['',],
    config(){
      // TODO - EXPERIMENTING
    },
    import: {
      template: ['path/to/template/file/',]
    },
  };
  complete.tree(comp_tree);
  
  complete.init();

  if(process.argv.indexOf('--setup') > -1){
    console.log('installing autocompletion shell script...');
    try {
      console.log('calling complete.setupShellInitFile()...\n')
      console.log(
`To install shell tab completion you need to run setup option command 
run: 'bartlet-cli --setup'

then,to tab completion to take effect you need to 'refresh' .bash_profile
run: 'source ~/.bash_profile'

see https://github.com/f/omelette/issues/1#issuecomment-45525021`
      )
      complete.setupShellInitFile();
    } catch(err){
      console.log('error occurred: ', err)
    }
  }

  const cli = build()
    .brand('bartlet-cli')
    .src(__dirname)
    .help()
    .version()
    .create()

  const toolbox = await cli.run(process.argv);

  // send it back (for testing, mostly)
  return toolbox;
}

module.exports = { run }
