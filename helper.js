function play() {
  playFlag=1;
}

function pause() {
  playFlag=0;
}

function slow() {
  playspeed=(Math.round(playspeed*10)/10)-0.1;
}

function fast() {
  playspeed=(Math.round(playspeed*10)/10)+0.1;
}
