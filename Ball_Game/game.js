var character = document.getElementById("character");
var game = document.getElementById("game");
var interval;
var both_key=0;    //if both keys are pressed at the same time.
var count=0;       //to keep track of the block number
const currentBlocks = [];  //to access the current block line

//function to move the ball left
function moveLeft(){
  var left =
  parseInt(window.getComputedStyle(character).getPropertyValue("left"));
  if(left>0){
    character.style.left = left - 2 + "px";
  }
}
//function to move the ball to right
function moveRight(){
  var left =
  parseInt(window.getComputedStyle(character).getPropertyValue("left"));
  if(left<380){
    character.style.left = left + 2 + "px";
  }
} 

document.addEventListener("keydown", event => {
  if(both_key == 0){
    both_key++;
    if(event.key=="ArrowLeft"){
      interval = setInterval(moveLeft, 1);      
    }
    if(event.key=="ArrowRight"){
      interval = setInterval(moveRight, 1);   
    }
  }
});

document.addEventListener("keyup", event => {
  clearInterval(interval);
  both_key=0;
});
var blocks = setInterval(function(){ 
  var blockLast = document.getElementById("block"+(count-1));
  var holeLast = document.getElementById("hole"+(count-1));

  if(count>0){
    var top_blockLast = 
    parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
    var top_holeLast = 
    parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
  }
  //to produce only limited number of block lines in the given game area
  if(top_blockLast<400 || count==0){
    var block = document.createElement("div");
    var hole = document.createElement("div");
    var hole = document.createElement("div");
    block.setAttribute("class", "block"); 
    hole.setAttribute("class", "hole");
    block.setAttribute("id", "block"+count);
    hole.setAttribute("id", "hole"+count);

    //distance between two block lines 100px
    block.style.top = top_blockLast + 100 + "px";
    hole.style.top = top_holeLast + 100 + "px";

    //displays the hole at random position everytime
    var random = Math.floor(Math.random() * 360);
    hole.style.left = random + "px";

    game.appendChild(block);
    game.appendChild(hole);
    currentBlocks.push(count);
    count++;
  }
  var characterTop = 
  parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  var characterLeft = 
  parseInt(window.getComputedStyle(character).getPropertyValue("left"));
  var drop=0;
  if(characterTop <= 0){
    alert("Opps...GAME OVER : Score: " + (count-9));
    clearInterval(blocks);
    location.reload();
  }
  for(var i=0; i<currentBlocks.length; i++){
    let current = currentBlocks[i];
    let iblock = document.getElementById("block"+current);
    let ihole = document.getElementById("hole"+current);
    let iblockTop = 
    parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
    let iholeLeft = 
    parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
    iblock.style.top = iblockTop - 0.5 + "px";
    ihole.style.top = iblockTop - 0.5 + "px";
    if(iblockTop < -20){
      currentBlocks.shift();
      iblock.remove();
      ihole.remove();
    }
    if((iblockTop-20 < characterTop) && (iblockTop > characterTop)){
      drop++;
      if(iholeLeft <= characterLeft && iholeLeft+20 >= characterLeft){
        drop = 0;
      }
    }
  }
  if(drop == 0){
    if(characterTop < 480){
      character.style.top = characterTop + 2 +"px";
    }
      }
  else{
    character.style.top = characterTop - 0.5 +"px";
  }
}, 1);



