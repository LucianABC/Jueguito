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
    context.drawImage(imageCharacter, 70, 70);//pj
    context.drawImage(imageBush, 90, 150);//arbol
    context.drawImage(imageSign, 140,15)//cartel

    context.font = "16pt Calibri";
    context.fillStyle ="white";
    context.fillText("Bienvenidx!", 165,70);
}

renderMap();



