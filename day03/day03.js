const exec = require("child_process").exec;


function executeCommand(command) {
    exec(command, (err, stdout, stderr) => {
        if(err instanceof Error) {
            console.log(`Error in following command (${command}):\n${stderr}`);
            return;
        }

        console.log(`Command Output:\n ${stdout}`);
    });
}

executeCommand('ls -la');
// Expected Output: (output of ls -la)

executeCommand('dir')

executeCommand('echo "Hello, Node.js!"');
// Expected Output: Hello, Node.js!