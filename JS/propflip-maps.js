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

      var mapFlip = new google.maps.Map(document.getElementById('map-flip'), mapOptions);
      var ShortmapFlip = new google.maps.Map(document.getElementById('short-map-flip'), mapOptions);

      var styledMapOptions= {
        name:'Custom Style'
      };
  
      var customMapType = new google.maps.StyledMapType(
        customOps,styledMapOptions
      );
      mapFlip.mapTypes.set(MY_MAPTYPE_ID,customMapType);
      ShortmapFlip.mapTypes.set(MY_MAPTYPE_ID,customMapType);

      mapFlip.data.loadGeoJson('https://raw.githubusercontent.com/katerabinowitz/Prop-Flip-Analysis/master/fullhistorymap.geojson');
      ShortmapFlip.data.loadGeoJson('https://raw.githubusercontent.com/katerabinowitz/Prop-Flip-Analysis/master/shorthistorymap.geojson');

  mapFlip.data.setStyle(function(feature) {
    return {
      fillColor: getColor(feature.getProperty('flipsale')), 
      fillOpacity: 0.8,
      strokeColor: '#b3b3b3',
      strokeWeight: 1,
      zIndex: 1
    };
  });

    ShortmapFlip.data.setStyle(function(feature) {
    return {
      fillColor: getSColor(feature.getProperty('flipsale')), 
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
      '#006d2c'
  ];

    function getColor(colorvar) {
    return colorvar== null ? colors[0] :
      colorvar == 0 ? colors[1] :
      colorvar < 10? colors[2] :
      colorvar < 50 ? colors[3] :
      colorvar < 150 ? colors[4] :
      colorvar < 300 ? colors[5] :
      colors[6];
    }; 

    function getSColor(colorvar) {
    return colorvar== null ? colors[0] :
      colorvar == 0 ? colors[1] :
      colorvar < 5? colors[2] :
      colorvar < 10 ? colors[3] :
      colorvar < 30 ? colors[4] :
      colorvar < 50 ? colors[5] :
      colors[6];
    }; 

      mapFlip.data.addListener('click', function(event) {
      var name = event.feature.getProperty("subhood");
      var flip = event.feature.getProperty("flipsale");
      infowindow.setContent("<div id='iw'> <div id='iw-title'>"+ name +"</div><br><p>Flipped Properties: "+ flip + "</p></div>");
      //infowindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
      infowindow.open(mapFlip);
    });

      ShortmapFlip.data.addListener('click', function(event) {
      var name = event.feature.getProperty("subhood");
      var flip = event.feature.getProperty("flipsale");
      infowindow.setContent("<div id='iw'> <div id='iw-title'>"+ name +"</div><br><p>Flipped Properties: "+ flip + "</p></div>");
      //infowindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
      infowindow.open(ShortmapFlip);
    });

}
   
google.maps.event.addDomListener(window, 'load', initialize);
