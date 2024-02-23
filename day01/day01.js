const fs = require('fs');

function readFileContent(filePath) {
    fs.readFile(filePath, 'utf8', (err, text) => {
        if(err) {
            console.log(err);
            return;
        }
        if(text.length == 0) {
            console.log("(empty string)")
        }
        console.log(text);
    });
}

readFileContent('test-files/file1.txt');
readFileContent('test-files/empty-file.txt');
readFileContent('test-files/nonexistent-file.txt');
