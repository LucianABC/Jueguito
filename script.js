const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

//imagenes
const urlTile = 'https://i.imgur.com/fqG34pO.png';
const urlCharacter = "https://i.imgur.com/ucwvhlh.png";
const urlSign= "https://i.imgur.com/NXIjxr8.png";
const urlBush= " https://i.imgur.com/wIK2b9P.png";

const mapSize = {
    y: 10,
    x: 10
};

const tileSize = 32;

const user = {
    position: {
        x: 100,
        y: 100
    }
};

const keys = {
    arrowUp: 38,
    arrowDown: 40,
    arrowLeft: 37,
    arrowRight: 39,
    wUp: 87,
    aLeft: 65,
    sDown:83,
    dRight: 68
};

//funcio

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = src;

        image.onload = () => {
            resolve(image);
        };
        image.onerror = reject;
    });
}

async function renderMap() {
    const imageTile = await loadImage(urlTile);
    const imageCharacter = await loadImage(urlCharacter);
    const imageSign = await loadImage(urlSign);
    const imageBush = await loadImage(urlBush);
    //pastito
    for (let y = 0; y <= mapSize.y; y++) {
        for (let x = 0; x <= mapSize.x; x++) {
            context.drawImage(imageTile, x * tileSize, y * tileSize);
        }
    }
    context.drawImage(imageCharacter, 100, 100);//pj
    context.drawImage(imageBush, 90, 160);//arbol
    context.drawImage(imageSign, 140,15)//cartel

    context.font = "16pt Calibri";
    context.fillStyle ="white";
    context.fillText("Bienvenidx!", 165,70);

    document.addEventListener("keydown", e => { //e.keyCode nos va a dar el numero de la tecla que presionemos
        switch(e.keyCode){
            case keys.arrowUp:
            case keys.wUp:
                user.position.y -= tileSize;
            break;
            case keys.arrowDown:
            case keys.sDown:
                user.position.y += tileSize;
                break;
            case keys.arrowLeft:
            case keys.aLeft:
                user.position.x -= tileSize;
                break;
            case keys.arrowRight:
            case keys.dRight:
                user.position.x += tileSize;
                break;
            default:
                break;
        }
        context.drawImage(imageCharacter, user.position.x, user.position.y);
});
}

renderMap();



