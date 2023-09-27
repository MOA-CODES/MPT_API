const url= "http://localhost:3001"
const url2= "http://localhost:3001/api/v1"
const path = window.location.href

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

        location.assign(`${url}/home`)
    }).catch((err)=>{
        document.getElementById("loginMSG").className = "text-danger"
        document.getElementById("loginMSG").innerHTML = err.responseJSON.Error.Msg
    })

})

$(window).on('load',function() {
    if(path === `${url}/home`){
        $("#HomeContent").hide().prop('disabled', true)
        $("#HomeContent").children().prop('disabled', true)

        const token = getCookie('token');
        const testtoken = '048AS940zhwT8l1xqLHYck6o2c6EzSrDU1XC88jLxg8HYk9CttQ0pcks6DjovMKU'

        const request ={
            "url" :`${url2}/auth/verify_token`,
            "method":"POST",
            "headers":{
                "Authorization":`Bearer ${token} ` 
            }
        }

        $.ajax(request).done(function(response){
            $("#loadingHome").hide().prop("disabled",true)
            $("#HomeContent").show().prop('disabled', false)
            $("#HomeContent").children().prop('disabled', false)
            console.log(response)
        }).catch((err)=>{
            alert("Invalid Authentication")
            location.assign(`${url}`)
        })
    }
})

$("#getStarted").on("click", function(event){
    event.preventDefault()

    const token = getCookie('token');

    console.log(token)

    var request = {
        "url":`${url2}/spotify/login`,
        "method": "GET",
        "headers":{
            "Authorization":`Bearer ${token}`
        }
    }

    $.ajax(request).done(function(req, response){
        console.log(response)
        console.log(req.query)
    }).catch((err)=>{
        alert("An error occured")
    })
})

$("#getStarted2").on("click", function(event){
    event.preventDefault()

    const token = getCookie('token');

    console.log(token)

    var request = {
        "url":`${url2}/spotify/login`,
        "method": "GET",
        "headers":{
            "Authorization":`Bearer ${token}`
        }
    }

    console.log(request)

    $.ajax(request).done(function(req, response){
        console.log(response)
        console.log(req.query)
    }).catch((err)=>{
        alert("An error occured")
    })
})
