const http = require('http')

const weather = (data, callback) =>{
    debugger
    const {Latitude, Longitude} = data //ES6 propety shorthand
    const url = 'http://api.openweathermap.org/data/2.5/onecall?lat=' + Latitude + '&lon=' + Longitude + '&units=metric&appid=93f2cc914e8efaca022e648b019ce44d'
    http.get (url, (res) => {
        let rawData = '';
        let parsedData
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                parsedData = JSON.parse(rawData);
                
            } catch (e) {
                console.error(e.message);
            }
            if(parsedData.cod){
                callback("Enter correct lat/long")
            }
            else{
                const sunset_time_unix = parsedData.current.sunset
                var sunset_time = new Date(sunset_time_unix * 1000);
                var hours = sunset_time.getHours();
                // Minutes part from the timestamp
                var minutes = "0" + sunset_time.getMinutes();
                // Seconds part from the timestamp
                var seconds = "0" + sunset_time.getSeconds();
                const feels_like = parsedData.current.feels_like

                // Will display time in 10:30:23 format
                var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                const data = 'The temperature is ' + parsedData.current.temp + ', but it feels like it\'s ' + feels_like +'.The cloud cover is ' + parsedData.current.clouds + '. The sun will set at ' + formattedTime + '.\n'
                callback("", data)
            }
        });

        res.on('error', (e) => {
            callback(`Cannot reach Server: ${e.message}`);
        })  
    })  
   
}



module.exports = weather

