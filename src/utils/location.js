const request = require('request')



const getlocationdetails = (location,callback)=>{
    const urllocation = 'http://api.weatherstack.com/current?access_key=44d5db0dde2618af5d926c77927543fa&query='+location

request({url:urllocation,json:true},(err,response)=>{
    if(err){
        callback(undefined,{
            errormessage:"Unable to connect to location services"
        })
    } else if(response.body.error){
        callback(undefined,{
            errormessage:'Oops unable to fetch the data for the current location. Try another location'
        })

    } else {

        callback(undefined,{
            latitude:response.body.location.lat,
            longitude:response.body.location.lon,
            location:response.body.location.name +","+response.body.location.region+","+response.body.location.country
        })
    }

 
})

}

const getTemperatureDetails = (lat,long,callback)=>{
    const tempurl= 'http://api.weatherstack.com/current?access_key=44d5db0dde2618af5d926c77927543fa&query='+lat+','+long+'&units=m'
    request({url:tempurl,json:true},(err,response)=>{
        if(err){
            callback(undefined,{
                errormessage:"Unable to connect to temperature services"
            })
        } else if (response.body.error)
        {
            callback(undefined,{
                errormessage:"Unable to fetch forecast details for given location. Try another location"
            })


        }else {
    
            callback(undefined,{
                forecast:"The current temperature is "+response.body.current.temperature+" degreee celsius. The possiblity of rain is "+response.body.current.precip+"%."
            })
        }
    })



}

module.exports={
    getlocationdetails:getlocationdetails,
    getTemperatureDetails:getTemperatureDetails

}