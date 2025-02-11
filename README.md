# Purpose
 - This project explores the use of "Turtles" in JavaScript/HTML Canvas to explore a maze-like environment.
 - This project was part of a class project for Advanced Computer Security at the University of Minnesota Duluth (CS-5732).
 - It was written by **Brendan Rood**, **Connor Hagen**, and **Jet Li**.

# Installation
 - Can run in any dedicated httpx runtime with JS.
 - **Already set up at:** https://tools.snailien.net/TurtleGang/Turtles/

# Usage
 Type commands into right window and then click EXECUTE.
 Valid Commands:
  - north(AMOUNT) ex: north(100)
  - south(AMOUNT) ex: South(200)
  - east(AMOUNT)  ex: eAsT(400)
  - west(AMOUNT)  ex: weST(333)
  - color(COLOR)  ex: color(cyan)

# History
 - This program was originally written in Spring 2024.
 - The version here is only a very rudimentary proof on concept. We originally wanted to do way more; goal points, doors and switches, roaming enemies, barriers that you need to be a certain color to pass through. You can still find these elements throughout the maze but they are currently non-functional.
 - This game wanted to explore how we make plans in unfamiliar environments. The player is forced to start at a single, fixed location and devise a set of steps to explore the maze in one continuous motion. Once execution has begun, there is no stopping/modifying the instructions, and if you bump into anything you die immediately. The knowledge you gain from that experience helps you revise your instructions and plan.
