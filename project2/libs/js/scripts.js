var dataSorted = false;
var currentOption = "firstName";
var currentPersonId;
column3shown = false;


$(document).ready(function() {
  function updateButtonVisibility() {
    if ($(window).width() <= 767) {
      
      $('#add-employee-button').hide();
      $('#add-employee-button-mobile').show();
      $('#search-filters-mobile-button').show();
      $('#back-button').show();
      
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


$(document).ready(function() {
  $(document).on('click', '.table-data tr', function() {
    if ($(window).width() <= 767) {
      $('.column-1, .column-2').hide();
      $('.column-3').show();
    }
  });
});

$(document).ready(function() {
  $('#back-button').on('click', function() {
    if ($(window).width() <= 767) {
      $('.column-2').show();
      $('.column-3').hide();
    }
  });
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

  
  function updateStyling() {
   
      detailsDepartment.html("Department<br><span class='department-info'>" + (data.department || 'Not Found') + "</span>");
      detailsLocation.html("Location<br><span class='department-info'>" + (data.location || 'Not Found') + "</span>");
   
  }

  
  updateStyling();

  
  $(window).resize(function() {
    updateStyling();
  });
}



function populateTable(data) {
  var tableBody = $("#table-body");
  var sortDropdown = $("#sort-dropdown");

  
  tableBody.empty();
  
  var sortedData = data.data.slice(); 

  
  if(!dataSorted){
    if (currentOption === "firstName") {
      sortedData.sort(function(a, b) {
        var nameA = a.firstName + " " + a.lastName;
        var nameB = b.firstName + " " + b.lastName;
        return nameA.localeCompare(nameB);
      });
    } else if (currentOption === "lastName") {
      sortedData.sort(function(a, b) {
        var nameA = a.lastName + " " + a.firstName;
        var nameB = b.lastName + " " + b.firstName;
        return nameA.localeCompare(nameB);
      });
    }
  dataSorted = true;
}

  
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
  });

  sortDropdown.val(currentOption);

  
  sortDropdown.on("change", function() {
    currentOption = $(this).val();
    sortTableBy(currentOption);
  });

  
  function sortTableBy(option) {
    var sortedData = data.data.slice(); 

    if (option === "firstName") {
      sortedData.sort(function(a, b) {
        var nameA = a.firstName + " " + a.lastName;
        var nameB = b.firstName + " " + b.lastName;
        return nameA.localeCompare(nameB);
      });
    } else if (option === "lastName") {
      sortedData.sort(function(a, b) {
        var nameA = a.lastName + " " + a.firstName;
        var nameB = b.lastName + " " + b.firstName;
        return nameA.localeCompare(nameB);
      });
    }

    
    populateTable({ data: sortedData });
  }
}





function getData() {
  $("#preloader").show();
  $.ajax({
    url: "libs/php/getAll.php",
    dataType: "json",
    success: function(data) {
      populateTable(data);
      getDepartments();
      getDepartmentsDropdown();
      
      
      
        
      
      
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


$("#add-employee-button").on("click", function() {
  
  
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

function populateDepartmentDropdown(data) {
  var departmentDropdown = $("#department-dropdown");
  

  
  departmentDropdown.empty();
  

  
  data.data.forEach(function(department) {
    var option = $("<option>").text(department.name).val(department.name);
    departmentDropdown.append(option);
    

    
  });
}

function editPopulateDepartmentDropdown(data) {
  
  var editDepartmentDropdown = $("#edit-department-dropdown");

  
  
  editDepartmentDropdown.empty();

  
  data.data.forEach(function(department) {
    var option = $("<option>").text(department.name).val(department.name);
    
    editDepartmentDropdown.append(option);

  
    
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
      populateDepartmentCheckboxes(data);
      populateDepartmentCheckboxesSidebar(data);
      
    },
    error: function(xhr, status, error) {
      console.log("Error: " + error);
    }
  });
}
var departmentID;
var departments;

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
      
      departmentID = personnel.departmentID;
      departments = data.data.department;

      for (var i = 0; i < departments.length; i++) {
        if (departments[i].id == departmentID) {
          $("#edit-department-dropdown").val(departments[i].name);
          break;
          
        }
      }
      
      
      $("#edit-person-modal").modal("show");
    },
    error: function(xhr, status, error) {
      console.log("Error: " + error);
      showErrorAlert("Failed to fetch person details. Please try again.");
    }
  });
}





$("#edit-button").on("click", function() {
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

$("#edit-person-form").on("submit", function(event) {
  event.preventDefault();
  var personId = currentPersonId;;
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





function populateDepartmentCheckboxes(data) {
  var departmentCheckboxes = $("#department-checkboxes");

  departmentCheckboxes.empty();
  departmentCheckboxes.hide();
  

  if (data.status.code === "200") {
    var departments = data.data;
    for (var i = 0; i < departments.length; i++) {
      var checkbox = $('<input type="checkbox">')
        .attr("id", "sidebar1-department-" + departments[i].id)
        .val(departments[i].id);
      var label = $("<label>")
        .attr("for", "sidebar1-department-" + departments[i].id)
        .text(departments[i].name);

      var wrapperDiv = $('<div class="checkbox-wrapper">'); 
      wrapperDiv.append(checkbox); 
      wrapperDiv.append(label); 

      departmentCheckboxes.append(wrapperDiv);
      
    }
    departmentCheckboxes.show();
  } else {
    showErrorAlert("Failed to get departments.");
  }
}

function populateDepartmentCheckboxesSidebar(data) {
  var departmentCheckboxes = $("#department-checkboxes-sidebar");

  departmentCheckboxes.empty();

  if (data.status.code === "200") {
    var departments = data.data;
    for (var i = 0; i < departments.length; i++) {
      var checkbox = $('<input type="checkbox">')
        .attr("id", "sidebar2-department-" + departments[i].id)
        .val(departments[i].id);
      var label = $("<label>")
        .attr("for", "sidebar2-department-" + departments[i].id)
        .text(departments[i].name);

      var wrapperDiv = $('<div class="checkbox-wrapper">'); 
      wrapperDiv.append(checkbox); 
      wrapperDiv.append(label); 

      departmentCheckboxes.append(wrapperDiv); 
    }
  } else {
    showErrorAlert("Failed to get departments.");
  }
}




$("#reset-filters-button").on("click", function() {
  $("#search-input").val("");
  $("#department-checkboxes input:checked").prop("checked", false);
  getData();
  dataSorted = false;
  $(".table-data").scrollTop(0);
});

$("#reset-filters-button-sidebar").on("click", function() {
  $("#search-input-sidebar").val("");
  $("#department-checkboxes-sidebar input:checked").prop("checked", false);
  getData();
  dataSorted = false;
  $(".table-data").scrollTop(0);
  
  
});


function searchPersonnel(searchQuery) {
  var departmentIDs = []; 

  
  $("#department-checkboxes input:checked").each(function() {
    departmentIDs.push($(this).val());
  });
  

 
  var departmentIDString = departmentIDs.join(',');

  $.ajax({
    url: "libs/php/searchPersonnel.php", 
    type: "GET", 
    data: { search: searchQuery, department: departmentIDString },
    dataType: "json",
    success: function(data) {
      
      
      if (data.status.code === "200") {
        var personnelData = data.data;
        var tableBody = $("#table-body");

       
        tableBody.empty();

        if (personnelData.length > 0) {
          dataSorted = false;
          populateTable(data);
     
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

function searchPersonnelSidebar(searchQuery) {
  var departmentIDs = []; 

  
  $("#department-checkboxes-sidebar input:checked").each(function() {
    departmentIDs.push($(this).val());
  });
  

  
  var departmentIDString = departmentIDs.join(',');

  $.ajax({
    url: "libs/php/searchPersonnel.php", 
    type: "GET", 
    data: { search: searchQuery, department: departmentIDString },
    dataType: "json",
    success: function(data) {
      
      
      
      if (data.status.code === "200") {
        var personnelData = data.data;
        var tableBody = $("#table-body");

        
        tableBody.empty();

        if (personnelData.length > 0) {
          
          dataSorted = false;
          populateTable(data);
     
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


$("#delete-button").on("click", function() {
  
  var personId = $(".active-row").data("id");

  
  var personName = $(".active h5").text();
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