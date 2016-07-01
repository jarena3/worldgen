namespace Worldmap {
  export class coordinate {
    x: number;
    y: number;
    constructor(xCoord: number, yCoord: number) {
      this.x = xCoord;
      this.y = yCoord;
    }
  }

  export class Particle {
      constructor(public coord: coordinate, public lifespan: number) { }
      moveDownhill(clampX:number, clampY:number) {
          this.coord = new coordinate((this.coord.x + this.binaryFall()), (this.coord.y + this.binaryFall()));
          this.lifespan--;
      }

      private binaryFall() : number {
          let rnd = Math.random();
          if (rnd < 0.333) return -1;
          if (rnd > 0.666) return 1;
          return 0;
      }

  }

    export class HeightMap {
        data;
        sizeX: number;
        sizeY: number;
        constructor(mapMaxX: number, mapMaxY: number) {
            this.sizeX = mapMaxX;
            this.sizeY = mapMaxY
            this.data = [];
        }

        init() {
            for (var i: number = 0; i <= this.sizeX; i++) {
                this.data.push([]);
                for (var j: number = 0; j <= this.sizeY; j++) {
                    this.data[i].push([]);
                }
            }
            return this.data;
        }

        lighten(x:number, y:number) {
          if (this.data[x] == undefined) {
            console.log("y-array at: " + x +" is undefined!");
          }
          else if (this.data[x][y] == NaN) {
            console.log("data at: " + x + " " + y +" is NaN!");
          }
          else {
            this.data[x][y] = parseInt(this.data[x][y] + 8);
          }
        }


        render() {
          // build pixelarray
            var pixelArray = [];
            for (var i: number = 0; i < this.sizeY; i++) {
                for (var j: number = 0; j < this.sizeX; j++) {
                    var c: number;
                    if (this.data[i][j]) {
                        c = this.data[i][j] > 255 ? 255 : this.data[i][j];
                    } else {
                        c = 0;
                    }
                    pixelArray.push(c, c, c, 255) //R,G,B,A
                }
            }

            //build imagedata
            var cArray = Uint8ClampedArray.from(pixelArray);


            //TEMP!!! Inject
            var canv = document.createElement("canvas");
            canv.width = this.sizeX;
            canv.height = this.sizeY;
            document.body.appendChild(canv);
            var ctx = canv.getContext("2d");
            var idata = new ImageData(cArray, this.sizeX, this.sizeY);
            ctx.putImageData(idata, 0, 0);

        }
    }

    function randomRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    export function rollingParticle(map: HeightMap, numParticles: number, particleLifespan: number) {
        for (let i = numParticles; i > 0; i--) {
          var newCoord = new coordinate(randomRange(0, map.sizeY - 1), randomRange(0, map.sizeX - 1))
            var p = new Particle(newCoord, particleLifespan);
            while (p.lifespan > 0) {
                if (p.coord.x < 0 || p.coord.x > map.sizeX || p.coord.y < 0 || p.coord.y > map.sizeY) {
                  p.lifespan = 0;
                  continue;
                }
                map.lighten(p.coord.x, p.coord.y);
                p.moveDownhill(map.sizeY, map.sizeX)
            }
        }

    }

}
