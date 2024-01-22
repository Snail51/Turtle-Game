import { Point, Color, Sleep, ImageProcessor } from "./AbstractLib";

export default class Turtle
{
    constructor(name, center, rotation, canvasStack)
    {
        this.name = name;
        this.position = center;
        this.rotation = rotation;
        this.color = "red";
        this.origin = new Point(center.x, center.y);
        this.canvasStack = canvasStack;
        this.sleepLength = 10;

        this.map = new Image();
        this.map.src = "./Resources/map.bmp";

        console.log(this);

    }

    reset()
    {
        this.position = this.origin;
        this.canvasStack.layer(3).beginPath();
        this.canvasStack.layer(3).clearRect(0, 0, this.canvasStack.layer(3).canvas.width, this.canvasStack.layer(3).canvas.height);

        this.canvasStack.layer(1).drawImage(this.map, 0, 0);
    }

    setColor(colorName)
    {
        this.color = colorName;
    }

    getColorUnderMe()
    {
        return this.canvasStack.getPixel(this.position);
    }

    drawSelf()
    {
        //draw the turtle
        this.canvasStack.layer(3).fillStyle = this.color;
        this.canvasStack.layer(3).beginPath();
        this.canvasStack.layer(3).arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI);
        this.canvasStack.layer(3).fill();

        //remove a radius of fog around the turtle
        this.cutoutFog();
    }

    cutoutFog()
    {
        this.canvasStack.layer(4).beginPath();
        this.canvasStack.layer(4).save();
        this.canvasStack.layer(4).arc(this.position.x, this.position.y, 250, 0, 2 * Math.PI);
        this.canvasStack.layer(4).clip();
        this.canvasStack.layer(4).clearRect(0, 0, 2000, 2000);
        this.canvasStack.layer(4).restore();
    }

    async north(amount)
    {
        //prepre for drawing
        this.canvasStack.layer(3).lineWidth = 15;
        this.canvasStack.layer(3).strokeStyle = this.color;
        this.canvasStack.layer(3).beginPath();
        var delta = new Point(0, -1);

        //draw!
        for(var i = 0; i < amount; i++)
        {
            this.position = Point.add(this.position, delta);
            if(this.collide())
            {
                return false;
            }
            this.drawSelf();
            await Sleep.sleep(this.sleepLength);
        }

        return true; //execute the next command in the sequence
    }

    async south(amount)
    {
        //prepre for drawing
        this.canvasStack.layer(3).lineWidth = 15;
        this.canvasStack.layer(3).strokeStyle = this.color;
        this.canvasStack.layer(3).beginPath();
        var delta = new Point(0, 1);

        //draw!
        for(var i = 0; i < amount; i++)
        {
            this.position = Point.add(this.position, delta);
            if(this.collide())
            {
                return false;
            }
            this.drawSelf();
            await Sleep.sleep(this.sleepLength);
        }

        return true; //execute the next command in the sequence
    }

    async east(amount)
    {
        //prepre for drawing
        this.canvasStack.layer(3).lineWidth = 15;
        this.canvasStack.layer(3).strokeStyle = this.color;
        this.canvasStack.layer(3).beginPath();
        var delta = new Point(1, 0);

        //draw!
        for(var i = 0; i < amount; i++)
        {
            this.position = Point.add(this.position, delta);
            if(this.collide())
            {
                return false;
            }
            this.drawSelf();
            await Sleep.sleep(this.sleepLength);
        }

        return true; //execute the next command in the sequence
    }

    async west(amount)
    {
        //prepre for drawing
        this.canvasStack.layer(3).lineWidth = 15;
        this.canvasStack.layer(3).strokeStyle = this.color;
        this.canvasStack.layer(3).beginPath();
        var delta = new Point(-1, 0);

        //draw!
        for(var i = 0; i < amount; i++)
        {
            this.position = Point.add(this.position, delta);
            if(this.collide())
            {
                return false;
            }
            this.drawSelf();
            await Sleep.sleep(this.sleepLength);
        }

        return true; //execute the next command in the sequence
    }

    collide()
    {
        var process = new ImageProcessor("./Resources/map.bmp", "map");
        var mapColor = process.getPixel(this.position);
        if(mapColor.red <= 15 && mapColor.green <= 15 && mapColor.blue <= 15)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}