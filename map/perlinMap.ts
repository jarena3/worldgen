/*
  Based off Hypercube's perlin map demo at:
  https://github.com/Hypercubed/perlin-terrain-angular-demo/blob/master/script.js
*/

const PIover2 = Math.PI/2;

namespace PerlinMap {

  class Chunk {
    size: number;
    length: number;
    hash: number;
    view: Uint8ClampedArray;
    constructor(size: number) {
      this.size = size;
      this.length = size*size;
      this.hash = 0;

      //var buffer = new ArrayBuffer(this.length);
      this.view = new Uint8ClampedArray(this.length);
    }

    public index(x: number, y: number) {
      var X = Math.floor(x);
      var Y = Math.floor(y);
      X = X % this.size; Y = Y % this.size;
      return Y*this.size+X;
    }

    public get(x: number, y: number): number {
      if (arguments.length === 2) {
        x = this.index(x,y);
      }
      return this.view[x]/256;
    }

    public set(x: number, y: number, z: number) {
      if (arguments.length === 3) {
        x = this.index(x,y);
      } else {
        z = y;
      }
      this.view[x] = z*255+1;
      this.hash++;
      return this;
    }

  }

  function perlin(x,y,N, noise) {
    var z = 0, s = 0;
    for (var i = 0; i < N; i++) {
      var pp = 1/(1 << i);   // (1 << i) same as Math.pow(2,i)
      var e = PIover2*pp;  // rotate angle
      var ss = Math.sin(e);
      var cc = Math.cos(e);
      var xx = (x*ss+y*cc);  // rotation
      var yy = (-x*cc+y*ss);
      s += pp; // total amplitude
      z += pp*Math.abs(noise.perlin2(xx/pp,yy/pp));
    }
    return 2*z/s;
  }

  export class PerlinWorld {
    size: number;
    seed: number;
    octives: number;
    seaLevel: number;
    treeLine: number;
    chunks;
    noiseProvider: Noise;

    constructor(size: number, seed: number, octives:number ) {
      this.seed = seed;
      this.size = size;
      this.octives = octives;

      this.seaLevel = 0.15;
      this.treeLine = 0.75;

      this.chunks = {};
      this.noiseProvider = new Noise(seed);
    }

    getChunkId (x,y) {
      var X = Math.floor(x / this.size) % 256;  // chunk
      var Y = Math.floor(y / this.size) % 256;

      return Y*256+X;
    }

    getChunkByLocation (x,y) {
        x = this.getChunkId(x,y);
        return this.chunks[x];
    }

    getChunkById (id) {
      if (!this.chunks[id]) {
        this.chunks[id] = new Chunk(this.size);
      }
      return this.chunks[id];
    }

    _scan (x,y) {
      var chunk = this.getChunkByLocation(x,y);

      var z = chunk.get(x,y);
      if (z === 0) {
        z = perlin(x/this.size,y/this.size,this.octives, this.noiseProvider);  // one byte
        chunk.set(x,y,z);
      }
      return z;
    }

    scan (x,y,dx,dy) {
      for (var xi = x; xi < x+dx; xi++) {
        for (var yi = y; yi < y+dy; yi++) {
          this._scan(Math.floor(xi),Math.floor(yi));
        }
      }
    }

    get (x,y) {
      return this.getChunkByLocation(x,y).get(x,y);
    }

    set (x,y,z) {
      return this.getChunkByLocation(x,y).set(x,y,z);
    }

    getChunkHash (x,y) {
      var id = this.getChunkId(x,y);
      return { id: id, hash: this.getChunkById(id).hash};
    }

    public createRGBimage (xx,yy) {
      var X = xx - xx % this.size;
      var Y = yy - yy % this.size;

      var data = new Uint8ClampedArray(this.size*this.size*4); // 4 bytes per pixel

      for (var x = 0; x < this.size; x++) {
        for (var y = 0; y < this.size; y++) {
          var i = y*this.size+x;
          var z = this.get(x+X,y+Y);
          var cell = i * 4;
          data[cell + 1] = z > 0.2 ? 255 : 180; //256*(value+0.40);
          data[cell] = data[cell + 2] = 0;
          if (z == 0) {
            data[cell] = data[cell + 1] = data[cell + 2] = 256;  // white
          } else if (z < this.seaLevel) {
            data[cell] = data[cell + 1] = 0;
            data[cell + 2] = 255;  // blue
          } else if ( z > this.treeLine ) {
            data[cell] = data[cell + 1] = data[cell + 2] = 60;  //black
          }
          data[cell + 3] = 255; // alpha.
        }
      }
      return data;
    };


  }

}
