import React from 'react';

//import './css/initialstyle.css';
import Formpage from './Formpage.js';
import Weathertemplate from './Weathertemplate.js';



class Mainpage extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {displayFormPage:true,displayWeatherInformation:false,inputValue:null,dataReady:false};
    this.getFormSubmitStatus = this.getFormSubmitStatus.bind(this);
    this.getInputValue = this.getInputValue.bind(this);
    this.getFormPageStatus = this.getFormPageStatus.bind(this);
    this.checkForDataReady = this.checkForDataReady.bind(this);
  }

  getFormSubmitStatus(isTrue)
  {
      this.setState({displayFormPage:isTrue});

  }

  getInputValue(input)
  {
      this.setState({inputValue:input});
  }

  getFormPageStatus(status)
  {
    this.setState({displayFormPage:status,inputValue:null});

    if(this.state.displayFormPage===true)
    {
      this.setState({inputValue:null});
    }
  }
  checkForDataReady(value)
  {
    console.log('check if api data is ready to be displayed');
    if(value)
    {
      this.setState({dataReady:true});
    }
  }

  render()
  {
    if(this.state.displayFormPage===true)
    {
      return (<Formpage displayStatus = {this.getFormSubmitStatus} inputValue = {this.getInputValue} />);
    }
    else if(this.state.displayFormPage===false && this.state.inputValue!==null)
    {

        console.log(this.state.inputValue);
      return (<Weathertemplate location = {this.state.inputValue} dataReady = {this.checkForDataReady} displayTemplate = {this.state.dataReady} formPageStatus = {this.getFormPageStatus}/>);
    }
    else{
      return null;
    }







  }
}

export default Mainpage;
