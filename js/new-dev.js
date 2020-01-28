
var WIDTH = 200;
var HEIGHT = 270;
var TOP_X = 150;
var TOP_Y = 350;
var BYTES_PER_PIXEL = 4;
var REVEAL_PERCENTAGE = 60;
var RADIUS = 20;
var URL = 'https://g1.globo.com';

var dragging = true;

var app = new PIXI.Application({
  width: 300,
  height: 600,
  backgroundColor: 0xc1c1c1
});
document.body.appendChild(app.view);

var background = PIXI.Sprite.from('../images/bg-ifoods.png');

app.stage.addChild(background);

var scratch = PIXI.Sprite.from('../images/raspar.png');

app.stage.addChild(scratch);
scratch.anchor.set(0.5);
scratch.position.x = TOP_X;
scratch.position.y = TOP_Y;

var renderTexture = PIXI.RenderTexture.create(WIDTH, HEIGHT);
var renderTextureSprite = new PIXI.Sprite(renderTexture);

app.stage.addChild(renderTextureSprite);
renderTextureSprite.anchor.set(0.5);
renderTextureSprite.position.x = TOP_X;
renderTextureSprite.position.y = TOP_Y;
scratch.mask = renderTextureSprite;

var brush = new PIXI.Graphics();
brush.beginFill(0xffffff);
brush.drawCircle(0, 0, RADIUS);
brush.endFill();

app.stage.interactive = true;
app.stage.on('pointermove', pointerMove);

function pointerMove(event) {
  if (!dragging) return;

  var pos = event.data.getLocalPosition(renderTextureSprite);
  var x = (pos.x + TOP_X) - RADIUS * 2.5;
  var y = (pos.y + TOP_Y / 2) - RADIUS * 2;

  brush.position.copyFrom({ x: x, y: y });

  app.renderer.render(brush, renderTexture, false, null, false);

  if (getPaintedPercentage(renderTexture) >= REVEAL_PERCENTAGE) {
    dragging = false;
    reveal(renderTexture);
  }
}

function getPaintedPercentage(renderTexture) {
  var pixels = app.renderer.plugins.extract.pixels(renderTexture);
  var total = pixels.length / BYTES_PER_PIXEL;
  var sum = 0;

  for (var i = 0; i < pixels.length; i += BYTES_PER_PIXEL) {
    if (pixels[i + 3] === 255) {
      sum++;
    }
  }

  return Math.round(sum * 100 / total);
}

function reveal(renderTexture) {
  var rect = new PIXI.Graphics();

  rect.beginFill(0xffffff);
  rect.drawRect(0, 0, app.screen.width, app.screen.height);
  rect.endFill();
  
  app.renderer.render(rect, renderTexture, false, null, false);

  var click = document.createElement('a');
  click.href = URL;
  click.target = '_blank';
  
  var div = document.createElement('div');
  div.style.width = '100vw';
  div.style.height = '100vh';
  div.style.position = 'fixed';
  div.style.top = '0';
  div.style.left = '0';

  click.appendChild(div);
  document.body.appendChild(click);
  
}
