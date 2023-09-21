const url= "http://localhost:3001"


$("#index-Login").on('click',(event)=>{
    location.assign(url+"/login")
})

$("#index-Register").on('click',(event)=>{
    location.assign(url+"/register")
})

$("#MPTregister").on('submit', (event)=>{
    alert("testing")
})