import omelette from 'omelette';
import { build } from "gluegun";

/**
 * Create the cli and kick it off
 */
async function run () {
  // LEGACY
  //let complete = omelette(`bartlet-cli <name> <surname>`);
  
  // TESTING
  let complete = omelette(`bartlet-cli`);
  /* const comp_tree = {
    name: ['franz', 'tanque'],
    surname: ['paoletti', 'denis'],
    test(){
      return ['passed', 'failed'];
    },
  }; */
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
    config: ['',],
    import: {
      template: ['path/to/template/file/',]
    },
  };
  complete.tree(comp_tree);
  
  /* complete.on('name', ({reply}) => {
    reply(['franz2', 'tanque2']);
  });

  complete.on('surname', ({reply}) => {
    reply(['paoletti2', 'denis2']);
  }); */

  //console.log('Hello bartlet-cli test!');
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
      console.log('...DONE!')
    } catch(err){
      console.log('error occurred: ', err)
    }
  }

  console.log('---------------- START OF DEBUG LOG ----------------');
  console.log('process.argv: ', process.argv);
  console.log('process.argv.indexOf(\'--setup\'): ', process.argv.indexOf('--setup'));
  console.log('----------------- END OF DEBUG LOG -----------------');
  
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
