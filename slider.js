let searchedPerform = false;
let results = [];
let searchQuery = "";
let displayImage = document.querySelector(".displayImage");
const accessKey = "f5OASA99mmRSkb70EJFXle-dPc2BPCUsBgf5fH1Hq8I"



function searchQuerys(){
    searchQuery = document.querySelector("#searchImage").value;
   
        if(searchQuery != ""){
            searchedPerform = true;
            const apiUrl = `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=f5OASA99mmRSkb70EJFXle-dPc2BPCUsBgf5fH1Hq8I`

fetch(apiUrl)
.then(function(response){
    if(!response.ok){
        displayImage.innerHTML = "Invalid Search OR server is not responding";
        throw new Error("Server is not responsing")
    }
   return response.json()
})
.then(function(data){
    results = [];
    if(!Array.isArray(data.results)){
        throw new Error("data conversion is not yet done")
    }
     data.results.forEach(function(item){
        results.push(
        {name: "item.user.name",
         url: "item.urls.regular",
         size: "item.width" + "X" + "item.height"      
    })
     })
     
})
.catch(function(Error){
    console.log("data not yet split:" + Error)
    displayImage.innerHTML = "CONNECT TO THE SERVER"
})       
    }else{
        displayImage.innerHTML = "PLEASE ENTER A VALID SEARCH"
    }
}


function getImage(data) {
    const displayResult = document.querySelector(".displayResult");

    data.results.forEach(function(item) {
        const img = document.createElement("img");
        img.src = item.urls.regular;
        displayResult.appendChild(img);
    });
}



let startingSlide = 0;
function slideShower(){
    
        return new Promise(function(resolve, reject){
            if(searchedPerform === false || results.length === 0){
                resolve(null)
            }else{
               let nextSlide;
                 setTimeout(function(){      
                nextSlide =  results[startingSlide++];
                
                if(nextSlide >= results.length){
                    startingSlide = 0;
                }
            
                 if(nextSlide){
                    resolve(nextSlide.urls.regular)
                }else{
                    reject("There was an error sliding the images")
                }
            }), 2000
             
        }
            });

}


function runSlide() {
    slideShower()
        .then(function(results) {
            
           getImage(results)
            
            runSlide()
        })
        .catch(function(error) {
            console.log(error)
        });

        
}

runSlide();

