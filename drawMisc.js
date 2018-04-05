function drawSensors(){
   push();
   fill(0,0,255);
   for(var i=0;i<coordsSensor.length;i++){
       ellipse(coordsSensor[i][0],height-coordsSensor[i][1],15,15)
       push();
       fill(255,255,255)
       text(i+1,coordsSensor[i][0],height-coordsSensor[i][1]+20);
       pop();
   }
   pop();
}

function drawLevels(){
  for(var num =0;num<coordsSensor.length;num++){
      var barWidth =  15;
      var barMargin = 8;// margin between two bars
       for(var i=0; i<level[num].length; i++) {
            push();
            if(i==0)
              fill(255, 230, 179);
            else if(i==1)
              fill(255, 170, 0);
            else if(i==2)
              fill(255, 85, 0);
            else if(i==3)
              fill(128, 85, 0);
            noStroke();
            translate(i* (barWidth + barMargin),0); // jump to the top right corner of the bar

            if(i==0){
              var scaledLevel = map(level[num][i],0,102,0,-300);
            }else if(i==1){
              var scaledLevel = map(level[num][i],0,11,0,-300);
            }else if(i ==2){
              var scaledLevel = map(level[num][i],0,16,0,-300);
            }
            else{
              var scaledLevel = map(level[num][i],0,101,0,-300);
            }
            rect(coordsSensor[num][0]+25, height-coordsSensor[num][1], barWidth, scaledLevel ); // draw rect
            fill(255,255,255);
            textSize(9);
            text(Math.round(level[num][i]*100)/100, coordsSensor[num][0]+25, height-coordsSensor[num][1]+10); // write data
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


function drawCompass(wind,speed,direction){
    text("North", 90 , 30, 200, 20);
    text("East", 160 , 100, 200, 20);
    text("West", 20 , 100, 200, 20);
    text("South", 90 , 170, 200, 20);
    // Draw an arrow representing the wind force
    drawVector(wind, createVector(100,110,0),speed*15);
    text("Wind Direction: "+ direction, 40 , 190, 200, 20);
    text("Wind Speed: "+ speed + " m/sec", 40 , 205, 200, 20);

}

function drawKey(){
    push();  
    //Outer Rectangle
    noFill();
    strokeWeight(2);
    stroke(255, 204, 100);
    rect(20, 230, 130, 170);
    
    //Key 1
    strokeWeight(1);
    fill(255, 230, 179)
    stroke(255, 255, 255);
    rect(25, 240, 20, 20);
    strokeWeight(0);
    text("AGOC-3A",50,260)
    
    //Key 2
    strokeWeight(1);
    fill(255, 170, 0)
    stroke(255, 255, 255);
    rect(25, 270, 20, 20);
    strokeWeight(0);
    text("Appluimonia",50,290)
    
    //Key 3
    strokeWeight(1);
    fill(255, 85, 0)
    stroke(255, 255, 255);
    rect(25, 300, 20, 20);
    strokeWeight(0);
    text("Chlorodinine",50,320)
    
    //Key 4
    strokeWeight(1);
    fill(128, 85, 0)
    stroke(255, 255, 255);
    rect(25, 330, 20, 20);
    strokeWeight(0);
    text("Methylosmolene",50,350)
    pop();
    
    //Key 5 for Sensors
    fill(0,0,255);
    ellipse(35,365,15,15)
    text("Sensor Locations",50,370)
    
    //Key 6 for factories
    fill(255,0,0);
    ellipse(35,385,15,15)
    text("Factory Locations",50,390)
}

function markFactoryPositions(coordsFactory){
  push();
   for(var i=0;i<coordsFactory.length;i++){
     fill(255,0,0);
     ellipse(coordsFactory[i][0],height-coordsFactory[i][1],35,35)
   }
  pop();
  
}
