	var SQ_X=20; // begining of square
	var SQ_Y=20; // begining of square
	var SQ_W=600; // width of square
	var SQ_H=100; // height of square
	var SQ_R=3; //roundness of square (aethtetics)
	var PROX_T=11;

	// inputs:
	var TRUE_RATIO=30; // input 
	var IS_FEEDBACK=true; //give feedback?

	var WAIT_TIME=2000; // in between trials wait time
	var MAX_TIME_TRIAL=10*1000;
	var MAX_REPATS=3;   // maximal number of repetiotions to try find correct response
	
	var DEBUG=true; // plot internal variables (for debug puropose)

	// outputs:
	var results=[]; //output list
	var result;    //the final output (NaN if incorrect)
	var repeats=0; //number of repeats
	var reactionTime=0;

	var timeStarted;

	var stage; // global variable holding the stage (canvas)
	//var d = new Date();

        function init() {
            stage = new createjs.Stage("demoCanvas");

            var square = new createjs.Shape();
			square.graphics.setStrokeStyle(2).beginStroke("black").beginFill("gray").drawRoundRect(SQ_X, SQ_Y, SQ_W, SQ_H,SQ_R,SQ_R,SQ_R,SQ_R);
			stage.addChild(square);
			stage.update();
			timeStarted=performance.now();
			square.addEventListener("click", handleClick);
		 	document.getElementById("Target").innerHTML= "Target: "+ TRUE_RATIO + " % ";
			document.getElementById("Target").style.color = "green";
			document.getElementById("Feedback").style.color = "black";
			document.getElementById("Feedback").innerHTML="Segment the square according to the target's percentage:"
			currentRepeat=repeats;
			setInterval(function(){timeOver(currentRepeat)},MAX_TIME_TRIAL);
         }

         function timeOver(current_repeat) {
         	if (current_repeat!=repeats){return;}
            document.getElementById("Feedback").innerHTML= "Time over! You only have " + Math.round(MAX_TIME_TRIAL/1000) + " seconds to complete the trial!";
			document.getElementById("Feedback").style.color = "red";
			result=NaN;results.push(result);
			
			reactionTime=performance.now()-timeStarted;
		    var square = new createjs.Shape(); 
			square.graphics.setStrokeStyle(5).beginStroke("red").beginFill("gray").drawRoundRect(SQ_X, SQ_Y, SQ_W, SQ_H,SQ_R,SQ_R,SQ_R,SQ_R);
		    stage.addChild(square);
  		    stage.update();
         }

		  // Click happenened
         function handleClick(event){
  		   
  		   reactionTime=performance.now()-timeStarted;

  		   res_x= event.stageX-SQ_X;
  		   res_xr=Math.round(100*(res_x - SQ_X)/SQ_W);
  		   true_xr=TRUE_RATIO;
  		   true_x=SQ_W*true_xr/100;
  		   var isCorrect=false;
  		   results.push(res_xr);

  		   if (Math.abs(res_xr-true_xr)<PROX_T) {
  		   	isCorrect=true;
  		   	result=res_xr; 
  		   } else {
  		   	result=NaN;
  		   }
  		   repeats=repeats+1;


  		   var square = new createjs.Shape(); // this will paint over original square also will not allow furhter clicking (hide square)
  		   if (isCorrect) {
	  		   square.graphics.setStrokeStyle(3).beginStroke("green").beginFill("gray").drawRoundRect(SQ_X, SQ_Y, SQ_W, SQ_H,SQ_R,SQ_R,SQ_R,SQ_R);
	  		}
	  		else {
	  			square.graphics.setStrokeStyle(5).beginStroke("red").beginFill("gray").drawRoundRect(SQ_X, SQ_Y, SQ_W, SQ_H,SQ_R,SQ_R,SQ_R,SQ_R);
	  		}
	
  		   var res_square = new createjs.Shape();
  		   res_square.graphics.beginStroke("white").beginFill("white").drawRect(SQ_X+res_x, SQ_Y+2, 3, SQ_H-4);
		   
		   var true_square = new createjs.Shape();
  		   true_square.graphics.beginStroke("green").beginFill("green").drawRect(SQ_X+true_x, SQ_Y+1, 1, SQ_H-2);
  		   stage.addChild(square);
		   stage.addChild(res_square);

		   if (IS_FEEDBACK) {stage.addChild(true_square);}
  		   
		   stage.update();

		   if (IS_FEEDBACK) {
			   if (isCorrect) {
				   document.getElementById("Feedback").innerHTML= "You clicked: " + res_xr + " %";

			   } else {
	     		   document.getElementById("Feedback").innerHTML= "You clicked: " + res_xr + " %" + ". This is not accurate enought. Let's try again...";
			   	   document.getElementById("Feedback").style.color = "red";
			   }
		    } else {
		    	 if (isCorrect) {
				   document.getElementById("Feedback").innerHTML= "Trial OK.";
				    document.getElementById("Feedback").style.color = "green";

			   } else {
	     		   document.getElementById("Feedback").innerHTML= "This is not accurate enought. Let's try again...";
			   	   document.getElementById("Feedback").style.color = "red";
			   }

		    }
		  
		   document.getElementById("Target").innerHTML= "Target: " + true_xr + " %";
		   document.getElementById("Target").innerHTML= "Target: " + TRUE_RATIO + " % ";
		   setTimeout(function(){
		   	if (repeats<MAX_REPATS) {
		   		if (!isCorrect) {init();}
		   	}
			    
		   }, WAIT_TIME);
		   document.getElementById("Debug").innerHTML= "Results: " + results.toString() + " Result: " + result + 
		   " Repeats: " + repeats +"/" + MAX_REPATS + "reaction time: " + reactionTime;
		 }