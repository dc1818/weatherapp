import React from 'react';




class FormPage extends React.Component
{
  render()
  {
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

export default FormPage
