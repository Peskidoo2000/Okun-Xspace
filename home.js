let darkMode = false;
document.querySelector(".extra1").addEventListener("click", function(){
    if(darkMode){
        document.body.style.backgroundColor ="white";
        document.body.style.color = "black";
        document.querySelector('.extra1').innerHTML = "Goto dark Mode"
    }
    else{
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        document.querySelector(".extra1").innerHTML = "Goto white Mode"
    }
    darkMode = !darkMode;
})


const dataSearch = [
    {name: "Home", description:"first page", url: "home.html"},
    {name:"Our features", description: "What we offer, second page", url: "features.html"},
    {name:"About us", description:"third Page, know what we do", url: "about.html"},
    {name:"online calculator", description:"Mathematical computation", url:"calculator.html"},
    {name:"online spacetodoList", description:"Set of assignment top be done", url:"spacetodolist.html"},
    {name:"online note", description:"place to jot things down", url:"notes.html"},
    {name:"online imageloader\\slider", description:"load random images from server and slide it", url:"slider.html"}
]
localStorage.setItem("dataSearch", JSON.stringify(dataSearch));
const searchedData = JSON.parse(localStorage.getItem("dataSearch"));
function searchQueries(){
    let target = document.getElementById('searchField');
    let query = target.value.toLowerCase();
    let result = [];
    let show = document.getElementById('new');
    show.innerHTML = ' ';
    let meme = document.querySelector("#modalSearch");
    for(let i =0; i < searchedData.length; i++){
        if(searchedData[i].name.toLowerCase().includes(query) || searchedData[i].description.toLowerCase().includes(query)){
            let anchors = document.createElement('a');
            let url = searchedData[i].url;
            anchors.href = url;
            anchors.textContent = searchedData[i].name + "\n";
            result.push(anchors)
        }
        if(query === "") {
            result = [];
        }
        }
        
   
    if(result.length > 0){
               
            result.forEach(function(anchors){
           show.appendChild(anchors)
        })
       
        show.style.display = "block";
        meme.style.display = "block";
        meme.addEventListener("click", function(){
            show.style.display = "none"
            target.value = "";
            meme.style.display = "none";
        })
    }else{
        target.value = "No match found"
    }
   
}
