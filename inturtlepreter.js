export default class Inturtlepreter
{
    constructor(commandSource, turtle)
    {
        this.source = document.getElementById(commandSource);
        this.commands = "";
        this.turtle = turtle;
    }

    /**
     * The function executes a series of commands, parsing each line and stopping if the turtle hits a
     * wall. This is the main function executed by the HTML button element.
     * @returns nothing (undefined).
     */
    async execution()
    {
        this.turtle.reset();

        this.turtle.drawSelf();
        this.commands = this.source.value.split("\n");
        console.log(this);
        for(var line of this.commands)
        {
            var shouldContinue = await this.parseLine(line);
            if(!shouldContinue)
            {
                alert("You hit a wall and died!");
                return;
            }
        }
    }

    /**
     * The function `parseLine` is a JavaScript async function that takes a line of input and parses it
     * to execute turtle movements or change the turtle's color.
     * @param line - The `line` parameter is a string that represents a command or instruction for the
     * turtle.
     * @returns The function `parseLine` returns a boolean value.
     */
    async parseLine(line)
    {
        var north = new RegExp("^\s*(?:[nN][oO][rR][tT][hH]|[nN])[\\(\\ ]*([0-9]*)[\\)\\ ]*", "m");
        var south = new RegExp("^\s*(?:[sS][oO][uU][tT][hH]|[sS])[\\(\\ ]*([0-9]*)[\\)\\ ]*", "m");
        var east = new RegExp("^\s*(?:[eE][aA][sS][tT]|[eE])[\\(\\ ]*([0-9]*)[\\)\\ ]*", "m");
        var west = new RegExp("^\s*(?:[wW][eE][sS][tT]|[wW])[\\(\\ ]*([0-9]*)[\\)\\ ]*", "m");
        var color = new RegExp("^\s*(?:[cC][oO][lL][oO][rR]|[cC])[\\(\\ ]*([a-zA-Z]*)[\\)\\ ]*", "m");

        var match = north.exec(line);
        if(match != null)
        {
            return await this.turtle.north(match[1]);
        }
        match = south.exec(line);
        if(match != null)
        {
            return await this.turtle.south(match[1]);
        }
        match = east.exec(line);
        if(match != null)
        {
            return await this.turtle.east(match[1]);
        }
        match = west.exec(line);
        if(match != null)
        {
            return await this.turtle.west(match[1]);
        }
        match = color.exec(line);
        if(match != null)
        {
            this.turtle.setColor(match[1]);
            this.turtle.drawSelf();
            return true;
        }
        return true;
    }
}