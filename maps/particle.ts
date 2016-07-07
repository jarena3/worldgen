namespace Maps {

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

  // export function rollingParticle(map: HeightMap, numParticles: number, particleLifespan: number) {
  //     for (let i = numParticles; i > 0; i--) {
  //       var newCoord = new coordinate(randomRange(0, map.sizeY - 1), randomRange(0, map.sizeX - 1))
  //         var p = new Particle(newCoord, particleLifespan);
  //         while (p.lifespan > 0) {
  //             if (p.coord.x < 0 || p.coord.x > map.sizeX || p.coord.y < 0 || p.coord.y > map.sizeY) {
  //               p.lifespan = 0;
  //               continue;
  //             }
  //             map.lighten(p.coord.x, p.coord.y);
  //             p.moveDownhill(map.sizeY, map.sizeX)
  //         }
  //     }
  //
  // }
}
