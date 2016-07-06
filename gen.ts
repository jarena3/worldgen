
function gen(mapX: number, mapY: number) {


var start = Date.now();

    let map = new Worldmap.HeightMap(mapX, mapY);
    map.init();
    Worldmap.rollingParticle(map, 2500, 4000);

    map.render();    

    var end = Date.now();
    console.log('Rendered in ' + (end - start) + ' ms');

}

gen(900, 900);
