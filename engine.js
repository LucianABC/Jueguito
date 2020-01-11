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
        for (let key of this.urls) {
            const url = this.urls[key];

            const image = await this.loadImage(url);
            this.images[key]= image;
        }
    }

    renderMap() {
        for (let y = 0; y <= this.mapSize.y; y++) {
            for (let x = 0; x <= this.mapSize.x; x++) {
                context.drawImage(this.images.tile,
                                  x * this.tileSize, 
                                  y * this.tileSize);
            }
        }
    }

    renderEnvironment() {
        this.context.drawImage(this.images.tree, 150, 150);
        this.context.drawImage(this.images.poster, 150, 20);
    
        this.context.font = "12pt Helvetica";
        this.context.fillStyle = "white";
        this.context.fillText("Bienvenidx!", 190, 45);
    }
}