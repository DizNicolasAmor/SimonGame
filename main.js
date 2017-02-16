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
      waitForInput=false;
  
  
  /* - - - - - functions - - - - -  */ 
  
  //reset()
  function reset() {
    randomSequence = [];
    playerSequence = [];
    count = 0;
    hard = false;
    gameOn = false;
    $("#count").text("COUNT");
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
      $("#count").text("!!");
      setTimeout(function() { // wait 2 sec, then reset or repeat seqence
        if (hard === true) {
          reset();
          $('#start').html('START');
        }else{
          playerSequence = [];
          playSequence();
        }
      }, 2000);
    }else{
      console.log('Input right. ');                  //to check
      randomGenerator();
      playSequence();
      
      /*  check win
      
      if (count >= 20) {
      // modal like tic tac toe
      //text('You win!')
      //button Play again?
      $("#modalScreen").removeClass('hide');
      } else{}         */
      
    }
  }  //checkPlayerInput
  
  //main
  function main(){
    //generate first challenge
    randomGenerator();
    playSequence();
    receivePlayerInput();
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

  /* //  play Again button: 
  $('#playAgain').click(function(){
    reset();
    $("#modalScreen").addClass('hide');
  });
  */

});
