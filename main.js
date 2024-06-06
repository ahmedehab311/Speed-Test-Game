const words = [
  "hello",
  "ahmed",
  "javascript",
  "country",
  "town",
  "facebook",
  "twiter",
  "internet",
  "youtube",
  "python",
  "code",
  "task",
  "runner",
  "roles",
  "test",
  "best",
  "funny",
  "rust",
  "playing",
  "task",
  "coding",
  "working",
  "osama",
  "ali",
  "omar",
  "sorry",
  "loop",
  "nothing",
  "thanks",
];

// setting level
const lvls = {
  easy: 60,
  normal: 50,
  hard: 10,
};

// default level
let defaultLevelName = "normal";
let defaultLevelTime = lvls[defaultLevelName];

// catch selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let levelSelect = document.getElementById("levelSelect");

// set initial level and time
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelTime;
timeLeftSpan.innerHTML = defaultLevelTime;
scoreTotal.innerHTML = words.length;

// disable paste events
input.onpaste = function () {
  return false;
};

// update level based on selection
levelSelect.onchange = function () {
  defaultLevelName = this.value;
  defaultLevelTime = lvls[defaultLevelName];
  lvlNameSpan.innerHTML = defaultLevelName;
  secondsSpan.innerHTML = defaultLevelTime;
  timeLeftSpan.innerHTML = defaultLevelTime;
};

// start game
startButton.onclick = function () {
  this.remove();
  input.focus();
  genWords();
};

// generate word function
function genWords() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let wordIndex = words.indexOf(randomWord);
  words.splice(wordIndex, 1);
  theWord.innerHTML = randomWord;
  upcomingWords.innerHTML = "";

  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  startPlay();
}

// start play function
function startPlay() {
  let remainingTime = defaultLevelTime;
  timeLeftSpan.innerHTML = remainingTime; 

  let start = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      timeLeftSpan.innerHTML = remainingTime; 
    } else {
      clearInterval(start);
      endGame(false);
      clearWord(); 
    }
  }, 1000);
}
// end game function
function endGame(success) {
  input.disabled = true; // disable input
  input.value = ""; // clear input field
  if (success) {
    let span = document.createElement("span");
    let txtspan = document.createTextNode(
      "Congratulations! All words have been completed."
    );
    span.className = "good";
    span.appendChild(txtspan);
    finishMessage.appendChild(span);
  } else {
    let span = document.createElement("span");
    span.className = "bad";
    let spantext = document.createTextNode("Time is up! refresh and try again");
    span.appendChild(spantext);
    finishMessage.appendChild(span);
  }
}


// check word function

function checkWord() {
  if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
    input.value = "";
    scoreGot.innerHTML++;
    if (words.length > 0) {
      genWords();
    } else {
      endGame(true);
    }
  } else {
    let span = document.createElement("span");
    span.className = "bad";
    let spantext = document.createTextNode("Wrong word!");
    span.appendChild(spantext);
    finishMessage.appendChild(span);
  }
}
function clearWord() {
  theWord.innerHTML = "";
  finishMessage.innerHTML = "";
  endGame(false);
}
// listen for enter key to check word
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !input.disabled) {
    finishMessage.innerHTML = "";
    checkWord();
  }
});
