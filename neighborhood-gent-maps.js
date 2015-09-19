function initialize() {
      var customOps=
      [
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {"color": "#e9e9e9"
            },
            {"lightness": 17
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {"color": "#f5f5f5"
            },
            {"lightness": 20
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {"color": "#ffffff"
            },
            {"lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {"color": "#ffffff"
            },
            {
                "lightness": 29
            },
            {"weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {"color": "#ffffff"
            },
            {"lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {"color": "#ffffff"
            },
            {"lightness": 16
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {"color": "#f5f5f5"
            },
            {"lightness": 21
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {"color": "#dedede"
            },
            {"lightness": 21
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {"visibility": "off"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {"visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {"color": "#fefefe"
            },
            {"lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {"color": "#fefefe"
            },
            {"lightness": 17
            },
            {"weight": 1.2
            }
        ]
    }
]
      var MY_MAPTYPE_ID = 'custom_style';
      var infowindow = new google.maps.InfoWindow();
      var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(38.8993488,-77.0145665),
        mapTypeControlOptions: {
           mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
        },
        mapTypeId: MY_MAPTYPE_ID,
        streetViewControl: false,
        panControl: false,
        zoomControl:false
      };

      var mapIncome = new google.maps.Map(document.getElementById('map-income'), mapOptions);
      var mapAA = new google.maps.Map(document.getElementById('map-aa'), mapOptions);
      var mapKids = new google.maps.Map(document.getElementById('map-kids'), mapOptions);

      var styledMapOptions= {
        name:'Custom Style'
      };
  
      var customMapType = new google.maps.StyledMapType(
        customOps,styledMapOptions
      );

      mapIncome.mapTypes.set(MY_MAPTYPE_ID,customMapType);
      mapAA.mapTypes.set(MY_MAPTYPE_ID,customMapType);
      mapKids.mapTypes.set(MY_MAPTYPE_ID,customMapType);

      mapIncome.data.loadGeoJson('https://raw.githubusercontent.com/katerabinowitz/DC-Neighborhoods/master/dchoods2.json');
      mapAA.data.loadGeoJson('https://raw.githubusercontent.com/katerabinowitz/DC-Neighborhoods/master/dchoods2.json');
      mapKids.data.loadGeoJson('https://raw.githubusercontent.com/katerabinowitz/DC-Neighborhoods/master/dchoods2.json');

  mapIncome.data.setStyle(function(feature) {
    return {
      fillColor: getIColor(feature.getProperty('INCOME')), 
      fillOpacity: 0.8,
      strokeColor: '#b3b3b3',
      strokeWeight: 1,
      zIndex: 1
    };
  });

  mapAA.data.setStyle(function(feature) {
    return {
      fillColor: getAColor(feature.getProperty('AA')), 
      fillOpacity: 0.8,
      strokeColor: '#b3b3b3',
      strokeWeight: 1,
      zIndex: 1
    };
  });

  mapKids.data.setStyle(function(feature) {
    return {
      fillColor: getKColor(feature.getProperty('KIDS')), 
      fillOpacity: 0.8,
      strokeColor: '#b3b3b3',
      strokeWeight: 1,
      zIndex: 1
    };
  });

  var colors = [
      '#AFAFAF',
      '#edf8fb',
      '#ccece6',
      '#99d8c9',
      '#66c2a4',
      '#2ca25f',
      '#006d2c',
      '#005824'

  ];

  function getIColor(INCOME) {
    return INCOME== null ? colors[0] :
      INCOME < -10 ? colors[1] :
      INCOME < 0 ? colors[2] :
      INCOME < 10 ? colors[3] :
      INCOME < 30 ? colors[4] :
      INCOME < 70 ? colors[5] :
      INCOME < 100 ? colors[6] :
       colors[7]
    }; 

    function getAColor(colorvar) {
    return colorvar== null ? colors[0] :
      colorvar == 0 ? colors[1] :
      colorvar == -1 ? colors[2] :
      colorvar > -5 ? colors[3] :
      colorvar > -10 ? colors[4] :
      colorvar > -20 ? colors[5] :
      colorvar > -30 ? colors[6] :
      colors[7];
    }; 

    function getKColor(colorvar) {
    return colorvar== null ? colors[0] :
      colorvar == -1 ? colors[1] :
      colorvar > -5? colors[2] :
      colorvar > -10 ? colors[3] :
      colorvar > -20 ? colors[4] :
      colorvar > -30 ? colors[5] :
      colorvar > -40 ? colors[6] :
      colors[7];
    }; 

      mapIncome.data.addListener('click', function(event) {
      var name = event.feature.getProperty("NBH_NAMES");
      var income = event.feature.getProperty("INCOME");
      infowindow.setContent("<div id='iw'> <div id='iw-title'>"+ name +"</div><br><p>Income Change: "+ income + "%</p></div>");
      // infowindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
      infowindow.open(mapIncome);
    });

      mapAA.data.addListener('click', function(event) {
      var name = event.feature.getProperty("NBH_NAMES");
      var aa = event.feature.getProperty("AA");
      infowindow.setContent("<div id='iw'> <div id='iw-title'>"+ name +"</div><br><p>Change in Proportion of African Americans: "+ aa + "%</p></div>");
      infowindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
      infowindow.open(mapAA);
    });
 

      mapKids.data.addListener('click', function(event) {
      var name = event.feature.getProperty("NBH_NAMES");
      var kids = event.feature.getProperty("KIDS");
      infowindow.setContent("<div id='iw'> <div id='iw-title'>"+ name +"</div><br><p>Change in Proportion of Children: "+ kids + "%</p></div>");
      infowindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
      infowindow.open(mapKids);
    });

}
   
google.maps.event.addDomListener(window, 'load', initialize);
