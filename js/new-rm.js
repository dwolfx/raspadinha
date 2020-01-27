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
var posX
var posY
var raio = 20
var porc = 0
var porcAtual

app.stage.addChild(renderTextureSprite);
raspar.mask = renderTextureSprite;

var brush = new PIXI.Graphics();
brush.beginFill(0xffffff);
brush.drawCircle(0, 0, raio);
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
        console.log(app.renderer.plugins.extract.pixels(raspar))
        brush.position.copyFrom(event.data.global);
        app.renderer.render(brush, renderTexture, false, null, false)
        posX = Math.round(event.data.global.x)
        posY = Math.round(event.data.global.y)
        //console.log(`Posição X = ${Math.round(posX)} | Posição Y = ${Math.round(posY)}`)
        // if(posY >= 87 && posY <= (235)){
        if((posX >= 19-raio && posX <= 276+raio) && (posY >= 108-raio && posY <= 210+raio)){
            porcAtual = 10
            if (porcAtual >= porc){
                console.log(`${porc}`)
                porc = porcAtual
                console.log(`${porc}`)
            }
        }
        
    }
}

function pointerDown(event) {
    dragging = true;
    pointerMove(event);
    console.log(dragging)    
}
function reveal(){
    console.log('entrou na funcao')
    dragging = false;
    interactive = false
    console.log(renderTexture)
    app.renderer.render(brush, renderTexture, false, null, false)
}
function pointerUp(event) {
    dragging = false;
    console.log(`Posição X = ${Math.round(posX)} | Posição Y = ${Math.round(posY)}`)
}
function pointerOut(event){
    console.log(dragging)
    console.log('saiu')
    reveal()
}