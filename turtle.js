import { Point, Color } from "./AbstractLib";

export default class Turtle
{
    constructor(name, center, rotation, canvas)
    {
        this.name = name;
        this.position = center;
        this.rotation = rotation;
        this.color = "red";

        var canvas = document.getElementById(canvas);
        var context = canvas.getContext("2d");
        this.drawcontext = context;

    }

    reset()
    {
        this.position = Point.zero();
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
        this.drawcontext.arc(this.position.x, this.position.y, 40, 0, 2 * Math.PI);
        this.drawcontext.fill();
    }

    north(amount)
    {
        //prepre for drawing
        this.drawcontext.lineWidth = 15;
        this.drawcontext.strokeStyle = this.color;
        this.drawcontext.beginPath();
        var delta = new Point(0, -1 * amount);

        //draw!
        this.drawcontext.moveTo(this.position.x, this.position.y);
        this.drawcontext.lineTo(this.position.x + delta.x, this.position.y + delta.y);
        this.drawcontext.stroke();
        this.position = Point.add(this.position, delta);

        //make a node
        this.drawSelf();
    }

    south(amount)
    {
        //prepre for drawing
        this.drawcontext.lineWidth = 15;
        this.drawcontext.strokeStyle = this.color;
        this.drawcontext.beginPath();
        var delta = new Point(0, 1 * amount);

        //draw!
        this.drawcontext.moveTo(this.position.x, this.position.y);
        this.drawcontext.lineTo(this.position.x + delta.x, this.position.y + delta.y);
        this.drawcontext.stroke();
        this.position = Point.add(this.position, delta);

        //make a node
        this.drawSelf();
    }

    east(amount)
    {
        //prepre for drawing
        this.drawcontext.lineWidth = 15;
        this.drawcontext.strokeStyle = this.color;
        this.drawcontext.beginPath();
        var delta = new Point(1 * amount, 0);

        //draw!
        this.drawcontext.moveTo(this.position.x, this.position.y);
        this.drawcontext.lineTo(this.position.x + delta.x, this.position.y + delta.y);
        this.drawcontext.stroke();
        this.position = Point.add(this.position, delta);

        //make a node
        this.drawSelf();
    }

    west(amount)
    {
        //prepre for drawing
        this.drawcontext.lineWidth = 15;
        this.drawcontext.strokeStyle = this.color;
        this.drawcontext.beginPath();
        var delta = new Point(-1 * amount, 0);

        //draw!
        this.drawcontext.moveTo(this.position.x, this.position.y);
        this.drawcontext.lineTo(this.position.x + delta.x, this.position.y + delta.y);
        this.drawcontext.stroke();
        this.position = Point.add(this.position, delta);

        //make a node
        this.drawSelf();
    }
}