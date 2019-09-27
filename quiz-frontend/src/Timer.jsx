import React from 'react';



const Timer = ({min, sec, stop}) => {
    var total = (min * 60 ) + Number(sec);
    // Update the count down every 1 second
    var x = setInterval(function() {
        if(!document.forms[0]) {
            clearInterval(x);
            return;
        }
      //calculations for minutes and seconds
      var minutes = Math.floor((total % (60 * 60)) / 60);
      var seconds = Math.floor((total % (60)));
      
      var secondsDisplay = seconds > 10 ? seconds : '0'+seconds;
      var minutesDisplay = minutes > 10 ? minutes : '0'+minutes;
        
      // Output the result in an element with id="demo"
      document.getElementById("countdown").innerHTML = minutesDisplay + ":" + secondsDisplay;
       total--;
      // If the count down is over, auto submit
      if (total < 0) {
        clearInterval(x);
        stop()
      }
     
    }, 1000);
    return (
        <div id="countdown"></div> 
    )
}

export default Timer;
