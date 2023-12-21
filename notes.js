let ancestors = document.querySelector('.bodily');
let isEditClicked = false;
let isSaveClicked = false;
let noteContainerValue = JSON.parse(localStorage.getItem("noteContainerValue")) || [];
console.log(noteContainerValue.title);

//function to display notes on first load or page refresh
function onLoadPage(){
    //working on each notes creation
    noteContainerValue.forEach((note, index) => {
        //creating of elements
        let displayContainer = document.createElement('div');
        let numbering = document.createElement('li');
        let displayNoteTitle = document.createElement('input');
        let displayNoteBody = document.createElement('textarea');
        let deleteButton = document.createElement('button');
        let editButton = document.createElement('button');
        
        // editing function
        function editNote(noteIndex){
           let noteToEdit = noteContainerValue[noteIndex];
            noteToEdit.title = displayNoteTitle.value;
            noteToEdit.body = displayNoteBody.value;
            isEditClicked = false;
            displayNoteTitle.readOnly = "true";
            displayNoteBody.readOnly = "true";
            localStorage.setItem("noteContainerValue", JSON.stringify(noteContainerValue));
            numbering.appendChild(displayNoteTitle);
            numbering.appendChild(deleteButton);-
            numbering.appendChild(editButton);
            displayContainer.appendChild(numbering);
            displayContainer.appendChild(displayNoteBody);
            displayNoteBody.style.display ="none";
            ancestors.appendChild(displayContainer);
            displayNoteTitle.style.width = "60%";
            displayNoteBody.style.width = "80%";
            displayNoteBody.style.marginLeft = "1.4rem";
            
        }

         //implenting the edit function
        editButton.addEventListener("click", function(){
                displayNoteBody.style.display ="block";
                displayNoteTitle.style.textAlign = "center";
                displayNoteTitle.removeAttribute("readonly");
                displayNoteBody.removeAttribute("readonly");
                displayNoteTitle.style.width = "60%";         
                isEditClicked = true;
                editButton.textContent = "Save";

                //toggling through the save button
                if(isSaveClicked == true){
                    editNote(index)
                    editButton.innerHTML = 'Save'
                    console.log("Title", note.title);
                    console.log("Body", note.body)
                }
               isSaveClicked = !isSaveClicked
               displayNoteTitle.style.textAlign = 'left';
        });
        //naming the buttons
        deleteButton.innerHTML = "Delete";
        editButton.innerHTML = "Edit";

        //styling
        displayNoteBody.style.display ="none";
        deleteButton.addEventListener("click", function(){
            noteContainerValue = localStorage.removeItem("noteContainerValue");
            displayNoteTitle.remove();
            deleteButton.remove();
            editButton.remove();
            numbering.remove();
         })

         //toggling between edit and title note
         displayNoteTitle.addEventListener("click", function(){
            if(!isEditClicked){
                displayNoteBody.style.display ="block";
                displayNoteTitle.style.textAlign = "center";
                displayNoteTitle.readOnly = "true";
                displayNoteTitle.style.width = "60%";
                displayNoteBody.readOnly = "true";
            }            
        })

        //appending elements
        displayNoteTitle.value = note.title;
        displayNoteBody.textContent = note.body;
        numbering.appendChild(displayNoteTitle);
        numbering.appendChild(deleteButton);
        numbering.appendChild(editButton);
        displayContainer.appendChild(numbering);
        displayContainer.appendChild(displayNoteBody);
        ancestors.appendChild(displayContainer);
        displayNoteTitle.style.width = "60%";
        displayNoteBody.style.width = "80%";
        displayNoteBody.style.marginLeft = "1.4rem";
        numbering.style.lineHeight = "2rem";
        
        console.log("Title", note.title);
        console.log("Body", note.body)
        });
    
}
onLoadPage();

//creating the notes
function notesCreator(){
// creating the elements
 let createTitleDiv = document.createElement('div');
 let createBodyDiv = document.createElement('div');
 let create =document.createElement('input');
 let subCreate = document.createElement('textarea');
 let saveButton = document.createElement('button');
 
 //naming elments
 saveButton.innerHTML  = "Save";

//creating and implementing the save function
 saveButton.addEventListener('click', function(){
    if (create.value.trim() !== "" || subCreate.value.trim() !== ""){
        noteContainerValue.push({title: create.value, body: subCreate.value});
        localStorage.setItem('noteContainerValue', JSON.stringify(noteContainerValue));
        displayNoteToBody();
 } else{
        alert('Enter a task and a valid date');
    }

// clearing previous notes
    create.value = '';
    subCreate.value ='';     
}) 

//styling
 subCreate.style.width = "98%";
 subCreate.style.height = "10rem";
 create.style.width = "98%";
 create.placeholder = "PUT A TITLE HERE";
 subCreate.placeholder = " Write your notes here";
 ancestors.appendChild(createTitleDiv);
 ancestors.appendChild(createBodyDiv);
 ancestors.appendChild(saveButton);
 createTitleDiv.appendChild(create)
 createBodyDiv.appendChild(subCreate);

}

//function to display Note while creating
function displayNoteToBody(){
    ancestors.innerHTML =''
    noteContainerValue.forEach((note, index) => {
        let displayContainer = document.createElement('div');
        let numbering = document.createElement('li');
        let displayNoteTitle = document.createElement('input');
        let displayNoteBody = document.createElement('textarea');
        let deleteButton = document.createElement('button');
        let EditButton = document.createElement('button');
        EditButton.innerHTML = "Edit"
        deleteButton.innerHTML = "Delete"
        displayNoteBody.style.display ="none";

        //delete function implementation
        deleteButton.addEventListener("click", function(){
           deleteLogic(index);
         })

         //delete function creation
         function deleteLogic(deleteIndex){
            noteContainerValue.splice(deleteIndex, 1);
            localStorage.setItem('noteContainerValue', JSON.stringify(noteContainerValue));
            displayNoteTitle.remove();
            deleteButton.remove();
            EditButton.remove();
            numbering.remove();
         }

         //display Note titles
        displayNoteTitle.addEventListener("click", function(){
            displayNoteBody.style.display ="block";
            displayNoteTitle.style.textAlign = "center";
            displayNoteTitle.readOnly = "yes";
            displayNoteTitle.style.width = "60%";
            displayNoteBody.readOnly = "yes";
        })
        
        // styling
        displayNoteTitle.value = note.title;
        displayNoteBody.textContent = note.body;
        numbering.appendChild(displayNoteTitle);
        numbering.appendChild(deleteButton);
        numbering.appendChild(EditButton);
        displayContainer.appendChild(numbering);
        displayContainer.appendChild(displayNoteBody);
        ancestors.appendChild(displayContainer);
        displayNoteTitle.style.width = "60%";
        displayNoteBody.style.width = "80%";
        displayNoteBody.style.marginLeft = "1.4rem";
        numbering.style.lineHeight = "1.8rem"
    });       
}
