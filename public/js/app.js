const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    fetch('http://127.0.0.1:3000/weather?address=' + location, {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((response) =>{
        response.json().then((data) => {
            if(data.error){
                msg1.textContent = data.error
            } else{
                msg1.textContent = data.location
                msg2.textContent = data.forecast
            }
        })
    })  
})