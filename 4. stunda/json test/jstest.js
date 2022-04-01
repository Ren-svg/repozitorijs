console.log("b");

let rember = localStorage.getItem("score");



addSix.addEventListener('click', function()
{
    event.preventDefault();
localStorage.setItem("score",6);
// console.log("click1");
});

logStorage.addEventListener('click', function()
{
    event.preventDefault();
    rember = localStorage.getItem("score");
    console.log(rember);
    // console.log("click2");
});

setZero.addEventListener('click', function()
{
    event.preventDefault();
localStorage.setItem("score",0);
// console.log("click3");
});
chef.addEventListener('click', function()
{
    event.preventDefault();
    window.location.assign("./test2.html");
});

document.cookie="ambulanc";