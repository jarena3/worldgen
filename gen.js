function gen(mapX, mapY) {
    let map = new Worldmap.HeightMap(mapX, mapY);
    map.init();
    Worldmap.rollingParticle(map, 2500, 4000);
    map.render();
}
gen(900, 900);
