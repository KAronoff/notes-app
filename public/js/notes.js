

/*
The user will see a list of notes on the left side
  - these notes need to be called using the ajax function
  - they will print the title of the note and date created 

The user will be able to create a new note by typing in the field and then pressing save

the user will then be able to click on old notes and have them appear in the viewing area. 
*/



let $noteList = $("#note-list");
let $noteForm = $("#note-form");
let $titleInput = $("#title-input");
let $mainInput = $("#main-input");

var $noteListItems = [];
var notesArr = [];

  $("#titleInput").val("");
  $("#mainInput").val("");
// get the information from the database

var getNotes = function(){
  $.ajax({method: "GET", url: "/api/notes"})
  .then(function(data){
    

    for (var i=0; i < data.length; i++){
      let note = data[i];

      notesArr.push(note);

      console.log(note);
      let $li = $("<li>").addClass("list-group-item notesItem").attr("id-data", note.id);
      let $titleP = $("<p>").text(note.name);
      let $dateP = $("<p>").text(note.date);

      $li.append($titleP, $dateP);

      $noteListItems.push($li);
    }
    $noteList.append($noteListItems);
  })
}

getNotes();

// on clicking the side items the note will appear in the edit spaces.

$(document).on("click", ".notesItem", function(){
  
  var dataId = parseInt($(this).attr("id-data"));
  console.log(dataId);

  $.ajax({method: "get", url: "/api/notes/"+dataId})
  .then(function(noteData){
    $("#titleInput").val(noteData[0].name);
    $("#mainInput").val(noteData[0].noteBody);
  })
  $("#btnArea").empty();

  let $button = $("<button>").attr("id", "updateBtn").attr("type", "button").addClass("btn").text("Update");
  let $deleteBtn = $("<button>").attr("id", "deleteBtn").attr("type", "button").addClass("btn").text("Delete");
  $("#btnArea").append($button, $deleteBtn);

  $(document).on("click", "#updateBtn", function(){
    let updateNote = {
      name: $("#titleInput").val().trim(),
      noteBody: $("#mainInput").val().trim()
    }
  
    $.ajax({method: "PUT", url: "/api/notes/"+dataId, data: updateNote})
    .then(function(updatedNote){
      console.log(updateNote);
    })
  });

  $(document).on("click", "#deleteBtn", function(){
    
    $.ajax({method: "DELETE", url: "/api/notes/"+dataId})
    .then(function(updatedNote){
      console.log("Note Deleted");
    })
  });

    
  }

);

$(document).on("click", "#saveBtn", function(){
  const newNote = {
    name: $("#titleInput").val().trim(),
    noteBody: $("#mainInput").val().trim()
  }
  if (!newNote.name || !newNote.noteBody){
    alert("You cannot save an empty note")
  }
  $.ajax({method: "POST", url: "/api/notes", data: newNote})
  .then(function(data){

    let note = data;

      notesArr.push(note);

      console.log(note);
      let $li = $("<li>").addClass("list-group-item notesItem").attr("id-data", note.id);
      let $titleP = $("<p>").text(note.name);
      let $dateP = $("<p>").text(note.date);

      $li.append($titleP, $dateP);

      $noteListItems.push($li);
    
      $noteList.append($noteListItems);

    $("#titleInput").val("");
    $("#mainInput").val("");
    
  });
})


$("#newNoteBtn").on("click", function(){
  $("#titleInput").val("");
  $("#mainInput").val("");

  let $button = $("<button>").attr("id", "saveBtn").attr("type", "button").addClass("btn").text("Save")
  $("#btnArea").empty();

  $("#btnArea").append($button);

})