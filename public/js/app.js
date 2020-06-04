console.log('Client side java script')
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message')
const message1 = document.querySelector('#message1')



weatherform.addEventListener('submit',(e)=>{

    e.preventDefault()
    message.textContent='Loading...'
    message1.textContent=''

    const location =search.value
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.errormessage){
            message.textContent=data.errormessage
        } else {
            message.textContent =data.location
            message1.textContent=data.forecast
        }
    })

})

})