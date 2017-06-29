// carregar libs
var readline   = require("readline"),
    fs         = require('fs'),
    OracleCode = require('./brain/lib/rivescript'), 
    rl         = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                 });

var bot = null;

var opts    = {
      brain: "./brain/knowledge",
      debug: false,
      utf8: false
    };

function loadBot() {
  bot = new OracleCode({
    debug:   opts.debug,
    utf8:    opts.utf8,
    concat:  "newline",
  });
  bot.ready = false;
  bot.loadDirectory(opts.brain, loadingDone, loadingError);
}
loadBot();
   

rl.setPrompt("Voce> ");
rl.prompt();
rl.on('line', function(cmd) {
  if (cmd === "/sair") {
    process.exit(0);
  } else {
    var reply = (bot && bot.ready)
      ? bot.reply("localuser", cmd)
      : "ERR: Bot não pronto ainda";
    console.log("Bot>", reply);
  }
  
  rl.prompt();

}).on('close', function() {
  console.log("");
  process.exit(0);
});

function loadingDone(batchNumber) {
  bot.sortReplies();
  bot.ready = true;
}

function loadingError(error, batchNumber) {
  console.error("Loading error: " + error);
}

