const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    console.log(location)
    fetch('http://127.0.0.1:3000/weather?address=' + location).then((response) =>{
        response.json().then((data) => {
            console.log(data)
            console.log("HEYYS")
            if(data.error){
                msg1.textContent = data.error
            } else{
                msg1.textContent = data.location
                msg2.textContent = data.forecast
            }
        })
    })  
})