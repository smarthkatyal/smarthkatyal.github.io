
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
      ps[i] = new ParticleSystem(i,createVector(coordsFactory[i][0], height-coordsFactory[i][1]),particle_texture);
    }
    
    //Calculate Levels
    //for(var index1=1;index1<wind_table.getRowCount();index1++)
    createP('This visualization has been created as part of CS7DS4 - Data Visualization by Smarth Katyal(17306092)');
    createP('For information & questions about this visualization please email katyals@tcd.ie');
    createP('Code location: https://github.com/smarthkatyal/smarthkatyal.github.io');
}

function draw() { 
    background(0);
    drawSensors();
    markFactoryPositions(coordsFactory);
    var index = slider.value();
    var date = Date.parse(wind_table.getString(round(index),0))
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
    drawKey();
    if(playFlag ==1
       &&index+playspeed>=0 
       && index+playspeed<=705){
         index=index+playspeed;
    }
    index=Math.round(index*10)/10;
    text("Speed: "+ playspeed +" x " ,50 , 480,200, 20);
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
      text(coordsFactory[j][2], coordsFactory[j][0]-20, height-coordsFactory[j][1]-20,200, 20);
    }
    fill(255,255,255);
    //image(compass, 0, height/2, compass.width/2, compass.height/2);
    //Mark compass directions
    var dt=wind_table.getString(round(index),0)
    drawCompass(wind,speed,direction,dt);
    drawPanels(index);
    
}
