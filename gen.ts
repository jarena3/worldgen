/// <reference path="jquery.d.ts" />
/// <reference path="./map/worldmap.ts"/>

function gen(mapX: number, mapY: number) {
    let map = new Worldmap.HeightMap(mapX, mapY);
    map.init();
    Worldmap.rollingParticle(map, 2500, 4000);

    map.render();

    // let canv = document.createElement("canvas");
    // canv.width = 256;
    // canv.height = 256;
    // document.body.appendChild(canv);
    // let ctx = canv.getContext("2d");
    // let generator = new Generator();
    // return generator.render(ctx, canv.width, canv.height);
}

gen(900, 900);
