
function gen(mapX: number, mapY: number) {
  var start = Date.now();

  var p = new PerlinNoise.Perlin(0);
  console.log(p.OctavePerlin(12,22,32,42,52));


  var end = Date.now();
  console.log('Rendered in ' + (end - start) + ' ms');

}

gen(900, 900);
