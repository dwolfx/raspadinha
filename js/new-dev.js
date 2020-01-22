var app = new PIXI.Application({
  width: 300,
  height: 600,
  backgroundColor: 0xc1c1c1
})
document.body.appendChild(app.view);

var background = PIXI.Sprite.from("../images/bg-ifoods.png")
var raspar = PIXI.Sprite.from("../images/raspar.png")
app.stage.addChild(background)
app.stage.addChild(raspar)
raspar.anchor.set(0.5);
raspar.position.x = 150;
raspar.position.y = 350;
var renderTexture = PIXI.RenderTexture.create(app.screen.width, app.screen.height);
var renderTextureSprite = new PIXI.Sprite(renderTexture);

app.stage.addChild(renderTextureSprite);
raspar.mask = renderTextureSprite;

var brush = new PIXI.Graphics();
brush.beginFill(0xbbffff);
brush.drawCircle(0, 0, 30);
brush.endFill();

app.stage.interactive = true;
app.stage.on('pointerdown', pointerDown);
app.stage.on('pointerup', pointerUp);
app.stage.on('pointermove', pointerMove);

var dragging = false;

function pointerMove(event) {
    if (dragging) {
      console.log(event.data.global)
        brush.position.copyFrom(event.data.global);
        app.renderer.render(brush, renderTexture, false, null, false);
    }
}

function pointerDown(event) {
  console.log('clicou')
    dragging = true;
    pointerMove(event);
}

function pointerUp(event) {
  console.log('soltou')
    dragging = false;
}