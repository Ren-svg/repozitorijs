console.log("js initiated");

document.getElementById("submit").addEventListener("click", function()
{
    event.preventDefault();

    var vardsJS = document.getElementById("vards").value;
    var vecumsJS = document.getElementById("vecums").value;
    var regionJS = document.getElementById("region").value;
    
    if(!(vecumsJS > 0))
    {
        vecumsJS = "nederīgs";
    }
    
    alert("vārds: " + vardsJS + "\nvecums: " + vecumsJS + "\nreģions: " + regionJS);

});