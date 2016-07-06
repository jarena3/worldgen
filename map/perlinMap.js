const PIover2 = Math.PI / 2;
var PerlinMap;
(function (PerlinMap) {
    class Chunk {
        constructor(size) {
            this.size = size;
            this.length = size * size;
            this.hash = 0;
            this.view = new Uint8ClampedArray(this.length);
        }
        index(x, y) {
            var X = Math.floor(x);
            var Y = Math.floor(y);
            X = X % this.size;
            Y = Y % this.size;
            return Y * this.size + X;
        }
        get(x, y) {
            if (arguments.length === 2) {
                x = this.index(x, y);
            }
            return this.view[x] / 256;
        }
        set(x, y, z) {
            if (arguments.length === 3) {
                x = this.index(x, y);
            }
            else {
                z = y;
            }
            this.view[x] = z * 255 + 1;
            this.hash++;
            return this;
        }
    }
    function perlin(x, y, N, noise) {
        var z = 0, s = 0;
        for (var i = 0; i < N; i++) {
            var pp = 1 / (1 << i);
            var e = PIover2 * pp;
            var ss = Math.sin(e);
            var cc = Math.cos(e);
            var xx = (x * ss + y * cc);
            var yy = (-x * cc + y * ss);
            s += pp;
            z += pp * Math.abs(noise.perlin2(xx / pp, yy / pp));
        }
        return 2 * z / s;
    }
    class PerlinWorld {
        constructor(size, seed, octives) {
            this.seed = seed;
            this.size = size;
            this.octives = octives;
            this.seaLevel = 0.15;
            this.treeLine = 0.75;
            this.chunks = {};
            this.noiseProvider = new Noise(seed);
        }
        getChunkId(x, y) {
            var X = Math.floor(x / this.size) % 256;
            var Y = Math.floor(y / this.size) % 256;
            return Y * 256 + X;
        }
        getChunkByLocation(x, y) {
            x = this.getChunkId(x, y);
            return this.chunks[x];
        }
        getChunkById(id) {
            if (!this.chunks[id]) {
                this.chunks[id] = new Chunk(this.size);
            }
            return this.chunks[id];
        }
        _scan(x, y) {
            var chunk = this.getChunkByLocation(x, y);
            var z = chunk.get(x, y);
            if (z === 0) {
                z = perlin(x / this.size, y / this.size, this.octives, this.noiseProvider);
                chunk.set(x, y, z);
            }
            return z;
        }
        scan(x, y, dx, dy) {
            for (var xi = x; xi < x + dx; xi++) {
                for (var yi = y; yi < y + dy; yi++) {
                    this._scan(Math.floor(xi), Math.floor(yi));
                }
            }
        }
        get(x, y) {
            return this.getChunkByLocation(x, y).get(x, y);
        }
        set(x, y, z) {
            return this.getChunkByLocation(x, y).set(x, y, z);
        }
        getChunkHash(x, y) {
            var id = this.getChunkId(x, y);
            return { id: id, hash: this.getChunkById(id).hash };
        }
        createRGBimage(xx, yy) {
            var X = xx - xx % this.size;
            var Y = yy - yy % this.size;
            var data = new Uint8ClampedArray(this.size * this.size * 4);
            for (var x = 0; x < this.size; x++) {
                for (var y = 0; y < this.size; y++) {
                    var i = y * this.size + x;
                    var z = this.get(x + X, y + Y);
                    var cell = i * 4;
                    data[cell + 1] = z > 0.2 ? 255 : 180;
                    data[cell] = data[cell + 2] = 0;
                    if (z == 0) {
                        data[cell] = data[cell + 1] = data[cell + 2] = 256;
                    }
                    else if (z < this.seaLevel) {
                        data[cell] = data[cell + 1] = 0;
                        data[cell + 2] = 255;
                    }
                    else if (z > this.treeLine) {
                        data[cell] = data[cell + 1] = data[cell + 2] = 60;
                    }
                    data[cell + 3] = 255;
                }
            }
            return data;
        }
        ;
    }
    PerlinMap.PerlinWorld = PerlinWorld;
})(PerlinMap || (PerlinMap = {}));
