import React from 'react';
import './css/weathertemplate.css';



const weathertemplate = "https://api.weather.gov/points/";
const geocodekey  = "UnKAjeHAB6sFQGrli30eJCYQis96tuaO";
const websitetemplate = `http://www.mapquestapi.com/geocoding/v1/address?key=${geocodekey}`;
let address;
let result;







async function pickApartForecast(forecast,locationData)
{
    //const location = await reverseGeoCode(coords);
      const country = locationData.adminArea1;
      const state = locationData.adminArea3;
      const county = locationData.adminArea4;
      const city = locationData.adminArea5;
      const street = locationData.street;
      const zipcode = locationData.postalCode;
      let locations = {street:street,city:city,state:state,zipcode:zipcode,county:county,country:country};
      console.log(street);
      return forecast.shortForecast;
}

async function reverseGeoCode(geocode)
{
  const reverseGeoCodeApi = await fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=${geocodekey}&location=${geocode[1]},${geocode[0]}&includeRoadMetadata=true&includeNearestIntersection=true`);
  const reverseGeoData = await reverseGeoCodeApi.json();
  console.log(reverseGeoData);
  return await reverseGeoData;
}







class Weathertemplate extends React.Component
{




  constructor(props)
  {
    super(props);
    this.state = {shortForecast:null};


  }

  async runGeoCodeApi(address)
  {
   //const response = await fetch(websitetemplate+`&location=${address}`);
   const response = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=UnKAjeHAB6sFQGrli30eJCYQis96tuaO&location=newburg,maryland`);
   const data = await response.json();
   const locationData = await data.results[0].locations[0]

   this.setState({city:locationData.adminArea5});

  let lat = await locationData.displayLatLng.lat;
   let long = await locationData.displayLatLng.lng;
  let latlong = [lat,long];

  return latlong

  }


  async runWeatherApi(latlong)
  {
    const initialapi = await fetch(`https://api.weather.gov/points/${latlong[0]},${latlong[1]}`);
    const initialapidata = await initialapi.json();
    const forecasturl = initialapidata.properties.forecast;
    const forecastapi = await fetch(forecasturl);
    const forecastdata = await forecastapi.json();
    const period = await forecastdata.properties.periods[0];
    console.log(period);
    this.setState({name:period.name,shortForecast:period.shortForecast,temperature:period.temperature,temperatureUnit:period.temperatureUnit,windDirection:period.windDirection,windSpeed:period.windSpeed});

    this.requireCSSCheck(this.state.shortForecast);
    this.setHtml(this.state.shortForecast);
    return period;

    //pickApartForecast(period,locationData);
  }

  requireCSSCheck(forecast)
  {
      if(this.state.shortForecast!==null)
      {

        require('./css/mostlysunny.css');
      }
  }

  setHtml(forecast)
  {
    if(forecast.toLowerCase()!=="")
    {
      this.setState({html:<div id = "wholecontainer">

    <div class="wrapper">
        <div class="round round1"></div>
        <div class="round round2"></div>
        <div class="round sun"></div>
    </div></div>});
    }



  }

  componentWillMount()
  {
    this.runGeoCodeApi(this.props.location).then((result)=>{this.runWeatherApi(result)});












  }





    //let weatherapiresult = runWeatherApi(geocoderesult).then((result)=>{return result});

    //console.log(weatherapiresult);



  getLocation()
  {
      console.log('get location');
    return this.props.location;
  }



  render()
  {
    //return(<div id = "container"><div id = "city">{this.state.city}</div></div>);
    return(<div id = "container">{this.state.html}<div id = "weatherblurb">Your weather in:</div><div id = "city">{this.state.city}</div><div id = "shortForecast">{this.state.shortForecast}</div><div id = "temperature">{this.state.temperature}&#176;<span id = "temperatureunit">{this.state.temperatureUnit}</span></div></div>);
  }


}


export default Weathertemplate
