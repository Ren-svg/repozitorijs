console.log('JS works');

backBtn.addEventListener('click', function()
{
    window.location.assign("./start.html");
});//Atpakaļ

settingsBtn.addEventListener('click', function()
{
    window.location.assign("./settings.html");
});//Settings

leaderboardBtn.addEventListener('click', function()
{
    window.location.assign("./leaderboard.html");
});//Leaderboard

playBtn.addEventListener('click', function()
{
    window.location.assign("./gamig.html");
});//Game


//Katram html failam vajag savu JS. "kam pieder JS" tiek noteikts no pirmā addeventlistener.
