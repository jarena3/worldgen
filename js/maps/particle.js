var Maps;
(function (Maps) {
    class Particle {
        constructor(coord, lifespan) {
            this.coord = coord;
            this.lifespan = lifespan;
        }
        moveDownhill(clampX, clampY) {
            this.coord = new Maps.coordinate((this.coord.x + this.binaryFall()), (this.coord.y + this.binaryFall()));
            this.lifespan--;
        }
        binaryFall() {
            let rnd = Math.random();
            if (rnd < 0.333)
                return -1;
            if (rnd > 0.666)
                return 1;
            return 0;
        }
    }
    Maps.Particle = Particle;
})(Maps || (Maps = {}));
