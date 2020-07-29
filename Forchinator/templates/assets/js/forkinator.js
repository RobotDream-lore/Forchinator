//setup
fetchRoutineList();
fetchActionList();

function sendMotorChange()
{
    let data_to_send = [];

    let motor1 = document.getElementById("motor1");
    let motor2 = document.getElementById("motor2");
    let motor3 = document.getElementById("motor3");
    let motor4 = document.getElementById("motor4");

    data_to_send.push(motor1.value);
    data_to_send.push(motor2.value);
    data_to_send.push(motor3.value);
    data_to_send.push(motor4.value);

    console.log(data_to_send);

    $.get('/dashboard/control/',{'data': data_to_send});

}
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
function addRoutine()
{
    let _name;
    try{
        _name = document.getElementById('routine-name');
        console.log(_name.value);
        _name = _name.value;
    }catch(e){}

    $.ajax({
        url: '/dashboard/routines/save/' + _name,
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
function saveRoutine()
{
    let _name;
    try{
        _name = document.getElementById('drop-routines');
        //console.log(_name.value);
        _name = _name.value;
    }catch(e){}
    if(_name === undefined || _name === null) 
    {
        console.log("name is undefined or null");
        console.log(_name);
        return;
    }
    let data_to_send = [];
    data_to_send.push("52");
    $.get('/dashboard/routines/save/' + _name + '/',{'data': data_to_send});
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