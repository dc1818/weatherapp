import React from 'react';
import './css/weathertemplate.css';




const geocodekey  = "UnKAjeHAB6sFQGrli30eJCYQis96tuaO";









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
    this.state = {shortForecast:null,location:this.props.location,html:<div></div>};
  }

  async runGeoCodeApi()
  {
   //const response = await fetch(websitetemplate+`&location=${address}`);

   const response = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=UnKAjeHAB6sFQGrli30eJCYQis96tuaO&location=${this.props.location}`);
   const data = await response.json();
   const locationData = await data.results[0].locations[0]
   console.log(locationData);


  //let lat = await locationData.displayLatLng.lat;
   //let long = await locationData.displayLatLng.lng;
  let latlong = await [locationData.displayLatLng.lat,locationData.displayLatLng.lng];
  this.setState({city:locationData.adminArea5,country:locationData.adminArea1});
  return latlong
}


  async runWeatherApi(latlong)
  {
    const initialapi = await fetch(`https://api.weather.gov/points/${latlong[0]},${latlong[1]}`,{mode:"cors"});
    const initialapidata = await initialapi.json();
    if(initialapidata.status===404)
    {
        console.log(initialapidata.status);
      this.setState({shortForecast:404});
      this.requireCSSCheck();
      this.setHtml();
    }
    else
    {
      const forecasturl = initialapidata.properties.forecast;
      const forecastapi = await fetch(forecasturl);
      const forecastdata = await forecastapi.json();
      const period = await forecastdata.properties.periods[0];
      console.log(period);
      let shortForecast = period.shortForecast;
      //let shortForecast = "sunny";
      this.setState({name:period.name,shortForecast:shortForecast,temperature:period.temperature,temperatureUnit:period.temperatureUnit,windDirection:period.windDirection,windSpeed:period.windSpeed});

      this.requireCSSCheck();
      this.setHtml();
      //this.requireCSSCheck("Sunny");
      //this.setHtml("Sunny");
      return period;
    }

}

  requireCSSCheck()
  {
      if(this.state.city!=="" && this.state.shortForecast.toString().toLowerCase()==="mostly sunny" || this.state.shortForecast.toString().toLowerCase()==="partly cloudy" || this.state.shortForecast.toString().toLowerCase()==="mostly cloudy" )
      {
          console.log("mostly sunny css loaded");
        require('./css/mostlysunny.css');
      }
      else if(this.state.shortForecast.toString().toLowerCase()==="sunny")
      {
        console.log("sunny css loaded");
        require('./css/sunny.css');
      }
      else if(this.state.shortForecast.toString().toLowerCase().indexOf('rain')>-1 || this.state.shortForecast.toString().toLowerCase().indexOf('showers')>-1)
      {
        console.log("rain css loaded");
        require('./css/rainy.css');
      }
      else if(this.state.shortForecast===404 || this.state.city==="")
      {
        console.log("404 css loaded");

        require('./css/404page.css');
      }
  }

  setHtml()
  {
    if(this.state.city!=="" && this.state.shortForecast.toString().toLowerCase()==="mostly sunny" || this.state.shortForecast.toString().toLowerCase()==="partly cloudy" || this.state.shortForecast.toString().toLowerCase()==="mostly cloudy")
    {
      console.log("mostly sunny html loaded");
      this.setState({html:<div id = "wholecontainer">
      <div class="wrapper">
        <div class="round round1"></div>
        <div class="round round2"></div>
        <div class="round sun"></div>
      </div>
    </div>});
  }
    else if(this.state.shortForecast.toString().toLowerCase()==="sunny")
    {
        console.log("sunny html loaded");
        this.setState({html:<div id = "wholecontainer">
        <div class="wrapper">
          <div class = "round round1"></div>

          <div class="round sun"></div>
        </div>
      </div>});
    }
    else if(this.state.shortForecast.toString().toLowerCase().indexOf('rain')>-1 || this.state.shortForecast.toString().toLowerCase().indexOf('showers')>-1)
    {
        console.log("rain html loaded");
        this.setState({html:<div class="wrapper">
    <div class="round round1"></div>
    <div class="round round2"></div>

    <div class="raindrop"></div>
    <div class="raindrop"></div>
    <div class="raindrop"></div>
    <div class="raindrop"></div>
    <div class="raindrop"></div>
    <div class="raindrop"></div>
    <div class="raindrop"></div>
    <div class="raindrop"></div>

    <div class="raindrop"></div>
    <div class="raindrop"></div>
    <div class="raindrop"></div>
    <div class="raindrop"></div>
    <div class="raindrop"></div>
    <div class="raindrop"></div>

  </div>});
    }
    else if(this.state.city==="" || this.state.shortForecast===404)
    {
      console.log('404 html loaded');
      if(this.state.city==="" && this.state.country!=="")
      {

        console.log("first 404 case loaded");
          this.setState({html:<div id = "container"><div id = "city">NO CITY FOUND</div><h1>No weather data found(404)</h1><div id = "returncontainer"><button onClick = {()=>{this.props.formPageStatus(true);this.setState({location:null,shortForecast:null,country:null});}} id = "returnbutton">Return</button></div></div>});
      }
      else if(this.state.city!=="")
      {
          console.log("second 404 case loaded");
        this.setState({html:<div id = "container"><div id = "city">City found: {this.state.city}</div><h1>No weather data found(404)</h1><div id = "returncontainer"><button onClick = {()=>{this.props.formPageStatus(true);this.setState({location:null,shortForecast:null,country:null});}} id = "returnbutton">Return</button></div></div>})
      }
    }


  }


  componentWillMount()
  {
    //console.log(this.state.location);
    console.log(this.state.location);

  this.runApis();
}
componentWillUnmount()
{
  this.setState({html:null,shortForecast:""});

}


    runApis()
  {

    this.runGeoCodeApi().then((result)=>{this.runWeatherApi(result)});
    console.log(this.state.location);
  }


  getLocation()
  {
      console.log('get location');
    return this.props.location;
  }



  render()
  {
    //return(<div id = "container"><div id = "city">{this.state.city}</div></div>);
    console.log(this.props.location);
    if(this.state.shortForecast===404 || this.state.city==="")
    {
        console.log('render first if loaded');
      return (<div>{this.state.html}</div>);
    }
    else if(this.props.location===null)
    {
      return null;
    }
    else
    {
      console.log('render last else loaded');
      return(<div id = "container">{this.state.html}<div id = "weatherblurb">Your weather in:</div><div id = "city">{this.state.city}</div><div id = "country">{this.state.country}</div><div id = "shortForecast">{this.state.shortForecast}</div><div id = "temperature">{this.state.temperature}&#176;<span id = "temperatureunit">{this.state.temperatureUnit}</span></div><div id = "returncontainer"><button onClick = {()=>{this.props.formPageStatus(true);this.setState({location:null,shortForecast:null,country:null});}} id = "returnbutton">Return</button></div></div>);
    }

  }


}


export default Weathertemplate
