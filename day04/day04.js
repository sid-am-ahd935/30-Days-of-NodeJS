const path = require("path");


function resolvePath(relativePath) {
    console.log("Resolved Path: ", path.resolve(__dirname, relativePath));
}

resolvePath('../project/folder/file.txt');
// Expected Output: Resolved Path: /Users/username/project/folder/file.txt

resolvePath('nonexistent-folder/file.txt');
// Expected Output: Resolved Path: /Users/username/nonexistent-folder/file.txt