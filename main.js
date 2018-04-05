
// texture for the particle
var particle_texture = null;
var background_img = null;
var wind_table =null;
// variable holding our particle system
var coordsSensor = [
  [62,21],
  [66,35],
  [76,41],
  [88,45],
  [103,43],
  [102,22],
  [89,3],
  [74,7],
  [119,42]
];

var coordsFactory = [
  [89,27,'Roadrunner Fitness Electronics'],
  [90,21,'Kasios Office Furniture'],
  [109,26,'Radiance ColourTek'],
  [120,22,'Indigo Sol Boards']
];

var level = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
];
var count =4;
var ps = new Array(9);
var slider;
var playFlag = 0;
var playspeed = 0.1;
function preload() {
    background_img = loadImage("assets/background.png");
    particle_texture = loadImage("assets/particle_texture.png");
    compass = loadImage("assets/compass.png");
    wind_table = loadTable('assets/MeteorologicalData.csv', 'csv', 'header');
    sensor_table = loadTable('assets/SensorData.csv', 'csv', 'header');
    //console.log(wind_table);
}

function setup() {

    //set the canvas size
    createCanvas(1000,500);
    slider = createSlider(0, 706, 0,0.1);
    slider.position(145, 470);
    slider.style('width', '707px');
    
    playbutton = createButton('Play');
    playbutton.position(30, 420);
    playbutton.mousePressed(play);
    
    pausebutton = createButton('Pause');
    pausebutton.position(75, 420);
    pausebutton.mousePressed(pause);
    
    slowspeed = createButton('Slower');
    slowspeed.position(20, 450);
    slowspeed.mousePressed(slow);
    
    fastbutton = createButton('Faster');
    fastbutton.position(80, 450);
    fastbutton.mousePressed(fast);
    
    
    
    //console.log(coordsSensor);
    for(var i=0;i<coordsFactory.length;i++){
       coordsFactory[i][0] = map(coordsFactory[i][0],40,130,0,1000);
       coordsFactory[i][1] = map(coordsFactory[i][1],-10,55,0,500);
    }
   for(var i=0;i<coordsSensor.length;i++){
       coordsSensor[i][0] = map(coordsSensor[i][0],40,130,0,1000);
       coordsSensor[i][1] = map(coordsSensor[i][1],-10,55,0,500);
    }
    //console.log(coordsFactory);
    //initialize our particle system
    //ps = new ParticleSystem(0,createVector(width / 2, height - 60),particle_texture);
    for(var i=0;i<count;i++){
      ps[i] = new ParticleSystem(i,createVector(coordsFactory[i][0], coordsFactory[i][1]),particle_texture);
    }
    
    //Calculate Levels
    //for(var index1=1;index1<wind_table.getRowCount();index1++)

}

function draw() {
    background(0);
    var dx = map(mouseX,0,width,-0.2,0.2);
    var dy = map(mouseY,0,height,-0.4,0.4);
    //get angle in radians from degree
    //var angle = radians(Number(weather.current.wind_degree));
    //create vector
    //p5.Vector.fromAngle(124);
    //var wind = createVector(dx,dy);
    
    drawSensors();
    var index = slider.value();
    //console.log(wind_table[0][0]);
    var date = Date.parse(wind_table.getString(round(index),0))
    var temp;
    console.log(date);
    for(var index2=0;index2<sensor_table.getRowCount();index2++){
        if(Date.parse(sensor_table.getString(index2,2))==date){
          if(sensor_table.getString(index2,0)=='AGOC-3A')
            level[sensor_table.getString(index2,1)-1][0]=sensor_table.getString(index2,3);
          else if(sensor_table.getString(index2,0)=='Appluimonia')
            level[sensor_table.getString(index2,1)-1][1]=sensor_table.getString(index2,3);
          else if(sensor_table.getString(index2,0)=='Chlorodinine')
            level[sensor_table.getString(index2,1)-1][2]=sensor_table.getString(index2,3);
          else if(sensor_table.getString(index2,0)=='Methylosmolene')
            level[sensor_table.getString(index2,1)-1][3]=sensor_table.getString(index2,3);
          else
            console.log("Unidentified "+index2 +" Date: "+date);
        }
    }
    
    drawLevels();
    if(playFlag ==1
       &&index+playspeed>=0 
       && index+playspeed<=705){
         index=index+playspeed;
    }
    index=Math.round(index*10)/10;
    text("Speed: "+ playspeed ,50 , 480,200, 20);
    //console.log("Index: "+index);
    slider.value(index);
    var direction = wind_table.getString(round(index),1);
    var speed = wind_table.getString(round(index),2);
    //console.log("Direction from table:"+direction);
    var angle = radians(Number(direction - 90));
    //console.log("Angle: "+angle);
    var wind = p5.Vector.fromAngle(angle);
   // console.log("Wind vector"+wind);
    
    for(var j=0;j<count;j++){
      ps[j].applyForce(wind);
      ps[j].setDensity(round(speed*30));
      ps[j].run();
      for (var i = 0; i < round(speed); i++) {
          ps[j].addParticle();
          ps[j].addParticle();
      }
      fill(255,255,0);
      text(coordsFactory[j][2], coordsFactory[j][0], coordsFactory[j][1]+10,200, 20);
    }
    fill(255,255,255);
    //image(compass, 0, height/2, compass.width/2, compass.height/2);
    //Mark compass directions
    text("North", 200 , 280, 200, 20);
    text("East", 270 , 350, 200, 20);
    text("West", 130 , 350, 200, 20);
    text("South", 200 , 420, 200, 20);
    // Draw an arrow representing the wind force
    drawVector(wind, createVector(210,360,0),speed*15);
    text("Wind Direction: "+ direction, 150 , 435, 200, 20);
    text("Wind Speed: "+ speed + " m/sec", 150 , 450, 200, 20);
      
}
