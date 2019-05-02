

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
  
  var ulChild = this.nextElementSibling;
  var dataId = parseInt($(this).attr("id-data"));
  console.log(dataId);

  $.ajax({method: "get", url: "/api/notes/"+dataId})
  .then(function(noteData){
    $("#titleInput").val(noteData[0].name);
    $("#mainInput").val(noteData[0].noteBody);
  })
    
  }

);