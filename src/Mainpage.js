import React from 'react';

import './css/initialstyle.css';
import Formpage from './Formpage.js';
import Weathertemplate from './Weathertemplate.js';



class Mainpage extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {displayFormPage:true,displayWeatherInformation:false}
    this.getFormSubmitStatus = this.getFormSubmitStatus.bind(this);
  }

  getFormSubmitStatus(isTrue)
  {
      this.setState({displayFormPage:isTrue});

  }



  render()
  {
    if(this.state.displayFormPage===true)
    {
      return (<Formpage displayStatus = {this.getFormSubmitStatus} />);
    }
    else
    {
      return (<Weathertemplate/>);
    }







  }
}

export default Mainpage;
