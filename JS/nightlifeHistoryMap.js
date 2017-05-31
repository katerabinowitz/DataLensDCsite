mapboxgl.accessToken = 'pk.eyJ1IjoiZGF0YWxlbnNkYyIsImEiOiJjaWVnOGttYnMwMDBqc2htM2ZmcjZ4NmZxIn0.9iGQPNKsl1jtP5KriDm3wQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9', 
    center: [-77.0369,38.9072], 
    zoom: 12
});

map.on('load', function() {

  map.addLayer({
    id: 'name',
    type: 'circle',
    source: {
      type: 'geojson',
      data: 'https://raw.githubusercontent.com/katerabinowitz/DC-FoodandDrink/master/nightlifeHistory/nightlife.geojson'
    },
    paint: {
      'circle-radius': 3,
      'circle-color': {
        property: 'firstYr',
        stops: [
          [2008, '#2DC4B2'],
          [2009, '#34BBBA'],
          [2010, '#3BB3C3'],
          [2011, '#669EC4'],
          [2012, '#8B88B6'],
          [2013, '#A2719B'],
          [2014, '#A6678A'],
          [2015, '#AA5E79'],
          [2016, '#BF4674']

        ]
      },
      'circle-opacity': 0.7,
  },

    filter: ['==', 'year', 2008],
  });


  document.getElementById('slider').addEventListener('input', function(e) {
  var year = parseInt(e.target.value);
  map.setFilter('name', ['==', 'year', year]);

  document.getElementById('year').innerText = year;
});

});