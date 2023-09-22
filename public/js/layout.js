
const url= "http://localhost:3001"
const url2= "http://localhost:3001/api/v1"

const path = window.location.href

console.log(path)

function getCookie(cname) {
    let name = cname + "=";
    // let decodedCookie = decodeURIComponent(document.cookie);
    let ca = (document.cookie).split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

// console.log(getCookie('token'))
// console.log("hello")

$(document).ready(function() {
    console.log("at document ready")

    if(path === `${url}/home`){
        console.log("at if")

        const token = getCookie('token');

        const request ={
            "url" :`${url2}/auth/verify_token`,
            "method":"POST",
            "headers":{
                "Authorization":`Bearer ${token} ` 
            }
        }

        $.ajax(request).done(function(response){
            console.log(response)
        }).catch((err)=>{
            console.log(err.responseJSON)
        })
    }

})



$("#MPTregister").on('submit', function(event){

    event.preventDefault()

    const unindexed_array = $(this).serializeArray()
    const data = {}

    $.map(unindexed_array, function(n,i){
        data[n['name']]=n['value']
    })

    console.log(data)
 
    let request = {
            "url" :`${url2}/auth/register`,
            "method":"POST",
            "data":data
        }

    $.ajax(request).done(function(response){
        console.log(response)
        document.getElementById("registerMSG").className = "text-success"
        document.getElementById("registerMSG").innerHTML = "successfully registered"

        document.cookie = `token=${response.user.token}; path=http://localhost:3001/`

        location.assign(`${url}/home`)

    }).catch((err)=>{
        console.log(err.responseJSON)
        document.getElementById("registerMSG").className = "text-danger"
        document.getElementById("registerMSG").innerHTML = err.responseJSON.Error.Msg
    })

})

