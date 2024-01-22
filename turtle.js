import { Point, Color, Sleep, ImageProcessor } from "./AbstractLib";

export default class Turtle
{
    constructor(name, center, rotation, canvas)
    {
        this.name = name;
        this.position = center;
        this.rotation = rotation;
        this.color = "red";
        this.origin = new Point(center.x, center.y);
        this.sleepLength = 10;

        this.map = new Image();
        this.map.src = "./Resources/map.bmp";

        this.reveal = new RevealMap("fog");

        var canvas = document.getElementById(canvas);
        var context = canvas.getContext("2d");
        this.drawcontext = context;

        console.log(this);

    }

    reset()
    {
        this.position = this.origin;
        this.drawcontext.beginPath();
        this.drawcontext.clearRect(0, 0, this.drawcontext.canvas.width, this.drawcontext.canvas.height);
        this.drawcontext.fillStyle = "black";
        this.drawcontext.fillRect(0, 0, this.drawcontext.canvas.width, this.drawcontext.canvas.height); //add an outline

        this.drawcontext.drawImage(this.map, 0, 0);
    }

    setColor(colorName)
    {
        this.color = colorName;
    }

    getColorUnderMe()
    {
        var data = this.drawcontext.getImageData(this.position.x, this.position.y, 1, 1).data;

        return({
            red: data[0],
            green: data[1],
            blue: data[2],
            name: Color.getColorName(data[0], data[1], data[2])
        });
    }

    drawSelf()
    {
        this.drawcontext.fillStyle = this.color;
        this.drawcontext.beginPath();
        this.drawcontext.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI);
        this.drawcontext.fill();

        this.reveal.drawcontext.beginPath();
        this.reveal.drawcontext.save();
        this.reveal.drawcontext.arc(this.position.x, this.position.y, 250, 0, 2 * Math.PI);
        this.reveal.drawcontext.clip();
        this.reveal.drawcontext.clearRect(0, 0, 2000, 2000);
        this.reveal.drawcontext.restore();
    }

    async north(amount)
    {
        //prepre for drawing
        this.drawcontext.lineWidth = 15;
        this.drawcontext.strokeStyle = this.color;
        this.drawcontext.beginPath();
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
        this.drawcontext.lineWidth = 15;
        this.drawcontext.strokeStyle = this.color;
        this.drawcontext.beginPath();
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
        this.drawcontext.lineWidth = 15;
        this.drawcontext.strokeStyle = this.color;
        this.drawcontext.beginPath();
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
        this.drawcontext.lineWidth = 15;
        this.drawcontext.strokeStyle = this.color;
        this.drawcontext.beginPath();
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
        var process = new ImageProcessor("./Resources/map.bmp", "save");
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

class RevealMap
{
    constructor(canvas)
    {
        this.drawcontext = document.getElementById(canvas).getContext("2d");
        this.drawcontext.beginPath();
        this.drawcontext.fillStyle = "black";
        this.drawcontext.fillRect(0,0,2000,2000);
        this.drawcontext.beginPath();
    }

    addPoint(point)
    {
        var shouldAdd = !(this.isThisInSet(point, this.points));
        if(shouldAdd)
        {
            this.points.push(point);
        }
    }

    isThisInSet(obj, set)
    {
        for(var item of set)
        {
            if(obj == item)
            {
                return true;
            }
        }
        return false;
    }
}