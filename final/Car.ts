class Car {
    private image: HTMLImageElement;
    private _name: string;
    private _distance: number;
    private _xPosition: number;
    private _yPosition: number;

    //added
    //private _upgrade: number;


    constructor(name:string, colour:string, xPos:number, yPos:number) {
        this._xPosition = xPos;
        this._yPosition = yPos;
        this._name = name;
        this.image = this.loadNewImage(`./assets/img/${colour}-racing-car.png`);
        //this._upgrade = 0;
        //console.log(this.image);
    }

    public set distance(distanceRaced : number) {
        this._distance = distanceRaced;
    }
    
    public get distance() : number {
        return this._distance;
    }

    public get xPostition() : number {
        return this._xPosition;
    }

    public get yPostition() : number {
        return this._yPosition;
    }

    public get name() : string {
        return this._name;
    }

    // public set upgrade(newUpgrade:number){
    //     this._upgrade = newUpgrade;
    // }

    // public get upgrade():number{
    //     return this._upgrade;
    // }
    
    /**
    * Draw all the necessary items to the screen
    */
    public draw(ctx:CanvasRenderingContext2D) {
        // draw player
        //console.log(ctx);
        ctx.drawImage(this.image, this._xPosition, this._yPosition);
    }

    public move(){
        this._xPosition += 10;
    }
    
    /**
    * Method to load an image
    * @param {HTMLImageElement} source
    * @return HTMLImageElement - returns an image
    */
    private loadNewImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
    }
}