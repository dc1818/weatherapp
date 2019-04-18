import {Weathertemplate} from './Weathertemplate.js';
const citylabel = document.getElementById('citylabel');
const container = document.getElementById('container');
const textbox = document.getElementById('cityinput');
const form = document.getElementById('form');
const entirepage = document.getElementById('entirepage');
const geocodekey  = "UnKAjeHAB6sFQGrli30eJCYQis96tuaO";
const head = document.getElementsByTagName('head')[0];
let stylesheet = document.styleSheets[0];
let shortForecast;

let address;
const websitetemplate = `http://www.mapquestapi.com/geocoding/v1/address?key=${geocodekey}`;
const weathertemplate = "https://api.weather.gov/points/";
let lat;
let lang;


 async function runGeoCodeApi()
{
  const response = await fetch(websitetemplate+`&location=${address}`);
  const data = await response.json();
  const locationData = await data.results[0].locations[0]
console.log(locationData);

//lat = locationData.displayLatLng.lat;
//long = locationData.displayLatLng.lng;

runWeatherApi(locationData);

}


function cssSorter(data)
{
  if(data ==="mostly sunny")
  {

  }
  else if(data ==="sunny")
  {
      console.log("load sunny.css");
      loadCSSFile("sunny.css")
  }
}


function variableFontSize()
{
  if(textbox.value.length>=20)
  {
    textbox.style.fontSize = "400%";
  }
}
function displayHTML(limitedForecast,locations)
{
  //let cloud = "<div class = "cloudbase"><div class = "cloudleft"></div><div class = "cloudright"></div></div";



  document.body.innerHTML = `<h2>Your limited forecast in ${locations.city} is ${limitedForecast}</h2>`;
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
function loadCSSFile(filename)
{
  stylesheet.disabled=true;
  let fileref = document.createElement('link');
  fileref.setAttribute('rel',"stylesheet");
  fileref.setAttribute('type','text/css');
  fileref.setAttribute('href',"./css/"+filename);
  head.appendChild(fileref);
  console.log(filename);
}








export default shortForecast
//document.addEventListener('keydown',hideText);
