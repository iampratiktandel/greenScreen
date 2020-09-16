let fgImage = null;
let bgImage = null;
let fgCanvas, bgCanvas;

function loadForegroundImage() {
  fgCanvas = document.getElementById('fgCan');
  let fgInput = document.getElementById('fgInput');   
  
  fgImage = new SimpleImage(fgInput);
  fgImage.drawTo(fgCanvas); 
}

function loadBackgroundImage() {
  bgCanvas = document.getElementById('bgCan');
  let bgInput = document.getElementById('bgInput');
  
  bgImage = new SimpleImage(bgInput);
  bgImage.drawTo(bgCanvas);
}

function doComposite() {
  let output = new SimpleImage(fgImage.getWidth(),fgImage.getHeight());
  let greenThreshold = 240;
  for (let pixel of fgImage.values()) {
    let x = pixel.getX();
    let y = pixel.getY();
    let bgPixel = bgImage.getPixel(x,y);
    
    if(pixel.getGreen() > greenThreshold) {
      output.setPixel(x,y,bgPixel);
    } 
    else {
      output.setPixel(x,y,pixel);
    }
  }
  return output;
}

function doGreenScreen() {
  if (fgImage == null  || !fgImage.complete()) {
    alert("Foreground image not loaded");
  }
  if (bgImage == null || !bgImage.complete()) {
    alert("Background image not loaded");
  }
  clearCanvas();
  
  let finalImage = doComposite();
  finalImage.drawTo(fgCanvas);
}

function doClear(canvas) {
  let ctx = canvas.getContext("2d");
  
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

function clearCanvas() {
  doClear(fgCanvas);
  doClear(bgCanvas);
}