mapboxgl.accessToken = 'pk.eyJ1IjoiZGF0YWxlbnNkYyIsImEiOiJjaWVnOGttYnMwMDBqc2htM2ZmcjZ4NmZxIn0.9iGQPNKsl1jtP5KriDm3wQ';
  
 var COLORS =  ['#f0f0f0','#ffffb2','#fecc5c','#fd8d3c','#f03b20','#bd0026'],
    BREAKS = [0.00001, 0.2, 0.4, 0.6, 0.8, 1.0],
    FILTERUSE;

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/datalensdc/ciq9yplgq0004c8m4yry64ltu', 
    center: [-77.0369,38.9072], 
    zoom: 11
});

map.on('load', function () {
            map.addSource('restOpenHoodGeo', {
                type: 'geojson',
                data: 'https://raw.githubusercontent.com/katerabinowitz/DC-FoodandDrink/master/nightlifeGeoChanges/dataOut/restOpenHoodGeo.geojson'
            });

            map.addLayer({
                "id": "hoods",
                "type": "fill",
                "source": "restOpenHoodGeo",
                "paint": {
                    "fill-color": {
                        property: 'post10',
                        stops: [
                    [BREAKS[0], COLORS[0]],
                    [BREAKS[1], COLORS[1]],
                    [BREAKS[2], COLORS[2]],
                    [BREAKS[3], COLORS[3]],
                    [BREAKS[4], COLORS[4]],
                    [BREAKS[5], COLORS[5]]]
                    },
                    "fill-opacity": 0.7,
                    "fill-outline-color": "#f0f0f0"
                }
            });
             })
map.on("mousemove", function (e) {
            var features = map.queryRenderedFeatures(e.point, {
                layers: ["hoods"]
            });

            if (features.length) {
              if (features[0].properties.post10>0) { 
                document.getElementById('tooltip-name').innerHTML = features[0].properties.NAME;
                document.getElementById('tooltip').innerHTML = Math.round(features[0].properties.post10*100) + "%";
              }
              else { 
                document.getElementById('tooltip-name').innerHTML = features[0].properties.NAME;
                document.getElementById('tooltip').innerHTML = Math.round(features[0].properties.post10*100);
              }
            } else {
                document.getElementById('tooltip-name').innerHTML = "";
                document.getElementById('tooltip').innerHTML = "";
            }
        });