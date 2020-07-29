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
            //console.log(data);
            let _select = document.getElementById('drop-routines');

            for(let i = 0; i < data.length; i++)
            {
                let option = document.createElement("option");
                option.text= data[i];
                _select.add(option);
            }
            
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
        //console.log(_name.value);
        _name = _name.value;
    }catch(e){}

    let data_to_send = [0, ''];

    $.get('/dashboard/routines/save/' + _name + '/',{'data': data_to_send},location.reload());

}
function saveRoutine()
{
    let _name;
    let _homing;
    let data_to_send = [];
    try{
        _name = document.getElementById('drop-routines').value;
        //console.log(_name.value);
        
        _homing = document.getElementById('homing').value;
        //console.log(_homing);

        data_to_send.push(_homing);
        data_to_send.push('');

    }catch(e){}
    if(_name === undefined || _name === null) 
    {
        console.log("name is undefined or null");
        console.log(_name);
        return;
    }
    
    $.get('/dashboard/routines/save/' + _name + '/',{'data': data_to_send}, console.log("complete: save Routine"));
}
function deleteRoutine()
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
       
    $.ajax({
        url: '/dashboard/routines/delete/' + _name,
        dataType: 'json',
        type: 'get',
        success: function(){
            // Perform operation on return value
            console.log("delete routine Success");
        },
        complete:function(){
            console.log("complete: delete routine");
        }
    });
}

function deleteAction()
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
        url: '/dashboard/actions/delete/' + _name,
        dataType: 'json',
        type: 'get',
        success: function(){
            // Perform operation on return value
            console.log("delete action Success");
        },
        complete:function(){
            console.log("complete: delete action");
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
        success: function(){
            // Perform operation on return value
            console.log('success');
        },
        complete:function(){
            console.log("complete: saveAction");
            console.log(_action);
        }
    });
}