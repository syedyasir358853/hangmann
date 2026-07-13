const guessesLeft = document.getElementById("guessLeft");
const img = document.getElementById("img");
const randWordDiv = document.getElementById("randomWord");
const inp = document.getElementById("guessChar");
const startBtn = document.getElementById("startBtn");
//const refreshBtn = document.getElementById("refreshBtn");
const buttonsDiv = document.getElementById("buttons");
const para = document.getElementById("guessLeft");
const hintBtn = document.getElementById("hintBtn");
const headingAnimalsFruits = document.getElementById("wordInfo");
const playAgainBtn = document.getElementById("playAgain");
const SaveTitle = document.getElementById("Saveman");
const savedStreak = document.getElementById("savedStreak");
const stats = document.getElementById("stats");
let streak = 0;
const streakBar = document.getElementById("streak");
const hiStreak = document.getElementById("sStreak");
stats.style.visibility = "hidden";
hiStreak.style.visibility = "hidden";
headingAnimalsFruits.style.display = "none";
SaveTitle.innerText = "Save The Hanging MAN";
SaveTitle.style.background = "#d7cef5";
SaveTitle.style.color = "#030303";

let highestStreak = 0;

const row1 = document.getElementById("row1");
const row2 = document.getElementById("row2");
const row3 = document.getElementById("row3");
let word = "";
let guess = 7;
let appendedWord = "";

const arrAnimals = [
  // Animals
  "elephant",
  "tiger",
  "lion",
  "giraffe",
  "zebra",
  "kangaroo",
  "panda",
  "monkey",
  "rabbit",
  "dolphin",
  "whale",
  "shark",
  "penguin",
  "crocodile",
  "alligator",
  "cheetah",
  "leopard",
  "hippopotamus",
  "rhinoceros",
  "squirrel",
  "hamster",
  "porcupine",
  "peacock",
  "ostrich",
  "camel",
];
const arrFruits = [
  // Fruits
  "apple",
  "banana",
  "orange",
  "mango",
  "grapes",
  "pineapple",
  "watermelon",
  "strawberry",
  "blueberry",
  "raspberry",
  "blackberry",
  "kiwi",
  "papaya",
  "guava",
  "pear",
  "peach",
  "plum",
  "cherry",
  "apricot",
  "coconut",
  "pomegranate",
  "lychee",
  "dragonfruit",
  "passionfruit",
  "cranberry",
];

const imgArr = [
  "images1.jpg",
  "images2.jpg",
  "images3.jpg",
  "images4.jpg",
  "images5.jpg",
  "images6.jpg",
  "images7.jpg",
  "imagesF.jpg",
];

let arrCom = [arrAnimals, arrFruits];

let imgIndex = 1;
let wordHint = "";
let hintLeft = 3;

function startGame() {
stats.style.visibility = "visible";
hiStreak.style.visibility = "visible";



  SaveTitle.innerText = "Save The Hanging MAN";
  SaveTitle.style.background = "#d7cef5";
  SaveTitle.style.color = "#030303";
  imgIndex = 0;
  streak = 0;
  streakBar.hidden = false;
  streakBar.innerText = `Streak: ${streak}`;
  img.src = imgArr[imgIndex];

  row1.replaceChildren();
  row2.replaceChildren();
  row3.replaceChildren();
  create_buttons_alphbet();

  guess = 7;
  para.innerText = `Guesses: ${guess}`;
  para.style.background = "#ffffff";
  para.style.color = "#2c3e50";
  para.hidden = false;

  //   refreshBtn.hidden = true;
  startBtn.hidden = true;

  GenerateWord();

  hintBtn.hidden = false;
}

function GenerateWord() {
  if (sessionStorage.getItem("value")) {
    highestStreak = sessionStorage.getItem("value");
  }
  savedStreak.innerText = `Highest Streak: ${highestStreak}`;
  savedStreak.innerText = `Highest Streak: ${highestStreak}`;
  console.log(
    `the value of hi streak is ${highestStreak} and type is ${typeof highestStreak}`,
  );

  hintBtn.innerText = `Hint: ${hintLeft}`;
  if (hintLeft > 0) {
    hintBtn.disabled = false;
    hintBtn.style.backgroundColor = "#f39c12";
  }
  randWordDiv.replaceChildren();
  headingAnimalsFruits.style.display = "inline-block";
  let y = Math.floor(Math.random() * 2);
  let arr = arrCom[y];
  let x = Math.floor(Math.random() * arr.length);
  let len = arr[x].length;
  y === 0
    ? (headingAnimalsFruits.innerText = "Animal")
    : (headingAnimalsFruits.innerText = "Fruit");

  console.log(len);
  for (i = 0; i < len; i++) {
    const span = document.createElement("span");
    span.style.color = "#ee4c4c";
    const textnode = document.createTextNode("X");
    span.appendChild(textnode);
    randWordDiv.appendChild(span);
  }

  word = arr[x];
  wordHint = arr[x];

  console.log(`value of word is ${word} \nvalue of hint is ${wordHint}`);
}

function showchar(arr) {
  let i = 0;
  if (arr[i] === undefined) return;
  while (i !== -1) {
    if (arr[i] === undefined) break;
    randWordDiv.children[arr[i]].textContent = word[arr[i]];
    randWordDiv.children[arr[i]].style.color = "#006d3a";
    i++;
  }
}

function find(e) {
  //   refreshBtn.hidden = true;
  hintBtn.hidden = false;
  let a = e.target.innerText.toLowerCase();
  e.target.disabled = true;
  let i = 0;
  let index = [];
  while (i !== -1) {
    if (a === word[i]) {
      index.push(i);
    }
    i++;
    if (word[i] === undefined) break;
  }
  wordHint = wordHint.replaceAll(a, "");
  console.log(`value of word is ${word} \nvalue of hint is ${wordHint}`);

  if (index.length !== 0) {
    showchar(index);
    if (wordHint.length === 0) {
      setTimeout(() => {
       if(hintLeft<3) hintLeft++;
        streak++;
        if (streak > Number(highestStreak)) {
          highestStreak = streak.toString();
          sessionStorage.setItem("value", highestStreak);
        }
        streakBar.innerText = `Streak: ${streak}`;
        // refreshBtn.click();
        GenerateWord();
        row1.replaceChildren();
        row2.replaceChildren();
        row3.replaceChildren();
        create_buttons_alphbet();
      }, 1000);
    }
  } else {
    imgIndex++;
    img.src = imgArr[imgIndex];
    guess--;
    para.innerText = `Guesses: ${guess}`;
    if (guess === 0) {
      SaveTitle.innerText = "YOU WERE HANGED";
      SaveTitle.style.backgroundColor = "#800000";
      SaveTitle.style.color = "#dfe7de";
      playAgainBtn.hidden = false;
      hintBtn.hidden = true;
      hintLeft = 3;
      row1.replaceChildren();
      row2.replaceChildren();
      row3.replaceChildren();
      for (let i = 0; i < randWordDiv.children.length; i++) {
        randWordDiv.children[i].innerText = word[i];
      }
    }
  }
}

function create_buttons_alphbet() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < 26; i++) {
    const button = document.createElement("button");
    button.innerText = letters[i];
    button.onclick = find;
    if (i < 10) row1.appendChild(button);
    else if (i < 20) row2.appendChild(button);
    else row3.appendChild(button);
  }
}

startBtn.addEventListener("click", startGame);

// refreshBtn.addEventListener("click", () => {
//   GenerateWord();
// });

playAgainBtn.addEventListener("click", () => {
  startGame();
  playAgainBtn.hidden = true;
});

function useHint() {
  let x = Math.floor(Math.random() * wordHint.length);
  const alpha = { rowA: "abcdefghij", rowB: "klmnopqrst", rowC: "uvwxyz" };
  let row;
  if (alpha.rowA.includes(wordHint[x])) row = row1;
  else if (alpha.rowB.includes(wordHint[x])) row = row2;
  else if (alpha.rowC.includes(wordHint[x])) row = row3;
  else console.log("bug in useHint func");

  for (let i = 0; i < row.children.length; i++) {
    if (row.children[i].innerText.toLowerCase() === wordHint[x]) {
      console.log(row.children[i]);
      row.children[i].click();
      break;
    }
  }
}

hintBtn.addEventListener("click", () => {
  useHint();

  hintLeft--;
  hintBtn.innerText = `Hint: ${hintLeft}`;

  if (hintLeft === 0) {
    hintBtn.disabled = true;
    hintBtn.style.backgroundColor = "#838d8d";
    console.log(`hintleft ${hintLeft}`);
  }
});
