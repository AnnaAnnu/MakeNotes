//eventsListner
//  if user adds a note, adding it to the localStorage
showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes)
  }
  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  // console.log(notesObj);
  showNotes();
});


function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes)
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
  <div class=" noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Note${index + 1}</h5>
              <p class="card-text">${element}</p>
              <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary"> Delete Note </button>
            </div>
          </div>
          `

  });

  let notesElm = document.getElementById('notes');
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  }
  else {
    notesElm.innerHTML = html;
  }
}

function deleteNote(index){
  // console.log('deleting a note', index);// this will delete a note shoing index valie in localstorage

  let notes = localStorage.getItem("notes");//read localstorage
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes)
  }

  notesObj.splice(index, 1);
  //  now updating localstorage
 localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();// this wil  not delete a note , as we have not updated our local storage

  
}
//now creating search bar we will create a eventlistner\

let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){
  let inputVal = search.value.toLowerCase();
  // console.log('Input event fired!', inputVal);

  let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})