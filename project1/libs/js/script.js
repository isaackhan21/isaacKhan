var bounds;
var center;
var weatherData;
var weatherDataName;
var weatherDataCountry;

if (this.map) {
  this.map.remove();
}

var southWest = L.latLng(-90, -180);
var northEast = L.latLng(90, 180);

var maxBoundArea = L.latLngBounds(southWest, northEast);


var streetMap = L.tileLayer(
  "https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=9ozwfjgp6x7RQtrlX5wH",
  {
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    noWrap: true,
    minZoom: 3,
  }
)

var satelliteMap = L.tileLayer(
  "https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=9ozwfjgp6x7RQtrlX5wH",
  {
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    noWrap: true,
    minZoom: 3,
  }
)

var basemaps = {
  "Streets": streetMap,
  "Satellite": satelliteMap
};

var map = L.map("map", {
  layers: [streetMap],
  maxBounds: maxBoundArea,
  maxBoundsViscosity: 1.0,
}).setView([51.417077903315516, -0.92503485998256], 3);



var countryMarkersGroup = L.markerClusterGroup.layerSupport({
  disableClusteringAtZoom: 19,
  maxClusterRadius: 100,
  spiderfyOnMaxZoom: false,
  clusteredLayerSupport: true,
  polygonOptions: {
    fillColor: '#33B3A6',
    color: 'white',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.5
  }
});

var earthquakeMarkersGroup = L.markerClusterGroup.layerSupport({
  disableClusteringAtZoom: 18,
  maxClusterRadius: 50,
  clusteredLayerSupport: true,
  polygonOptions: {
    fillColor: 'white',
    color: 'red',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.5
  },
  iconCreateFunction: function (cluster) {
    var childCount = cluster.getChildCount();
    var c = " marker-cluster-";
    if (childCount < 10) {
      c += "small";
    } else if (childCount < 100) {
      c += "medium";
    } else {
      c += "large";
    }
    return new L.DivIcon({
      html: "<div><span>" + childCount + "</span></div>",
      className: "marker-cluster" + c,
      iconSize: new L.Point(40, 40),
    });
  },
});

var wikiMarkersGroup = L.markerClusterGroup.layerSupport({
  disableClusteringAtZoom: 19,
  maxClusterRadius: 100,
  spiderfyOnMaxZoom: false,
  clusteredLayerSupport: true,
  polygonOptions: {
    fillColor: 'white',
    color: 'grey',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.5
  }
});

var cityDestinationsMarkersGroup = L.markerClusterGroup.layerSupport({
  disableClusteringAtZoom: 19,
  maxClusterRadius: 100,
  spiderfyOnMaxZoom: false,
  clusteredLayerSupport: true,
  polygonOptions: {
    fillColor: '#ff6daa',
    color: 'white',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.5
  }
});

var planeMarkersGroup = L.markerClusterGroup.layerSupport({
  disableClusteringAtZoom: 8,
  maxClusterRadius: 200,
  spiderfyOnMaxZoom: false,
  clusteredLayerSupport: true,
  polygonOptions: {
    fillColor: 'orange',
    color: 'white',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.5
  }
});

function fetchData(countryCode, twoDigitCountryCode, countryName) {


  var customCountryMarker;

  
  
  function getExchangeRatesData(countries, currenciesArray, exchangeRateCountriesArray, currency) {
    $.ajax({
      type: "GET",
      url: "libs/php/exchangeRatesAPI.php",
      data: {
        currency: currency,
      },
      dataType: "json",
      success: function (data) {
       
  
        var exchangeRatesTable = $("#exchange-rates-table tbody");
        exchangeRatesTable.empty();
  
        var currencyCountries = [];
        $.each(data.rates, function (currencyCode, exchangeRate) {
          $.each(currenciesArray, function (i, currencyData) {
            if (currencyCode === currencyData.currencyCode) {
              $.each(exchangeRateCountriesArray, function (j, exchangeRateCountry) {
                $.each(countries, function (k, country) {
                  if (exchangeRateCountry.iso2_code === country.iso_2 && currencyData.countryCode === country.iso_2) {
                    currencyCountries.push({
                      name: currencyData.countryName,
                      flag: country.flag,
                      iso_2: currencyData.countryCode,
                      currency: currencyCode,
                      exchangeRate: exchangeRate,
                    });
                  }
                });
              });
            }
          });
        });
        currencyCountries.sort(function (a, b) {
          return a.name.localeCompare(b.name);
        });
        
  
        if (currencyCountries.length === 0) {
          var noDataRow = $("<tr class='no-data-row'></tr>").append("<td colspan='3'><div class='no-data-div'>No Data</div></td>");
          exchangeRatesTable.append(noDataRow);
        } else {
          $.each(currencyCountries, function (i, currencyCountry) {
            if (currencyCountry.currency !== currency) {
              var row = $("<tr></tr>");
              var countryName = $("<td class='country-cell'></td>");
              countryName.append(currencyCountry.name);
              row.append(countryName);
              row.append("<td class='currency-cell'>" + currencyCountry.currency + "</td>");
              row.append("<td class='exchange-rate-cell'>" + formatExchangeRate(currencyCountry.exchangeRate) + "</td>");
              exchangeRatesTable.append(row);
            }
          });
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error:", textStatus, errorThrown);
        var exchangeRatesTable = $("#exchange-rates-table tbody");
        exchangeRatesTable.empty();
        var noDataRow = $("<tr></tr>").append("<td colspan='3'><div>No Data</div></td>");
        exchangeRatesTable.append(noDataRow);
      },
    });
  }
  
  function formatExchangeRate(exchangeRate) {
    return numeral(exchangeRate).format("0,0.00");
  }
  
  
  
  






var currenciesArray = []; 
var exchangeRateCurrency;

function getCurrenciesData() {
  $.ajax({
    url: "libs/php/getCurrencies.php",
    type: "POST",
    dataType: "json",
    success: function (data) {
      
      currenciesArray = data;


     
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error:", textStatus, errorThrown);
      console.log("There is an error");
    },
  });
}

var exchangeRateCountriesArray = [];

function getExchangeRateCountries() {
  $.ajax({
    url: "libs/php/getCountries.php",
    type: "POST",
    dataType: "json",
    success: function (data) {
      
      exchangeRateCountriesArray = data;

     
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error:", textStatus, errorThrown);
      console.log("There is an error");
    },
  });
}


getExchangeRateCountries();


function getAllRestCountries() {
  $.ajax({
    url: "libs/php/restCountriesAll.php",
    type: "POST",
    dataType: "json",
    success: function (data) {
      console.log(data);

      var countries = [];

      $.each(data, function (i, countryData) {
     
            countries.push({
              name: countryData.name,
              flag: countryData.flags.svg,
              iso_2: countryData.cca2,
            });
       
      });
      

      getExchangeRatesData(countries, currenciesArray, exchangeRateCountriesArray, exchangeRateCurrency);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error:", textStatus, errorThrown);
      console.log("There is an error");
    },
  });
}


getAllRestCountries();
getCurrenciesData();


  function fetchCountryData(countryCode) {
    $("#countryTable tbody tr#cityData").remove();
    $("#cityDestinationTable tbody tr#cityDestinationData").remove();
    $("#earthQuakeTable tbody tr#earthQuakeData").remove();
    $("#weatherTable tbody tr#weatherData").remove();
    $("#wikiTable tbody tr#wikiData").remove();
    $("#holiday-table tbody tr#flightData").remove();

    $.ajax({
      url: "libs/php/restCountriesAPI.php",
      type: "POST",
      data: { countryCode: countryCode },
      dataType: "json",
      success: function (data) {
        

       
       var tbody = $("#countryTable tbody");

       
       tbody.empty();
 
       
       createTableRow("fa-globe", "Name", countryName);
       createTableRow("fa-flag", "Flag", `<img src='${data.flag}' height="30" width="40"/>`);
       createTableRow("fa-building", "Capital", data.capital);
       createTableRow("fa-users", "Population", data.population ? formatPopulation(data.population) : "No Data");
       createTableRow("fa-money-bill-alt", "Currency", `(${data.currencies[0].symbol}) ${data.currencies[0].name}`);
       createTableRow("fa-globe-americas", "Subregion", data.subregion);
       createTableRow("fa-font", "Native Name", data.nativeName);
       createTableRow("fa-language", "Language", data.languages[0].name);
       

 
       
       function createTableRow(iconClass, label, value) {
         var row = $("<tr></tr>");
 
         var iconCell = $("<td><i class='fa " + iconClass + "'></i></td>");
         var labelCell = $("<td></td>").text(label);
         var valueCell = $("<td></td>").html(value);
 
         row.append(iconCell);
         row.append(labelCell);
         row.append(valueCell);
 
         tbody.append(row);
       }

       

      
        customCountryMarker = L.divIcon({
          className: "custom-marker",
          html: `<div><img src="${data.flags.svg}"></div>`,
          iconSize: [65, 65],
          iconAnchor: [25, 50],
          popupAnchor: [0, -50],
        });

        capitalCity = data.capital;
        getWeather(capitalCity);
       
        exchangeRateCurrency = data.currencies[0].code;

        $("#firstName").html(data.name);
        $("#countryFlag").html(
          `<img src='${data.flag}' height="50" width="50"/>`
        );
        $("#capital-city").html(data.capital);
        $("#population").html(
          data.population ? formatPopulation(data.population) : "No Data"
        );
        $("#currency").html(
          `(${data.currencies[0].symbol}) ${data.currencies[0].name}`
        );

        function formatPopulation(population) {
          return numeral(population).format("0,0");
        }

       

        const countryMarker = L.marker(center, { icon: customCountryMarker }).addTo(country);

        const countryPopUpContent = `
    <div class="country-info-container">
    <div class="country-flag-div">
      <div class="country-flag-container">
        <img src="${data.flags.svg}" class="country-flag"/>
      </div>
      </div>
      <h3 class="country-name">${data.name}</h3>
      <h6 class="country-capital">Capital: ${data.capital}</h6>
      <h6 class="country-currency">Currency: (${data.currencies[0].symbol}) ${
          data.currencies[0].name
        }</h6>
      <h6 class="country-population">Population: ${
        data.population ? formatPopulation(data.population) : "No Data"
      }</h6>
    </div>
    
    
    `;
        countryMarker.bindPopup(countryPopUpContent);
        
      },
      error: function (jqXHR, textStatus, errorThrown) {},
    });
  }

 
  
  

  
  getBoundingBoxes();



  var northCoord;
  var southCoord;
  var eastCoord;
  var westCoord;

  var bboxes;

  function getBoundingBoxes() {
    $.ajax({
      url: "libs/php/getBoundingBoxes.php",
      type: "POST",
      dataType: "json",
      success: function (data) {
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
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error:", textStatus, errorThrown);
        console.log("There is an error");
      },
    });
  }



  function getHolidayData(countryCode) {
    $.ajax({
      type: "GET",
      url: "libs/php/holidaysAPI.php",
      data: {
        countryCode: countryCode,
      },
      dataType: "json",
      success: function (data) {
        
  
        var holidays = data.holidays;
  
        var holidayTable = $("#holiday-table tbody");
        holidayTable.empty();
  
        if (holidays && holidays.length > 0) {
          for (var i = 0; i < holidays.length; i++) {
            var holiday = holidays[i];
            var date = Date.parse(holiday.date).toString("dd/MM/yyyy"); 
            var weekday = holiday.weekday.date.name;
            var name = holiday.name;
  
            holidayTable.append("<tr><td>" + date + "</td><td>" + weekday + "</td><td>" + name + "</td></tr>");
          }
        } else {
          holidayTable.append("<tr><td colspan='3'>No Data</td></tr>");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error:", textStatus, errorThrown);
        var holidayTable = $("#holiday-table tbody");
        holidayTable.empty();
        holidayTable.append("<tr><td colspan='3'>No Data</td></tr>");
      },
    });
  }
  
 

  

  getHolidayData(twoDigitCountryCode);
  
  function getImageData(country) {
    $.ajax({
      type: "GET",
      url: "libs/php/imagesAPI.php",
      data: {
        country: country,
      },
      dataType: "json",
      success: function (data) {
        var imagesContainer = $("#images-container");
        imagesContainer.empty();
  
        if (data && data.hits && data.hits.length > 0) {
          for (var i = 0; i < data.hits.length; i++) {
            var hit = data.hits[i];
            var imageUrl = hit.webformatURL;
            var pageURL = hit.pageURL;
  
            var img = $("<img>").attr("src", imageUrl);
            var anchor = $("<a>").attr("href", pageURL).attr("target", "_blank").append(img);
            var gridItem = $("<div>").addClass("masonry-item").append(anchor);
  
            imagesContainer.append(gridItem);
          }
        } else {
          var noDataRow = $("<tr></tr>").append("<td colspan='2'>No Image Data</td>");
          imagesContainer.append(noDataRow);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error:", textStatus, errorThrown);
        var imagesContainer = $("#images-container");
        imagesContainer.empty();
        var noDataRow = $("<tr></tr>").append("<td colspan='2'>No Data</td>");
        imagesContainer.append(noDataRow);
      },
    });
  }
  

  
  
  
  
  
  
  
  

  function getNewsData(countryCode) {
    $.ajax({
      type: "GET",
      url: "libs/php/worldNewsAPI.php",
      data: {
        countryCode: countryCode,
      },
      dataType: "json",
      success: function (data) {
  
        var newsTable = $("#news-table tbody");
        newsTable.empty();
  
        var hasNewsArticles = data.news.length > 0;
  
        if (hasNewsArticles) {
          var i = 0;
          var delay = 500;
  
          var loop = function () {
            var article = data.news[i];
            var row = $("<tr class='news-row'></tr>");
            row.append("<td><img src='" + (article.image || "no-image") + "' class='img-thumbnail' onerror='this.onerror=null;this.src=\"dist/img/Image_not_available.png\"; this.alt=\"No Image Available\";'></td>");
  
            var articleDetails = $("<td></td>");
            articleDetails.append("<h5>" + (article.title || "No Data") + "</h5>");
            articleDetails.append("<div class='news-details'><p class='article-text'>" + (article.text || "No Data") + "</p><div class='publish-date'>" + formatDate(article.publish_date) + "</div><div class='news-link'><a href='" + (article.url || "#") + "' target='_blank'>Read More</a></div></div>");
            row.append(articleDetails);
  
            newsTable.append(row);
  
            i++;
            if (i < data.news.length) {
              setTimeout(loop, delay);
            }
          };
  
          loop();
        }
  
        if (!hasNewsArticles) {
          newsTable.append("<tr id='no-news-row'><td colspan='2'>No News Articles</td></tr>");
        } else {
          $("#no-news-row").remove();
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error:", textStatus, errorThrown);
        var newsTable = $("#news-table tbody");
        newsTable.empty();
        newsTable.append("<tr><td colspan='2'>No Data</td></tr>");
      },
    });
  }
  

function formatDate(dateString) {
  var date = Date.parse(dateString);
  return date.toString("dd/MM/yyyy HH:mm");
}

  

    
    
    
    
    
    
    

  getNewsData(twoDigitCountryCode);






  
  
  
  

  

  



  

  getImageData(countryName);



  function getEarthquakeData(north, south, east, west) {
    $.ajax({
      type: "GET",
      url: "libs/php/earthquakeAPI.php",
      data: {
        north: north,
        south: south,
        east: east,
        west: west,
      },
      dataType: "json",
      success: function (response) {
        response.data.forEach((eq) => {
          getEarthquakeCoordData(
            eq.lat,
            eq.lng,
            eq.magnitude,
            eq.depth,
            eq.datetime
          );
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error:", textStatus, errorThrown);
        console.log("There is an error");
      },
    });
  }
  var earthquakeLocation;
  var earthquakeMarker;
  function getEarthquakeCoordData(lat, lng, magnitude, depth, datetime) {
    $.ajax({
      type: "GET",
      url: "libs/php/openCageAPI.php",
      data: {
        lat: lat,
        lng: lng,
      },
      dataType: "json",
      success: function (response) {
        earthquakeLocation = response.results[0].formatted;
  
        earthquakeMarker = L.circleMarker([lat, lng], {
          radius: magnitude * 2,
          color: "red",
          fillColor: "#f03",
          fillOpacity: 0.5,
        });
  
        
        let formattedMagnitude = numeral(magnitude).format("0.00");
  
        
        let formattedDepth = numeral(depth).format("0.00");
  
        
        let formattedDatetime = new Date(datetime).toLocaleString();
  
        earthquakeMarker.bindPopup(`<div class="earthquake-location">
            <h3><i class="fas fa-exclamation-triangle"></i> Earthquake Location</h3>
            <h6>${earthquakeLocation}</h6>
          </div>
          <br>
          <div class="earthquake-info">
            <div><b>Date/Time:</b> ${formattedDatetime}</div>
            <div><b>Depth:</b> ${formattedDepth} km</div>
            <div><b>Magnitude:</b> ${formattedMagnitude}</div>
          </div>
        `);
  
        earthquakeMarkersGroup.addLayer(earthquakeMarker);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error:", textStatus, errorThrown);
        console.log("There is an error");
      },
    });
  }
  
  

  var wikiTitle;
  var wikiSummary;
  var wikiLat;
  var wikiLng;
  var wikiUrl;
  var wikiData;



  function getWikiData(north, south, east, west) {
    $.ajax({
      type: "GET",
      url: "libs/php/wikiAPI.php",
      data: {
        north: north,
        south: south,
        east: east,
        west: west,
      },
      dataType: "json",
      success: function (data) {
        wikiData = data.data;

        for (var i = 0; i < wikiData.length; i++) {
          wikiTitle = wikiData[i].title;
          wikiSummary = wikiData[i].summary;
          wikiLat = wikiData[i].lat;
          wikiLng = wikiData[i].lng;
          wikiUrl = "https://" + wikiData[i].wikipediaUrl;

       

          var wikiMarkerIcon = L.ExtraMarkers.icon({
            icon: 'fa-wikipedia-w',
            markerColor: 'white',
            iconColor: 'black',
            shape: 'square',
            prefix: 'fa-brands',
            extraClasses: 'wiki-marker-icon',
            
          });

          var container = L.DomUtil.create("div", "wikipedia-container");

          var link = L.DomUtil.create("a", "wikipedia-link", container);
          link.href = wikiUrl;
          link.textContent = wikiTitle;

          var summaryEl = L.DomUtil.create(
            "div",
            "wikipedia-summary",
            container
          );
          summaryEl.textContent = wikiSummary;

          var markerContent =
            "<div class='marker-title'>" +
            wikiTitle +
            "</div>" +
            "<div class='marker-summary'>" +
            wikiSummary +
            "</div>" +
            "<a class='marker-link' href='" +
            link +
            "' target='_blank'>Read more on Wikipedia</a>";

          var wikiMarker = L.marker([wikiLat, wikiLng], {
            icon: wikiMarkerIcon,
          }).addTo(wikiMarkersGroup);

          wikiMarker.bindPopup(markerContent);
          wikiMarkersGroup.addLayer(wikiMarker);
        }
        
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error:", textStatus, errorThrown);
        console.log("There is an error");
      },
    });
  }

  let cities = [];
  let city;
  let cityUpperCase;

  function getCities(north, south, east, west) {
    $.ajax({
      type: "POST",
      url: "libs/php/cities.php",
      data: {
        north: north,
        south: south,
        east: east,
        west: west,
      },
      dataType: "json",
      success: function (data) {
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

          

          getRoadGoatSlugData(cityUpperCase);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error:", textStatus, errorThrown);
      },
    });
  }

 

  function getCityData(countryCode) {
    $.ajax({
      type: "GET",
      url: "libs/php/getCityInfoAPI.php",
      data: {
        countryCode: countryCode,
      },
      dataType: "json",
      success: function (data) {
        var cityMarker = L.ExtraMarkers.icon({
          icon: 'fa-city',
          markerColor: '#33B3A6',
          iconColor: 'white',
          shape: 'square',
          prefix: 'fas',
          extraClasses: 'extra-marker-icon',
          svg: true,
        });
  
        for (let i = 0; i < 50 && i < data.response.length; i++) {
          let city = data.response[i];
  
          let cityInfoMarker = L.marker([city.lat, city.lng], {
            icon: cityMarker,
          }).addTo(countryMarkersGroup);
  
          let formattedPopulation = city.population ? numeral(city.population).format('0,0') : 'No Data';
          let formattedLatitude = city.lat ? numeral(city.lat).format('0.000') : 'No Data';
          let formattedLongitude = city.lng ? numeral(city.lng).format('0.000') : 'No Data';
  
          cityInfoMarker.bindPopup(`  
            <div class="city-details">
              <i class="fas fa-city city-icon"></i>
              <br>
              <h1 class="city-name">${city.name ? city.name : "No Data"}</h1>
              <div class="city-population">Population: ${formattedPopulation}</div>
              <div class="city-wikipedia">Wikipedia: ${
                city.wikipedia
                  ? `<a href="${city.wikipedia}" target="_blank">${city.name}</a>`
                  : "No Data"
              }</div>
              <div class="city-timezone">Timezone: ${
                city.timezone ? city.timezone : "No Data"
              }</div>
              <div class="city-latitude">Latitude: ${formattedLatitude}</div>
              <div class="city-longitude">Longitude: ${formattedLongitude}</div>
            </div>
          `);
  
          countryMarkersGroup.addLayer(cityInfoMarker);
          country.addLayer(countryMarkersGroup);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error:", textStatus, errorThrown);
        console.log("There is an error");
      },
    });
  }
  
  

  var roadGoatCitySlug;

  function getRoadGoatSlugData(city) {
    $.ajax({
      type: "GET",
      url: "libs/php/roadgoatDestinationsSlug.php",
      data: {
        city: city,
      },
      dataType: "json",
      success: function (response) {
        if (response !== null) {
          roadGoatCitySlug = response.citySlug;

          getRoadGoatData(roadGoatCitySlug);
        } else {
          console.log("Response is null");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error:", textStatus, errorThrown);
        console.log("There is an error");
      },
    });
  }



  function getRoadGoatData(citySlug) {
    $.ajax({
      type: "GET",
      url: "libs/php/roadgoatDestinations.php",
      data: {
        citySlug: citySlug,
      },
      dataType: "json",
      success: function (data) {
        const covidData = data.data.attributes.covid;

        const city_short_name = data.data.attributes.short_name;

        let covidText;

        if (Object.entries(covidData).length === 0) {
          covidText = "No Data";
        } else {
          Object.entries(covidData).forEach(([name, covid]) => {
            if (countryName.toLowerCase().includes(name.toLowerCase())) {
              covidText = covid.text ?? "No Data";
            }
          });
        }

        const travelCostData = data.data.attributes.budget;
        let travelCostText;

        if (Object.entries(travelCostData).length === 0) {
          travelCostText = "No Data";
        } else {
          Object.entries(travelCostData).forEach(([name, travelCost]) => {
            if (
              name.toLowerCase().includes(city_short_name.toLowerCase()) ||
              countryName.toLowerCase().includes(name.toLowerCase())
            ) {
              travelCostText = travelCost.text ?? "No Data";
            }
          });
        }
        const safetyData = data.data.attributes.safety;
        let safetyText;

        if (Object.entries(safetyData).length === 0) {
          safetyText = "No Data";
        } else {
          Object.entries(safetyData).forEach(([name, safety]) => {
            if (
              name.toLowerCase().includes(city_short_name.toLowerCase()) ||
              countryName.toLowerCase().includes(name.toLowerCase())
            ) {
              safetyText = safety.text || "No Data";
            }
          });
        }

       

        var cityDestinationMarkerIcon = L.ExtraMarkers.icon({
          icon: 'fa-map-location',
          markerColor: '#ff6daa',
          iconColor: 'white',
          shape: 'square',
          prefix: 'fa-solid',
          extraClasses: 'roadgoat-marker-icon',
          svg: true,
        });

        const average_rating = data.data.attributes.average_rating;
        const averageRatingFormatted = numeral(average_rating).format("0.0");
        const airbnb = data.data.attributes.airbnb_url;
        const alltrails = data.data.attributes.alltrails_url;

        const getyourguide = data.data.attributes.getyourguide_url;
        const google_events = data.data.attributes.google_events_url;
        const travel_guide = data.data.attributes.url;

      

        const cityMarker = L.marker(
          [data.data.attributes.latitude, data.data.attributes.longitude],
          { icon: cityDestinationMarkerIcon }
        ).addTo(cityDestinationsMarkersGroup);
        cityMarker.bindPopup(`<div class="roadgoat-container">
                          <div class="roadgoat-heading">
                            <h2 class="roadgoat-title">RoadGoat Travel Guides</h2>
                            <br>
                            <i class="fa-solid fa-map-location roadgoat-icon"></i>
                            <br>
                            <span class="city-name"> ${city_short_name}</span>
                          
                            <span class="roadgoat-info">Road Goat Average Rating: ${
                              average_rating % 1 !== 0
                                ? averageRatingFormatted
                                : average_rating
                            }</span>
                        
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
                            <span class="keep-in-mind-info">Safety: <strong class="info-value">${
                              safetyText ? safetyText : "No Data"
                            }</strong></span>
                            <span class="keep-in-mind-info">Covid: <strong class="info-value">${
                              covidText ? covidText : "No Data"
                            }</strong></span>
                            <span class="keep-in-mind-info">Travel Cost: <strong class="info-value">${
                              travelCostText ? travelCostText : "No Data"
                            }</strong></span>
                            </div>
                          </div>
                        </div>
                        `);
        cityDestinationsMarkersGroup.addLayer(cityMarker);
       
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error:", textStatus, errorThrown);
        console.log("There is an error");
      },
    });
  }

  var airportMarkerIcon = L.ExtraMarkers.icon({
    icon: 'fa-plane',
    markerColor: 'orange',
    iconColor: 'white',
    shape: 'square',
    prefix: 'fas',
    extraClasses: 'airport-marker-icon',
    svg: true,
  });

 


  function getAirportData(countryCode) {
    $.ajax({
      type: "GET",
      url: "libs/php/airportsAPI.php",
      data: {
        countryCode: countryCode,
      },
      dataType: "json",
      success: function (data) {
        for (var i = 0; i < 10; i++) {
          var airport = data.response[i];
          var latLng = L.latLng(airport.lat, airport.lng);
          var marker = L.marker(latLng, {
            icon: airportMarkerIcon
          }).addTo(planeMarkersGroup);
          
          var popularityFormatted = airport.popularity
            ? numeral(airport.popularity).format('0,0')
            : 'No Data';
          
          var latitudeFormatted = airport.lat
            ? numeral(airport.lat).format('0.0000')
            : 'No Data';
            
          var longitudeFormatted = airport.lng
            ? numeral(airport.lng).format('0.0000')
            : 'No Data';
          
          var popupHtml = `   <div class="airport-details">
            <i class="fas fa-plane airport-icon"></i>
            <br>
            <h1 class="airport-name">${airport.name ? airport.name : "No Data"}</h1>
  
            <div class="airport-city">City: ${airport.city ? airport.city : "No Data"}</div>
  
            <div class="airport-city-code">City Code: ${airport.city_code ? airport.city_code : "No Data"}</div>
  
            <div class="airport-popularity">Popularity: ${popularityFormatted}</div>
  
            <div class="airport-latitude">Latitude: ${latitudeFormatted}</div>
            
            <div class="airport-longitude">Longitude: ${longitudeFormatted}</div>
  
            <div class="airport-timezone">Timezone: ${airport.timezone ? airport.timezone : "No Data"}</div>
          </div>`;
  
          marker.bindPopup(popupHtml);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error:", textStatus, errorThrown);
      },
    });
  }
  

  getAirportData(twoDigitCountryCode);

  



  

function getWeather(cityName) {
  $.ajax({
    type: "GET",
    url: "libs/php/weatherAPI.php",
    data: {
      cityName: cityName,
    },
    dataType: "json",
    success: function (data) {
      weatherData = data.data;
      weatherDataName = weatherData.name;
      weatherDataCountry = weatherData.sys.country;

      
      var tbody = $("#weatherTable tbody");

      
      tbody.empty();

      
      createTableRow("fa-cloud", "Weather", weatherData.weather[0].description);
      createTableRow("fa-thermometer-half", "Temperature", convertKelvinToCelsius(weatherData.main.temp) + "°C");
      createTableRow("fa-info-circle", "Feels like", convertKelvinToCelsius(weatherData.main.feels_like) + "°C. ");
      createTableRow("fa-wind", "Wind Speed", weatherData.wind.speed + "m/s ");
      createTableRow("fa-compass", "Wind Degree", weatherData.wind.deg + "°");
      createTableRow("fa-tachometer-alt", "Pressure", weatherData.main.pressure + "hPa");
      createTableRow("fa-tint", "Humidity", weatherData.main.humidity + "%");
      createTableRow("fa-eye", "Visibility", weatherData.visibility / 1000 + "km");

      
      function createTableRow(iconClass, label, ...values) {
        var row = $("<tr></tr>");

        var iconCell = $("<td><i class='fa " + iconClass + "'></i></td>");
        var labelCell = $("<td></td>").text(label);
        var valueCell = $("<td></td>").text(values.join(". "));

        row.append(iconCell);
        row.append(labelCell);
        row.append(valueCell);

        tbody.append(row);
      }

      function convertKelvinToCelsius(kelvin) {
        return (kelvin - 273.15).toFixed(2);
      }

     
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error:", textStatus, errorThrown);
      console.log("There is an error");
    },
  });
}

  
  
  
  
  


}





$("#modal").on("hidden.bs.modal", function () {
  
  $("#countrySelect").removeClass("disabled");
});

function modal() {
  $("#modal").modal({
    backdrop: false,
    show: true,
  });

  $(".modal-backdrop").remove();

  $("#modal").modal("show");

  $("body").removeClass("modal-open");

  $("#countrySelect").addClass("disabled");
}

var lat;
var long;
var countryCode;
var countryName;

var border;
$(document).ready(function () {


  country = L.featureGroup().addTo(map);




  countryMarkersGroup.addTo(country);

 

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    console.log("Geolocation not supported");
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        function getCountryCodes() {
          $.ajax({
            url: "libs/php/getCountryCodes.php",
            type: "POST",
            dataType: "json",
            success: function (data) {
              var countryCodesArray = [];

              for (var i = 0; i < data.data.iso2_codes.length; i++) {
                countryCodesArray.push(data.data.iso2_codes[i]);
              }

              getCountries(countryCodesArray);
            },
            error: function (jqXHR, textStatus, errorThrown) {
              console.log("Error:", textStatus, errorThrown);
              console.log("There is an error");
            },
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

        function getCountries(countryCodesArray) {
          $.ajax({
            url: "libs/php/getCountries.php",
            type: "POST",
            dataType: "json",
            success: function (data) {
              var countriesList = [];

              for (var i = 0; i < data.length; i++) {
                var countryCodeMatch = data[i].iso2_code;
                if (countryCodesArray.includes(countryCodeMatch)) {
                  var countryItem = {
                    code: data[i].iso3_code,
                    name: data[i].name,
                  };
                  countriesList.push(countryItem);
                }
              }

              countriesList.sort(function (a, b) {
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
                $("#countrySelect").append(
                  $("<option>", {
                    value: countriesList[j].code,
                    text: countriesList[j].name,
                  })
                );
              }

              countryCode = $("#countrySelect option:first").val();
              const filterData = data.filter(
                (a) => a.iso3_code === countryCode
              );

              if (filterData.length > 0) {
                fetchCountryGeometry(countryCode);

                countryCode = filterData[0].iso3_code;

                twoDigitCountryCode = filterData[0].iso2_code;

                countryName = filterData[0].name;

                fetchData(countryCode, twoDigitCountryCode, countryName);

                function modalHeader(iconClassOne, iconClassTwo) {
                  const icon = document.createElement("i");
                  icon.classList.add(iconClassOne, iconClassTwo);

                  const text = document.createElement("span");
                  text.textContent = `${countryName}'s Country/Cities Information`;

                  const modalHeader = document.querySelector(".modal-title");
                  modalHeader.innerHTML = "";
                  modalHeader.appendChild(icon);
                  modalHeader.appendChild(text);
                }
                modalHeader("fa-solid", "fa-flag");
              } else {
                console.error("No matching country found:", countryCode);
              }
            },
            error: function (jqXHR, textStatus, errorThrown) {
              console.log("Error:", textStatus, errorThrown);
              console.log("There is an error");
            },
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
      type: "POST",
      dataType: "json",
      success: function (data) {
        var countryCodesArray = [];

        for (var i = 0; i < data.data.iso2_codes.length; i++) {
          countryCodesArray.push(data.data.iso2_codes[i]);
        }

        getCountries(countryCodesArray);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error:", textStatus, errorThrown);
        console.log("There is an error");
      },
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

  function getCountries(countryCodesArray) {
    $.ajax({
      url: "libs/php/getCountries.php",
      type: "POST",
      dataType: "json",
      success: function (data) {
        var countriesList = [];

        for (var i = 0; i < data.length; i++) {
          var countryCodeMatch = data[i].iso2_code;
          if (countryCodesArray.includes(countryCodeMatch)) {
            var countryItem = {
              code: data[i].iso3_code,
              name: data[i].name,
            };
            countriesList.push(countryItem);
          }
        }

        countriesList.sort(function (a, b) {
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
          $("#countrySelect").append(
            $("<option>", {
              value: countriesList[j].code,
              text: countriesList[j].name,
            })
          );
        }

        const filterData = data.filter((a) => a.iso3_code === countryCode);

        if (filterData.length > 0) {
          fetchCountryGeometry(countryCode);

          $("#countrySelect").val(filterData[0].iso3_code);
          countryCode = filterData[0].iso3_code;

          twoDigitCountryCode = filterData[0].iso2_code;
          countryName = filterData[0].name;

          fetchData(countryCode, twoDigitCountryCode, countryName);

          function modalHeader(iconClassOne, iconClassTwo) {
            const icon = document.createElement("i");
            icon.classList.add(iconClassOne, iconClassTwo);

            const text = document.createElement("span");
            text.textContent = `${countryName}'s Country/Cities Information`;

            const modalHeader = document.querySelector(".modal-title");
            modalHeader.innerHTML = "";
            modalHeader.appendChild(icon);
            modalHeader.appendChild(text);
          }
          modalHeader("fa-solid", "fa-flag");
        } else {
          console.error("No matching country found:", countryCode);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error:", textStatus, errorThrown);
        console.log("There is an error");
      },
    });
  }

  $("#countrySelect").change(function () {
   

    let name = $("#countrySelect").val();
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

    function getCountriesSelect() {
      $.ajax({
        url: "libs/php/getCountries.php",
        type: "POST",
        dataType: "json",
        success: function (data) {
        
        
          
          earthquakeMarkersGroup.clearLayers();

          wikiMarkersGroup.clearLayers();
          countryMarkersGroup.clearLayers();
          planeMarkersGroup.clearLayers();
          cityDestinationsMarkersGroup.clearLayers();

          country.clearLayers();
 
          country.removeLayer(earthquakeMarkersGroup);
          country.removeLayer(wikiMarkersGroup);
          country.addLayer(countryMarkersGroup);
          country.removeLayer(planeMarkersGroup);

          country.removeLayer(cityDestinationsMarkersGroup);

          const filterData = data.filter((a) => a.iso3_code === name);

          if (filterData.length > 0) {
            fetchCountryGeometrySelect(name);

            countryCode = filterData[0].iso3_code;

            twoDigitCountryCode = filterData[0].iso2_code;

            countryName = filterData[0].name;

            fetchData(countryCode, twoDigitCountryCode, countryName);

          
          } else {
            console.error("No matching country found:", countryCode);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error:", textStatus, errorThrown);
          console.log("There is an error");
        },
      });
    }
  });

  var overlays = {
    '<i class="fas fa-city"></i>Country/Cities Info': countryMarkersGroup,
    '<i class="fas fa-exclamation-triangle"></i>Earthquakes': earthquakeMarkersGroup,
    '<i class="fa-brands fa-wikipedia-w"></i>Wikipedia Articles' : wikiMarkersGroup,
    '<i class="fa-solid fa-plane"></i>Airports': planeMarkersGroup,
    '<i class="fa-solid fa-map-location"></i>RoadGoat Destinations': cityDestinationsMarkersGroup
  };


  
  var layerControl = L.control.layers(basemaps, overlays).addTo(map);

  var countryButton = L.easyButton({
       states: [
      {
        icon: '<div class="easy-button"><i style="color: green;" class="fa-solid fa-flag country-button-icon"></i>></div>',
        onClick: function (btn, map) {
     
          $("#exchange-rates-table").hide();
          $("#news-table").hide();
          $("#holiday-table").hide();
          $("#weatherTable").hide();
          $("#images-container").hide();
          $("#countryTable").show();

          $(".modal-header").css("background-color", "green");

        
          function modalHeader() {
            const text = document.createElement("span");
            text.textContent = `${countryName}'s Country Information`;
    
            const modalHeader = document.querySelector(".modal-title");
            modalHeader.innerHTML = "";
    
            modalHeader.appendChild(text);
          }
          modalHeader();
          modal();
          
        },
        sideText: "Show Country Markers",
      },
    ],

    id: "countryButton",
    leafletClasses: true,
    className: "easy-button-class",
   
    
  });

  
 
  var weatherButton = L.easyButton({
    states: [
      {
        icon: '<div class="easy-button text-center"><i style="color: blue; display: flex" class="fas fa-cloud weather-button-icon"></i></div>',
        onClick: function (btn, map) {
      
          $("#exchange-rates-table").hide();
          $("#news-table").hide();
          $("#holiday-table").hide();
          $("#weatherTable").show();
          $("#images-container").hide();
          $("#countryTable").hide();
          $(".modal-header").css("background-color", "blue");
          function modalHeader() {
            const text = document.createElement("span");
            text.textContent = `${weatherDataName}, ${weatherDataCountry} Weather Information`;
    
            const modalHeader = document.querySelector(".modal-title");
            modalHeader.innerHTML = "";
    
            modalHeader.appendChild(text);
          }
          modalHeader();

         
          modal();

          
        },
      },
    ],

    id: "weatherButton",
    leafletClasses: true,
    className: "easy-button-class",
    
  });

  var currencyButton = L.easyButton({
    states: [
      {
        icon: '<div class="easy-button"><i style="color: #FFC300;" class="fa-solid fa-coins"></i></div>',
        onClick: function (btn, map) {
        
          $("#exchange-rates-table").show();
          $("#news-table").hide();
          $("#holiday-table").hide();
          $("#weatherTable").hide();
          $("#images-container").hide();
          $("#countryTable").hide();
          $(".modal-header").css("background-color", "#ffbb00");

          function modalHeader() {
            

            const text = document.createElement("span");
            text.textContent = `${countryName}'s Currency Exchange Rates`;

            const modalHeader = document.querySelector(".modal-title");
            modalHeader.innerHTML = "";
            modalHeader.appendChild(text);
          }
          modalHeader();
          modal();
          
        },
      },
    ],

    id: "currencyButton",
    leafletClasses: true,
    className: "easy-button-class",
    
  });

  var holidayButton = L.easyButton({
    
    states: [
      {
        icon: '<div class="easy-button"><i style="color: purple;" class="fa-solid fa-calendar-days holiday-button-icon"></i></div>',
        onClick: function (btn, map) {
          buttonClicked = true
         
          $("#exchange-rates-table").hide();
          $("#news-table").hide();
          $("#holiday-table").show();
          $("#weatherTable").hide();
          $("#images-container").hide();
          $("#countryTable").hide();
          $(".modal-header").css("background-color", "purple");

          function modalHeader() {
            const text = document.createElement("span");
            text.textContent = `${countryName}'s National Holidays`;
    
            const modalHeader = document.querySelector(".modal-title");
            modalHeader.innerHTML = "";
    
            modalHeader.appendChild(text);
          }
          modalHeader();
          modal();
          
         
          
          
        },
      },
    ],

    id: "holidayButton",
    leafletClasses: true,
    className: "easy-button-class",
    
  });

  var newsButton = L.easyButton({
    states: [
      {
        icon: '<div class="easy-button"><i style="color: red;" class="fas fa-newspaper news-button-icon"></i></div>',
        onClick: function (btn, map) {
         
          $("#exchange-rates-table").hide();
          $("#news-table").show();
          $("#holiday-table").hide();
          $("#weatherTable").hide();
          $("#images-container").hide();
          $("#countryTable").hide();
          $(".modal-header").css("background-color", "red");

          function modalHeader() {
            const text = document.createElement("span");
            text.textContent = `${countryName}'s News Stories`;
    
            const modalHeader = document.querySelector(".modal-title");
            modalHeader.innerHTML = "";
    
            modalHeader.appendChild(text);
          }
          modalHeader();
          modal();
    
        },
      },
    ],

    id: "newsButton",
    leafletClasses: true,
    className: "easy-button-class",
  });

  var imagesButton = L.easyButton({
    states: [
      {
        icon: '<div class="easy-button"><i style="color: black;" class="fas fa-image images-button-icon"></i></div>',
        onClick: function (btn, map) {
    
          $("#exchange-rates-table").hide();
          $("#news-table").hide();
          $("#holiday-table").hide();
          $("#weatherTable").hide();
          $("#images-container").show();
          $("#countryTable").hide();
          $(".modal-header").css("background-color", "black");

          function modalHeader() {
           

            const text = document.createElement("span");
            text.textContent = `${countryName} Images`;

            const modalHeader = document.querySelector(".modal-title");
            modalHeader.innerHTML = "";
            
            modalHeader.appendChild(text);
          }
          modalHeader();
          modal();
          
          
        },
      },
    ],

    id: "imagesButton",
    leafletClasses: true,
    className: "easy-button-class"
  });

  countryButton.addTo(map);
  weatherButton.addTo(map);
  currencyButton.addTo(map);
  holidayButton.addTo(map);
  newsButton.addTo(map);
  imagesButton.addTo(map);
});
