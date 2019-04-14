const citylabel = document.getElementById('citylabel');
const container = document.getElementById('container');
const textbox = document.getElementById('cityinput');
const form = document.getElementById('form');
const entirepage = document.getElementById('entirepage');
const geocodekey  = "UnKAjeHAB6sFQGrli30eJCYQis96tuaO";
let address;
const websitetemplate = `http://www.mapquestapi.com/geocoding/v1/address?key=${geocodekey}`;
const weathertemplate = "https://api.weather.gov/points/";
let lat;
let lang;


async function runGeoCodeApi()
{
  const response = await fetch(websitetemplate+`&location=${address}`);
  const data = await response.json();

console.log(data);

lat = data.results[0].locations[0].displayLatLng.lat;
long = data.results[0].locations[0].displayLatLng.lng;

runWeatherApi();

}
async function runWeatherApi()
{
  const response = await fetch(weathertemplate+lat+","+long);
  const data = await response.json();
  console.log(data);
}
function variableFontSize()
{
  if(textbox.value.length<20)
  {

  }
  else if(textbox.value.length>=20)
  {
    textbox.style.fontSize = "400%";

  }

}
function handler(e)
{
    e.stopPropagation();
    e.preventDefault();
}

function focusInputBox()
{
  textbox.focus();
  textbox.select();
}
function hideLabel()
{
  citylabel.style.opacity = 0;
  console.log('hidelabel');
}

window.onload = function()
{
focusInputBox();
textbox.addEventListener('input',hideLabel);
entirepage.addEventListener('click',focusInputBox);
document.addEventListener("click",handler,true);
document.addEventListener('keydown',(e)=>
{
  if(e.keyCode===13 && cityinput.value!="")
  {

      address = cityinput.value;
    document.body.innerHTML = "";
    runGeoCodeApi();
  }
  else{
    variableFontSize();
  }
});
};






//document.addEventListener('keydown',hideText);
