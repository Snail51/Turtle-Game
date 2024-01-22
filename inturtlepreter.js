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
            var shouldContinue = await this.parseLine(line);
            if(!shouldContinue)
            {
                alert("You hit a wall and died!");
                return;
            }
        }
    }

    async parseLine(line)
    {
        var north = new RegExp("north\\(([0-9]*)\\)");
        var south = new RegExp("south\\(([0-9]*)\\)");
        var east = new RegExp("east\\(([0-9]*)\\)");
        var west = new RegExp("west\\(([0-9]*)\\)");
        var color = new RegExp("color\\(([a-zA-Z]*)\\)");

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