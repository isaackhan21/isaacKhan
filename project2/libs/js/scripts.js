var dataSorted = false;
var currentOption = "firstName";
var currentPersonId;
var currentDepartmentId;
var currentLocationId;
column3shown = false;
var currentLocationID;
var personnelSorted = false;
var personnelReloadSorted = false;
var searchTermQuery = false;




function toggleDropdown() {
  var dropdownMenu = document.getElementById("dropdown-menu");
  dropdownMenu.classList.toggle("show");
}



window.onclick = function(event) {
  if (!event.target.matches('.btn')) {
    var dropdowns = document.getElementsByClassName("dropdown-menu");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function toggleDropdownMobile() {
  var dropdownMenu = document.getElementById("dropdown-menu-mobile");
  dropdownMenu.classList.toggle("show");
}



window.onclick = function(event) {
  if (!event.target.matches('.btn')) {
    var dropdowns = document.getElementsByClassName("dropdown-menu");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function toggleDropdownCategories() {
  var dropdownMenu = document.getElementById("categories-dropdown-menu");
  dropdownMenu.classList.toggle("show");
}



window.onclick = function(event) {
  
  if (!event.target.matches('.btn')) {
    var dropdowns = document.getElementsByClassName("dropdown-menu");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}





$(document).ready(function() {
  function updateButtonVisibility() {
    if ($(window).width() <= 767) {
      
      $('#add-employee-button').hide();
      $('#add-employee-button-mobile').show();
      $('#search-filters-mobile-button').show();
      $('#back-button').hide();
      $('.dropdown').show();

      
    } else {
      
      $('#add-employee-button-mobile').hide();
      $('#add-employee-button').show();
      $('#search-filters-mobile-button').hide();
      $('#back-button').hide();
      
   
      
    }
  }
  function updateLayoutVisibility() {
    if ($(window).width() <= 1024) {
      
      
      if ($(window).width() <= 767) {
       
        $('.column-2').show();
        $('.column-3').hide();
        $('.dropdown').show();
      } else {
        
        $('.column-2').show();
        $('.column-3').show();
      }
    } else {
      
      $('.column-1, .column-2, .column-3').show();
    }
  }
  

    
    updateButtonVisibility();
    updateLayoutVisibility();

    
    $(window).resize(function() {
      updateButtonVisibility();
      updateLayoutVisibility();
    });
});




  $(document).on('click', '.department-table-data tr', function() {
    if ($(window).width() <= 767) {
      $('.column-1, .column-2').hide();
      $('.column-3').show();
      $('#back-button').show();
      $('.dropdown').hide();
      
    }
  });

  $(document).on('click', '.table-data tr', function() {
    if ($(window).width() <= 767) {
      $('.column-1, .column-2').hide();
      $('.column-3').show();
      $('#back-button').show();
      $('.dropdown').hide();
      
    }
  });

  $(document).on('click', '.location-table-data tr', function() {
    if ($(window).width() <= 767) {
      $('.column-1, .column-2').hide();
      $('.column-3').show();
      $('#back-button').show();
      $('.dropdown').hide();
      
    }
  });


$(document).ready(function() {
  $('#back-button').on('click', function() {
    if ($(window).width() <= 767) {
      $('.column-2').show();
      $('.column-3').hide();
      $('#back-button').hide();
      $('.dropdown').show();
      
    }
  });
});
$(document).ready(function() {
    if ($(window).width() <= 767) {
      $('#personnel-count').hide();
      
    }
  });

$(document).ready(function() {
  
$('.toggle-sidebar-mobile, .toggle-sidebar').on('click', function() {
  $('#collapsed-sidebar').toggleClass('active');
  $('body').toggleClass('sidebar-open');

  if ($('#collapsed-sidebar').hasClass('active')) {
    $('body').addClass('inactive-background');
  } else {
    $('body').removeClass('inactive-background');
  }
});

});

$(document).ready(function() {
  
  function toggleSidebar() {
    $('#collapsed-sidebar').toggleClass('active');
    $('body').toggleClass('sidebar-open');

    if ($('#collapsed-sidebar').hasClass('active')) {
      $('body').addClass('inactive-background');
    } else {
      $('body').removeClass('inactive-background');
    }
  }

  
  $('.close-sidebar').click(function() {
    toggleSidebar();
  });

  
  $('body.sidebar-open').click(function(e) {
    if ($(e.target).closest('#collapsed-sidebar').length === 0) {
      toggleSidebar();
    }
  });

  $('#search-button-sidebar').click(function() {
  toggleSidebar();
});

$('#reset-filters-button-sidebar').click(function() {
  toggleSidebar();
});


});

$(document).ready(function() {
  $('.table-data').show();
  $('.department-table-data').hide();
  $('.location-table-data').hide();
  $('#personnel-card').show();
  $('#department-card').hide();
  $('#location-card').hide();
  $(".sidebar-row:first").addClass("focused-row");
  $(".sidebar-row:eq(1)").removeClass("focused-row");
  $(".sidebar-row:eq(2)").removeClass("focused-row");
  $('#personnel-count').show();
  $('#department-count').hide();
  $('#location-count').hide();



$('#department-change-button, #department-change-button-header, #department-change-button-dropdown').click(function() {
  $('.table-data').hide();
  $('.department-table-data').show();
  $('.location-table-data').hide();
  $('#personnel-card').hide();
  $('#department-card').show();
  $('#location-card').hide();
  $(".sidebar-row:first").removeClass("focused-row");
  $(".sidebar-row:eq(1)").addClass("focused-row");
  $(".sidebar-row:eq(2)").removeClass("focused-row");
  $('#personnel-count').hide();
  $('#department-count').show();
  $('#location-count').hide();
})

$('#personnel-change-button, #personnel-change-button-header, #personnel-change-button-dropdown').click(function() {
  $('.table-data').show();
  $('.department-table-data').hide();
  $('.location-table-data').hide();
  $('#personnel-card').show();
  $('#department-card').hide();
  $('#location-card').hide();
  $(".sidebar-row:first").addClass("focused-row");
  $(".sidebar-row:eq(1)").removeClass("focused-row");
  $(".sidebar-row:eq(2)").removeClass("focused-row");
  $('#personnel-count').show();
  $('#department-count').hide();
  $('#location-count').hide();
});

$('#location-change-button, #location-change-button-header, #location-change-button-dropdown').click(function() {
  $('.table-data').hide();
  $('.department-table-data').hide();
  $('.location-table-data').show();
  $('#personnel-card').hide();
  $('#department-card').hide();
  $('#location-card').show();
  $(".sidebar-row:first").removeClass("focused-row");
  $(".sidebar-row:eq(1)").removeClass("focused-row");
  $(".sidebar-row:eq(2)").addClass("focused-row");
  $('#personnel-count').hide();
  $('#department-count').hide();
  $('#location-count').show();
});

})



function changeDropdownText(text) {
  var dropdownButton = document.getElementById("categories-dropdown-button");
  dropdownButton.innerHTML = text;
}





function showSuccessAlert(message) {
  var alertElement = $("#alert");
  alertElement.removeClass("alert-danger").addClass("alert-success");
  alertElement.html('<button type="button" class="close" data-dismiss="alert" aria-label="Close">&times;</button>' + message).fadeIn();

  setTimeout(function() {
    alertElement.fadeOut();
  }, 6000); 
}

function showErrorAlert(message) {
  var alertElement = $("#alert");
  alertElement.removeClass("alert-success").addClass("alert-danger");
  alertElement.html('<button type="button" class="close" data-dismiss="alert" aria-label="Close">&times;</button>' + message).fadeIn();

  setTimeout(function() {
    alertElement.fadeOut();
  }, 6000); 
}




function populateDetails(data) {
  currentPersonId = data.id;
  var detailsName = $("#details-name");
  var detailsEmail = $("#details-email");
  var detailsDepartment = $("#details-department");
  var detailsLocation = $("#details-location");

  
  detailsName.text(data.firstName + " " + data.lastName);
  detailsEmail.text(data.email);

  
  
   
      detailsDepartment.html("Department<br><span class='department-info'>" + (data.department || 'Not Found') + "</span>");
      detailsLocation.html("Location<br><span class='department-info'>" + (data.location || 'Not Found') + "</span>");
   
  

  
}

function populateDepartmentDetails(data, allData) {


  currentDepartmentId = data.id;
  var detailsName = $("#department-details-name");
  var detailsDepartmentPersonnel = $("#details-department-personnel");
  var detailsLocationPersonnel = $("#details-location-personnel");
  var departmentPersonnelTitle = $(".department-personnel-title");

  detailsName.text(data.name);

  function updateStyling() {
    detailsDepartmentPersonnel.empty();
    detailsLocationPersonnel.empty();

    var departmentPersonnel = allData.data.personnel.filter(function(person) {
      return person.department === data.name;
    });

    if (departmentPersonnel.length > 0) {
      departmentPersonnel.sort(function(a, b) {
        var nameA = a.firstName.toLowerCase() + " " + a.lastName.toLowerCase();
        var nameB = b.firstName.toLowerCase() + " " + b.lastName.toLowerCase();
        return nameA.localeCompare(nameB);
      });

      departmentPersonnel.forEach(function(person) {
        var fullName = "<p class='card-text'>" + person.firstName + " " + person.lastName + "</p>";
        var email = "<p class='card-text' id='details-department-personnel-email'>" + person.email + "</p>";
        var personnelInfo = "<div class='personnel-info'>" + fullName + email + "</div>";
        detailsDepartmentPersonnel.append(personnelInfo);
      });

      departmentPersonnelTitle.text("Personnel (" + departmentPersonnel.length + ")");
    } else {
      var noPersonnelMessage = "<p class='card-text'>No personnel found for this department.</p>";
      detailsDepartmentPersonnel.append(noPersonnelMessage);
      departmentPersonnelTitle.text("Personnel (0)");
    }

    var departmentLocationID = allData.data.departments.filter(function(department) {
      return department.name === data.name;
    })[0].locationID;

    var departmentLocationName = departmentLocationID !== null ? allData.data.locations.find(function(location) {
      return location.id === departmentLocationID;
    }).name : "Not Found";
    

    if (departmentLocationName) {
      var locationName = "<p class='card-text'>" + departmentLocationName + "</p>";
      detailsLocationPersonnel.append(locationName);
    } else {
      var noLocationsMessage = "<p class='card-text'>No location found for this department.</p>";
      detailsLocationPersonnel.append(noLocationsMessage);
    }
  }

  updateStyling();

  $(window).resize(function() {
    updateStyling();
  });
}
















function populateLocationDetails(data, allData) {
  

  currentLocationId = data.id;
  var detailsName = $("#location-details-name");
  var locationDepartmentsDiv = $("#location-departments-div");
  var locationDepartmentsTitle = $("#location-departments-name");

  detailsName.text(data.name);

  function updateStyling() {
    locationDepartmentsDiv.empty();

    var departmentsInLocation = [];

    var locationID;
    for (var i = 0; i < allData.data.locations.length; i++) {
      if (allData.data.locations[i].name === data.name) {
        locationID = allData.data.locations[i].id;
        break;
      }
    }

    allData.data.departments.forEach(function(department) {
      if (department.locationID === locationID) {
        departmentsInLocation.push(department.name);
      }
    });

    
    if (departmentsInLocation.length > 0) {
      departmentsInLocation.forEach(function(department) {
        var departmentCount = allData.data.personnel.filter(function(person) {
          return person.department === department && person.location === data.name;
        }).length;
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
  }

  updateStyling();

  $(window).resize(function() {
    updateStyling();
  });
}







var sortedData;



function populateTable(data) {
  var tableBody = $("#table-body");
  

  tableBody.empty();
  sortedData = data.data;

  

  sortedData.sort(function(a, b) {
    var nameA = a.firstName + " " + a.lastName;
    var nameB = b.firstName + " " + b.lastName;
    return nameA.localeCompare(nameB);
  });

  sortedData.forEach(function(entry, index) {
    var row = $("<tr>");
    row.attr("data-id", entry.id);

    var td = $("<td>");

    var name = $("<h5>").text(entry.firstName + " " + entry.lastName);
    var email = $("<p>").text(entry.email);

    td.append(name, email);
    row.append(td);

    row.on("click", function() {
      populateDetails(entry);
      tableBody.find("tr").removeClass("active-row");
      $(this).addClass("active-row");
    });

    tableBody.append(row);

    if (index === 0) {
      populateDetails(entry);
      row.addClass("active-row");
    }
    personnelSorted = true;
  });

  var personnelCount = sortedData.length;
  var personnelCountText = personnelCount + " Personnel";
  $("#personnel-count").text(personnelCountText);
}






function populateDepartmentTable(data) {
  
  var tableBody = $("#department-table-body");

  tableBody.empty();

  var sortedData = data.data.departments.slice();

  sortedData.sort(function(a, b) {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    return nameA.localeCompare(nameB);
  });

  sortedData.forEach(function(entry, index) {
    var row = $("<tr>");
    row.attr("data-id", entry.id);

    var td = $("<td>");

    var name = $("<h5>").text(entry.name);

    
    var location = $("<p>").text(getDepartmentLocation(entry.locationID, data));
    
    td.append(name, location);
    row.append(td);

    row.on("click", function() {
      populateDepartmentDetails(entry, data);

      tableBody.find("tr").removeClass("department-active-row");
      $(this).addClass("department-active-row");
    });

    tableBody.append(row);

    if (index === 0) {
      populateDepartmentDetails(entry, data);
      row.addClass("department-active-row");
    }
  });

  var departmentCount = sortedData.length;
  var departmentCountText = departmentCount + " Department";
  if (departmentCount !== 1) {
    departmentCountText += "s";
  }
  $("#department-count").text(departmentCountText);
}

function getDepartmentLocation(locationID, data) {
  var departmentLocation = "Location not found";

  data.data.locations.forEach(function(location) {
    if (location.id === locationID) {
      departmentLocation = location.name;
    }
  });

  return departmentLocation;
}



function populateLocationTable(data) {
  
  var tableBody = $("#location-table-body");

  tableBody.empty();

  var sortedData = data.data.locations.slice();

  sortedData.sort(function(a, b) {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    return nameA.localeCompare(nameB);
  });

  sortedData.forEach(function(entry, index) {
    var row = $("<tr>");
    row.attr("data-id", entry.id);

    var td = $("<td>");

    var name = $("<h5>").text(entry.name);
    var departmentCount = $("<p>").text(getDepartmentCount(entry.id, data) + " Departments");

    td.append(name, departmentCount);
    row.append(td);

    row.on("click", function() {
      populateLocationDetails(entry, data);

      tableBody.find("tr").removeClass("location-active-row");
      $(this).addClass("location-active-row");
    });

    tableBody.append(row);

    if (index === 0) {
      populateLocationDetails(entry, data);
      row.addClass("location-active-row");
    }
  });

  var locationCount = sortedData.length;
  var locationCountText = locationCount + " Location";
  if (locationCount !== 1) {
    locationCountText += "s";
  }
  $("#location-count").text(locationCountText);
}

function getDepartmentCount(locationId, data) {
  var count = 0;

  data.data.departments.forEach(function(department) {
    if (department.locationID === locationId) {
      count++;
    }
  });

  return count;
}








function getData() {
  $("#preloader").show();
  $(".search-input").val("");
  $.ajax({
    url: "libs/php/getAll.php",
    dataType: "json",
    success: function(data) {
      populateTable(data);
      getDepartments();
      getDepartmentsDropdown();
      getLocations();
      getLocationsDropdown();
      personnelReloadSorted = false;
      
      
      
      
        
      
      
    },
    error: function(xhr, status, error) {
      console.log("Error: " + error);
      showErrorAlert('Error retrieving data')
    }
  });
}


function showAddPersonModal() {
  $("#add-person-modal").modal("show");
}


$("#add-employee-button, #add-employee-button-dropdown, #add-employee-button-dropdown-mobile").on("click", function() {
  
  
  showAddPersonModal();
});

$("#add-employee-button-mobile").on("click", function() {
  
  
  showAddPersonModal();
});





function addPersonnel(personnelData) {
  $.ajax({
    url: "libs/php/insertPersonDetails.php", 
    type: "POST", 
    data: personnelData,
    dataType: "json",
    success: function(data) {
      
      showSuccessAlert("Personnel details updated successfully!");
      
      $("#add-person-form")[0].reset();
      
      $("#add-person-modal").modal("hide");
      dataSorted = false;
      
      getData(); 
    },
    error: function(xhr, status, error) {
      
      console.log("Error: " + error);
      showErrorAlert("Failed to update personnel details. Please try again.");
    }
  });
}

function addDepartment(departmentData) {
  $.ajax({
    url: "libs/php/insertDepartment.php", 
    type: "POST", 
    data: departmentData,
    dataType: "json",
    success: function(data) {
      
      showSuccessAlert("Department details updated successfully!");
      
      $("#add-department-form")[0].reset();
      
      $("#add-department-modal").modal("hide");
      dataSorted = false;
      
      getData(); 
    },
    error: function(xhr, status, error) {
      
      console.log("Error: " + error);
      showErrorAlert("Failed to update department details. Please try again.");
    }
  });
}

function addLocation(name) {
  $.ajax({
    url: "libs/php/insertLocation.php", 
    type: "POST", 
    data: {name: name},
    dataType: "json",
    success: function(data) {
      
      showSuccessAlert("Location details updated successfully!");
      
      $("#add-location-form")[0].reset();
      
      $("#add-location-modal").modal("hide");
      dataSorted = false;
      
      getData(); 
    },
    error: function(xhr, status, error) {
      
      console.log("Error: " + error);
      showErrorAlert("Failed to update location details. Please try again.");
    }
  });
}

function getLocationsDropdown() {
  $.ajax({
    url: "libs/php/getAllLocations.php",
    dataType: "json",
    success: function(data) {
     
     populateLocationDropdown(data);
     editPopulateLocationDropdown(data);
     addDepartmentForm(data.data);

     
      
    },
    error: function(xhr, status, error) {
      console.log("Error: " + error);
    }
  });
}


$("#add-person-form").on("submit", function(event) {
  event.preventDefault();
  var personnelData = {
    lastName: $("#lastName").val(),
    firstName: $("#firstName").val(),
    jobTitle: '',
    email: $("#email").val(),
    department: $("#department-dropdown").val()
  };
  
  addPersonnel(personnelData);
});

 
 $('#add-department-button, #add-department-button-dropdown, #add-department-button-dropdown-mobile').click(function() {
  $('#add-department-modal').modal('show');
});

function addDepartmentForm(locations){
$('#add-department-form').submit(function(e) {
  e.preventDefault();
  

  
  
  var departmentData = {
    name: $('#department-name').val(),
    locationID: $("#location-dropdown").val(),
  }
  

  for (var i = 0; i < locations.locations.length; i++) {
    if (locations.locations[i].name == departmentData.locationID) {
      currentLocationID = parseInt(locations.locations[i].id);
      break;
    }
  }
  var newDepartmentData = {
    name: $('#department-name').val(),
    locationID: currentLocationID,
  }
 
 
 
  addDepartment(newDepartmentData);

 
  $('#add-department-modal').modal('hide');
});

}


$('#add-location-button, #add-location-button-dropdown, #add-location-button-dropdown-mobile').click(function() {
  $('#add-location-modal').modal('show');
});


$('#add-location-form').submit(function(e) {
  e.preventDefault();
  

  var locationName;
  
  
 locationName = $('#location-name').val(),
    
  
  

 
 
  
  addLocation(locationName);
  

 
  $('#add-location-modal').modal('hide');
});
 


function populateDepartmentDropdown(data) {
  var departmentDropdown = $("#department-dropdown");

  departmentDropdown.empty();

  var sortedDepartments = data.data.departments.sort(function(a, b) {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    return nameA.localeCompare(nameB);
  });

  sortedDepartments.forEach(function(department) {
    var option = $("<option>").text(department.name).val(department.name);
    departmentDropdown.append(option);
  });
}

function editPopulateDepartmentDropdown(data) {
  var editDepartmentDropdown = $("#edit-department-dropdown");

  editDepartmentDropdown.empty();

  var sortedDepartments = data.data.departments.sort(function(a, b) {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    return nameA.localeCompare(nameB);
  });

  sortedDepartments.forEach(function(department) {
    var option = $("<option>").text(department.name).val(department.name);
    editDepartmentDropdown.append(option);
  });
}


function editPopulateLocationDropdown(data) {
  var editDepartmentDropdown = $("#edit-department-location");

  editDepartmentDropdown.empty();

  var sortedLocations = data.data.locations.sort(function(a, b) {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    return nameA.localeCompare(nameB);
  });

  sortedLocations.forEach(function(location) {
    var option = $("<option>").text(location.name).val(location.name);
    editDepartmentDropdown.append(option);
  });
}

function populateLocationDropdown(data) {
  var locationDropdown = $("#location-dropdown");

  locationDropdown.empty();

  var sortedLocations = data.data.locations.sort(function(a, b) {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    return nameA.localeCompare(nameB);
  });

  sortedLocations.forEach(function(location) {
    var option = $("<option>").text(location.name).val(location.name);
    locationDropdown.append(option);
  });
}


function getDepartmentsDropdown() {
  $.ajax({
    url: "libs/php/getAllDepartments.php",
    dataType: "json",
    success: function(data) {
      
      populateDepartmentDropdown(data);
      editPopulateDepartmentDropdown(data);
      $("#preloader").hide();
      
    },
    error: function(xhr, status, error) {
      console.log("Error: " + error);
    }
  });
}




function getDepartments() {
  $.ajax({
    url: "libs/php/getAllDepartments.php",
    dataType: "json",
    success: function(data) {
     
      
      populateDepartmentTable(data);
      
      
    },
    error: function(xhr, status, error) {
      console.log("Error: " + error);
    }
  });
}

function getLocations() {
  $.ajax({
    url: "libs/php/getAllLocations.php",
    dataType: "json",
    success: function(data) {
      
     
     
     populateLocationTable(data);
     editDepartmentForm(data.data);  
     
    },
    error: function(xhr, status, error) {
      console.log("Error: " + error);
    }
  });
}




function fetchPersonDetails(personId) {
  $.ajax({
    url: "libs/php/getPersonsDetails.php",
    type: "GET",
    data: { id: personId },
    dataType: "json",
    success: function(data) {
      
      $("#preloader").hide();
      var personnel = data.data.personnel[0]; 
      $("#edit-firstName").val(personnel.firstName);
      $("#edit-lastName").val(personnel.lastName);
      $("#edit-email").val(personnel.email);
      
      var departmentID = personnel.departmentID;
      var departments = data.data.departments;

      var foundDepartment = false;
      for (var i = 0; i < departments.length; i++) {
        if (departments[i].id == departmentID) {
          $("#edit-department-dropdown").val(departments[i].name);
          foundDepartment = true;
          break;
        }
      }

      if (!foundDepartment) {
  
        $("#edit-department-dropdown").val(departments[0].name);
      }

      editPersonForm(departments);
      
      $("#edit-person-modal").modal("show");
    },
    error: function(xhr, status, error) {
      console.log("Error: " + error);
      showErrorAlert("Failed to fetch person details. Please try again.");
    }
  });
}


function fetchDepartmentDetails(departmentId) {
  $.ajax({
    url: "libs/php/getDepartmentDetails.php",
    type: "GET",
    data: { id: departmentId },
    dataType: "json",
    success: function(data) {
      
      $("#preloader").hide();
      var department = data.data.department[0];
      $("#edit-department-name").val(department.name);
      
      var locationName;
      var locationID = department.locationID;
      var locations = data.data.locations;

      var foundLocation = false;
      for (var i = 0; i < locations.length; i++) {
        if (locations[i].id == locationID) {
          locationName = locations[i].name;
          foundLocation = true;
          break;
        }
      }

      if (!foundLocation) {
        
        locationName = locations[0].name;
      }
      
      $("#edit-department-location").val(locationName);

      $("#edit-department-modal").modal("show");
    },
    error: function(xhr, status, error) {
      console.log("Error: " + error);
      showErrorAlert("Failed to fetch department details. Please try again.");
    }
  });
}


function fetchLocationDetails(locationId) {
  $.ajax({
    url: "libs/php/getLocationDetails.php",
    type: "GET",
    data: { id: locationId },
    dataType: "json",
    success: function(data) {
     
      $("#preloader").hide();
      var location = data.data[0];
      $("#edit-location-name").val(location.name);
  

      $("#edit-location-modal").modal("show");
    },
    error: function(xhr, status, error) {
      console.log("Error: " + error);
      showErrorAlert("Failed to fetch department details. Please try again.");
    }
  });
}










$("#edit-button, #edit-button-mobile").on("click", function() {
  var personId = currentPersonId;
  fetchPersonDetails(personId);
});

function updatePersonDetails(personId, updatedData) {
  $("#preloader").show();
  $.ajax({
    url: "libs/php/updatePersonDetails.php",
    type: "POST",
    data: { id: personId, ...updatedData },
    dataType: "json",
    success: function(data) {
      $("#preloader").hide();
      showSuccessAlert("Personnel details updated successfully!");
      $("#edit-person-modal").modal("hide");
      dataSorted = false;
      getData();
    },
    error: function(xhr, status, error) {
      console.log("Error: " + error);
      showErrorAlert("Failed to update personnel details. Please try again.");
    }
  });
}

function editPersonForm(departments){
$("#edit-person-form").on("submit", function(event) {
  event.preventDefault();
  var personId = currentPersonId;
  var selectedDepartment = $("#edit-department-dropdown").val();
  for (var i = 0; i < departments.length; i++) {
    if (departments[i].name == selectedDepartment) {
      updatedDepartment = parseInt(departments[i].id);
      break;
    }
  }
  var updatedData = {
    lastName: $("#edit-lastName").val(),
    firstName: $("#edit-firstName").val(),
    jobTitle: '',
    email: $("#edit-email").val(),
    department: updatedDepartment,
  };
  updatePersonDetails(personId, updatedData);
});
}

$("#department-edit-button").on("click", function() {
  var departmentId = currentDepartmentId;
  fetchDepartmentDetails(departmentId);
});

$("#location-edit-button").on("click", function() {
  var locationId = currentLocationId;
  fetchLocationDetails(locationId);
});

function updateDepartmentDetails(departmentId, updatedData) {
  $("#preloader").show();
  $.ajax({
    url: "libs/php/updateDepartment.php",
    type: "POST",
    data: { id: departmentId, ...updatedData },
    dataType: "json",
    success: function(data) {
      $("#preloader").hide();
      showSuccessAlert("Department details updated successfully!");
      $("#edit-department-modal").modal("hide");
      dataSorted = false;
      getData();
    },
    error: function(xhr, status, error) {
      console.log("Error: " + error);
      showErrorAlert("Failed to update department details. Please try again.");
    }
  });
}

function updateLocationDetails(locationId, updatedData) {
  $("#preloader").show();
  $.ajax({
    url: "libs/php/updateLocation.php",
    type: "POST",
    data: { id: locationId, ...updatedData },
    dataType: "json",
    success: function(data) {
      $("#preloader").hide();
      showSuccessAlert("Location details updated successfully!");
      $("#edit-location-modal").modal("hide");
      dataSorted = false;
      getData();
    },
    error: function(xhr, status, error) {
      console.log("Error: " + error);
      showErrorAlert("Failed to update location details. Please try again.");
    }
  });
}

function editDepartmentForm(allLocations){
$("#edit-department-form").on("submit", function(event) {
  event.preventDefault();
  var departmentId = currentDepartmentId;
  
  var selectedLocation = $("#edit-department-location").val();
  for (var i = 0; i < allLocations.locations.length; i++) {
    if (allLocations.locations[i].name == selectedLocation) {
      updatedLocation = parseInt(allLocations.locations[i].id);
      break;
    }
  }
  var updatedDepartmentData = {
    name: $("#edit-department-name").val(),
    locationID: updatedLocation,
  };
  
  updateDepartmentDetails(departmentId, updatedDepartmentData);
});

$("#edit-location-form").on("submit", function(event) {
  event.preventDefault();
  var locationId = currentLocationId;
 
  var updatedLocationData = {
    name: $("#edit-location-name").val(),
    
  };
  
  updateLocationDetails(locationId, updatedLocationData);
});
}








$("#reset-filters-button").on("click", function() {
  $("#search-input").val("");
  getData();
  dataSorted = false;
  $(".table-data").scrollTop(0);
});

$("#reset-filters-button-sidebar").on("click", function() {
  $("#search-input-sidebar").val("");
  getData();
  dataSorted = false;
  $(".table-data").scrollTop(0);
  
  
});

$("#reset-filters-button-mobile").on("click", function() {
  $("#search-input-mobile").val("");
  getData();
  dataSorted = false;
  $(".table-data").scrollTop(0);
});


function searchPersonnel(searchQuery) {
 
  $.ajax({
    url: "libs/php/searchPersonnel.php", 
    type: "GET", 
    data: { search: searchQuery},
    dataType: "json",
    success: function(data) {
      
      
      if (data.status.code === "200") {
        var personnelData = data.data;
        var tableBody = $("#table-body");

       
        tableBody.empty();

        if (personnelData.length > 0) {
          dataSorted = false;
          populateTable(data);
          $(".table-data").show();
          $(".department-table-data").hide();
          $(".location-table-data").hide();
          $('#personnel-card').show();
          $('#department-card').hide();
          $('#location-card').hide();
          $('#personnel-count').show();
          $('#department-count').hide();
          $('#location-count').hide();
     
        } else {
          
          tableBody.html("<tr><td colspan='2'>No results found.</td></tr>");
        }
      } else {
        
        showErrorAlert("Failed to search personnel. Please try again.");
      }
    },
    error: function(xhr, status, error) {
     
      showErrorAlert("Failed to search personnel. Please try again.");
    },
  });
}








$("#search-form").on("submit", function(event) {
  event.preventDefault();
  var searchQuery = $(this).find("input[name='search']").val();
  
  
  searchPersonnel(searchQuery);
 

  
  $(".table-data").scrollTop(0);
});

$("#search-form-mobile").on("submit", function(event) {
  event.preventDefault();
  var mobileSearchQuery = $(this).find("input[name='search-mobile']").val();
  
  
  searchPersonnel(mobileSearchQuery);
 

  
  $(".table-data").scrollTop(0);
});

$("#search-form-sidebar").on("submit", function(event) {
  event.preventDefault();
  
  var searchQuery = $(this).find("input[name='search']").val();
  searchPersonnelSidebar(searchQuery);

  
  $(".table-data").scrollTop(0);
});




function deletePerson(id) {
  $.ajax({
    url: "libs/php/deletePersonDetailsByID.php",
    type: "GET",
    dataType: "json",
    data: {
      id: id
    },
    success: function(data) {
      showSuccessAlert("You have successfully deleted Personnel's details");
      dataSorted = false;
      getData();
     
    },
    error: function(xhr, status, error) {
      showErrorAlert("Error deleting Personnel's details")
    }
  });
}

function checkEmployeeCount(departmentId, departmentName) {
  $.ajax({
    url: "libs/php/countEmployeesByDepartment.php",
    type: "GET",
    dataType: "json",
    data: {
      departmentId: departmentId
    },
    success: function(data) {
      
      if (data.data.count > 0) {
        console.log(data);
        showErrorAlert("Cannot delete department. It has personnel assigned.");
      } else {
        $("#delete-department-modal .modal-body").text("Are you sure you want to delete " + departmentName + " details?");
        $("#delete-department-modal").modal("show");
      }
    },
    error: function(xhr, status, error) {
      showErrorAlert("Error checking employee count");
    }
  });
}

function deleteDepartment(id) {
  $.ajax({
    url: "libs/php/deleteDepartmentByID.php",
    type: "GET",
    dataType: "json",
    data: {
      id: id
    },
    success: function(data) {
      showSuccessAlert("You have successfully deleted Department details");
      dataSorted = false;
      getData();
     
    },
    error: function(xhr, status, error) {
      showErrorAlert("Error deleting Department details")
    }
  });
}

function deleteLocation(id) {
  $.ajax({
    url: "libs/php/deleteLocationByID.php",
    type: "GET",
    dataType: "json",
    data: {
      id: id
    },
    success: function(data) {
      showSuccessAlert("You have successfully deleted this location");
      dataSorted = false;
      getData();
     
    },
    error: function(xhr, status, error) {
      showErrorAlert("Error deleting Location")
    }
  });
}



$("#delete-button, #delete-button-mobile").on("click", function() {
  
  var personId = $(".active-row").data("id");

  
  var personName = $(".active-row h5").text();
  $("#delete-modal .modal-body").text("Are you sure you want to delete " + personName + " details?");
  $("#delete-modal").modal("show");

  
  $("#confirm-delete").on("click", function(event) {
    event.preventDefault();
    

    
    var personId = $(".active-row").data("id");

    
    deletePerson(personId);

    
    $("#delete-modal").modal("hide");

    
  });
});


$("#delete-modal-cancel").on("click", function() {
  $("#delete-modal").modal("hide");
});

$("#department-delete-button").on("click", function() {
  
  var personId = $(".active-row").data("id");

  
  var departmentName = $(".department-active-row h5").text();
  var departmentId = $(".department-active-row").data("id");
  

  checkEmployeeCount(departmentId, departmentName);
});

  

  
  $("#confirm-department-delete").on("click", function(event) {
    event.preventDefault();
    
    var departmentId = $('.department-active-row').data('id');

    
    

    
    deleteDepartment(departmentId);

    
    $("#delete-department-modal").modal("hide");

    
  });


$("#delete-department-modal-cancel").on("click", function() {
  $("#delete-department-modal").modal("hide");
});

$("#location-delete-button").on("click", function() {
  
  

  
  var locationName = $(".location-active-row h5").text();
  var locationId = $(".location-active-row").data("id");
  
  checkDepartmentCount(locationId, locationName);
});
  
  $("#confirm-location-delete").on("click", function(event) {
    event.preventDefault();
    
    var locationId = $(".location-active-row").data("id");
    
    deleteLocation(locationId);

    
    
  

    
    $("#delete-location-modal").modal("hide");

    
  });



$("#delete-location-modal-cancel").on("click", function() {
  $("#delete-location-modal").modal("hide");
});



function checkDepartmentCount(locationId, locationName) {
  $.ajax({
    url: "libs/php/countDepartmentsByLocation.php",
    type: "GET",
    dataType: "json",
    data: {
      locationId: locationId
    },
    success: function(data) {
      if (data.data.count > 0) {
        showErrorAlert("Cannot delete location. It has departments assigned.");
      } else {
        $("#delete-location-modal .modal-body").text("Are you sure you want to delete " + locationName + " details?");
        $("#delete-location-modal").modal("show");
      }
    },
    error: function(xhr, status, error) {
      showErrorAlert("Error checking department count");
    }
  });
}










  

  

  function connectDatabase() {
    $.ajax({
      url: 'libs/php/connect.php',
      method: 'POST',
      success: function(response) {
        getData();
      },
      error: function(xhr, status, error) {
        showErrorAlert('Error connecting to the database');
        
      }
    });
  
  }

  connectDatabase();