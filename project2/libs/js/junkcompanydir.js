
function populateLocationDetails(data, allLocationsData) {
    console.log(data);
    console.log(allLocationsData);
    console.log(allPersonnelData);
  
    currentLocationId = data.id;
    var detailsName = $("#location-details-name");
    var locationDepartmentsDiv = $("#location-departments-div");
    var locationPersonnelDiv = $("#location-personnel-div");
    var locationDepartmentsTitle = $("#location-departments-name");
    var locationPersonnelTitle = $(".locations-personnel-title");
  
    detailsName.text(data.name);
  
    function updateStyling() {
      locationDepartmentsDiv.empty();
      locationPersonnelDiv.empty();
  
      var departmentsInLocation = [];
      var personnelInLocation = [];
  
      var locationID;
      for (var i = 0; i < allLocationsData.data.locations.length; i++) {
        if (allLocationsData.data.locations[i].name === data.name) {
          locationID = allLocationsData.data.locations[i].id;
          break;
        }
      }
  
      allLocationsData.data.departments.forEach(function(department) {
        if (department.locationID === locationID) {
          departmentsInLocation.push(department.name);
        }
      });
  
      allPersonnelData.forEach(function(person) {
        if (person.location === data.name) {
          personnelInLocation.push(person);
        }
      });
  
      // Populate departments in the location
      if (departmentsInLocation.length > 0) {
        departmentsInLocation.forEach(function(department) {
          var departmentCount = personnelInLocation.reduce(function(count, person) {
            if (person.department === department) {
              return count + 1;
            }
            return count;
          }, 0);
          var departmentInfo = "<div class='department-location-info'>" +
            "<p class='card-text'>" + department + "</p>" +
            "<p class='card-text'>" + departmentCount + " Personnel</p>" +
            "</div>";
          locationDepartmentsDiv.append(departmentInfo);
        });
        locationDepartmentsTitle.text("Departments (" + departmentsInLocation.length + ")");
      } else {
        var noDepartmentsMessage = "<p class='card-text'>No departments found in this location.</p>";
        locationDepartmentsDiv.append(noDepartmentsMessage);
        locationDepartmentsTitle.text("Departments (0)");
      }
  
      // Populate personnel in the location
      if (personnelInLocation.length > 0) {
        personnelInLocation.sort(function(a, b) {
          var nameA = a.firstName.toLowerCase() + " " + a.lastName.toLowerCase();
          var nameB = b.firstName.toLowerCase() + " " + b.lastName.toLowerCase();
          return nameA.localeCompare(nameB);
        });
  
        personnelInLocation.forEach(function(person) {
          var fullName = "<p class='card-text'>" + person.firstName + " " + person.lastName + "</p>";
          var email = "<p class='card-text' id='details-location-personnel-email'>" + person.email + "</p>";
          var personnelInfo = "<div class='personnel-info'>" + fullName + email + "</div>";
          locationPersonnelDiv.append(personnelInfo);
        });
  
        locationPersonnelTitle.text("Personnel (" + personnelInLocation.length + ")");
      } else {
        var noPersonnelMessage = "<p class='card-text'>No personnel found in this location.</p>";
        locationPersonnelDiv.append(noPersonnelMessage);
        locationPersonnelTitle.text("Personnel (0)");
      }
  
      // var totalPersonnelCount = personnelInLocation.length;
      // var totalPersonnelText = "<p class='location-personnel-count'>" + totalPersonnelCount + " Personnel</p>";
      // locationPersonnelTitle.append(totalPersonnelText);
    }
  
    updateStyling();
  
    $(window).resize(function() {
      updateStyling();
    });
  }

  /* .show {
  display: block;
} */