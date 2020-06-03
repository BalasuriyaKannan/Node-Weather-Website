
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const location =require('./utils/location.js')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))
const app = express()

const publiDirectoryPath = path.join(__dirname,'../public')
const viewsDirectoryPath = path.join(__dirname,'../templates/views')
const partialDirectoryPath = path.join(__dirname,'../templates/partials')

// Setting up handle bar engine and views path
app.set('view engine','hbs')
app.set('views',viewsDirectoryPath)
hbs.registerPartials(partialDirectoryPath)

//Setting the app to serve the stastic content
app.use(express.static(publiDirectoryPath))

app.get('',(req,res)=>{

    res.render('index',{
        title:'Weather App',
        name:'Balasuriya K'
    })

})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Balasuriya K'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text',
        title:'Help',
        name:'Balasuriya K'
    })
})


app.get('/weather',(req,res)=>{

    if(!req.query.address){
       return res.send({
            error:"No search parameter found"
        })
    } else {
        location.getlocationdetails(req.query.address,(err,data)=>{
            if(err){
                return res.send({
                    errormesssage:'unable to connect to location services'
                })
                
            } else if (data.errorMessage) {
                return res.send({
                    errormessage:data.errorMessage
                })

            } else {

                    location.getTemperatureDetails(data.latitude,data.longitude,(err,data1)=>{

                        if(err){
                            return res.send({
                                errormessage:'unable to connect to temperature services'
                            })
                            
                        } else if (data1.errormessage){
                            return res.send({
                                errormessage:data.errormessage
                            })

                        } else {
                            return res.send({
                                forecast : data1.forecast,
                                location:data.location,
                                address:req.query.address
                            })
                        }
                    })

                    
            }
        })
    }

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Balasuriya K',
        errorMessage:'Help article not found'
    })


})

app.get('*',(req,res)=>{

    res.render('404',{
        title:'404',
        name:'Balasuriya K',
        errorMessage:'Page not found'
    })

})

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})