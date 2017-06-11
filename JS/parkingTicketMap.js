(function() {
L.mapbox.accessToken = 'pk.eyJ1IjoiZGF0YWxlbnNkYyIsImEiOiJjaWVnOGttYnMwMDBqc2htM2ZmcjZ4NmZxIn0.9iGQPNKsl1jtP5KriDm3wQ';
  var map = L.mapbox.map('map', 'mapbox.light')
    .setView([38, -97], 4);
  map.legendControl.addLegend(document.getElementById('legend').innerHTML);
  var popup = new L.Popup({ autoPan: false });



  $.getJSON("https://raw.githubusercontent.com/katerabinowitz/DC-Transportation/master/Parking%20Tickets/StatePTMap.geojson", function(response) {
            console.log("response", response);
            var geojsonLayer = new L.GeoJSON(response, {
                  style: getStyle,
                  onEachFeature: onEachFeature
            }).addTo(map); 
            });   

function getStyle(feature) {
      return {
          weight: 2,
          opacity: 0.1,
          color: 'gray',
          fillOpacity: 0.7,
          fillColor: getColor(feature.properties.Tickets)
      };
  }

  function getColor(d) {
      return d > 25000 ? '#016c59' :
          d > 10000  ? '#1c9099' :
          d > 5000   ? '#67a9cf' :
          d > 1000   ? '#a6bddb' :
          d > 500   ? '#d0d1e6' :
          '#f6eff7';
  }

  function onEachFeature(feature, layer) {
      layer.on({
          mousemove: mousemove,
          mouseout: mouseout,
          click: zoomToFeature
      });
  }

  var closeTooltip;

  function mousemove(e) {
      var layer = e.target;

      popup.setLatLng(e.latlng);
      popup.setContent('<div class="marker-title">' + layer.feature.properties.NAME + '</div>' +
          layer.feature.properties.Tickets + ' parking tickets');

      if (!popup._map) popup.openOn(map);
      window.clearTimeout(closeTooltip);

      // highlight feature
      layer.setStyle({
          weight: 3,
          opacity: 0.3,
          fillOpacity: 0.9
      });

      if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
      }
  }

  function mouseout(e) {
      geojsonLayer.resetStyle(e.target);
      closeTooltip = window.setTimeout(function() {
          map.closePopup();
      }, 100);
  }

  function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
  }
})();
  