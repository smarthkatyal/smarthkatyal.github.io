function drawSensors(){
   push();
   fill(0,0,255);
   for(var i=0;i<coordsSensor.length;i++){
       var vect = createVector(coordsSensor[i][0],coordsSensor[i][1]);
       //console.log("Vector: "+vect);
       ellipse(coordsSensor[i][0],coordsSensor[i][1],15,15)
   }
   pop();
}

function drawLevels(){
  for(var num =0;num<coordsSensor.length;num++){
      var barWidth =  15;
      var barMargin = 8;// margin between two bars
       for(var i=0; i<level[num].length; i++) {
            push();
            fill(255,0,0);
            noStroke();
            translate(i* (barWidth + barMargin),0); // jump to the top right corner of the bar
            rect(coordsSensor[num][0]+25, coordsSensor[num][1], barWidth, level[num][i]*20 ); // draw rect
            fill(255,255,255);
            textSize(9);
            text(Math.round(level[num][i]*100)/100, coordsSensor[num][0]+25, coordsSensor[num][1]); // write data
            pop();
       }
     
   }
}


/**
 *  This function draws an arrow showing the direction in which "wind" is blowing.
 */
function drawVector(v,loc,scale){
    push();
    var arrowsize = 4;
    translate(loc.x,loc.y);
    stroke(255);
    rotate(v.heading());

    var len = v.mag() * scale;
    line(0,0,len,0);
    line(len,0,len-arrowsize,+arrowsize/2);
    line(len,0,len-arrowsize,-arrowsize/2);
    pop();
}
