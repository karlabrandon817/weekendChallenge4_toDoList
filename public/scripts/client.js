$(document).ready(function(){
var taskArray = [];

  var getTasks = function(){
    console.log('in getTasks');
    $.ajax({
      type: 'GET',
      url: '/retrieveTasks',
      success: function(response){
        console.log('back from get call:', response);
        $('#toDoItems').html='';//clear div
        var outputText = '';
        for (var i = 0; i < response.length; i++) {
          taskArray.push = (response[i]);
          outputText += '<p class="stuff">' + response[i].task + ' ' + '<button class="completedTaskButton" data="' + response[i].id + '">Task Complete</button>' + ' ' + '<button class="deleteTaskButton data="' + response[i].id + '"">Delete Item</button>';

        }//end for loop
        $('#toDoItems').html(outputText);
      }
    });//end getTasks ajax
  };//end getTasks

  var addTask = function(){
    console.log('in addTask');
    //assemble object to send to db
    var objectToSend={
      task: $("#toDoItem").val(),
      status: "false"
    };//end objectToSend
    $.ajax({
      type: 'POST',
      url: '/addToList',
      data: objectToSend,
      success: function(response){
        console.log('back from post call:', response);
        getTasks();
      },//end success function
      error: function(){
        console.log('error with addToList ajax call!');
      }//end error function
    });//end ajax call in addTask
  };//end addTask funciton



//buttons
  $('#addTaskButton').on('click', function(){
    console.log('addItem clicked');
    addTask();
  });//end addItemButton

  $('#toDoItems').on('click', '.completedTaskButton',function(){
     $(this).parent().toggleClass('completed');
     $(this).hide();
    var status = $(this).attr('data');
    if (status === false){
      status = 'true';
    }
    console.log(status);
    var objectToSend = {
    id: $(this).attr('data')
  };
    $.ajax({
      type:'PUT',
      url:'/completedTasks',
      data: objectToSend,
      success:function(response){
    console.log(response, 'yo');
    }
  });
  });//end completedTaskButton
});//end doc ready function
