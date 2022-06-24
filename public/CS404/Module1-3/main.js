import BoardGame from "./BoardGame.js";

const testGame = new BoardGame("test", 2020,8.4,1,3,20,60,6,"test","test","test",234456);

console.log(testGame);

const stringifyDiv = document.getElementById('stringify');

stringifyDiv.innerText = testGame.stringify();

const parsedGame = BoardGame.parse(stringifyDiv.innerText);

console.log(parsedGame);

const dbDiv = document.getElementById('database');
const dbGame = BoardGame.parse(dbDiv.innerText);
console.log(dbGame);
