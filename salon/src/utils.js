const path = "http://localhost:3001"
const makereq = async (route,body) => {
    const response = await fetch(path+route,{
        method: "POST",
        headers: {
            "Content-Type":"application/json"

        },  
        body: JSON.stringify(body)

    })  


    const fresponse = await response.json()
    return fresponse;
} 


const makereqg = async (route) => {
    const response = await fetch(path+route,{
        method: "GET"
    })
    const fresponse = await response.json()
    return fresponse
} 


export  {makereq,makereqg};