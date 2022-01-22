const request= require('request')

const forecast = (latitude, longitude, callback) =>{

    const url ='http://api.weatherstack.com/current?access_key=328f6cf96864f475828d3d22ba3c6481&query=' + latitude + ',' +longitude +'&units=m'

    request({ url, json:true }, (error, {body}) =>{
        if(error){
            callback('unable to connect to weather services',undefined)

        }else if (body.error) {

            callback('unable to find locations',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions+'. It is curently '+ body.current.temperature +' degrees out. there is a ' + body.current.feelslike +' % chance of rain.' )
              
        }
    });
 }

    

    



module.exports =forecast