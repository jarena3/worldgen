function gen(mapX, mapY, frequency, seaLevel) {
    var start = Date.now();
    var m = new Maps.PerlinMap(mapX, mapY, frequency, seaLevel);
    m.render();
    var end = Date.now();
    console.log('Rendered in ' + (end - start) + ' ms');
}
