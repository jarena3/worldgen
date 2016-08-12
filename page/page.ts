$("#sea-level").slider();
$("#sea-level").on("slide", function(slideEvt) {
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


$('#generate-btn').click(function () {
  var sizeX = $('#world-max-width').val();
  var sizeY = $('#world-max-height').val();
  var freq = $('#continentFrequency').val();
  var seaLevel = $('#sea-level').val();
  gen(sizeX, sizeY, freq, seaLevel);
})
