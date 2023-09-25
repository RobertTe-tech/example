"use strict"


const objects = {"rock":0, "crystal":1, "empty":2, "player":3}

const map = [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 3, 2, 2, 0],
    [0, 0, 2, 1, 0, 0],
    [0, 0, 0, 1, 1, 0],
    [0, 1, 2, 2, 0, 0],
    [0, 2, 2, 1, 1, 0],
    [0, 0, 0, 0, 0, 0],
]



class Obj {
    constructor() {
        this._x = 1;
        this._y = 2;
        this._dir = 0;
    }

    moveForward() {
        let x = this._x;
        let y = this._y;
        switch (this._dir) {
            case 0:
                x -= 1;
                break;
            case 1:
                y += 1;
                break;
            case 2:
                x += 1;
                break;
            case 3:
                y -= 1;
                break;
        }
        console.log("cell =", map[x][y]);
        if (walkable(map[x][y])) {
            map[this._x][this._y] = objects.empty;
            map[x][y] = objects.player;
            this._x = x;
            this._y = y;
        } else if(crystal(map[x][y])) {
            map[x][y] = objects.empty;
            map[this._x][this._y] = objects.empty;
            map[x][y] = objects.player;
            this._x = x;
            this._y = y;
        }

        
        console.log("{x, y} =", this._x, this._y);
    }

    rotate() {
        this._dir = (this._dir + 1) % 4;
    }

    // проверка на скалу
    diggable(cell) {
        if(cell === objects.rock) return true
        else return false

    }
    // проверка на пустую клетку
    walkable(cell) {
        if(cell === objects.empty) return true
        else return false

    }
    // проверка на клетку с кристаллом
    crystal(cell) {
        if(cell === objects.crystal) return true
        else return false

    }

}




const object = new Obj();
