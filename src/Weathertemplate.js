import React from 'react';
import './css/weathertemplate.css';
import LoadingBar from 'react-top-loading-bar'




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
  const reverseGeoCodeApi = await fetch(`https://open.mapquestapi.com/geocoding/v1/reverse?key=${geocodekey}&location=${geocode[1]},${geocode[0]}&includeRoadMetadata=true&includeNearestIntersection=true`);
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
     this.setState({loadingBarProgress:0});
   const response = await fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=UnKAjeHAB6sFQGrli30eJCYQis96tuaO&location=${this.props.location}`);
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
      this.props.dataReady(true);
      //this.requireCSSCheck();
      //this.setHtml();
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
      this.props.dataReady(true);
      console.log(this.state);
      //this.requireCSSCheck();
      //this.setHtml();

      //this.requireCSSCheck("Sunny");
      //this.setHtml("Sunny");
      return period;
    }

}





  componentWillMount()
  {

    //console.log(this.state.location);
    console.log('first mount');
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
    this.setState({loadingBarProgress:100});
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
      return (<div id = "error">No weather data found<button onClick = {()=>{this.props.formPageStatus(true);this.setState({location:null,shortForecast:null,country:null});}} id = "returnbuttonerror">Return</button></div>);
    }
    else if(this.props.location===null)
    {

      return null;
    }
    else if(this.props.dataReady===false)
    {
      console.log('api running');
      return <div>LOADING</div>
    }
    else
    {
        if(this.state.shortForecast!==null)
        {

          console.log('render last else loaded');
          return(<div id = "container">{this.state.html}<div id = "weatherblurb">Your weather in:</div><div id = "city">{this.state.city}</div><div id = "country">{this.state.country}</div><div id = "shortForecast">{this.state.shortForecast}</div><div id = "temperature">{this.state.temperature}&#176;<span id = "temperatureunit">{this.state.temperatureUnit}</span></div><div id = "returncontainer"><button onClick = {()=>{this.props.formPageStatus(true);this.setState({location:null,shortForecast:null,country:null});}} id = "returnbutton">Return</button></div></div>);
        }
        else
        {
          return (<div class = "mainpage">
          <div onClick = {()=>{this.changeDisplayLabelStatus(true)}} id = "entirepage">
          </div>
          <div id = "loadingBar" >LOADING</div>
          <div id = "labelcontainer">
            <label id = "citylabel">Enter your location</label>
          </div>
          <div id = "inputbox">

          <textarea disabled={true} style = {{fontSize:this.state.font,overflow:"hidden"}} ref = {this.inputbox} onClick = {()=>{this.changeDisplayLabelStatus(false)}} onChange = {(event)=>{this.changeDisplayLabelStatus(false,this); this.updateInput(event);}} onBlur = {()=>{this.changeDisplayLabelStatus(true)}}   autoFocus spellcheck="false"  id = "cityinput" type = "text" maxlength = "50" ></textarea>
          {console.log(this.state.inputValue)}
          </div>
          <script src = 'mainscript.js'>
          </script>
          </div>)


        }

    }


  }


}


export default Weathertemplate
