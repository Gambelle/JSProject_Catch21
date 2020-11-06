let canvas=document.querySelector("#Title");
let context =canvas.getContext('2d');
context.font="50pt Calibri"

//colors
const backgroundC="darkgreen";
const offWhiteC="aliceblue";
const spaceColor="silver";
const goldC="gold";
const offGreenC="green";

//splat canvas
context.clearRect(0,0,canvas.width,canvas.height)
context.fillStyle = backgroundC;
context.fillRect(0, 0, canvas.width, canvas.height);
context.fillStyle="black";
context.fillText("Catch 21",365,70);

//game variables
let value=["A",2,3,4,5,6,7,8,9,10,"J","Q","K"]
let suits=["S","D","C","H"]
let score=[0,0,0,0];
let totalScore=0;
let spaceCards=[0,0,0,0];
let stars=0;
let numCards=52;
let gameOver=false;
let cardDrawn=0;
let deck=new Array();
let noCards=false
let usedChips=0;
let canAdd=[true,true,true,true];
let scoringNum=[0,0,0,0];
let numSeven=[0,0,0,0];
let catch21=false;


//calls
drawMenu();
newGame();

//event listeners
canvas.addEventListener("mousedown", function(e)
{
  getMousePosition(canvas,e);
  if(xMouse>400&&xMouse<650&&yMouse>120&&yMouse<175)
  {
    newGame();
  }
  //when click on space preform necessary actions for space
  if(xMouse>400&&xMouse<500&&yMouse>300&&yMouse<850)
  {
    for(let x=0;x<4;x++)
    {
      console.log(scoringNum[x])
    }
    if(canAdd[0])
    {
      if (cardDrawn==7)
      {
        numSeven[0]+=1;
      }
      scoringNum[0]+=1;
      makeCard(415,310+(50*spaceCards[0]));
      updateSpace(0);
      numCards--;
      nextCard();
      drawScore();
    }
  }
  if(xMouse>550&&xMouse<650&&yMouse>300&&yMouse<850)
  {
    if(canAdd[1])
    {
      if (cardDrawn==7)
      {
        numSeven[1]+=1;
      }
      scoringNum[1]+=1;
      makeCard(565,310+(50*spaceCards[1]));
      updateSpace(1)
      numCards--;
      nextCard();
      drawScore();
    }
  }
  if(xMouse>700&&xMouse<800&&yMouse>300&&yMouse<850)
  {
    if(canAdd[2])
    {
      if (cardDrawn==7)
      {
        numSeven[2]+=1;
      }
      scoringNum[2]+=1;
      makeCard(715,310+(50*spaceCards[2]));
      updateSpace(2)
      numCards--;
      nextCard();
      drawScore();
    }
  }
  if(xMouse>850&&xMouse<950&&yMouse>300&&yMouse<850)
  {
    if(canAdd[3])
    {
      if (cardDrawn==7)
      {
        numSeven[3]+=1;
      }
      scoringNum[3]+=1;
      makeCard(865,310+(50*spaceCards[3]));
      updateSpace(3)
      numCards--;
      nextCard();
      drawScore();
    }
  }
  //Wnen power chip area is clicked preform necessary actions
  if(xMouse>25&&xMouse<240&&yMouse>100&&yMouse<300)
  {
    if(usedChips!=3)
    {
      usedChips++;
      numCards--;
      nextCard();
      useChip();
      drawScore();
    }
  }
})


//functions
function getMousePosition(canvas,event)// allows performance of button like actions on canvas
{
  let rect=canvas.getBoundingClientRect();
  let x=event.clientX -rect.left;
  let y=event.clientY-rect.top;
  xMouse=x;
  yMouse=y;
  console.log("Coor. x:"+x,  "\nCoor. y: "+y);
}

function newGame()//sets varaiables back to starting values and renders game to start
{
  numCards=52;
  drawGame();
  scoringNum=[0,0,0,0];
  numSeven=[0,0,0,0];
  stars=0;
  usedChips=0;
  noCards=false
  drawPowerChip();
  fillCards();
  shuffle(deck);
  gameOver=false;
  totalScore=0;
  drawScore();
  nextCard();
  score=[0,0,0,0];
  for(let i=0;i<4;i++)
  {
    drawSpaceScore(400+(150*i),200,i);
  }
  spaceCards=[0,0,0,0];
  cardIndex=0;
  canAdd=[true,true,true,true];
}

function nextCard()//chooses and makes next card to be drawn
{
  if(numCards==0)
  {
    gameOver=true;
    noCards=true;
    makeCard(100,200);
    canAdd=[false,false,false,false]
  }
  else
  {
    context.fillStyle="black";
    cardDrawn=deck[numCards-1].Value;
    //console.log(numCards)
    makeCard(100,200);
  }

}
function fillCards()//fills array holding cards to proper values and suits
{//Utilized source: https://www.thatsoftwaredude.com/content/6196/coding-a-card-deck-in-javascript
  for(let i=0;i<4;i++)
  {
      for(let k=0;k<13;k++)
      {
        let card =
        {
          Value: value[k], Suit: suits[i]
        };
        deck.push(card);
      }
    }
    for(let i=0;i<52;i++)
    {
        console.log(deck[i]);

    }
    return deck;
}
function shuffle(deck)
{//Utilized source: https://www.thatsoftwaredude.com/content/6196/coding-a-card-deck-in-javascript
  for (let i = 0; i < 1000; i++)
  {
    let location1 = Math.floor((Math.random() * deck.length));
    let location2 = Math.floor((Math.random() * deck.length));
    let tmp = deck[location1];
    deck[location1] = deck[location2];
    deck[location2] = tmp;
  }
}
  function updateSpace(i)//updates score for each space based on card drawn calls to check score and redraws score space
  {
    if (cardDrawn=="J"||cardDrawn=="Q"||cardDrawn=="K")
    {
      score[i]+=10;
    }
    else if (cardDrawn=="A")
    {
      if(score[i]+11>21)
      {
        score[i]+=1;
      }
      else {
        score[i]+=11;
      }
    }
    else
    {
      score[i]+=cardDrawn;
    }
    spaceCards[i]+=1;
    scoreCheck(i);
    for(let i=0;i<4;i++)
    {
      drawSpaceScore(400+(150*i),200,i);
    }
  }
  function scoreCheck(i)// checks if space has broken 21, resets space if it is 21, and calls to check if the game is over
  {
    checkGameOver();
    if(score[i]>21)
    {
      score[i]="Bust";
      canAdd[i]=false;
      checkGameOver();
    }
    else if(score[i]==21)
    {
      updateSpace(i)
      updateScore(i);
      clearSpace(i);
    }
  }
  function clearSpace(i)// resets space once 21 is reached
  {
    scoringNum[i]=0;
    numSeven[i]=0
    score[i]=0;
    spaceCards[i]=0;
    drawPlaySpace(400+(150*i),300);
    drawSpaceScore(400+(150*i),200,i);
    drawSpaceButton(400+(150*i),800);
    canAdd[i]=true;
  }
  function checkGameOver()//game is over if cards are used or every space is broken
  {
    if(score[0]=="Bust"&&score[1]=="Bust"&&score[2]=="Bust"&&score[3]=="Bust")
    {
      gameOver=true;
    }
  }
//render menu
function drawMenu()
{
  context.font="20pt Calibri";
  context.fillStyle=offWhiteC;
  context.fillRect(400,120,250,50);
  context.fillStyle="black";

  context.strokeRect(400,120,250,50);
  context.fillText("Start New Game!",405,155);
  context.font="12pt Calibri";
  //draws scoring rules
  context.fillText("Scoring",850,40);
  context.fillText("777: 500",850,60);
  context.fillText("2 Card 21: 300",850,75);
  context.fillText("5 Card 21: 400",850,90);
  context.fillText("6 Card 21: 450",850,105);
  context.fillText("Regular 21: 200",850,120);


}
function updateScore(i)
{
  if(numSeven[i]==3)
  {
    totalScore+=500;
  }
  else if(scoringNum[i]==5)
  {
    totalScore+=400;
  }
  else if(scoringNum[i]>5)
  {
    totalScore+=450;
  }
  else if(scoringNum[i]==2)
  {
    totalScore+=300;
  }
  else
  {
    totalScore+=200;
  }
}
//render game
function drawGame()
{
  for(let i=0;i<4;i++)
  {
    drawPlaySpace(400+(150*i),300);
  }
  for(let i=0;i<4;i++)
  {
    drawSpaceScore(400+(150*i),200,i);
  }
  for(let i=0;i<4;i++)
  {
    drawSpaceButton(400+(150*i),800);
  }
}
function drawPlaySpace(x,y)
{
  context.fillStyle=spaceColor;
  context.fillRect(x,y,100,500);
  context.strokeRect(x,y,100,500);
}
function drawSpaceButton(x,y)
{
  context.fillStyle=goldC;
  context.fillRect(x,y,100,50);
  context.strokeRect(x,y,100,50);
  context.fillStyle="black";
  context.fillText("Here",x+15,y+35);
}
function drawSpaceScore(x,y,i)
{
  context.fillStyle=spaceColor;
  context.fillRect(x,y,100,50);
  context.strokeRect(x,y,100,50);
  context.fillStyle="black";
  context.fillText(score[i].toString(),x+25,y+35);
}

function drawPowerChip()
{
  //PC
  context.fillStyle=offGreenC;
  context.fillRect(5,90,270,230);
  context.fillStyle="black";
  context.font="12pt Calibri"
  context.fillText("Click here to uses power chips",15,110);
  context.fillStyle="black";
  for(let i=0;i<3;i++)
  {
    context.fillStyle=goldC;
    context.beginPath();
    context.arc(60+(i*70),150,30, 50,0,2*Math.PI)
    context.fill();
    context.stroke();
    context.fillStyle="black";
    context.font="20pt Calibri";
    context.fillText(String.fromCodePoint(0x2660),48+(i*70),160);
    context.fillStyle="black";
    context.font="12pt Calibri"
    context.fillText("PC",48+(i*70),140);
    context.fillText("21",50+(i*70),175);
    context.font="20pt Calibri";
  }
}
function useChip()
{
  context.fillStyle=offGreenC;
  context.fillRect(230-(usedChips*70),115,110,80);
}
function drawScore(i)
{
  context.fillStyle=offWhiteC;
  context.fillRect(60,400,300,250);
  context.strokeRect(60,400,300,250);
  context.fillStyle="black";
  context.fillText("Cards Left: "+numCards,110,600);
  if(gameOver)
  {
    context.fillText("Game Over",110,450);
    drawStars();
    context.fillStyle="black";
    context.fillText("Final Score: " +totalScore,110,500);
  }
  else {
    if(catch21)
    {
      context.fillText("Catch 21!",150,450);
      catch21=false;
    }
    context.fillText("Score: " +totalScore,110,500);
  }
}

function makeCard(x,y)
{
  if(!noCards)
  {
    context.fillStyle="white";
    context.fillRect(x,y,60,100);
    context.strokeRect(x,y,60,100);


    if(deck[numCards-1].Suit=="S")
    {
      context.fillStyle="black";
      context.fillText(String.fromCodePoint(0x2660),x+20,y+60);
    }
    else if(deck[numCards-1].Suit=="C")
    {
      context.fillStyle="black";
      context.fillText(String.fromCodePoint(0x2663),x+20,y+60);
    }
    if(deck[numCards-1].Suit=="H")
    {
      context.fillStyle="red";
      context.fillText(String.fromCodePoint(0x2665), x+20,y+60);
    }
    else if(deck[numCards-1].Suit=="D")
    {
      context.fillStyle="red";
      context.fillText(String.fromCodePoint(0x2666) ,x+20,y+60);
    }

    if(cardDrawn==11)
    {
      context.fillText("J",x+10,y+25);
    }
    else if(cardDrawn==12)
    {
      context.fillText("Q",x+10,y+25);
    }
    else if(cardDrawn==13)
    {
      context.fillText("K",x+10,y+25);
    }
    else if(cardDrawn==1)
    {
      context.fillText("A",x+10,y+25);
    }
    else
    {
      context.fillText(cardDrawn.toString(),x+10,y+25);
    }
  }
  else {
    context.fillStyle=offGreenC;
    context.fillRect(x-5,y-5,70,110);
    context.fillStyle="black";
    context.fillText("Game Over",x-50,y+50);
  }
}
function drawStars()
{
  if(totalScore>3000)
  {
    stars=3;
  }
  else if(totalScore>2000)
  {
    stars=2;
  }
  else if(totalScore>1000)
  {
    stars=1;
  }

  context.fillStyle=goldC;
  for(let i=0;i<stars;i++)
  {
    context.fillText(String.fromCodePoint(0x2B50),150+(i*30),550);
  }
}
