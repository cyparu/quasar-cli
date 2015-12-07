'use strict';

var _ = require('lodash');

function injectCommand(config) {
  config.program
  .command(config.type + ' <' + config.type + '-name> [new-name]')
  .description('Create or rename a Quasar App ' + _.capitalize(config.type))
  .action(function(name, newName) {
    config.program.helpers.assertInsideAppFolder();

    var asset = require('../lib/cmds/assets');

    if (newName) {
      process.exit(asset.rename(config.type, config.program, name, newName));
    }

    process.exit(asset.create(config.type, config.program, name));
  });
}

module.exports = function(program) {
  injectCommand({
    program: program,
    type: 'page'
  });

  injectCommand({
    program: program,
    type: 'layout'
  });
};
