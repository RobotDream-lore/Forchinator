function logIn()
{
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log("Username: " + username + "\nPassword: " + password);
}

function input(id)
{   
    //do stuff
    var element = document.getElementById(id).value;
    console.log(element);
}