 // function populateSelectTag(){
  // $.ajax({
  //   url: "libs/php/getCountry.php",
  //   type: 'POST',
  //   dataType: "json",
    
  //   success: function(result) {
      // var countriesList = [];
        
        
      // for (var i = 0; i < result.data.border.features.length; i++) {
      //   var countryCodeMatch = result.data.border.features[i].properties.iso_a2;
      //   if (countryCodesArray.includes(countryCodeMatch)) {
      //     var countryItem = {
      //       code: result.data.border.features[i].properties.iso_a3,
      //       name: result.data.border.features[i].properties.name
      //     };
      //     countriesList.push(countryItem);
          
      //   }
      // }

      // countriesList.sort(function(a, b) {
      //   var nameA = a.name.toUpperCase();
      //   var nameB = b.name.toUpperCase();
      //   if (nameA < nameB) {
      //     return -1;
      //   }
      //   if (nameA > nameB) {
      //     return 1;
      //   }
      //   return 0;
      // });
      
      // // Append the sorted list of countries to the select tag
      // for (var j = 0; j < countriesList.length; j++) {
      //   $('#countrySelect').append($('<option>', {
      //     value: countriesList[j].code,
      //     text: countriesList[j].name
      //   }));
      // }

     
        //  console.log(countryCode);
        // const filterData = result.data.border.features.filter((a) => (a.properties.iso_a3 === countryCode));
        
        // if (filterData.length > 0) {
          
        //   fetchCountryGeometry(countryCode);
        //   // border = L.geoJSON(filterData[0]).addTo(country);
        //   // border.setStyle({
        //   //   color: 'blue',
        //   //   fillColor: 'blue',
            
        //   // });
        //   // if (border.getBounds().isValid()) {
        //   //   map.fitBounds(border.getBounds());
        //   // }
          
        //   $('#countrySelect').val(filterData[0].properties.iso_a3);
        //   countryCode = filterData[0].properties.iso_a3;
        //   twoDigitCountryCode = filterData[0].properties.iso_a2;
        //   countryName = filterData[0].properties.name;
          
        //   function modalHeader(iconClassOne, iconClassTwo) {
          
            
        //     const icon = document.createElement('i');
        //     icon.classList.add(iconClassOne, iconClassTwo);

            
        //     const text = document.createElement('span');
        //     text.textContent = `${countryName}'s Country/Cities Information`;

            
        //     const modalHeader = document.querySelector('.modal-title');
        //     modalHeader.innerHTML = ''; 
        //     modalHeader.appendChild(icon);
        //     modalHeader.appendChild(text);

        //   }
        //   modalHeader('fa-solid', 'fa-flag');
          
        // } 
        // else {
        //   console.error('No matching country found:', countryCode);
        // }

             // border = L.geoJSON(filterData[0]).addTo(country);
              // border.setStyle({
              //   color: 'blue',
              //   fillColor: 'blue',
                
              // });
              // if (border.getBounds().isValid()) {
              //   map.fitBounds(border.getBounds());
              // }

              //  $('#countrySelect').change(function() {
    //   modal();
    //   $('#countryTable').show();
    //   $('#earthQuakeTable').hide();
    //   $('#wikiTable').hide();
    //   $('#flightTable').hide();
    //   $('#weatherTable').hide();
    //   $('#cityDestinationTable').hide();
    //   $('.modal-header').css('background-color', 'green');
  
    
    //  let name = $('#countrySelect').val();
     
    //  $.ajax({
    //     url: "libs/php/getCountry.php",
    //     type: 'POST',
    //     dataType: 'json',
    //     success: function(result) {
          
    //       window.weatherMarkers.clearLayers();
    //       window.earthquakeMarkers.clearLayers();
          
    //       window.wikiMarkers.clearLayers();
    //       window.countryMarkers.clearLayers();
    //       window.planeMarkers.clearLayers();
    //       window.cityDestinationMarkers.clearLayers();
          
    //       window.country.clearLayers();
    //       var weatherMarkers = window.weatherMarkers;
    //       var earthquakeMarkers = window.earthquakeMarkers;
    //       var wikiMarkers = window.wikiMarkers;
    //       var countryMarkers = window.countryMarkers;
    //       var planeMarkers = window.planeMarkers;
    //       var cityDestinationMarkers = window.cityDestinationMarkers;
    //       window.country.removeLayer(weatherMarkers);
    //       window.country.removeLayer(earthquakeMarkers);
    //       window.country.removeLayer(wikiMarkers);
    //       window.country.addLayer(countryMarkers);
    //       window.country.removeLayer(planeMarkers);
  
    //       window.country.removeLayer(cityDestinationMarkers);
          
          
    //       const filterData = result.data.border.features.filter((a) => (a.properties.iso_a3 === name));
    //       border = L.geoJSON(filterData[0]);
    //       border.addTo(country);
    //       border.setStyle({
    //         color: 'blue',
    //         fillColor: 'blue',
            
    //       });
    //       if (!map.hasLayer(window.country)) {
    //         map.addLayer(window.country); 
    //       }
    //       map.fitBounds(border.getBounds());
          
    //       countryCode = filterData[0].properties.iso_a3;
    //       twoDigitCountryCode = filterData[0].properties.iso_a2;
    //       countryName = filterData[0].properties.name;
    //       function modalHeader(iconClassOne, iconClassTwo) {
          
            
    //         const icon = document.createElement('i');
    //         icon.classList.add(iconClassOne, iconClassTwo);

            
    //         const text = document.createElement('span');
    //         text.textContent = `${countryName}'s Country/Cities Information`;

            
    //         const modalHeader = document.querySelector('.modal-title');
    //         modalHeader.innerHTML = ''; 
    //         modalHeader.appendChild(icon);
    //         modalHeader.appendChild(text);

    //       }
    //       modalHeader('fa-solid', 'fa-flag');
          
          
    //       fetchData();
       
    //         }})

    //   <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    //   <script
    //   src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"
    //   type="text/javascript"
    // ></script> -->

    if ($('#cityDestinationTable td:empty').length > 0) {
      $('#cityDestinationTable td:empty').text('No data');
    }

    // function resizeMap() {
//   var navbarHeight = $('.navbar').height();
//   var windowHeight = $(window).height();
//   $('#map').height(windowHeight - navbarHeight);
// }

// $(document).ready(function() {
//   resizeMap();
// });

// $(window).resize(function() {
//   resizeMap();
// });

 // console.log(country);
    // const bounds = country.getBounds();
    // console.log(bounds);
    // const center = bounds.getCenter();
    // console.log(center);

      // $('#firstName').html(data.name);
      // $("#countryFlag").html(`<img src='${data.flag}' height="50" width="50"/>`);
      // $('#capital-city').html(data.capital);
      // $('#population').html(data.population);
      // $('#currency').html(`(${data.currencies[0].symbol}) ${data.currencies[0].name}`);

        // function addEarthquakeDataToTable(earthquake) {
          //   let $tr = $('<tr>').attr('id', 'earthQuakeData');
          
            
          //   let $iconTd = $('<td>').addClass('icon-td');
          
          //   let $icon = $('<i>').addClass('fas fa-exclamation-triangle icon').addClass('icon')
          
          //   let $earthquakeLocation = $('<span>').text(earthquake.location ? earthquake.location : 'No Data').addClass('earthquake-location');
          
          //   $iconTd.append($icon, $earthquakeLocation);
          
            
          //   let $valueTd = $('<td>').addClass('value-td');
          
          //   let $magnitude = $('<div>').text('Magnitude: ' + (earthquake.magnitude ? earthquake.magnitude : 'No Data')).addClass('magnitude');
          
          //   let $depth = $('<div>').text('Depth: ' + (earthquake.depth ? earthquake.depth + ' km' : 'No Data')).addClass('depth');
          
          //   let $datetime = $('<div>').text('Date/Time: ' + (earthquake.datetime ? earthquake.datetime : 'No Data')).addClass('datetime');
          
          //   $valueTd.append($magnitude, $depth, $datetime);
          
          //   $tr.append($iconTd, $valueTd);
          
          //   $('#earthQuakeTable tbody').append($tr);
          // }

             // function addCityDataToTable(city) {
              //   let $tr = $('<tr>').attr('id', 'cityData');
              
              //   let $iconTd = $('<td>');
              //   let $icon = $('<i>').addClass('fas fa-city');
              //   let $cityName = $('<span>').text(city.name ? city.name : 'No Data');
              
              //   $iconTd.append($icon, $cityName);
              
              //   let $valueTd = $('<td>');
              
              //   let $population = $('<div>').text('Population: ' + (city.population ? city.population : 'No Data'));
              //   let $wikipedia = $('<div>').html('Wikipedia: ' + (city.wikipedia ? `<a href="${city.wikipedia}" target="_blank">${city.name}</a>` : 'No Data'));
              //   let $timezone = $('<div>').text('Timezone: ' + (city.timezone ? city.timezone : 'No Data'));
              //   let $latitude = $('<div>').text('Latitude: ' + (city.lat ? city.lat : 'No Data'));
              //   let $longitude = $('<div>').text('Longitude: ' + (city.lng ? city.lng : 'No Data'));
              
              //   $valueTd.append($population, $wikipedia, $timezone, $latitude, $longitude);
              
              //   $tr.append($iconTd, $valueTd);
              
              //   $('#countryTable tbody').append($tr);
              // }

              // $('#countrySelect').val(filterData[0].iso3_code);

                           // let $geo = $('<div>').text('GEO: ' + (flight.lat && flight.lng ? flight.lat.toFixed(4) + ', ' + flight.lng.toFixed(4) : 'No Data')).addClass('geo');

                // let $geo = $('<div>').text('Latitude: ' + (flight.lat ? flight.lat : 'No Data') + ', Longitude: ' + (flight.lng ? flight.lng : 'No Data')).addClass('geo');

                safetyValue = safety.value;

                var customIconOptions = {
                  className: "my-custom-icon", 
                  iconSize: [32, 32], 
                };

                /* #map {
  width: 100%;
  height: 100%;
} */

/* html,
body,
#map {
  height: 100%;
  width: 100%;
} */