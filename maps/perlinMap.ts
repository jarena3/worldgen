
namespace Maps {

    export class PerlinMap {
        data;
        sizeX: number;
        sizeY: number;
        freq: number;
        seaLevel: number;
        constructor(mapMaxX: number, mapMaxY: number, frequency:number, seaLevel:number) {
            this.sizeX = mapMaxX;
            this.sizeY = mapMaxY
            this.data = [];
            this.freq = frequency;
            this.seaLevel = seaLevel;
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
            var n = new Noise();
            for (var i: number = 0; i < this.sizeY; i++) {
                for (var j: number = 0; j < this.sizeX; j++) {
                    var c: number;
                    // if (this.data[i][j]) {
                    //     c = this.data[i][j] > 255 ? 255 : this.data[i][j];
                    // } else {
                    //     c = 0;
                    // }

                    var nx = j/this.sizeX - 0.5, ny = i/this.sizeY - 0.5;
                    var o = n.perlin2(this.freq * nx, this.freq * ny)/ 2 + 0.5;

                    c = Math.floor(o * 255);

                    if (c > this.seaLevel) {
                      pixelArray.push(c, c, c, 255) //R,G,B,A
                    } else {
                      pixelArray.push(41, 128, 185, 200)
                    }

                }
            }

            //build imagedata
            var cArray = Uint8ClampedArray.from(pixelArray);


            //TEMP!!! Inject
            $('#canvas').attr("style", "width:" + this.sizeX + ";height:" + this.sizeY +";")

            var canv = <HTMLCanvasElement>document.getElementById("canvas");
            canv.width = this.sizeX;
            canv.height = this.sizeY;
            var ctx = canv.getContext("2d");
            var idata = new ImageData(cArray, this.sizeX, this.sizeY);
            ctx.putImageData(idata, 0, 0);

        }

    }





}
