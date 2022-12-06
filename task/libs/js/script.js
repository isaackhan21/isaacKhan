

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

            console.log(JSON.stringify(result));

            if (result.status.name == "ok") {
                $('#txtName').text(response['data']["name"]);
                $('#txtGeonameId').text(response['data']["geonameId"]);
                $('#txtDistance').text(response['data']["distance"]);
                
               
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
            console.log('failed');
            console.log (errorThrown)
        }
    }); 

});

