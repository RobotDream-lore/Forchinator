//setup
fetchRoutineList();
fetchActionList();


function tryRoutine()
{
    let routine_name;
    try{
        let select = document.getElementById("drop-routines");
        let index = select.selectedIndex;
        routine_name = select.children[index].text;
        console.log(routine_name);
    }
    catch(e){ return; }

    if(routine_name === 'Select a Routine') return;
    $.ajax({
        url: '/dashboard/routines/try/' + routine_name,
        dataType: 'json',
        type: 'get',
        success: function(data){
            // Perform operation on return value
            //console.log(data);
            
        },
        complete:function(data){
            console.log("complete: try Routine");
        }
    });
}

function tryAction()
{
    let action_name;
    try{
        action_name = document.getElementById("action-form")[0].value;
    }
    catch(e){ return; }

    if(!action_name) return;

    $.ajax({
        url: '/dashboard/actions/try/' + action_name,
        dataType: 'json',
        type: 'get',
        success: function(data){
            // Perform operation on return value
            //console.log(data);
            
        },
        complete:function(data){
            console.log("complete: try Action");
        }
    });
}
function pageSetup()
{
    let _input = document.getElementById("routine-name");
    _input.value = null;

    _input = document.getElementById("homing");
    _input.value = 0;

    let form = document.getElementById("action-form");

    form[0].value = null; //name
    form[1].value = 0;
    form[2].value = 0;
    form[3].value = 0;
    form[4].value = 0; //motors
    form[5].value = 0; //speed
    form[6].value = 0; //delay
    form[7].checked = false;
    form[8].checked = false;
    form[9].checked = false;
    form[10].checked = false;
    //console.log(form[10]);
}
function toggle(el)
{

    if(el.value==='True') 
    {
        el.value = 'False';
        //el.checked = false; 
    }
    else if(el.value==='False' || el.value==='on')
    {
        el.value = 'True';
        //el.checked = true;
    } 
    //console.log(el.value);
}
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
                option.setAttribute('onclick', 'fetchRoutine(this.text);');
                _select.add(option);
            }
            
        },
        complete:function(data){
            console.log("complete: fetchRoutineList");
        }
    });
}
function fetchRoutine(_name)
{
    // let _name;

    // try{
    //     _name = document.getElementById('drop-routines');
    //     //console.log(_name.value);
    //     _name = _name.value;
    // } catch(e){}
    
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

            
            try{
                let _input = document.getElementById("homing");
                _input.value = data[1];
                decodeActionOrder(data[2]);
            }catch(e){}
        },
        complete:function(data){
            console.log("complete: fetchRoutine");
        }
    });
}
function decodeActionOrder(msg)
{
    if(msg === '') return;
    let actions = msg.split('-');

    let _action_list = document.getElementById('actions-list');
    let len = _action_list.children.length;

    console.log(len);
    for(let i = len; i > 0; i--)
    {
        _action_list.children[i-1].remove();
        console.log(i-1);
    }


    for(let i = 0; i < actions.length; i++)
    {
        addAction(actions[i]);
    }
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

function encodeActionOrder()
{
    let _ul = document.getElementById('actions-list');

    let items = _ul.children;

    let msg = '';

    for(let i = 0; i < items.length; i++)
    {
        msg += items[i].innerHTML;
        if(i < items.length-1) msg += '-';
    }

    console.log(msg);
    return msg;
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
        data_to_send.push(encodeActionOrder());

    }catch(e){
        console.log("errore");
        return;
    }
    if(_name === undefined || _name === null) 
    {
        console.log("name is undefined or null");
        console.log(_name);
        return;
    }
    console.log(data_to_send)
    
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
            //console.log(data.length);

            try{
                let _select_list = document.getElementById('drop_actions');
                
                let _option;
                for(let i = 0; i < data.length; i++)
                {
                    _option = document.createElement("option");
                    _option.setAttribute('class', 'list-group-item');
                    _option.setAttribute('onclick', 'addAction(this.innerHTML)');
                    _option.innerHTML = data[i];
                    _select_list.appendChild(_option);
                    
                }
                //console.log(_action_list.children);
            }catch(e){}
        },
        complete:function(data){
            console.log("complete: fetchActionList");
        }
    });
}

function addAction(val)
{
    let _li;
    let _action_list = document.getElementById('actions-list');

    try{
        _li = document.createElement("li");
        _li.setAttribute('class', 'list-group-item');
        _li.setAttribute('onclick', 'fetchAction(this.innerHTML)');
        _li.innerHTML = val;
        _action_list.appendChild(_li);
    } catch(e){}
    
}

function fetchAction(_name)
{
    // let _name;
    // try{
    //     _name = document.getElementById('name');
    //     //console.log(_name.value);
    //     _name = _name.value;
    // }catch(e){}
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
            console.log(data);

            let form = document.getElementById('action-form');
            for(let i = 0; i < form.length; i++)
            {
                if(i > 6)
                {
                    
                    if(data[i])
                    {
                        form[i].value = 'True';
                        //console.log("true");
                        $('#'+form[i].id).bootstrapToggle('on');
                    }
                    else 
                    {
                        form[i].value = 'False';
                        //console.log("false");
                        $('#'+form[i].id).bootstrapToggle('off');
                    }
                }
                else{
                    form[i].value = data[i];
                }
            }
            
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

        

        let form = document.getElementById("action-form");
        
        for(let i = 0; i < form.length; i++)
        {
            console.log(form[i].id + ": " + form[i].value);
            let _tmp_name = form[i].id;
            let _tmp_val = form[i].value;
            
            if(_tmp_val === 'undefined') _tmp_val='';
            else if(_tmp_val ==='') _tmp_val = '0';
            //else if(_tmp_val ==='on' || _tmp_val === 'False') continue;
            else if(_tmp_val ==='True') continue;
            else if(_tmp_val ==='False')_tmp_val ='True';
            else console.log(_tmp_val);
            _action[_tmp_name] = _tmp_val;
        }

        console.log(_action);
        
        
    }catch(e){console.log(e);}

    



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