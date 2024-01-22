/* The `CanvasStack` class is a JavaScript class that represents a stack of canvas layers and provides
methods to access and manipulate the pixels in those layers. */
export class CanvasStack
{
    constructor(canvasIdArray)
    {
        this.layers = new Array();
        for(var id of canvasIdArray)
        {
            this.layers.push(document.getElementById(id).getContext("2d"));
        }
    }

    /**
     * The function "layer" takes a key as input and returns the corresponding layer based on the key
     * value.
     * @param key - The key parameter is the input value that determines which layer to return. It can
     * be either a number or a string.
     * @returns the layer corresponding to the given key. If the key matches any of the cases, the
     * corresponding layer from the `this.layers` array is returned. If the key does not match any of
     * the cases, `null` is returned.
     */
    layer(key)
    {
        switch(key)
        {
            case 0:
            case "0":
            case "backdrop":
            case "back":
            case "bg":
                return this.layers[0];
            case 1:
            case "1":
            case "map":
                return this.layers[1];
            case 2:
            case "2":
            case "poi":
                return this.layers[2];
            case 3:
            case "3":
            case "turtle":
                return this.layers[3];
            case 4:
            case "4":
            case "fog":
                return this.layers[4];
            default:
                return null;
        }
    }

    /**
     * The function `getPixel` returns the color values (red, green, blue, and alpha) of a pixel at a
     * given position (x, y) in a canvas layer.
     * @param x - The x parameter represents the x-coordinate of the pixel you want to retrieve the
     * color information for. It specifies the horizontal position of the pixel in the image.
     * @param y - The parameter "y" represents the vertical position of the pixel in the image. It
     * specifies the row number of the pixel.
     * @param z - The parameter "z" represents the layer number from which you want to retrieve the
     * pixel data.
     * @returns The function `getPixel(x, y, z)` returns an object with the properties `red`, `green`,
     * `blue`, and `alpha`. These properties represent the color values of the pixel at coordinates
     * `(x, y)` in the specified layer `z`.
     */
    getPixel(tripoint)
    {
        var data = this.canvasStack.layer(tripoint.z).getImageData(tripoint.x, tripoint.y, 1, 1).data;

        return({
            red: data[0],
            green: data[1],
            blue: data[2],
            alpha: data[3]
        });
    }
}