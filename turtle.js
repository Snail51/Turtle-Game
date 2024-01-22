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

    /**
     * The reset function resets the position of an object, clears a canvas layer, and redraws the map
     * image on the map layer.
     */
    reset()
    {
        this.position = this.origin;
        this.canvasStack.layer(3).beginPath();
        this.canvasStack.layer(3).clearRect(0, 0, this.canvasStack.layer(3).canvas.width, this.canvasStack.layer(3).canvas.height);

        this.canvasStack.layer(1).drawImage(this.map, 0, 0);
    }

    /**
     * The function sets the color property of the turtle to the specified color name.
     * @param colorName - The color name that you want to set for an object.
     */
    setColor(colorName)
    {
        this.color = colorName;
    }

    /**
     * The function `getColorUnderMe()` returns the color of the pixel at the current position on the
     * canvas. Includes a Z-dimension for layer address.
     * @returns The function `getColorUnderMe()` is returning the color of the pixel at the current
     * position on the canvas.
     */
    getColorUnderMe()
    {
        return this.canvasStack.getPixel(this.position);
    }

    /**
     * The function draws a turtle on a canvas and removes a radius of fog around it.
     */
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

    /**
     * The function "cutoutFog" creates a circular clipping path on a canvas layer and clears the area
     * inside the circle.
     */
    cutoutFog()
    {
        this.canvasStack.layer(4).beginPath();
        this.canvasStack.layer(4).save();
        this.canvasStack.layer(4).arc(this.position.x, this.position.y, 250, 0, 2 * Math.PI);
        this.canvasStack.layer(4).clip();
        this.canvasStack.layer(4).clearRect(0, 0, 2000, 2000);
        this.canvasStack.layer(4).restore();
    }

    /**
     * The above function is an asynchronous function that moves an the turtle north by a specified amount
     * and returns true if the movement is successful.
     * @param amount - The `amount` parameter in the `north` function represents the number of pixels
     * you want to take in the north direction. It determines how many times the code inside
     * the `for` loop will be executed.
     * @returns a boolean value. If the for loop completes without any collisions, it will return true.
     * Otherwise, if a collision occurs, it will return false.
     */
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

    /**
     * The `south` function moves the turtle downwards on a canvas and returns `true` if the movement is
     * successful, otherwise `false`.
     * @param amount - The parameter "amount" represents the number of pixels the turtle
     * will move. It determines how far the object will move in the south direction.
     * @returns a boolean value. If the for loop completes without any collisions, it will return true.
     * Otherwise, if a collision occurs, it will return false.
     */
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

    /**
     * The `east` function moves an object in a canvas to the east by a specified amount, drawing its
     * path as it moves.
     * @param amount - The parameter "amount" represents the number of steps or iterations the code
     * will perform in the "east" direction.
     * @returns a boolean value. If the for loop completes without any collisions, it will return true.
     * Otherwise, if a collision occurs, it will return false.
     */
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

    /**
     * The `west` function moves an object a specified number of steps to the left on a canvas,
     * checking for collisions and updating the position with each step.
     * @param amount - The parameter "amount" represents the number of times the code will execute the
     * drawing process.
     * @returns a boolean value. If the for loop completes without any collisions, it will return true.
     * Otherwise, if a collision occurs, it will return false.
     */
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

    /**
     * The `collide()` function checks if the pixel color at the current position on the map image is
     * dark (RGB values <= 15) and returns true if it is, indicating a collision.
     * @returns The function `collide()` returns a boolean value. It returns `true` if the red, green,
     * and blue values of the pixel at the current position on the map are all less than or equal to
     * 15. Otherwise, it returns `false`.
     */
    collide()
    {
        var mapColor = this.canvasStack.getPixel(this.position);
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