class Engine {
    constructor(context) {
        this.context = context;

        this.keys =  {
            arrowUp: 38,
            arrowDown: 40,
            arrowLeft: 37,
            arrowRight: 39,
            wUp: 87,
            aLeft: 65,
            sDown:83,
            dRight: 68
        };
        this.tileSize = 50;

        this.mapSize = {
            y: 10,
            x: 10
        };

        this.user = {
            position: {
                x: 0,
                y: 0
            },
            height: 50,
            width: 25
        };

        this.urls= {
            grass:"https://i.imgur.com/fqG34pO.png",
            character: "https://i.imgur.com/ucwvhlh.png",
            sign:"https://i.imgur.com/NXIjxr8.png",
            bush:"https://i.imgur.com/wIK2b9P.png",
            water:"https://i.imgur.com/4BZGw0M.png"
        } ; 

        this.images= {},
        this.map = []
    }

    async initialize() {
        await this.loadImages();
        await this.loadMap();
        await this.renderMap();
        this.renderEnvironment();
        this.renderCharacter();
    
        this.initializeKeys();
    }

    loadImage(src) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = src;
    
            image.onload = () => {
                resolve(image);
            };
            image.onerror = reject;
        });
    }

    async loadImages(){
        for (let key in this.urls) {
            const url = this.urls[key];

            const image = await this.loadImage(url);
            this.images[key]= image;
        }
    }
    async loadMap() {
        const response = await fetch("https://raw.githubusercontent.com/LucianABC/Jueguito/master/maps/city.json");
        this.map = await response.json();
    }

   async renderMap() {
        for (let y = 0; y <= this.mapSize.y -1; y++) {
            for (let x = 0; x <= this.mapSize.x -1; x++) {
                const tile = this.map[y][x];
                context.background.drawImage(this.images[tile.background],
                                  x * this.tileSize, 
                                  y * this.tileSize,
                                  this.images.character.height,
                                  this.images.character.height);
            }
        }
    }

    renderEnvironment() {
        this.context.foreground.drawImage(this.images.bush, 300, 170);
        this.context.foreground.drawImage(this.images.sign, 170, 20);
    
        this.context.foreground.font = "16pt Helvetica";
        this.context.foreground.fillStyle = "white";
        this.context.foreground.fillText("Bienvenidx!", 190, 80);
    }

    renderCharacter() {
        this.context.foreground.drawImage(
            this.images.character,
            this.user.position.x,
            this.user.position.y,
             
        );
    }
    
    clearCanvas() {
        this.context.foreground.clearRect(
            0,
            0,
            this.mapSize.x * this.tileSize,
            this.mapSize.y * this.tileSize
        );
    }
    initializeKeys() {
        document.addEventListener("keydown", e => { //e.keyCode nos va a dar el numero de la tecla que presionemos
            switch(e.keyCode){
                case this.keys.wUp:  
                case this.keys.arrowUp:
                    if (this.map[Math.round(this.user.position.y / this.tileSize - 1)][Math.round(this.user.position.x / this.tileSize)].block==false) {
                        this.user.position.y -= this.tileSize;
                    } else {
                        this.user.position.y -= 0
                    }
                    break;
                case this.keys.arrowDown:
                case this.keys.sDown:
                    if (this.map[Math.round(this.user.position.y / this.tileSize +1)][Math.round(this.user.position.x / this.tileSize)].block==false) {
                    this.user.position.y +=  this.tileSize; /*
                    } else if (this.map[(Math.round(this.user.position.y / this.tileSize) +2)][Math.round(this.user.position.x / this.tileSize)].block==true){
                        this.user.position.y +=  this.tileSize - (this-this.user.height - this.tileSize); */
                    } else {
                        this.user.position.y -= 0
                    }
                    break;
                case this.keys.aLeft:
                case this.keys.arrowLeft:
                    if (this.map[Math.round(this.user.position.y / this.tileSize)][Math.round(this.user.position.x / this.tileSize -1)].block==false) {
                       
                        this.user.position.x -=  this.tileSize; 
                    } else {
                        this.user.position.x -= 0
                    }
                    break;
                case this.keys.dRight:
                case this.keys.arrowRight:
                    if (this.map[Math.round(this.user.position.y / this.tileSize)][Math.round(this.user.position.x / this.tileSize +1)].block==false) {
                        this.user.position.x += this.tileSize;
                    } else {
                        this.user.position.x -= 0
                    }
                    break;
                default:
                    break;
            }
            this.clearCanvas();
            this.renderCharacter();
            this.renderEnvironment();
        });
    }
}

const background = document.getElementById("background");
const foreground = document.getElementById("foreground");

const context = {
    background: background.getContext("2d"),
    foreground: foreground.getContext("2d")
};

const engine = new Engine(context);
engine.initialize();