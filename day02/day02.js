const fs = require("fs");
const path = require("path");

function writeToFile(filePath, content) {
    fs.writeFile(filePath, content, err => {
        if(err) {
            console.log(err);
            return;
        }
        console.log("Data written to ", path.basename(filePath));
    });
}

writeToFile('test-files/output1.txt', 'Sample content.');
// Expected Output: Data written to output1.txt

writeToFile('test-files/nonexistent-folder/output.txt', 'Content in a non-existent folder.');
// Expected Output: Error writing to file: ENOENT: no such file or directory...