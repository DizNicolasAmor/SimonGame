/*
SimonGame
- - - - - - - - - -
http://codepen.io/DizNicolasAmor/pen/ggEGjR 
Author:  Diz, Nicolás Amor (https://github.com/DizNicolasAmor)
This project is a challenge posed by FreeCodeCamp.
*/

$(document).ready(function(){
  var btns = [{active: "activeGreen" },
             {active: "activeRed" },
             {active: "activeYellow" },
             {active: "activeBlue" }];
  
  var randomSequence = [],
      playerSequence = [],
      count = 0,
      hard = false,
      gameOn = false,
      waitForInput=false,
  
      firstGame=true; 

/* Bug fixed:  when I press start more than once, the function receivePlayerInput(); is called again and again. So, when I press a color, playerSequence pushes duplicate id. 
The solution is to create a boolean called firstGame=true; 
In function main(), if  firstGame=true --> call receivePlayerInput();   and then firstGame=false; 
So now, receivePlayerInput(); is called only one time. */

  
  /* - - - - - functions - - - - -  */ 
  
  //reset()
  function reset() {
    randomSequence = [];
    playerSequence = [];
    count = 0;
    hard = false;
    gameOn = false;
    $("#count").text("- -");
    $("#mode").text("EASY");
    $("#start").text("START");
  }

  //highlight
  function highlightBtn(id) {
    $('#'+id).addClass(btns[id].active);
    setTimeout(function(){       //wait some time and return to original color
      $('#'+id).removeClass(btns[id].active);
    }, 300);
  }

  //playSequence
  function playSequence() {
    //show number in count
    $("#count").text(count < 10 ? "0" + count : count); //zeropad 

    //reproduce the seq and highlight the buttons
    var i = 0;
    var interval = setInterval(function() {
      highlightBtn(randomSequence[i]); 
      i++;
      if (i >= randomSequence.length) {
        clearInterval(interval);
      }
    }, 600);
    
    playerSequence = []; //clear player input  
    waitForInput=false;
    console.log('Machine: '+randomSequence);         //to check
  }

  //randomGenerator
  function randomGenerator() {
    count++;
    randomSequence.push(Math.floor(Math.random() * 4));  
  }

  //receive player input
  function receivePlayerInput(){
    if(gameOn===true){
      for(var j=0; j<randomSequence.length; j++){
        $(".gameButton").click(function() {
          var selectedIdColor = $(this).attr("id");
          playerSequence.push(selectedIdColor);
          highlightBtn(selectedIdColor);
          
          console.log('User: '+playerSequence);  //to check
        });
      }
    }
    waitForInput=true;
  }

  //checkPlayerInput
  //Note: PS -> playerSequence
  function checkPlayerInput(PS) {
    console.log('Cheking the input...');                  //to check
    if (randomSequence.join('') !== playerSequence.join('') ){
      console.log('Input wrong.');                  //to check
      $("#count").text("X");
      setTimeout(function() { // wait 2 sec, then reset or repeat seqence
        if (hard === true) {
          $("#endGame").removeClass('hide');
          $("#gameResult").html('You lose!');
        }else{
          playerSequence = [];
          playSequence();
        }
      }, 2000);
    }else{
      /*  check win  */    
      if (count >= 20) {
      // modal
        $("#endGame").removeClass('hide');
        $("#gameResult").html('You win!');
      }else{
        /* if input right && not win && mode=easy --> repeat sequence and add color */
        console.log('Input right. ');                  //to check
        randomGenerator();
        playSequence();
      }
    }
  }  //checkPlayerInput
  
  //main
  function main(){
    //generate first challenge
    randomGenerator();
    playSequence();
    
    if(firstGame){
      receivePlayerInput();
    }
    firstGame=false; 
  }
   

  /* - - - - - buttons - - - - -  */ 
  
  //start button
  $('#start').click(function() {
    var startText = $('#start').text();
    if(startText === 'START'){
      gameOn=true;
      $('#start').html('DONE');
      main();
    }else if(startText === 'DONE'){
      checkPlayerInput(playerSequence);
      //checkPlayerInput calls randomGenertor() or playSequence() or reset() 
    }
  });

  //reset
  $('#reset').click(function(){
    reset();
    $('#start').html('START');
  });
  
  //mode button
  $('#mode').click(function() {
    var modeText = $('#mode').text();
    if(modeText === 'EASY'){
      $('#mode').html('HARD');
      hard=true;
    }else if(modeText === 'HARD'){
      $('#mode').html('EASY');
      hard=false;
    }
  });

  //  play Again button: 
  $('#playAgain').click(function(){
    reset();
    $("#endGame").addClass('hide');
  });
  

});
