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
        this.tileSize = 32;

        this.mapSize = {
            y: 10,
            x: 10
        };

        this.user = {
            position: {
                x: 100,
                y: 100
            }
        };

        this.urls= {
            tile:"https://i.imgur.com/fqG34pO.png",
            character: "https://i.imgur.com/ucwvhlh.png",
            sign:"https://i.imgur.com/NXIjxr8.png",
            bush:"https://i.imgur.com/wIK2b9P.png",
        } ; 

        this.images= {}
    }

    async initialize() {
        await this.loadImages();
        this.renderMap();
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

    renderMap() {
        for (let y = 0; y <= this.mapSize.y; y++) {
            for (let x = 0; x <= this.mapSize.x; x++) {
                context.background.drawImage(this.images.tile,
                                  x * this.tileSize, 
                                  y * this.tileSize);
            }
        }
    }

    renderEnvironment() {
        this.context.foreground.drawImage(this.images.bush, 150, 150);
        this.context.foreground.drawImage(this.images.sign, 150, 20);
    
        this.context.foreground.font = "16pt Helvetica";
        this.context.foreground.fillStyle = "white";
        this.context.foreground.fillText("Bienvenidx!", 170, 65);
    }

    renderCharacter() {
        this.context.foreground.drawImage(
            this.images.character,
            this.user.position.x,
            this.user.position.y
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
                case this.keys.arrowUp:
                case this.keys.wUp:
                    this.user.position.y -= this.tileSize;
                break;
                case this.keys.arrowDown:
                case this.keys.sDown:
                    this.user.position.y += this.tileSize;
                    break;
                case this.keys.arrowLeft:
                case this.keys.aLeft:
                    this.user.position.x -= this.tileSize;
                    break;
                case this.keys.arrowRight:
                case this.keys.dRight:
                    this.user.position.x += this.tileSize;
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