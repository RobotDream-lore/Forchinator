//setup


function fetchRoutineList()
{
    $.ajax({
        url: '/controller/routines/list.json',
        dataType: 'json',
        type: 'get',
        success: function(data){
            // Perform operation on return value
            console.log(data);
        },
        complete:function(data){

        }
    });
}
function fetchAction(name)
{
    $.ajax({
        url: '/controller/routines/watch/' + name ,
        dataType: 'json',
        type: 'get',
        success: function(data){
            // Perform operation on return value
            console.log(data);
        },
        complete:function(data){

        }
    });
}
function saveRoutine(name)
{
    $.ajax({
        url: '/controller/routines/save/' + name ,
        dataType: 'json',
        type: 'get',
        success: function(data){
            // Perform operation on return value
            console.log(data);
        },
        complete:function(data){

        }
    });
}

function fetchActionList()
{
    $.ajax({
        url: '/controller/actions/list.json',
        dataType: 'json',
        type: 'get',
        success: function(data){
            // Perform operation on return value
            console.log(data);
        },
        complete:function(data){

        }
    });
}

function fetchAction(name)
{
    $.ajax({
        url: '/controller/actions/watch/' + name,
        dataType: 'json',
        type: 'get',
        success: function(data){
            // Perform operation on return value
            console.log(data);
        },
        complete:function(data){

        }
    });
}
function saveAction(name)
{
    $.ajax({
        url: '/controller/actions/save/' + name,
        dataType: 'json',
        type: 'get',
        success: function(data){
            // Perform operation on return value
            console.log(data);
        },
        complete:function(data){

        }
    });
}