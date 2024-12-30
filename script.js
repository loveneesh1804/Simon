var isStarted = false;
var level = 1;
var userPattern = [];
var gamePattern = [];
var title = document.querySelector(".title");
var boxes = document.querySelectorAll(".outer > div");

window.onload = (e) => {
  if (!isStarted) handleStart();
};

function handleStart(){
  isStarted = true;
  title.textContent = `Level ${level}`;
  handleAnimation(title,'blip',400);
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", handleClick);
  }
  handlePattern();
};

function handleClick(e){
  if(!isStarted) return ;
  playSound(e.target.className);
  userPattern.push(e.target.className);
  handleAnimation(e.target,'pressed',50);
  checkAnswer(userPattern.length - 1);
}

function checkAnswer(currentLvl){
  if (userPattern[currentLvl] === gamePattern[currentLvl]){
    if(userPattern.length === gamePattern.length){
      setTimeout(() => {
        handleNextLevel();
      }, 700);
    }
  } else {
    handleLoose();
  }
}

function handleNextLevel(){
  title.textContent = `Level ${++level}`;
  userPattern = [];
  handlePattern();
};

function handleLoose (){
  isStarted = false;
  handleScores(level);
  level = 1;
  userPattern = [];
  gamePattern = [];
  title.textContent = `Game Over`;
  playSound('wrong');

  handleAnimation(document.querySelector('body'),'error',400);
  setTimeout(()=>{
    window.location.href = 'index.html';
  },2500)
};

function handlePattern(){
  var random = boxes[Math.floor(Math.random() * 4)];
  gamePattern.push(random.className);

  playSound(random.className);

  handleAnimation(random,'flash',400);
};

function playSound(name){
  var audio = new Audio(`./res/${name}.mp3`);
  audio.play();
}

function handleAnimation(el,className,duration){
  el.classList.add(className);

  setTimeout(() => {
    el.classList.remove(className);
  }, duration);
}

function handleSort(arr){
  for(var i=0;i<arr.length;i++){
    for(var j=i;j<arr.length;j++){
      if(arr[i]<arr[j]){
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr.filter((el,i)=>i<3);
}

function handleScores(lvl){
  var scores = JSON.parse(localStorage.getItem('scores')) || [];
  if(!scores.length){
    scores.push(lvl);
    return localStorage.setItem('scores',JSON.stringify(scores));
  }
  else{
    scores.push(lvl);
    return localStorage.setItem('scores',JSON.stringify(handleSort(scores)));
  }
}