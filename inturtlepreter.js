export default class Inturtlepreter
{
    constructor(commandSource, turtle)
    {
        this.source = document.getElementById(commandSource);
        this.commands = "";
        this.turtle = turtle;
    }

    async execution()
    {
        this.turtle.reset();
        this.turtle.drawSelf();
        this.commands = this.source.value.split("\n");
        console.log(this);
        for(var line of this.commands)
        {
            this.parseLine(line);
            await this.sleep(500);
        }
    }

    parseLine(line)
    {
        var north = new RegExp("north\\(([0-9]*)\\)");
        var south = new RegExp("south\\(([0-9]*)\\)");
        var east = new RegExp("east\\(([0-9]*)\\)");
        var west = new RegExp("west\\(([0-9]*)\\)");
        var color = new RegExp("color\\(([a-zA-Z]*)\\)");

        var match = north.exec(line);
        if(match != null)
        {
            this.turtle.north(match[1]);
            return;
        }
        match = south.exec(line);
        if(match != null)
        {
            this.turtle.south(match[1]);
            return;
        }
        match = east.exec(line);
        if(match != null)
        {
            this.turtle.east(match[1]);
            return;
        }
        match = west.exec(line);
        if(match != null)
        {
            this.turtle.west(match[1]);
            return;
        }
        match = color.exec(line);
        if(match != null)
        {
            this.turtle.setColor(match[1]);
            this.turtle.drawSelf();
            return;
        }
    }

    sleep(ms)
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}