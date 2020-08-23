const http = require('http')
const geocode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFocmRyYWtlIiwiYSI6ImNrZHlnNWNsNDNib24ycW1xN3hqeDE4cGEifQ.N0Eu2_ijdLD9EhM_dU1ghA';
    http.get(url, (res) => {
        let rawData = ''
        let parsedData
        let error           //Both of these are
        let data            //passed to callback   
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                parsedData = JSON.parse(rawData);
            } catch (e) {
                console.error(e.message);
            }
            //console.log(parsedData)
            if(parsedData.features.length > 0){
                error = null
                data = {
                    Latitude: parsedData.features[0].center[1],
                    Longitude: parsedData.features[0].center[0],
                    Place: parsedData.features[0].place_name
                }
                callback(error, data)    
            } else{
                callback("Could not find location, try again")
            }
        });
    }).on('error', (e) => {
        callback(`Cannot connect to the server: ${e.message}`);
    })
}

module.exports = geocode