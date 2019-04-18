import React from 'react';

import './css/initialstyle.css';
import Formpage from './Formpage.js';
import Weathertemplate from './Weathertemplate.js';



class Mainpage extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {displayFormPage:true,displayWeatherInformation:false,inputValue:""}
    this.getFormSubmitStatus = this.getFormSubmitStatus.bind(this);
    this.getInputValue = this.getInputValue.bind(this);
  }

  getFormSubmitStatus(isTrue)
  {
      this.setState({displayFormPage:isTrue});

  }

  getInputValue(input)
  {
      this.setState({inputValue:input});
  }


  render()
  {
    if(this.state.displayFormPage===true)
    {
      return (<Formpage displayStatus = {this.getFormSubmitStatus} inputValue = {this.getInputValue} />);
    }
    else
    {
      return (<Weathertemplate location = {this.state.inputValue}/>);
    }







  }
}

export default Mainpage;
