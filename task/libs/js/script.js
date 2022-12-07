$('#button1').click(function() {

    $.ajax({
        url: "libs/php/API1.php",
        type: 'POST',
        dataType: 'json',
        data: {
            north: $('#setNorth').val(),
            south: $('#setSouth').val(),
            east: $('#setEast').val(),
            west: $('#setWest').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if (response.status.name == "ok") {
                // $('#txtDistance').text(response['data']["distance"]);
                // $('#txtGeonameId').text(response['data']["geonameId"]);
                // $('#txtName').text(response['data']["name"]);
                
               
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
            console.log('failed');
            console.log (errorThrown)
        }
    }); 

});

$('#button2').click(function() {

    $.ajax({
        url: "libs/php/API2.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: $('#setLat').val(),
            lng: $('#setLng').val()
        },
        success: function(response) {

            console.log(JSON.stringify(response));

            if (response.status.name == "ok") {
                $('#txtDistance').text(response['data']["distance"]);
                $('#txtGeonameId').text(response['data']["geonameId"]);
                $('#txtName').text(response['data']["name"]);
                
               
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
            console.log('failed');
            console.log (errorThrown)
        }
    }); 

});

