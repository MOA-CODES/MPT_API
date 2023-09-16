const url= "http://localhost:3000"

$("#index-Login").onClick(()=>{
    location.assign(url+"/login")
})

// (document.getElementById("index-Login")).onClick(()=>{
//     location.assign(`${url}+"/login`)
// })

// (document.getElementById("index-Login")).onClick(()=>{
//     location.assign("http://localhost:3000/login")
// })