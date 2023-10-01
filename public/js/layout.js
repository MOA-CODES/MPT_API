const url= "http://localhost:3001"
const url2= "http://localhost:3001/api/v1"
const path = window.location.href
const pathname = window.location.pathname
const stateKey = 'spotify_auth_state';

console.log(path)
console.log(window.location.pathname)

function getCookie(cname) {
    let name = cname + "=";
    let ca = (document.cookie).split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') { //skip empty space if it start with "" ex: " token=blah; "
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function setCookie(name, value, hourlimit, path){
    let now = new Date()
    now.setTime(now.getTime() + hourlimit * 3600 * 1000)//current time + 1hr in milliseconds

    document.cookie = `${name}=${value};expires=${now.toUTCString()};path=${path}`
}

$("#MPTregister").on('submit', function(event){
    event.preventDefault()

    const values = $(this).serializeArray()
    const data = {}

    $.map(values, function(n,i){
        data[n['name']]=n['value']
    })
 
    let request = {
            "url" :`${url2}/auth/register`,
            "method":"POST",
            "data":data
        }

    $.ajax(request).done(function(response){
        console.log(response)
        document.getElementById("registerMSG").className = "text-success"
        document.getElementById("registerMSG").innerHTML = "successfully registered"

        setCookie("token", response.user.token, 1, url)

        location.assign(`${url}/home`)

    }).catch((err)=>{
        console.log(err.responseJSON)
        document.getElementById("registerMSG").className = "text-danger"
        document.getElementById("registerMSG").innerHTML = err.responseJSON.Error.Msg
    })
})

$("#MPTlogin").on('submit', function(event){
    event.preventDefault()//very necessary

    const values = $(this).serializeArray()
    const data = {}

    $.map(values, function(n,i){
        data[n['name']]=n['value']
    })

    let request = {
        "url":`${url2}/auth/login`,
        "method": "POST",
        "data":data,
    }

    $.ajax(request).done(function(response){
        console.log(response)
        document.getElementById("loginMSG").className = "text-success"
        document.getElementById("loginMSG").innerHTML = "login successful"

        setCookie("token", response.user.token,1,url)
        setCookie("name", response.user.msg.split(',')[0])

        location.assign(`${url}/home`)
    }).catch((err)=>{
        document.getElementById("loginMSG").className = "text-danger"
        document.getElementById("loginMSG").innerHTML = err.responseJSON.Error.Msg
    })

})

$(window).on('load',function() {
    if(path === `${url}/home`){
        const token = getCookie('token');
        const name = getCookie('name');
        const request ={
            "url" :`${url2}/auth/verify_token`,
            "method":"POST",
            "headers":{
                "Authorization":`Bearer ${token} ` 
            }
        }

        $.ajax(request).done(function(response){
            $("#customMsg").html( `Whats up ${name}`)
            $("#loadingHome").hide()
            $("#HomeContent").prop('hidden', false)
            $("#HomeContent").children().prop('hidden', false)

        }).catch((err)=>{
            alert("Invalid Authentication")
            location.assign(`${url}`)
        })
    }

    if(pathname === `/home/callback`){
        const token = getCookie('token');
        const sk = getCookie(stateKey);
        const pageState = $('#stateValue').text()

        if(pageState  === null || !(pageState === sk)){
            location.assign(`${url}/home`)
        }else{
            const request ={
                "url" :`${url2}/spotify/access_token`,
                "method":"GET",
            }
            $.ajax(request).done(function(response){
                console.log(response)
            }).catch((err)=>{
                alert("hehehe XD")
                console.log(err)
            })
        }
    }
})



