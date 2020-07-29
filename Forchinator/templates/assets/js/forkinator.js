//setup
fetchRoutineList();
fetchActionList();


function fetchRoutineList()
{
    $.ajax({
        url: '/dashboard/routines/list.json',
        dataType: 'json',
        type: 'get',
        success: function(data){
            // Perform operation on return value
            console.log(data);
        },
        complete:function(data){
            console.log("complete: fetchRoutineList");
        }
    });
}
function fetchRoutine()
{
    let _name;

    try{
        _name = document.getElementById('drop-routines');
        //console.log(_name.value);
        _name = _name.value;
    } catch(e){}
    
    if(_name === undefined || _name === null) 
    {
        console.log("name is undefined or null");
        console.log(_name);
        return;
    }
    
    $.ajax({
        url: '/dashboard/routines/watch/' + _name ,
        dataType: 'json',
        type: 'get',
        success: function(data){
            // Perform operation on return value
            console.log(data);
        },
        complete:function(data){
            console.log("complete: fetchRoutine");
        }
    });
}
function saveRoutine()
{
    let _name;
    try{
        _name = document.getElementById('name');
        //console.log(_name.value);
        _name = _name.value;
    }catch(e){}
    if(_name === undefined || _name === null) 
    {
        console.log("name is undefined or null");
        console.log(_name);
        return;
    }
    
    $.ajax({
        url: '/dashboard/routines/save/' + _name ,
        dataType: 'json',
        type: 'get',
        success: function(data){
            // Perform operation on return value
            console.log(data);
        },
        complete:function(data){
            console.log("complete: saveRoutine");
        }
    });
}

function fetchActionList()
{
    $.ajax({
        url: '/dashboard/actions/list.json',
        dataType: 'json',
        type: 'get',
        success: function(data){
            // Perform operation on return value
            console.log(data);
        },
        complete:function(data){
            console.log("complete: fetchActionList");
        }
    });
}

function fetchAction()
{
    let _name;
    try{
        _name = document.getElementById('name');
        //console.log(_name.value);
        _name = _name.value;
    }catch(e){}
    if(_name === undefined || _name === null) 
    {
        console.log("name is undefined or null");
        console.log(_name);
        return;
    }

    $.ajax({
        url: '/dashboard/actions/watch/' + _name,
        dataType: 'json',
        type: 'get',
        success: function(data){
            // Perform operation on return value
            console.log(data);
        },
        complete:function(data){
            console.log("complete: fetchAction");
        }
    });
}
function saveAction()
{
    let _name;
    var _action = {};
    try{
        _name = document.getElementById('name');
        console.log(_name.value);
        _name = _name.value;

        

        var tmp = [];
        let form = document.getElementById("action-form");
        for(let i = 0; i <= form.length; i++)
        {
            //console.log(form[i].id + ": " + form[i].value);
            let _tmp_name = form[i].id;
            let _tmp_val = form[i].value;

            _action[_tmp_name] = _tmp_val;
        }
        
        
    }catch(e){}

    



    if(_name === undefined || _name === null) 
    {
        console.log("name is undefined or null");
        console.log(_name);
        return;
    }

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

    $.ajax({
        url: '/dashboard/actions/save',
        dataType: 'json',
        data: _action,
        type: 'post',
        success: function(data){
            // Perform operation on return value
            console.log(data);
        },
        complete:function(){
            console.log("complete: saveAction");
            console.log(_action);
        }
    });
}