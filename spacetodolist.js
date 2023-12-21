// declaring neccessary global varriables
let inputARR= JSON.parse(localStorage.getItem("inputARR")) || []; //array for reminder and task

inputARR = inputARR.map(item => ({
    task: item.task,
    reminder: new Date(item.reminder) // Convert reminder string back to Date
}));

//audio database
let audioDataBase = ["assets/alarm1.wav",
"./assets/alarm2.wav",
"./assets/alarm3.wav",
"./assets/alarm4.wav",
"./assets/alarm5.wav",
"./assets/alarm2.wav",
"./assets/alarm3.wav",
"./assets/alarm4.wav",
"./assets/alarm5.wav",
"./assets/alarm2.wav",
"./assets/alarm3.wav",
"./assets/alarm4.wav",
"./assets/alarm5.wav",
]

let displaySound = document.querySelector('.audio')
let requestButton = document.querySelector('#requestPermission');
let answerPrefrences = document.querySelectorAll('.answerPreferences');
console.log(answerPrefrences);
let firstBorn = answerPrefrences[0];
let secondBorn = answerPrefrences[1];
firstBorn.style.display = "none";
secondBorn.style.display = "none";
requestButton.style.display = "none";
requestButton.appendChild(firstBorn);
requestButton.appendChild(secondBorn);

//function to display on load
function displayTaskOnLoad(){
    inputARR.forEach(function(taskReminder, index){
    //HTML element creation
    const inputHolder = document.querySelector('.inputHolder');
    const input = document.createElement('input');
    const list = document.createElement('li');
    const reminder = document.createElement('input');
    const deleter = document.createElement('button');
    deleter.textContent = "Delete";
    input.style.width= "45%";
    reminder.style.width= "10%";
    deleter.style.width = "15%"
    list.appendChild(input);
    list.appendChild(reminder);
    list.appendChild(deleter);
    inputHolder.appendChild(list);
    input.readOnly = "true"

       //delete button functions
    function deletor(indexation){
        inputARR.splice(indexation, 1)
        localStorage.setItem("inputARR", JSON.stringify(inputARR));
        input.remove();
        reminder.remove();
        deleter.remove();
        list.remove();
    }
    
     deleter.addEventListener('click', function(){
        deletor(index)
        
    });
      input.value = taskReminder.task;
      reminder.value = taskReminder.reminder;
})

setInterval(dateCheck, 1000);
}
displayTaskOnLoad();



//function to play sound with notification
function createSelection(taskIndex) {
    const audioMark = new Audio(audioDataBase[taskIndex]);
    audioMark.play();
    cascas();
}

// create and get notification functions
function cascas() {
    const body = "This is the body of the notification.";
    new Notification("Title", {
        body: body,
    });
    papas();
}

// creating notification permission
function papas(){
    Notification.requestPermission().then(function(permission) {
       if (permission === 'granted'){
           Display();
           }
    });
}
    
  
//function to execute after granting permission
function Display(){
    const dialog = document.createElement('dialog');
    for(message of inputARR){
        dialog.innerHTML = message.task
        console.log(message.task);
    }
    document.body.appendChild(dialog);
    dialog.style.top = "0";
    dialog.style.width = "10rem";
    dialog.style.height = "1rem";
     if( typeof dialog.show() === 'function'){
            dialog.showModal()
     }else{
        console.log("dialog not suppoprted on this browser")
     }
}

//function to add new input
function newInput(){
     //HTML element creation
    const inputMade = document.createElement('input');
    const semiList = document.createElement('li');
    const timeDate = document.createElement('input');
    const save = document.createElement('button');
    const deletion = document.createElement('button');
    deletion.textContent = "Delete";
    save.textContent = "Save"
    inputMade.style.width= "45%";
    timeDate.style.width= "10%";
    save.style.width = "15%";
    deletion.style.width = "15%"
    timeDate.type="datetime-local";
    semiList.appendChild(inputMade);
    semiList.appendChild(timeDate);
    semiList.appendChild(save);
    semiList.appendChild(deletion);
    const inputHolder = document.querySelector('.inputHolder');
    inputHolder.appendChild(semiList);

    //save button functions
    save.addEventListener("click", function(){
        if(inputMade.value.trim() !== "" && timeDate.value.trim() !== ""){
            inputARR.push({task: inputMade.value, reminder: new Date(timeDate.value)});
            localStorage.setItem("inputARR", JSON.stringify(inputARR)); // Store the Date object directly
            
            requestButton.style.display = "block"
            firstBorn.style.display = "block";
            secondBorn.style.display = "block";
            inputMade.readOnly = true;
        } else {
            alert("Enter both a valid date and task")
        }
    });



    
    deletion.addEventListener('click', function(){
        inputMade.remove();
        timeDate.remove();
        deletion.remove();
        semiList.remove();
    }) 
   
};


// function for remainder
function dateCheck(){
      const realDate = new Date();
     for (const entry of inputARR){
        console.log(typeof entry.reminder)
     const timeDiff = entry.reminder.getTime() - realDate.getTime()
     const index = inputARR.indexOf(entry);
        if (timeDiff === 0){      
          createSelection(index);
          if(index > -1){
            inputARR.splice(index, 1)
        }
        }else if(timeDiff > 0){
            setTimeout(function(){
            createSelection(index)
          }, timeDiff);
             break;
        } 
    } 
    
}

//event to execute the reminder function
firstBorn.addEventListener('click', function(){ 
    alert('getting a notification reminder depends on your browser settings. pls turn on notification for browser if you are yet to do so')
    setInterval(dateCheck, 1000);
    requestButton.style.display = "none";
});

//event to execute if user does not want reminder
secondBorn.addEventListener('click', function(){
    requestButton.style.display = 'none';
    alert('You will not get reminder notification for your task');
})
