var Maps;
(function (Maps) {
    class PerlinMap {
        constructor(mapMaxX, mapMaxY, frequency) {
            this.sizeX = mapMaxX;
            this.sizeY = mapMaxY;
            this.data = [];
            this.freq = frequency;
        }
        init() {
            for (var i = 0; i <= this.sizeX; i++) {
                this.data.push([]);
                for (var j = 0; j <= this.sizeY; j++) {
                    this.data[i].push([]);
                }
            }
            return this.data;
        }
        lighten(x, y) {
            if (this.data[x] == undefined) {
                console.log("y-array at: " + x + " is undefined!");
            }
            else if (this.data[x][y] == NaN) {
                console.log("data at: " + x + " " + y + " is NaN!");
            }
            else {
                this.data[x][y] = parseInt(this.data[x][y] + 8);
            }
        }
        render() {
            var pixelArray = [];
            var n = new Noise();
            for (var i = 0; i < this.sizeY; i++) {
                for (var j = 0; j < this.sizeX; j++) {
                    var c;
                    var nx = j / this.sizeX - 0.5, ny = i / this.sizeY - 0.5;
                    var o = n.perlin2(this.freq * nx, this.freq * ny) / 2 + 0.5;
                    c = Math.floor(o * 255);
                    pixelArray.push(c, c, c, 255);
                }
            }
            var cArray = Uint8ClampedArray.from(pixelArray);
            var canv = document.createElement("canvas");
            $('#mapCanvas').append(canv);
            canv.width = this.sizeX;
            canv.height = this.sizeY;
            document.body.appendChild(canv);
            var ctx = canv.getContext("2d");
            var idata = new ImageData(cArray, this.sizeX, this.sizeY);
            ctx.putImageData(idata, 0, 0);
        }
    }
    Maps.PerlinMap = PerlinMap;
})(Maps || (Maps = {}));
