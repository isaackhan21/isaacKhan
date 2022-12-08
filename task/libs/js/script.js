$('#earthquakeAPIBtn').click(function() {
    console.log('pressed button 1');
    $.ajax({
        url: "libs/php/earthquakeAPI.php",
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

            if (result.status.name == "ok") {
                $('#earthquake1dateTime').html(result['data'][0]['datetime']);
                $('#earthquake1depth').html(result['data'][0]['depth']);
                $('#earthquake1lng').html(result['data'][0]['lng']);
                $('#earthquake2dateTime').html(result['data'][1]['datetime']);
                $('#earthquake2depth').html(result['data'][1]['depth']);
                $('#earthquake2lng').html(result['data'][1]['lng']);
                $('#earthquake3dateTime').html(result['data'][2]['datetime']);
                $('#earthquake3depth').html(result['data'][2]['depth']);
                $('#earthquake3lng').html(result['data'][2]['lng']);
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

$('#oceanAPIBtn').click(function() {
    console.log('pressed button 2');
    $.ajax({
        url: "libs/php/oceanAPI.php",
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



$('#wikiSearchAPIBtn').click(function() {
    console.log('pressed button 3');
    $.ajax({
        url: "libs/php/wikiSearchAPI.php",
        type: 'POST',
        dataType: 'json',
        data: {
            q: $('#setQ').val(),
            
            
        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if (result.status.name == "ok") {
                $('#txtSummary').html(result['data'][0]['summary']);
                $('#txtCountryCode').html(result['data'][0]['countryCode']);
                $('#wikipediaUrl').html(result['data'][0]['wikipediaUrl']);
                
               
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
            console.log('failed');
            console.log (errorThrown)
        }
    }); 

});

