/** @format */

const fs = require("fs");

let data = "I am KLVP and I am SDE3 in Amazon";

//create one file

// fs.writeFile("text.txt", data, (err) => {
//   console.log("Completed writing a File !!!");
// });

const [, , n] = process.argv;

quote = "Live More Worry Less👍💕";

//create multiple file

// for (let i = 1; i < +n + 1; i++) {
//   fs.writeFile(`backup/task-${i}.html`, quote, (err) => {
//     console.log(`Completed writing a File${i} !!!`);
//   });
// }

//read one file

// fs.readFile("text1.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(data);
// });

// append data in the fileSystem

// fs.appendFile(
//   "text.txt",
//   "\n Dream without fear and Love without limits 💕💖",
//   (err) => {
//     console.log("Completed writing");
//   }
// );

// delete file

// fs.unlink("text.txt", (err) => {
//   console.log("Deleted file");
// });

// read directory

// fs.readdir("./", (err, files) => {
//   console.log(files, files.length);
// });

// delete files in directory

// fs.readdir("./backup", (err, files) => {
//   console.log(files);
//   files.forEach((file) =>
//     fs.unlink(`./backup/${file}`, (err) => console.log("deleted !"))
//   );
// });

data = fs.readFileSync("text.txt", "utf-8");
console.log(data);
