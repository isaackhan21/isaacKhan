




var bounds;
var center;


if(this.map) {
  this.map.remove();
}

var southWest = L.latLng(-90,-180);
var northEast = L.latLng(90, 180); 

var maxBoundArea = L.latLngBounds(southWest, northEast);
  var map = L.map('map', {
    maxBounds: maxBoundArea,
    maxBoundsViscosity: 1.0
  }).setView([
    51.417077903315516, -0.92503485998256], 3);


 
    




  L.tileLayer('https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=9ozwfjgp6x7RQtrlX5wH', {
      attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
      noWrap: true,
      minZoom: 3
  }).addTo(map);

  



  function fetchData(countryCode, twoDigitCountryCode, countryName){






   
    
    var countryMarkersGroup = L.markerClusterGroup.layerSupport({
      disableClusteringAtZoom: 19,
      maxClusterRadius: 100,
      spiderfyOnMaxZoom: false,
      clusteredLayerSupport: true,
     
    
    });
    
    
    
    
      
    
    
     var customCountryMarker;
    
    function fetchCountryData(countryCode) {
      $('#countryTable tbody tr#cityData').remove();
      $('#cityDestinationTable tbody tr#cityDestinationData').remove();
      $('#earthQuakeTable tbody tr#earthQuakeData').remove();
      $('#weatherTable tbody tr#weatherData').remove();
      $('#wikiTable tbody tr#wikiData').remove();
      $('#flightTable tbody tr#flightData').remove();
      
      $.ajax({
        url: "libs/php/restCountriesAPI.php",
        type: "POST",
        data: { countryCode: countryCode },
        dataType: 'json',
        success: function(data) {
         
          
    
          customCountryMarker = L.divIcon({
            className: 'custom-marker',
            html: `<div><img src="${data.flags.svg}"></div>`,
            iconSize: [65, 65],
            iconAnchor: [25, 50],
            popupAnchor: [0, -50]
          });
    
          
    capitalCity = data.capital;
    
    
    
    

      $('#firstName').html(data.name);
      $("#countryFlag").html(`<img src='${data.flag}' height="50" width="50"/>`);
      $('#capital-city').html(data.capital);
      $('#population').html(data.population ? numberWithCommas(data.population) : 'No Data');
      $('#currency').html(`(${data.currencies[0].symbol}) ${data.currencies[0].name}`);

      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

    
    
    
    
    
    
    
    const countryMarker = L.marker(center, {icon: customCountryMarker});
    
    const countryPopUpContent = `
    <div class="country-info-container">
    <div class="country-flag-div">
      <div class="country-flag-container">
        <img src="${data.flags.svg}" class="country-flag"/>
      </div>
      </div>
      <h3 class="country-name">${data.name}</h3>
      <h6 class="country-capital">Capital: ${data.capital}</h6>
      <h6 class="country-currency">Currency: (${data.currencies[0].symbol}) ${data.currencies[0].name}</h6>
      <h6 class="country-population">Population: ${data.population ? data.population.toLocaleString() : 'No Data'}</h6>
    </div>
    
    
    `;
    countryMarker.bindPopup(countryPopUpContent).openPopup();
    countryMarkers.addLayer(countryMarker);
    
    
    
          
          
          
        
          
        },
        error: function(jqXHR, textStatus, errorThrown) {
          
        }
    });
    }
    getBoundingBoxes();
    
    
    
      var earthquakeMarkersGroup = L.markerClusterGroup.layerSupport({
        
        disableClusteringAtZoom: 18,
        maxClusterRadius: 50,
        clusteredLayerSupport: true,
        iconCreateFunction: function(cluster) {
          var childCount = cluster.getChildCount();
          var c = ' marker-cluster-';
          if (childCount < 10) {
            c += 'small';
          } else if (childCount < 100) {
            c += 'medium';
          } else {
            c += 'large';
          }
          return new L.DivIcon({
            html: '<div><span>' + childCount + '</span></div>',
            className: 'marker-cluster' + c,
            iconSize: new L.Point(40, 40),
          });
        },
      });
    
      var northCoord;
      var southCoord;
      var eastCoord;
      var westCoord;
    
     
      var bboxes;
    
        function getBoundingBoxes() {
          $.ajax({
            url: "libs/php/getBoundingBoxes.php",
            type: 'POST',
            dataType: "json",
            success: function(data) {
             
              bboxes = data.data.bboxes;
              
              northCoord = bboxes[String(twoDigitCountryCode)][1][3];
              
              southCoord = bboxes[String(twoDigitCountryCode)][1][1];
              eastCoord = bboxes[String(twoDigitCountryCode)][1][2];
              westCoord = bboxes[String(twoDigitCountryCode)][1][0];
              
              getCities(northCoord, southCoord, eastCoord, westCoord);
              fetchCountryData(countryCode);
              getCityData(twoDigitCountryCode);
              
              
              getEarthquakeData(northCoord, southCoord, eastCoord, westCoord);
              getWikiData(northCoord, southCoord, eastCoord, westCoord);
              
              
              
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
              console.log('Error:', textStatus, errorThrown);
              console.log('There is an error');
            }
          });
        }
    
       
    
       
         
    
        var wikiMarkersGroup = L.markerClusterGroup.layerSupport({
          disableClusteringAtZoom: 19,
          maxClusterRadius: 100,
          spiderfyOnMaxZoom: false,
          clusteredLayerSupport: true,
          
        
        });
      
    
        
    
       
    
           
        
    
          var weatherMarkersGroup = L.markerClusterGroup.layerSupport({
            disableClusteringAtZoom: 19,
            maxClusterRadius: 100,
            spiderfyOnMaxZoom: false,
            clusteredLayerSupport: true,
          
          });
    
       
    
        
    
          var cityDestinationsMarkersGroup = L.markerClusterGroup.layerSupport({
                              
            disableClusteringAtZoom: 19,
            maxClusterRadius: 100,
            spiderfyOnMaxZoom: false,
            clusteredLayerSupport: true,
          });
    
             
             
        

          function addEarthquakeDataToTable(earthquake) {
            let $tr = $('<tr>').attr('id', 'earthQuakeData');
          
            let $iconTd = $('<td>').addClass('icon-td');
          
            let $icon = $('<i>').addClass('fas fa-exclamation-triangle icon').addClass('icon')
          
            let $earthquakeLocation = $('<span>').text(earthquake.location ? earthquake.location : 'No Data').addClass('earthquake-location');
          
            $iconTd.append($icon, $earthquakeLocation);
          
            let $valueTd = $('<td>').addClass('value-td');
          
            let $magnitude = $('<div>').text('Magnitude: ' + (earthquake.magnitude ? earthquake.magnitude.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : 'No Data')).addClass('magnitude');
          
            let $depth = $('<div>').text('Depth: ' + (earthquake.depth ? earthquake.depth.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + ' km' : 'No Data')).addClass('depth');
          
            let $datetime = $('<div>').text('Date/Time: ' + (earthquake.datetime ? new Date(earthquake.datetime).toLocaleString() : 'No Data')).addClass('datetime');
          
            $valueTd.append($magnitude, $depth, $datetime);
          
            $tr.append($iconTd, $valueTd);
          
            $('#earthQuakeTable tbody').append($tr);
          }
          
          
            
    
            
    
           
            
            
          
          
            
            
    
    
            function getEarthquakeData(north, south, east, west) {
              $.ajax({
                type: 'GET',
                url: 'libs/php/earthquakeAPI.php',
                data: {
                  north: north,
                  south: south,
                  east: east,
                  west: west,
                  
                },
                dataType: 'json',
                success: function(response) {
                  
                  
                  response.data.forEach(eq => {
                    getEarthquakeCoordData(eq.lat, eq.lng, eq.magnitude, eq.depth, eq.datetime);
                    
                  });
                },
                error: function(jqXHR, textStatus, errorThrown) {
                  console.log('Error:', textStatus, errorThrown);
                  console.log('There is an error');
                }
              });
            }
            var earthquakeLocation;
            var earthquakeMarker;
            function getEarthquakeCoordData(lat, lng, magnitude, depth, datetime) {
              $.ajax({
                type: 'GET',
                url: 'libs/php/openCageAPI.php',
                data: {
                  lat: lat,
                  lng: lng,
                },
                dataType: 'json',
                success: function(response) {
                  
                  earthquakeLocation = response.results[0].formatted;
                  
                  
                  addEarthquakeDataToTable({
                    location: earthquakeLocation,
                    magnitude: magnitude,
                    depth: depth,
                    datetime: datetime
                  });
                  earthquakeMarker = L.circleMarker([lat, lng], {
                    radius: magnitude * 2,
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5
                  });
                  
                  earthquakeMarker.bindPopup(`<div class="earthquake-location">
                  <h3><i class="fas fa-exclamation-triangle"></i> Earthquake Location</h3>
                  <h6>${earthquakeLocation}</h6>
                </div>
                <br>
                <div class="earthquake-info">
                  <div><b>Date/Time:</b> ${new Date(datetime).toLocaleString()}</div>
                  <div><b>Depth:</b> ${depth.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} km</div>
                  <div><b>Magnitude:</b> ${magnitude.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                </div>
                
                `);
    
                  earthquakeMarkersGroup.addLayer(earthquakeMarker);
                  
                  
                },
                error: function(jqXHR, textStatus, errorThrown) {
                  console.log('Error:', textStatus, errorThrown);
                  console.log('There is an error');
                }
              });
            }
            earthquakeMarkers.addLayer(earthquakeMarkersGroup);
    
            
           
    
            
          
    
            
            var wikiTitle;
            var wikiSummary;
            var wikiLat;
            var wikiLng;
            var wikiUrl;
            var wikiData;
    
            function addWikiDataToTable(wiki) {
              let $tr = $('<tr>').attr('id', 'wikiData');
            
              
              let $iconTd = $('<td>').addClass('icon-td');
            
              let $icon = $('<i>').addClass('fab fa-wikipedia-w icon');
            
              let $wikiTitle = $('<span>').text(wiki.title ? wiki.title : 'No Data').addClass('title');
            
              $iconTd.append($icon, $wikiTitle);
            
              
              let $valueTd = $('<td>').addClass('value-td');
            
              let $wikiSummary = $('<div>').text(wiki.summary ? wiki.summary : 'No Data').addClass('summary');
            
              let $wikiButton = $('<a>').text('Read More').addClass('btn btn-primary button');
            
              if (wiki.wikipediaUrl) {
                $wikiButton.attr('href', wiki.wikipediaUrl).attr('target', '_blank');
              } else {
                $wikiButton.addClass('disabled').attr('disabled', 'disabled');
              }
            
              $valueTd.append($wikiSummary, $wikiButton);
            
              $tr.append($iconTd, $valueTd);
            
              $('#wikiTable tbody').append($tr);
            }
            
    
            
            
            
            
            
            
            
            
            
            
    
            function getWikiData(north, south, east, west) {
              $.ajax({
                type: 'GET',
                url: 'libs/php/wikiAPI.php',
                data: {
                  north: north,
                  south: south,
                  east: east,
                  west: west,
                },
                dataType: 'json',
                success: function(data) {
                  
                  wikiData = data.data;
                 
                  
                  for (var i = 0; i < wikiData.length; i++) {
                    
                    wikiTitle = wikiData[i].title;
                    wikiSummary = wikiData[i].summary;
                    wikiLat = wikiData[i].lat;
                    wikiLng = wikiData[i].lng;
                    wikiUrl = 'https://' + wikiData[i].wikipediaUrl;
    
                    
    
                    addWikiDataToTable({
                      title: wikiTitle,
                      summary: wikiSummary,
                      wikipediaUrl: wikiUrl,
                      lat: wikiLat,
                      lng: wikiLng
                    });
    
                    var customIconOptions = {
                      className: "my-wiki-icon", 
                      iconSize: [32, 32], 
                    };
              
                    var wikiCustomIcon = L.divIcon({
                      ...customIconOptions,
                      html:
                        '<div>' +
                        '<i class="fa-brands fa-wikipedia-w"></i>' +
                        "</div>",
                    });
    
                    var container = L.DomUtil.create('div', 'wikipedia-container');
    
                
                    var link = L.DomUtil.create('a', 'wikipedia-link', container);
                    link.href = wikiUrl;
                    link.textContent = wikiTitle;
        
                    
                    var summaryEl = L.DomUtil.create('div', 'wikipedia-summary', container);
                    summaryEl.textContent = wikiSummary;
        
                    var markerContent = "<div class='marker-title'>" + wikiTitle + "</div>" +
                  "<div class='marker-summary'>" + wikiSummary + "</div>" +
                  "<a class='marker-link' href='" + link + "'>Read more on Wikipedia</a>";
    
                  var wikiMarker = L.marker([wikiLat, wikiLng], { icon: wikiCustomIcon }).addTo(wikiMarkersGroup);
    
                  wikiMarker.bindPopup(markerContent);
                  wikiMarkersGroup.addLayer(wikiMarker);
                  }
                  wikiMarkers.addLayer(wikiMarkersGroup);
                  
                  
                },
                error: function(jqXHR, textStatus, errorThrown) {
                  console.log('Error:', textStatus, errorThrown);
                  console.log('There is an error');
                }
              });
            }
        
    
            
    
            let cities = [];
            let city;
            let cityUpperCase;
       
    
           
    
            
    
            function getCities(north, south, east, west) {
              
              $.ajax({
                type: 'POST',
                url: 'libs/php/cities.php',
                data: {
                  north: north,
                  south: south,
                  east: east,
                  west: west
                },
                dataType: 'json',
                success: function(data) {
                 
                  geonamesData = data.data;
                  
    
                  
                  
                  
                  for (let i = 0; i < geonamesData.length; i++) {
                      city = geonamesData[i];
                      if (city.countrycode == twoDigitCountryCode) {
                        cities.push(city.name);
                      }
                  }
                  
                  
                  
                  
                  for (let i = 0; i < cities.length; i++) {
                    city = cities[i].toLowerCase();
                    cityUpperCase = cities[i];
                    
                    
                    getWeather(cityUpperCase);
                    
                    
                    
                    
                    getRoadGoatSlugData(cityUpperCase);
                  }
                
        
    
    
    
                  },
                  error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Error:', textStatus, errorThrown);
                  }
                  
                });
              
              }
    
           

              function addCityDataToTable(city) {
                let $tr = $('<tr>').attr('id', 'cityData');
                          
                let $iconTd = $('<td>');
                let $icon = $('<i>').addClass('fas fa-city');
                let $cityName = $('<span>').text(city.name ? city.name : 'No Data');
                          
                $iconTd.append($icon, $cityName);
                          
                let $valueTd = $('<td>');
                          
                let population = city.population ? city.population.toLocaleString() : 'No Data';
                let $population = $('<div>').text('Population: ' + population);
                
                let wikipediaLink = city.wikipedia ? `<a href="${city.wikipedia}" target="_blank">${city.name}</a>` : 'No Data';
                let $wikipedia = $('<div>').html('Wikipedia: ' + wikipediaLink);
                
                let $timezone = $('<div>').text('Timezone: ' + (city.timezone ? city.timezone : 'No Data'));
                
                let latitude = city.lat ? city.lat.toFixed(4) : 'No Data';
                let $latitude = $('<div>').text('Latitude: ' + latitude);
                
                let longitude = city.lng ? city.lng.toFixed(4) : 'No Data';
                let $longitude = $('<div>').text('Longitude: ' + longitude);
                
                $valueTd.append($population, $wikipedia, $timezone, $latitude, $longitude);
                          
                $tr.append($iconTd, $valueTd);
                          
                $('#countryTable tbody').append($tr);
              }
              
              
    
             
              
              
              
              
              
              
    
              
    
                  
              function getCityData(countryCode) {
                
                $.ajax({
                  type: 'GET',
                  url: 'libs/php/getCityInfoAPI.php',
                  data: {
                    countryCode: countryCode
                  },
                  
                  dataType: 'json',
                  success: function(data) {
    
                    var customIconOptions = {
                      className: "my-city-icon", 
                      iconSize: [32, 32], 
                    };
    
                      var customCityIcon = L.divIcon({
                      ...customIconOptions,
                      html:
                        '<div>' +
                        '<i class="fas fa-city"></i>' +
                        "</div>",
                    });
                    
                    for (let i = 0; i < 50 && i < data.response.length; i++) {
                      let city = data.response[i];
                      addCityDataToTable(city);
                      let cityInfoMarker = L.marker([city.lat, city.lng], {icon: customCityIcon, keyboard: false,}).addTo(countryMarkersGroup);
                      cityInfoMarker.bindPopup(`  
                      <div class="city-details">
                      <i class="fas fa-city city-icon"></i>
                      <br>
                      <h1 class="city-name">${city.name ? city.name : 'No Data'}</h1>
                  
                      
                      <div class="city-population">Population: ${city.population ? city.population.toLocaleString() : 'No Data'}</div>
                  
                      
                      <div class="city-wikipedia">Wikipedia: ${city.wikipedia ? `<a href="${city.wikipedia}" target="_blank">${city.name}</a>` : 'No Data'}</div>
                  
                      
                      <div class="city-timezone">Timezone: ${city.timezone ? city.timezone : 'No Data'}</div>
                  
                      
                      <div class="city-latitude">Latitude: ${city.lat ? city.lat : 'No Data'}</div>
                      
                      <div class="city-longitude">Longitude: ${city.lng ? city.lng : 'No Data'}</div>
                  </div>
                  
                    
                  
                    
                       `);
                  countryMarkersGroup.addLayer(cityInfoMarker);
                  countryMarkers.addLayer(countryMarkersGroup);
                 
                  }
                  
                    
                
                    
                    
    
                   
                
                  },
                  error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Error:', textStatus, errorThrown);
                    console.log('There is an error');
                  }
                });
              }
              
           
                
                   
        
                    
    
                 
    
                    var roadGoatCitySlug;
    
                   function getRoadGoatSlugData(city) {
                      $.ajax({
                        type: 'GET',
                        url: 'libs/php/roadgoatDestinationsSlug.php',
                        data: {
                          city: city
                        },
                        dataType: 'json',
                        success: function(response) {
                          if (response !== null) {
                         
                            roadGoatCitySlug = response.citySlug;
                            
                            getRoadGoatData(roadGoatCitySlug);
                        } else {
                            console.log('Response is null');
                        }
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                          console.log('Error:', textStatus, errorThrown);
                          console.log('There is an error');
                        }
                      });
                    }
    
                    function addCityDestinationDataToTable(city_short_name, average_rating, travel_guide, airbnb, alltrails, getyourguide, google_events, safetyText, covidText, travelCostText) {
                      let $tr = $('<tr>').attr('id', 'cityDestinationData');
                      
                      let $iconTd = $('<td>').addClass('icon-column');
                      
                      let $icon = $('<i>').addClass('fas fa-map-location icon');
                      
                      let $cityName = $('<span>').text(city_short_name ? city_short_name : 'No Data').addClass('city-name');
                      
                      let $cityInfo = $('<div>').addClass('city-info');
                      $cityInfo.append($icon, $cityName);
                      
                      $iconTd.append($cityInfo);
                      
                      let $valueTd = $('<td>').addClass('value-column');
                      
                      let $averageRating = $('<div>').html('Road Goat Average Rating: ' + (average_rating % 1 !== 0 ? average_rating.toFixed(1) : average_rating)).addClass('average-rating');
                      
                      let $travelGuide = $('<div>').html('Travel Guide: <a href="' + travel_guide + '" target="_blank">RoadGoat</a>').addClass('travel-guide');
                      
                      let $airbnb = $('<div>').html('Airbnb: <a href="' + airbnb + '" target="_blank">Go To Website</a>').addClass('airbnb');
                      
                      let $alltrails = $('<div>').html('Alltrails: <a href="' + alltrails + '" target="_blank">Go To Website</a>').addClass('alltrails');
                      
                      let $getyourguide = $('<div>').html('Get your Guide: <a href="' + getyourguide + '" target="_blank">Go To Website</a>').addClass('getyourguide');
                      
                      let $googleEvents = $('<div>').html('Google Events: <a href="' + google_events + '" target="_blank">Go To Website</a>').addClass('google-events');
                  
                      let $safety = $('<div>').html('Safety: <strong>' + safetyText + '</strong>').addClass('safety');
                  
                      let $covid = $('<div>').html('Covid: <strong>' + covidText + '</strong>').addClass('covid');
                            
                      let $travelCost = $('<div>').html('Travel Cost: <strong>' + travelCostText + '</strong>').addClass('travel-cost');
                      
                      $valueTd.append($averageRating, $travelGuide, $airbnb, $alltrails, $getyourguide, $googleEvents, $safety, $covid, $travelCost );
                      
                      $tr.append($iconTd, $valueTd);
                      
                      $('#cityDestinationTable tbody').append($tr);
                  }
                  
    
                 
    
                     
                      
    
                    function getRoadGoatData(citySlug) {
                      $.ajax({
                        type: 'GET',
                        url: 'libs/php/roadgoatDestinations.php',
                        data: {
                          citySlug: citySlug
                        },
                        dataType: 'json',
                        success: function(data) {
                        
                          
                          
    
                          const covidData = data.data.attributes.covid;
                          
                          const city_short_name = data.data.attributes.short_name;
                          
    
                         
                          let covidText;
    
                          if (Object.entries(covidData).length === 0) {
                            
                            covidText = 'No Data';
                            
                          } else {
                            Object.entries(covidData).forEach(([name, covid]) => {
                              if (countryName.toLowerCase().includes(name.toLowerCase())) {
                                
                                covidText = covid.text ?? 'No Data';
                                
                              }
                            });
                          }
                          
        
                          
                          
                        
                          
                          const travelCostData = data.data.attributes.budget;
                          let travelCostText;
          
                          if (Object.entries(travelCostData).length === 0) {
                            
                            travelCostText = 'No Data';
                            
                          } else {
                          Object.entries(travelCostData).forEach(([name, travelCost]) => {
                            if (name.toLowerCase().includes(city_short_name.toLowerCase()) || countryName.toLowerCase().includes(name.toLowerCase())) {
                              
                              travelCostText = travelCost.text ?? 'No Data';
                              
                            }
                            
                          });
                        }
                          const safetyData = data.data.attributes.safety;
                          let safetyText;
            
                          if (Object.entries(safetyData).length === 0) {
                            
                            safetyText = 'No Data';
                            
                          } else {
                          Object.entries(safetyData).forEach(([name, safety]) => {
                            if (name.toLowerCase().includes(city_short_name.toLowerCase()) || countryName.toLowerCase().includes(name.toLowerCase())) {
                              
                              safetyText = safety.text || 'No Data';
                              
                            }
                            
                          });
                        }
    
                          var customIconOptions = {
                            className: "my-roadgoat-icon", 
                            iconSize: [32, 32], 
                          };
    
                          var cityInfoCustomIcon = L.divIcon({
                            ...customIconOptions,
                            html:
                              '<div>' +
                              '<i class="fa-solid fa-map-location"></i>' +
                              "</div>",
                          });
    
                          const average_rating = data.data.attributes.average_rating;
                          const airbnb = data.data.attributes.airbnb_url;
                          const alltrails = data.data.attributes.alltrails_url;
                          
                          const getyourguide = data.data.attributes.getyourguide_url;
                          const google_events = data.data.attributes.google_events_url;
                          const travel_guide = data.data.attributes.url;
    
                          addCityDestinationDataToTable(city_short_name, average_rating, travel_guide, airbnb, alltrails, getyourguide, google_events, safetyText, covidText, travelCostText);
                         
                          
                          
                          
                          const cityMarker = L.marker([data.data.attributes.latitude, data.data.attributes.longitude], {icon: cityInfoCustomIcon}).addTo(cityDestinationsMarkersGroup);
                          cityMarker.bindPopup(`<div class="roadgoat-container">
                          <div class="roadgoat-heading">
                            <h2 class="roadgoat-title">RoadGoat Travel Guides</h2>
                            <br>
                            <i class="fa-solid fa-map-location roadgoat-icon"></i>
                            <br>
                            <span class="city-name"> ${city_short_name}</span>
                          
                            <span class="roadgoat-info">Road Goat Average Rating: ${average_rating % 1 !== 0 ? average_rating.toFixed(1) : average_rating}</span>
                        
                            <span class="roadgoat-info">Travel guide: <a href="${travel_guide}" target="_blank">RoadGoat</a></span>
                            <br>
                          </div>
                          <div class="lodging-container">
                            <h2 class="lodging-title">Lodging</h2>
                            <span class="lodging-info">Airbnb: <a href="${airbnb}" target="_blank">Go To Website</a></span>
                            <br>
                          </div>
                          <div class="things-to-do-container">
                            <h2 class="things-to-do-title">Best Things To Do</h2>
                            <span class="things-to-do-info">Alltrails: <a href="${alltrails}" target="_blank">Go To Website</a></span>
                            
                            <span class="things-to-do-info">Get your Guide: <a href="${getyourguide}" target="_blank">Go To Website</a></span>
                            
                            <span class="things-to-do-info-last">Google Events: <a href="${google_events}" target="_blank">Go To Website</a></span>
                            
                          </div>
                          <div class="keep-in-mind-container">
                            <h2 class="keep-in-mind-title">Keep in mind</h2>
                            <div class="keep-in-mind-container-info">
                            <span class="keep-in-mind-info">Safety: <strong class="info-value">${safetyText ? safetyText : "No Data"}</strong></span>
                            <span class="keep-in-mind-info">Covid: <strong class="info-value">${covidText ? covidText : 'No Data'}</strong></span>
                            <span class="keep-in-mind-info">Travel Cost: <strong class="info-value">${travelCostText ? travelCostText : "No Data"}</strong></span>
                            </div>
                          </div>
                        </div>
                        `
                  
                        
                          )
                          cityDestinationsMarkersGroup.addLayer(cityMarker);
                          cityDestinationMarkers.addLayer(cityDestinationsMarkersGroup);
                              
                          
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                          console.log('Error:', textStatus, errorThrown);
                          console.log('There is an error');
                        }
                      });
                    }
    
                    function addWeatherDataToTable(weatherData) {
                      let $tr = $('<tr>').attr('id', 'weatherData');
                    
                      let $iconTd = $('<td>').addClass('icon-td');
                    
                      let $iconBox = $('<div>').addClass('icon-box');
                    
                      let $icon = $('<img>').attr('src', `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`).addClass('icon');
                    
                      let $cityDiv = $('<div>').addClass('city-div');
                    
                      let $cityName = $('<span>').text(weatherData.name ? weatherData.name : 'No Data').addClass('city-name');
                    
                      $iconBox.append($icon);
                      $cityDiv.append($cityName);
                      $iconTd.append($iconBox, $cityDiv);
                    
                      let $valueTd = $('<td>').addClass('value-td');
                    
                      let $temperature = $('<div>').text('Temperature: ' + Math.round(weatherData.main.temp - 273.15) + '°C').addClass('temperature');
                    
                      let $humidity = $('<div>').text('Humidity: ' + weatherData.main.humidity + '%').addClass('humidity');
                    
                      let $windSpeed = $('<div>').text('Wind Speed: ' + weatherData.wind.speed + ' km/h').addClass('wind-speed');
                    
                      let $weather = $('<div>').text('Weather: ' + weatherData.weather[0].main).addClass('weather');
                    
                      $valueTd.append($temperature, $humidity, $windSpeed, $weather);
                    
                      $tr.append($iconTd, $valueTd);
                    
                      $('#weatherTable tbody').append($tr);
                    }
                    
    
                   
                    
                    
    
                  
                    
                    
    
                   
                    
                    
                    
    
                  
                    var weatherData;
    
                    function getWeather(cityName) {
                      $.ajax({
                        type: 'GET',
                        url: 'libs/php/weatherAPI.php',
                        data: {
                          cityName: cityName
                        },
                        dataType: 'json',
                        success: function(data) {
                         
                         
                          weatherData = data.data;
                          addWeatherDataToTable(weatherData);
          
                          var weatherMarkerIcon = L.divIcon({
                              html: `<div><img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" alt="Weather Icon"></div>`,
                              className: 'weather-marker-icon',
                              
                              iconAnchor: [25, 50],
                              popupAnchor: [0, -50]
                          });
        
          
                                  
                                  const weatherMarker = L.marker([weatherData.coord.lat, weatherData.coord.lon], {icon: weatherMarkerIcon});
                     
                                  
                                  weatherMarker.bindPopup(`
                                  <div class="weather-container">
                                    <h2 class="weather-heading">Current Weather</h2>
                                    <h3 class="weather-city">${cityName}</h3>
                                    
                                    <div class="weather-icon-container">
                                      <div class="weather-icon-background">
                                        <img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" class="weather-icon"/>
                                      </div>
                                    </div>
                                    
                                    
                                  <div class="weather-description">${weatherData.weather[0].main}</div>
                                  <div class="weather-temp">${Math.round(weatherData.main.temp - 273.15)}°C</div>
                                  <div class="weather-info-container">
                                    <div class="weather-info">
                                      <div class="weather-info-icon">
                                        <span>H</span>
                                      </div>
                                      <div class="weather-info-text">${weatherData.main.humidity}% humidity</div>
                                    </div>
                                    <div class="weather-wind-info">
                                      <div class="weather-info-icon weather-wind-icon">
                                        <span>W</span>
                                      </div>
                                      <div class="weather-info-text">${weatherData.wind.speed} km/h wind speed</div>
                                    </div>
                                      </div>
                                    </div
    
                                 
                                `, { closeButton: false });
    
                           
                                  
                                  weatherMarkersGroup.addLayer(weatherMarker);
                                  weatherMarkers.addLayer(weatherMarkersGroup);
                          
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                          console.log('Error:', textStatus, errorThrown);
                          console.log('There is an error');
                        }
                      });
                    }
    
                   
    
    
                    
                    
    
          
               
                    
          
                   
                          
                      
                    
                  }
    
      
      




  

window.shouldFitBounds = false;






$("#btnModal").click(function() { 
  if ($(this).text() == "Close Modal") { 
      $(this).text("Open Modal"); 
  } else { 
      $(this).text("Close Modal");
      modal();
  }; 
});

$('#modal').on('hidden.bs.modal', function() {
  $('#btnModal').text('Open Modal');
  $('#countrySelect').removeClass('disabled');
});

function modal() {
 
  $('#modal').modal({
    backdrop: false,
    show: true
  });

  $('.modal-backdrop').remove();

 



  
    $('#modal').modal('show');

    $('body').removeClass('modal-open');

    $('#countrySelect').addClass('disabled');

}









var lat;
var long;
var countryCode;
var countryName;





var border;
$(document).ready(function() {
  
  $('#earthQuakeTable').hide();
  $('#wikiTable').hide();
  $('#flightTable').hide();
  $('#weatherTable').hide();
  $('#cityDestinationTable').hide();
  $('.modal-header').css('background-color', 'green');
 
 


  
  
  window.country = L.featureGroup().addTo(map);
  window.weatherMarkers = L.featureGroup()
  window.earthquakeMarkers = L.featureGroup()
  window.wikiMarkers = L.featureGroup()
  window.planeMarkers = L.featureGroup()

  window.cityDestinationMarkers = L.featureGroup()
  window.countryMarkers = L.featureGroup().addTo(country);
  
  modal();
  
 

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else { 
    
    console.log('Geolocation not supported');
   
    }

    function showError(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          console.log("User denied the request for Geolocation.");
          function getCountryCodes() {
            $.ajax({
              url: "libs/php/getCountryCodes.php",
              type: 'POST',
              dataType: "json",
              success: function(data) {
                var countryCodesArray = [];
                
                for (var i=0; i<data.data.iso2_codes.length; i++) {
                  countryCodesArray.push(data.data.iso2_codes[i]);
                }
                
                getCountries(countryCodesArray);
                
               
                
                
                
              
              },
              error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error:', textStatus, errorThrown);
                console.log('There is an error');
              }
            });
          }
      
          
          getCountryCodes();
       
        
      
       
      
              
      
              
              function fetchCountryGeometry(countryCode) {
                $.ajax({
                  url: "libs/php/getCountryGeometry.php",
                  type: "POST",
                  dataType: "json",
                  data: {
                    countryCode: countryCode,
                  },
              
                  success: function (data) {
                    
                    
                    border = L.geoJSON(data).addTo(country);
                    border.setStyle({
                      color: "blue",
                      fillColor: "blue",
                    });
              
                    
                    if (border.getBounds().isValid()) {
                      map.fitBounds(border.getBounds());
                    }
                    
                    bounds = country.getBounds();
                    center = bounds.getCenter();
                    
      
                    
                  },
              
                  error: function (jqXHR, textStatus, errorThrown) {
                    console.log("Error:", textStatus, errorThrown);
                    console.log("There is an error");
                  },
                });
              }
      
              function getCountries(countryCodesArray){
              $.ajax({
                url: "libs/php/getCountries.php",
                type: "POST",
                dataType: "json",
                success: function(data) {
                  
                  
                  var countriesList = [];
              
              
                  for (var i = 0; i < data.length; i++) {
                    var countryCodeMatch = data[i].iso2_code;
                    if (countryCodesArray.includes(countryCodeMatch)) {
                      var countryItem = {
                        code: data[i].iso3_code,
                        name: data[i].name
                      };
                      countriesList.push(countryItem);
                      
                    }
                  }
            
                  countriesList.sort(function(a, b) {
                    var nameA = a.name.toUpperCase();
                    var nameB = b.name.toUpperCase();
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                    return 0;
                  });
                  
                  
                  for (var j = 0; j < countriesList.length; j++) {
                    $('#countrySelect').append($('<option>', {
                      value: countriesList[j].code,
                      text: countriesList[j].name
                    }));
                  }
      
                  
                  countryCode = $('#countrySelect option:first').val();
                  const filterData = data.filter((a) => (a.iso3_code === countryCode));
                  
                  
                  if (filterData.length > 0) {
                    
                    fetchCountryGeometry(countryCode);
               
                    
                    
                    countryCode = filterData[0].iso3_code;
                    
                    twoDigitCountryCode = filterData[0].iso2_code;
                    
                    countryName = filterData[0].name;
                    
                    fetchData(countryCode, twoDigitCountryCode, countryName);
                    
                    function modalHeader(iconClassOne, iconClassTwo) {
                    
                      
                      const icon = document.createElement('i');
                      icon.classList.add(iconClassOne, iconClassTwo);
          
                      
                      const text = document.createElement('span');
                      text.textContent = `${countryName}'s Country/Cities Information`;
          
                      
                      const modalHeader = document.querySelector('.modal-title');
                      modalHeader.innerHTML = ''; 
                      modalHeader.appendChild(icon);
                      modalHeader.appendChild(text);
          
                    }
                    modalHeader('fa-solid', 'fa-flag');
                    
                  } 
                  else {
                    console.error('No matching country found:', countryCode);
                  }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                  console.log("Error:", textStatus, errorThrown);
                  console.log("There is an error");
                }
              });
            }
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.log("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          console.log("An unknown error occurred.");
          break;
      }
    }

  function showPosition(position) {
             

    lat = position.coords.latitude;
    long = position.coords.longitude;
   
    countryCode = countryCoder.iso1A3Code([long, lat]);

    
    
    

   
        
    getCountryCodes();
       
        
      
    }

    function getCountryCodes() {
      $.ajax({
        url: "libs/php/getCountryCodes.php",
        type: 'POST',
        dataType: "json",
        success: function(data) {
          var countryCodesArray = [];
          
          for (var i=0; i<data.data.iso2_codes.length; i++) {
            countryCodesArray.push(data.data.iso2_codes[i]);
          }
          
          getCountries(countryCodesArray);
          
         
          
          
          
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log('Error:', textStatus, errorThrown);
          console.log('There is an error');
        }
      });
    }

    

 
  

 

        

        
        function fetchCountryGeometry(countryCode) {
          $.ajax({
            url: "libs/php/getCountryGeometry.php",
            type: "POST",
            dataType: "json",
            data: {
              countryCode: countryCode,
            },
        
            success: function (data) {
              
              
              border = L.geoJSON(data).addTo(country);
              border.setStyle({
                color: "blue",
                fillColor: "blue",
              });
        
              
              if (border.getBounds().isValid()) {
                map.fitBounds(border.getBounds());
              }
              
              bounds = country.getBounds();
              
              center = bounds.getCenter();
              

              
            },
        
            error: function (jqXHR, textStatus, errorThrown) {
              console.log("Error:", textStatus, errorThrown);
              console.log("There is an error");
            },
          });
        }

        function getCountries(countryCodesArray){
        $.ajax({
          url: "libs/php/getCountries.php",
          type: "POST",
          dataType: "json",
          success: function(data) {
            
            
            var countriesList = [];
        
        
            for (var i = 0; i < data.length; i++) {
              var countryCodeMatch = data[i].iso2_code;
              if (countryCodesArray.includes(countryCodeMatch)) {
                var countryItem = {
                  code: data[i].iso3_code,
                  name: data[i].name
                };
                countriesList.push(countryItem);
                
              }
            }
      
            countriesList.sort(function(a, b) {
              var nameA = a.name.toUpperCase();
              var nameB = b.name.toUpperCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
            });
            
            
            for (var j = 0; j < countriesList.length; j++) {
              $('#countrySelect').append($('<option>', {
                value: countriesList[j].code,
                text: countriesList[j].name
              }));
            }

            
            const filterData = data.filter((a) => (a.iso3_code === countryCode));
            
            
            if (filterData.length > 0) {
              
              fetchCountryGeometry(countryCode);
         
              
              $('#countrySelect').val(filterData[0].iso3_code);
              countryCode = filterData[0].iso3_code;
              
              twoDigitCountryCode = filterData[0].iso2_code;
              countryName = filterData[0].name;
              
              fetchData(countryCode, twoDigitCountryCode, countryName);
              
              function modalHeader(iconClassOne, iconClassTwo) {
              
                
                const icon = document.createElement('i');
                icon.classList.add(iconClassOne, iconClassTwo);
    
                
                const text = document.createElement('span');
                text.textContent = `${countryName}'s Country/Cities Information`;
    
                
                const modalHeader = document.querySelector('.modal-title');
                modalHeader.innerHTML = ''; 
                modalHeader.appendChild(icon);
                modalHeader.appendChild(text);
    
              }
              modalHeader('fa-solid', 'fa-flag');
              
            } 
            else {
              console.error('No matching country found:', countryCode);
            }
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error:", textStatus, errorThrown);
            console.log("There is an error");
          }
        });
      }
         
        
         
          
     






    
            
        
          
  
  
            $('#countrySelect').change(function() {
              modal();
              $('#countryTable').show();
              $('#earthQuakeTable').hide();
              $('#wikiTable').hide();
              $('#flightTable').hide();
              $('#weatherTable').hide();
              $('#cityDestinationTable').hide();
              $('.modal-header').css('background-color', 'green');

              
          
            
            let name = $('#countrySelect').val();
            getCountriesSelect();
            function fetchCountryGeometrySelect(countryCode) {
              $.ajax({
                url: "libs/php/getCountryGeometry.php",
                type: "POST",
                dataType: "json",
                data: {
                  countryCode: countryCode,
                },
            
                success: function (data) {

                  

               
                  
                  
                  border = L.geoJSON(data).addTo(country);
                  border.setStyle({
                    color: "blue",
                    fillColor: "blue",
                  });
            
                  
                
                  if (!map.hasLayer(window.country)) {
                    map.addLayer(window.country); 
                  }
                  map.fitBounds(border.getBounds());
                  bounds = country.getBounds();
                  center = bounds.getCenter();
                  
    
                  
                },
            
                error: function (jqXHR, textStatus, errorThrown) {
                  console.log("Error:", textStatus, errorThrown);
                  console.log("There is an error");
                },
              });
            }
    



            function getCountriesSelect(){
            $.ajax({
              url: "libs/php/getCountries.php",
              type: "POST",
              dataType: "json",
              success: function(data) {
                window.weatherMarkers.clearLayers();
                window.earthquakeMarkers.clearLayers();
                
                window.wikiMarkers.clearLayers();
                window.countryMarkers.clearLayers();
                window.planeMarkers.clearLayers();
                window.cityDestinationMarkers.clearLayers();
                
                window.country.clearLayers();
                var weatherMarkers = window.weatherMarkers;
                var earthquakeMarkers = window.earthquakeMarkers;
                var wikiMarkers = window.wikiMarkers;
                var countryMarkers = window.countryMarkers;
                var planeMarkers = window.planeMarkers;
                var cityDestinationMarkers = window.cityDestinationMarkers;
                window.country.removeLayer(weatherMarkers);
                window.country.removeLayer(earthquakeMarkers);
                window.country.removeLayer(wikiMarkers);
                window.country.addLayer(countryMarkers);
                window.country.removeLayer(planeMarkers);
        
                window.country.removeLayer(cityDestinationMarkers);
                
               
    
                
                const filterData = data.filter((a) => (a.iso3_code === name));
                
                
                
                if (filterData.length > 0) {
                  
                  fetchCountryGeometrySelect(name);
             
                  
                  
                  countryCode = filterData[0].iso3_code;
                  
                  twoDigitCountryCode = filterData[0].iso2_code;
                  
                  countryName = filterData[0].name;
                  
                  fetchData(countryCode, twoDigitCountryCode, countryName);
                  
                  function modalHeader(iconClassOne, iconClassTwo) {
                  
                    
                    const icon = document.createElement('i');
                    icon.classList.add(iconClassOne, iconClassTwo);
        
                    
                    const text = document.createElement('span');
                    text.textContent = `${countryName}'s Country/Cities Information`;
        
                    
                    const modalHeader = document.querySelector('.modal-title');
                    modalHeader.innerHTML = ''; 
                    modalHeader.appendChild(icon);
                    modalHeader.appendChild(text);
        
                  }
                  modalHeader('fa-solid', 'fa-flag');
                  
                } 
                else {
                  console.error('No matching country found:', countryCode);
                }
              },
              error: function(jqXHR, textStatus, errorThrown) {
                console.log("Error:", textStatus, errorThrown);
                console.log("There is an error");
              }
            });
          }
  
         
        })
          
  
  
  
  
  
   
  
  
  
  
 


    
    
    
    
  
  
         
     
            
        
          
  
          
      



     var countryButton = L.easyButton({
      states: [{
          icon: '<div class="easy-button"><i style="color: green;" class="fa-solid fa-flag country-button-icon"></i></div>',
          title: 'Show Country/Cities Info Markers',
          onClick: function(btn, map){
              
              country.removeLayer(earthquakeMarkers);
              country.removeLayer(wikiMarkers);
              country.removeLayer(weatherMarkers);
              country.removeLayer(planeMarkers);
              country.removeLayer(cityDestinationMarkers);
              country.addLayer(countryMarkers);
              $('#earthQuakeTable').hide();
              $('#wikiTable').hide();
              $('#flightTable').hide();
              $('#weatherTable').hide();
              $('#cityDestinationTable').hide();
              $('#countryTable').show();
              
              $('.modal-header').css('background-color', 'green');
            
              function modalHeader(iconClassOne, iconClassTwo) {
               
                
                const icon = document.createElement('i');
                icon.classList.add(iconClassOne, iconClassTwo);
    
                
                const text = document.createElement('span');
                text.textContent = `${countryName}'s Country/Cities Information`;
    
                
                const modalHeader = document.querySelector('.modal-title');
                modalHeader.innerHTML = ''; 
                modalHeader.appendChild(icon);
                modalHeader.appendChild(text);
    
              }
              modalHeader('fa-solid', 'fa-flag');
              modal();
              map.fitBounds(border.getBounds());
  
              
  
              
          }
      }],
      
      id: 'countryButton',
      leafletClasses: true,
      className: 'easy-button-class',
      sideText: 'Show Country Markers',
      
      
    });
  var weatherButton = L.easyButton({
      states: [{
        icon: '<div class="easy-button text-center"><i style="color: blue;" class="fas fa-cloud weather-button-icon"></i></div>',
          title: 'Show Weather Markers',
          onClick: function(btn, map){
              
              country.removeLayer(earthquakeMarkers);
              country.removeLayer(wikiMarkers);
              country.addLayer(weatherMarkers);
              country.removeLayer(planeMarkers);
              country.removeLayer(cityDestinationMarkers);
              country.removeLayer(countryMarkers);
              $('#earthQuakeTable').hide();
              $('#wikiTable').hide();
              $('#flightTable').hide();
              $('#weatherTable').show();
              $('#cityDestinationTable').hide();
              $('#countryTable').hide();
              $('.modal-header').css('background-color', 'blue');
         
              function modalHeader(iconClassOne, iconClassTwo) {
              
                
                const icon = document.createElement('i');
                icon.classList.add(iconClassOne, iconClassTwo);
    
                
                const text = document.createElement('span');
                text.textContent = `${countryName}'s Weather Information`;
    
                
                const modalHeader = document.querySelector('.modal-title');
                modalHeader.innerHTML = ''; 
                modalHeader.appendChild(icon);
                modalHeader.appendChild(text);
    
              }
              modalHeader('fas', 'fa-cloud');
              modal();
              
              
  
              map.fitBounds(border.getBounds());
              
  
          }
      }],
      
      id: 'weatherButton',
      leafletClasses: true,
      className: 'easy-button-class',
      sideText: 'Show Weather Markers'
  });
  
  var earthquakeButton = L.easyButton({
      states: [{
          icon: '<div class="easy-button"><i style="color: red;" class="fas fa-exclamation-triangle earthquake-button-icon"></i></div>',
          title: 'Show Earthquake Markers',
          onClick: function(btn, map){
              
              country.addLayer(earthquakeMarkers);
              country.removeLayer(wikiMarkers);
              country.removeLayer(weatherMarkers);
              country.removeLayer(planeMarkers);
              country.removeLayer(cityDestinationMarkers);
              country.removeLayer(countryMarkers);
              $('#earthQuakeTable').show();
              $('#wikiTable').hide();
              $('#flightTable').hide();
              $('#weatherTable').hide();
              $('#cityDestinationTable').hide();
              $('#countryTable').hide();
              $('.modal-header').css('background-color', 'red');
             
              function modalHeader(iconClassOne, iconClassTwo) {
                
                
                const icon = document.createElement('i');
                icon.classList.add(iconClassOne, iconClassTwo);
    
                
                const text = document.createElement('span');
                text.textContent = `${countryName}'s Earthquake Locations`;
    
                
                const modalHeader = document.querySelector('.modal-title');
                modalHeader.innerHTML = ''; 
                modalHeader.appendChild(icon);
                modalHeader.appendChild(text);
    
              }
              modalHeader('fas', 'fa-exclamation-triangle')
              modal();
              map.fitBounds(border.getBounds());
          }
      }],
      
      id: 'earthquakeButton',
      leafletClasses: true,
      className: 'easy-button-class',
      sideText: 'Show Earthquake Markers'
  });
  
  var wikiButton = L.easyButton({
      states: [{
          icon: '<div class="easy-button"><i style="color: black;" class="fa-brands fa-wikipedia-w wiki-button-icon"></i></div>',
          title: 'Show Wiki Markers',
          onClick: function(btn, map){
              
              country.removeLayer(earthquakeMarkers);
              country.addLayer(wikiMarkers);
              country.removeLayer(weatherMarkers);
              country.removeLayer(planeMarkers);
              country.removeLayer(cityDestinationMarkers);
              country.removeLayer(countryMarkers);
              $('#earthQuakeTable').hide();
              $('#wikiTable').show();
              $('#flightTable').hide();
              $('#weatherTable').hide();
              $('#cityDestinationTable').hide();
              $('#countryTable').hide();
              $('.modal-header').css('background-color', 'grey');
              
              function modalHeader(iconClassOne, iconClassTwo, iconClassThree) {
             
                
                const icon = document.createElement('i');
                icon.classList.add(iconClassOne, iconClassTwo, iconClassThree);
    
                
                const text = document.createElement('span');
                text.textContent = `${countryName}'s Wikipedia Articles`;
    
                
                const modalHeader = document.querySelector('.modal-title');
                modalHeader.innerHTML = ''; 
                modalHeader.appendChild(icon);
                modalHeader.appendChild(text);
    
              }
              modalHeader('fa-brands', 'fa-wikipedia-w', 'fa-lg')
              modal();
              map.fitBounds(border.getBounds());
          }
      }],
      
      id: 'wikiButton',
      leafletClasses: true,
      className: 'easy-button-class',
      sideText: 'Wiki Markers',
      
      
  });
  
  var planeButton = L.easyButton({
    states: [{
        icon: '<div class="easy-button"><i style="color: #ffbb00;" class="fa-solid fa-plane plane-button-icon"></i></div>',
        title: 'Show Flight Markers',
        onClick: function(btn, map){
            
            country.removeLayer(earthquakeMarkers);
            country.removeLayer(wikiMarkers);
            country.removeLayer(weatherMarkers);
            country.addLayer(planeMarkers);
            country.removeLayer(cityDestinationMarkers);
            country.removeLayer(countryMarkers);
            $('#earthQuakeTable').hide();
            $('#wikiTable').hide();
            $('#flightTable').show();
            $('#weatherTable').hide();
            $('#cityDestinationTable').hide();
            $('#countryTable').hide();
            $('.modal-header').css('background-color', '#ffbb00');
            
            
            function modalHeader(iconClassOne, iconClassTwo) {
              
              
              const icon = document.createElement('i');
              icon.classList.add(iconClassOne, iconClassTwo);
  
              
              const text = document.createElement('span');
              text.textContent = `${countryName}'s Real Time Flights`;
  
              
              const modalHeader = document.querySelector('.modal-title');
              modalHeader.innerHTML = ''; 
              modalHeader.appendChild(icon);
              modalHeader.appendChild(text);
  
            }
            modalHeader('fa-solid', 'fa-plane')
            modal();
            window.shouldFitBounds = true;
            var planeMarkersGroup = L.markerClusterGroup.layerSupport({
                            
              disableClusteringAtZoom: 8,
              maxClusterRadius: 200,
              spiderfyOnMaxZoom: false,
              clusteredLayerSupport: true,
            });

            function addFlightDataToTable(flight) {
                let $tr = $('<tr>').attr('id', 'flightData');
                
                let $iconTd = $('<td>').addClass('icon-td');
                
                let $icon = $('<i>').addClass('fa-solid fa-plane icon');
                
                let $flightInfo = $('<div>').html(
                  '<img src="https://flagsapi.com/' + flight.flag + '/flat/64.png"> ' +
                  flight.flag + '<br>' +
                  'Aircraft: ' + flight.aircraft_icao + '<br>' +
                  'Hex: ' + flight.hex + '<br>' +
                  'Reg: ' + flight.reg_number
                ).addClass('flight-info');
                
                $iconTd.append($icon, $flightInfo);
                
                let $valueTd = $('<td>').addClass('value-td');
                
                let $speed = $('<div>').text('Speed: ' + (flight.speed ? numberWithCommas(flight.speed) + ' kph' : 'No Data')).addClass('speed');
                
                let $alt = $('<div>').text('Altitude: ' + (flight.alt ? numberWithCommas(flight.alt) + ' m' : 'No Data')).addClass('altitude');

                let $lat = $('<div>').text('Latitude: ' + (flight.lat && flight.lat ? flight.lat.toFixed(4) : 'No Data')).addClass('lat');

                let $lng = $('<div>').text('Longitude: ' + (flight.lng && flight.lng ? flight.lng.toFixed(4) : 'No Data')).addClass('lng');
                
                let $direction = $('<div>').text('Direction: ' + (flight.dir ? flight.dir + '°' : 'No Data')).addClass('direction');
                
                $valueTd.append($speed, $alt, $lat, $lng, $direction);
                
                $tr.append($iconTd, $valueTd);
                
                $('#flightTable tbody').append($tr);
              }

              function numberWithCommas(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              }


        
            
          
            
            var flightLatLngs = [];
    
    
            function getFlightData(countryCode) {
              
              $.ajax({
                type: 'GET',
                url: 'libs/php/trackFlightsAPI.php',
                data: {
                  countryCode: countryCode
                },
                dataType: 'json',
                success: function(data) {
                
    
                  for (var i = 0; i < data.response.length; i++) {
                    var flight = data.response[i];
                    addFlightDataToTable(flight);
                    
                    var planeLatLng = L.latLng(flight.lat, flight.lng);
                    flightLatLngs.push(planeLatLng);
                  
    
                    var customIconOptions = {
                      className: "my-flight-icon", 
                      iconSize: [32, 32], 
                    };
    
                    var flightCustomIcon = L.divIcon({
                      ...customIconOptions,
                      html:
                      '<div style="transform: rotate(' + flight.dir + 'deg); ">' +
                      '<i class="fa-solid fa-plane-up"></i>' +
                      "</div>",
                      
                    });
                    
    
                  var planeMarker = L.marker([flight.lat, flight.lng], {icon: flightCustomIcon}).addTo(planeMarkersGroup);
    
                  var planePopupContent =
                  `
                  <div class="flight-info">
                  <div class="flight-icon-div">
                  <i class="fa-solid fa-plane flight-icon"></i>
                  </div>
                  <br>
                  
                  <img class="flag-img" src="https://flagsapi.com/${flight.flag}/flat/64.png"> ${flight.flag}
                  
                  <br>

                  <div class="flight-text">
                  Aircraft: ${flight.aircraft_icao}<br>
                  Hex: ${flight.hex}<br>
                  Reg: ${flight.reg_number}<br>
                  Speed: ${numberWithCommas(flight.speed)} kph<br>
                  Alt: ${numberWithCommas(flight.alt)} m<br>
                  Latitude: ${flight.lat.toFixed(4)}<br>
                  Longitude: ${flight.lng.toFixed(4)}<br>
                  Direction: ${flight.dir}&deg;
                  </div>
                
                </div>`
                
             
                
                  planeMarker.bindPopup(planePopupContent);
                  planeMarkers.addLayer(planeMarkersGroup);
                 
    
      
                  
                  
         
                
        
    
                }
                
                  
                  if (window.shouldFitBounds) {
                    var flightBounds = L.latLngBounds(flightLatLngs);
                    map.fitBounds(flightBounds);
                  }
    
    
                
                
                
    
    
                  },
                  error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Error:', textStatus, errorThrown);
                  }
                  
                });
              
              }
              getFlightData(twoDigitCountryCode);
            
            
            
            
        }
    }],
    
    id: 'planeButton',
    leafletClasses: true,
    className: 'easy-button-class',
    sideText: 'Show Real Time Flight Markers',
    
    
  });
  
  
  var cityDestinationButton = L.easyButton({  
    states: [{
        icon: '<div class="easy-button"><i style="color: #ff6daa;" class="fa-solid fa-map-location roadgoat-button-icon"></i></div>',
        title: 'Show Roadgoat Destination Markers',
        onClick: function(btn, map){
            
            country.removeLayer(earthquakeMarkers);
            country.removeLayer(wikiMarkers);
            country.removeLayer(weatherMarkers);
            country.removeLayer(planeMarkers);
            country.addLayer(cityDestinationMarkers);
            country.removeLayer(countryMarkers);
            $('#earthQuakeTable').hide();
            $('#wikiTable').hide();
            $('#flightTable').hide();
            $('#weatherTable').hide();
            $('#cityDestinationTable').show();
            $('#countryTable').hide();
            $('.modal-header').css('background-color', '#ff6daa');
            
            function modalHeader(iconClassOne, iconClassTwo) {
            
              
              const icon = document.createElement('i');
              icon.classList.add(iconClassOne, iconClassTwo);
  
              
              const text = document.createElement('span');
              text.textContent = `${countryName}'s RoadGoat Destinations`;
  
              
              const modalHeader = document.querySelector('.modal-title');
              modalHeader.innerHTML = ''; 
              modalHeader.appendChild(icon);
              modalHeader.appendChild(text);
  
            }
            modalHeader('fa-solid', 'fa-map-location')
            modal();
            map.fitBounds(border.getBounds());
        }
    }],
    
    id: 'cityDestinationButton',
    leafletClasses: true,
    className: 'easy-button-class',
    sideText: 'Show Roadgoat Destination Markers',
    
    
  });
  
  
  
  countryButton.addTo(map);
  weatherButton.addTo(map);
  earthquakeButton.addTo(map);
  wikiButton.addTo(map);
  planeButton.addTo(map);
  cityDestinationButton.addTo(map);
  
  
  



       




        











  })



