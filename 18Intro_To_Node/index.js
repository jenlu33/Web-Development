// const fs = require("fs");

// fs.copyFileSync("file1.txt", "file2.txt");
// Look in the first file and copy it to the second file. 
// Will replace whatever was originally there or create a new file

const superheroes = require("superheroes");
const supervillians = require("supervillains");

const mySuperheroName = superheroes.random();
const mySuperVillianName = supervillians.random();

// console.log(mySuperheroName);
console.log(mySuperVillianName);
