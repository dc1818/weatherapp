import React from 'react';

import './css/initialstyle.css';
import {FormPage} from 'FormPage';



class Mainpage extends React.Component
{
  constructor(props)
  {
    super(props);
    //this.inputbox = React.createRef();
      this.state = {displayLabel:true,enterTyped:false,displayformPage:true,inputValue :""};
      this.checkForEnter = this.checkForEnter.bind(this);
      this.changeDisplayLabelStatus = this.changeDisplayLabelStatus.bind(this);
      this.updateInput = this.updateInput.bind(this);
      this.inputbox = React.createRef();

}





  componentDidMount()
  {
      document.addEventListener('keydown',this.checkForEnter);

     //ReactDOM.findDOMNode(this).addEventListener('nv-event', this._handleNVEvent);
  }
  componentWillUnmount()
  {

  }

  checkForEnter(event)
  {
      if(event.keyCode===13 && this.state.inputValue!=="")
      {
          this.setState({enterTyped:true,displayFormPage:false});
          console.log(this.state.enterTyped);
      }
      else
      {
            this.inputbox.current.focus();
      }

  }
  changeDisplayLabelStatus(value)
  {
    if(this.state.inputValue==="")
    {
      this.setState({displayLabel:true});
    }


    this.setState({displayLabel:value});

  }

  updateInput(event)
  {
    this.setState({inputValue:event.target.value});
  }

  render()
  {
      let infolabel;



      console.log(formPage);


      if(this.state.displayLabel===true)
      {
          infolabel = <label id = "citylabel">Enter your location</label>
      }

return (

    <FormPage></FormPage>
  )
  }
}

export default Mainpage;
