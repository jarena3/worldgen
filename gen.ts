
function gen(mapX: number, mapY: number) {
  var start = Date.now();

  var m = new Maps.PerlinMap(mapX, mapY, 9);
  m.render();


  var end = Date.now();
  console.log('Rendered in ' + (end - start) + ' ms');

}

gen(500, 300);
