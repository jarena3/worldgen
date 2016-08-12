
function gen(mapX: number, mapY: number) {
  var start = Date.now();

  var m = new Maps.PerlinMap(mapX, mapY, 9);
  m.render();


  var end = Date.now();
  console.log('Rendered in ' + (end - start) + ' ms');

}

$("#seaLevel").slider();
$("#seaLevel").on("slide", function(slideEvt) {
	$("#seaLevelSliderVal").text(slideEvt.value.toString());
});

$("#continentOctaves").slider();
$("#continentOctaves").on("slide", function(slideEvt) {
	$("#continentOctavesSliderVal").text(slideEvt.value.toString());
});
$("#continentFrequency").slider();
$("#continentFrequency").on("slide", function(slideEvt) {
	$("#continentFrequencySliderVal").text(slideEvt.value.toString());
});

$("#shelfOctaves").slider();
$("#shelfOctaves").on("slide", function(slideEvt) {
	$("#shelfOctavesSliderVal").text(slideEvt.value.toString());
});
$("#shelfFrequency").slider();
$("#shelfFrequency").on("slide", function(slideEvt) {
	$("#shelfFrequencySliderVal").text(slideEvt.value.toString());
});

//gen(500, 300);
