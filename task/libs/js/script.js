

$('#button2').click(function() {

    $.ajax({
        url: "libs/php/API2.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: $('#setLat').val(),
            lng: $('#setLng').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                $('#txtName').html(result['data'][0]);
                $('#txtGeonameId').html(result['data'][1]);
                $('#txtDistance').html(result['data'][2]);
                console.log('success');
               
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
            console.log('failed');
            console.log (errorThrown)
        }
    }); 

});

