export class Point
{
    static zero() //(0,0)
    {
        return new Point(0,0);
    }

    static null() //(null,null)
    {
        return new Point(null,null);
    }

    constructor(x, y, z=null)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    invert() //convert (+1,+1) to (-1,-1)
    {
        return new Point(-1 * this.x, -1 * this.y);
    }

    static distanceBetween(firstPoint, secondPoint) //return the distance between two points
    {
        var x1 = firstPoint.x;
        var y1 = firstPoint.y;
        var x2 = secondPoint.x;
        var y2 = secondPoint.y;

        var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

        return d;
    }

    static add(pointA, pointB) //add two points (x1+x2,y1+y2)
    {
        var newX = pointA.x + pointB.x;
        var newY = pointA.y + pointB.y;
        return(new Point(newX,  newY));
    }

    toString()
    {
        return "(" + this.x + "," + this.y + ")";
    }

    static fromString(string)
    {
        var parts = string.split(",");
        console.log(parts);
        parts[0] = parts[0].substring(1);
        parts[1] = parts[1].substring(0,parts[1].length-2)
        var x = parseFloat(parts[0]);
        var y = parseFloat(parts[1]);
        return new Point(x, y);
    }

    deepCopy(point)
    {
        return new Point(point.x, point.y);
    }
}

export class OrderedPair
{
    constructor(key, value)
    {
        this.key = key;
        this.val = value;
    }
}

export class AbstractRectangle
{
    constructor(width, height)
    {
        this.points = new Array();
        this.points.push(new Point(-1 * width/2, height/2));        //(-1, 1)
        this.points.push(new Point(0, height/2));                   //( 0, 1)
        this.points.push(new Point(width/2,height/2));              //( 1, 1)
        this.points.push(new Point(width/2,0));                     //( 1, 0)
        this.points.push(new Point(width/2, -1 * height/2));        //( 1,-1)
        this.points.push(new Point(0, -1 * height/2));              //( 0,-1)
        this.points.push(new Point(-1 * width/2, -1 * height/2));   //(-1,-1)
        this.points.push(new Point(-1 * width/2, 0));               //(-1, 0)
        this.points.push(new Point(-1 * width/2, height/2));        //(-1, 1)
     
    }

    isPointInside(point, offset)
    {
        var testPoint = point;
        //console.log(this.topLeft(), offset);
        var TopLeft = Point.add(this.topLeft(), offset);
        var BottomRight = Point.add(this.bottomRight(), offset);
        //console.log(testPoint, TopLeft, BottomRight);
        var betweenX = TopLeft.x <= testPoint.x && testPoint.x <= BottomRight.x;
        var betweenY = TopLeft.y <= testPoint.y && testPoint.y <= BottomRight.y;
        var inside = betweenX && betweenY;
        //console.log(inside);
        return inside;
    }

    pointList()
    {
        return this.points;
    }

    topLeft()
    {
        return this.points[6];
    }

    topMiddle()
    {
        return this.points[5];
    }

    topRight()
    {
        return this.points[4];
    }

    middleRight()
    {
        return this.points[3];
    }

    bottomRight()
    {
        return this.points[2];
    }

    bottomMiddle()
    {
        return this.points[1];
    }

    bottomLeft()
    {
        return this.points[0];
    }

    middleLeft()
    {
        return this.points[7];
    }
}

export class Color
{
    constructor(red, green, blue)
    {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.name = Color.getColorName(red, green, blue);
    }

    static getColorName(red, green, blue)
    {
        var sample = Color.Sample();
        for(var color of sample)
        {
            if(color.red == red && color.green == green && color.blue == blue)
            {
                return color.name;
            }
        }
        return "UNKNOWN";
    }

    static Sample()
    {
        var sample = new Array();
        sample.push(Color.Red());
        sample.push(Color.Green());
        sample.push(Color.Blue());
        sample.push(Color.Yellow());
        sample.push(Color.Cyan());
        sample.push(Color.Magenta());
        sample.push(Color.White());
        sample.push(Color.Black());
        return sample;
    }

    static Red()
    {
        return({
            red: 255,
            green: 0,
            blue: 0,
            name: "Red"
        });
    }

    static Green()
    {
        return({
            red: 0,
            green: 255,
            blue: 0,
            name: "Green"
        });
    }

    static Blue()
    {
        return({
            red: 0,
            green: 0,
            blue: 255,
            name: "Blue"
        });
    }

    static Yellow()
    {
        return({
            red: 255,
            green: 255,
            blue: 0,
            name: "Yellow"
        });
    }

    static Magenta()
    {
        return({
            red: 255,
            green: 0,
            blue: 255,
            name: "Magenta"
        });
    }

    static Cyan()
    {
        return({
            red: 0,
            green: 255,
            blue: 255,
            name: "Cyan"
        });
    }

    static White()
    {
        return({
            red: 255,
            green: 255,
            blue: 255,
            name: "White"
        });
    }

    static Black()
    {
        return({
            red: 0,
            green: 0,
            blue: 0,
            name: "Black"
        });
    }
}

export class Sleep
{
    constructor()
    {
        //you shouldn't be instantiating this
    }

    static sleep(ms)
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export class ImageProcessor
{
    constructor(src, canvas)
    {
        this.src = new Image();
        this.src.src = src;
        this.drawcontext = document.getElementById(canvas).getContext("2d");
    }

    getPixel(point)
    {
        this.drawcontext.drawImage(this.src, 0, 0);
        var pixel = this.drawcontext.getImageData(point.x, point.y, 1, 1).data;
        return({
            red: pixel[0],
            green: pixel[1],
            blue: pixel[2],
            name: Color.getColorName(pixel[0], pixel[1], pixel[2])
        });
    }
}