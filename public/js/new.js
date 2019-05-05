let $noteList = $("#note-list");
let $noteForm = $("#note-form");

let $titleInput = $("#title-input");
let $mainInput = $("#main-input");

let newNoteBtn = $("#newNoteBtn")

const getNotes = function(note){
  $.ajax({method: "GET", url: "/api/notes"});
};

const deleteNotes = function(id){
  $.ajax({method: "delete", url: "/api/notes/"+id})
};

const saveNotes = function(note){
  $.ajax({method: "POST", url: "/api/notes", data(note)});
};

let noteList = function(data){
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
}

let showSavedNote = function(){
  var dataId = parseInt($(this).attr("id-data"));

  $.ajax({method: "get", url: "/api/notes/"+dataId})
  .then(function(noteData){
    $("#titleInput").val(noteData[0].name);
    $("#mainInput").val(noteData[0].noteBody);
  })

  $("#btnArea").empty();

  let $button = $("<button>").attr("id", "updateBtn").attr("type", "button").addClass("btn").text("Update");
  let $deleteBtn = $("<button>").attr("id", "deleteBtn").attr("type", "button").addClass("btn").text("Delete");
  $("#btnArea").append($button, $deleteBtn);

}

getNotes().then({
  noteList(data);
})