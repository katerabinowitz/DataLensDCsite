mapboxgl.accessToken = 'pk.eyJ1IjoiZGF0YWxlbnNkYyIsImEiOiJjaWVnOGttYnMwMDBqc2htM2ZmcjZ4NmZxIn0.9iGQPNKsl1jtP5KriDm3wQ';

        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/light-v9',
            zoom: 11,
            center: [-77.014576, 38.899396]
        });

        map.on('load', function () {
            map.addSource('cabi', {
                type: 'geojson',
                data: 'https://raw.githubusercontent.com/katerabinowitz/DC-Biking/master/bikeinBloom/cabiBloomMap.geojson'
            });

            map.addLayer({
              'id': 'id',
              'type': 'circle',
              'source': 'cabi',
              'paint': {
                'circle-radius': {
                  'property': 'Freq',
                  'type': 'interval',
                  'stops': [
                  [1, 3],
                  [2, 5],
                  [3, 7],
                  [4, 9],
                  [5, 11],
                  [6, 13],
                  [7, 15],
                  [12, 17]]
                },
                'circle-color': '#F38181',
                "circle-opacity": 0.7,
                "circle-stroke-color": "#ffffff"
            }
        });
    });
