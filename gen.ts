
function gen(mapX: number, mapY: number, frequency: number, seaLevel: number) {
  var start = Date.now();

  var m = new Maps.PerlinMap(mapX, mapY, frequency, seaLevel);
  m.render();


  var end = Date.now();
  console.log('Rendered in ' + (end - start) + ' ms');

}



//gen(500, 300);
