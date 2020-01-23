var app = new PIXI.Application({
  width: 300,
  height: 250,
  backgroundColor: 0xff8000
})
document.body.appendChild(app.view);

var background = PIXI.Sprite.from("../images/new-ifoods-rm.png")
var raspar = PIXI.Sprite.from("../images/new-raspar-rm.png")
app.stage.addChild(background)
app.stage.addChild(raspar)
raspar.anchor.set(0.5);
raspar.position.x = 150;
raspar.position.y = 160;
var renderTexture = PIXI.RenderTexture.create(app.screen.width, app.screen.height);
var renderTextureSprite = new PIXI.Sprite(renderTexture);

app.stage.addChild(renderTextureSprite);
raspar.mask = renderTextureSprite;

var brush = new PIXI.Graphics();
brush.beginFill(0xffffff);
brush.drawCircle(0, 0, 25);
brush.endFill();

app.stage.interactive = true;
app.stage.on('pointerdown', pointerDown);
app.stage.on('pointerup', pointerUp);
app.stage.on('pointermove', pointerMove);

var dragging = false;
function pointerMove(event) {
    if (dragging) {
        brush.position.copyFrom(event.data.global);
        app.renderer.render(brush, renderTexture, false, null, false)
    }
}

function pointerDown(event) {
    dragging = true;
    pointerMove(event);
}

function pointerUp(event) {
    dragging = false;
    console.log(app.renderer.extract)
}