var app = new PIXI.Application({
  width: 300,
  height: 250,
  backgroundColor: 0xff8000
})
document.body.appendChild(app.view);

var WIDTH = 270;
var HEIGHT = 110;
var TOP_X = 150;
var TOP_Y = 160;
var BYTES_PER_PIXEL = 4;
var REVEAL_PERCENTAGE = 75;
var background = PIXI.Sprite.from("../images/new-ifoods-rm.png")
var scratch = PIXI.Sprite.from("../images/new-raspar-rm.png")

app.stage.addChild(background)
app.stage.addChild(scratch)
scratch.anchor.set(0.5);
scratch.position.x = TOP_X;
scratch.position.y = TOP_Y;
var renderTexture = PIXI.RenderTexture.create(WIDTH, HEIGHT);
var renderTextureSprite = new PIXI.Sprite(renderTexture);

var posX
var posY
var radius = 20;
var porc = 0
var porcAtual

app.stage.addChild(renderTextureSprite);
renderTextureSprite.anchor.set(0.5);
renderTextureSprite.position.x = TOP_X;
renderTextureSprite.position.y = TOP_Y;
scratch.mask = renderTextureSprite;

var brush = new PIXI.Graphics();
brush.beginFill(0xffffff);
brush.drawCircle(0, 0, radius);
brush.endFill();

app.stage.interactive = true;
app.stage.on('pointerover', pointerDown);
app.stage.on('pointerdown', pointerDown);
app.stage.on('pointerup', pointerUp);
app.stage.on('pointermove', pointerMove);
app.stage.on('pointerout', pointerOut);
app.stage.on('pointeroutside', pointerOut);

var dragging = false;
function pointerMove(event) {
    if (dragging) {
        var pos = event.data.getLocalPosition(renderTextureSprite);
        var x = (pos.x + TOP_X) - radius/2;
        var y = (pos.y + TOP_Y/2) - radius;
        
        brush.position.copyFrom({ x: x, y: y });

        app.renderer.render(brush, renderTexture, false, null, false);

        posX = Math.round(event.data.global.x)
        posY = Math.round(event.data.global.y)
        if(getPaintedPercentage(renderTexture) >= REVEAL_PERCENTAGE){
            reveal()
        }
        
    }
}

function getPaintedPercentage(renderTexture) {    
    var pixels = app.renderer.plugins.extract.pixels(renderTexture);
    var total = pixels.length / BYTES_PER_PIXEL; 
    var sum = 0;

    for (var i = 0; i < pixels.length; i += BYTES_PER_PIXEL) {
        if (pixels[i+3] === 255) {
            sum++;
        }
    }

    return Math.round(sum * 100 / total);
}

function debounce(func, wait, immediate) {
    var timeout;
    
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function pointerDown(event) {
    dragging = true;
    pointerMove(event);
    console.log(dragging);    
}

function reveal(){
    console.log('entrou no reveal')
}

function pointerUp(event) {
    dragging = false;
}

function pointerOut(event){
    reveal();
}