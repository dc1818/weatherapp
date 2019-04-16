import React from 'react';




class Formpage extends React.Component
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
      console.log(this.props.displayStatus);

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
          this.props.displayStatus(false);
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






    if(this.state.displayLabel===true)
    {
        infolabel = <label id = "citylabel">Enter your location</label>
    }



    return(<div class = "mainpage">
    <div onClick = {()=>{this.changeDisplayLabelStatus(true)}} id = "entirepage">
    </div>
    <div id = "labelcontainer">
      {infolabel}
    </div>
    <div id = "inputbox">

    <input ref = {this.inputbox} onClick = {()=>{this.changeDisplayLabelStatus(false)}} onChange = {(event)=>{this.changeDisplayLabelStatus(false,this); this.updateInput(event);}} onBlur = {()=>{this.changeDisplayLabelStatus(true)}}   autoFocus spellcheck="false"  id = "cityinput" type = "text" maxlength = "50" ></input>
    {console.log(this.state.inputValue)}
    </div>
    <script src = 'mainscript.js'>
    </script>
    </div>)
  }
}

export default Formpage
