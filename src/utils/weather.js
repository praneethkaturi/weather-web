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
                const data = 'The temperature is ' + parsedData.current.temp + ' and cloud cover is ' + parsedData.current.clouds
                callback("", data)
            }
        });

        res.on('error', (e) => {
            callback(`Cannot reach Server: ${e.message}`);
        })  
    })  
   
}



module.exports = weather

