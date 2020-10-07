import React from 'react';
import { bankOne, bankTwo } from "../data/audio";
import SwitchButton from "./SwitchButton";
import "../styles/App.css";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
       bank : bankOne,
       bankOne: true,
       on: true,
       current: "Start Play",
       volumen: 100
    }

    this.changeBank = this.changeBank.bind(this);
    this.toggleOn = this.toggleOn.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  play({keyTrigger, id}){   
      if(!this.state.on){
        return;
      }
      const sound = document.getElementById(keyTrigger);
      sound.currentTime = 0;
      sound.volume = this.state.volumen / 100;
      sound.play();
      const drum = sound.parentNode;
      drum.classList.toggle("drum-pad-selected");
      setTimeout(()=>{ drum.classList.toggle("drum-pad-selected"); }, 200);
      let current = id.replace(/-/g, " ");
      this.display(current);
  }

  display(label){
    this.setState({
      current: label
    });
  }

  changeBank(){
    if(!this.state.on){
      return;
    }
     this.setState((state)=>{
       const bank = state.bankOne? bankTwo: bankOne;
       return{
         bankOne: !state.bankOne,
         bank
       }
     });
  }

  toggleOn(){
     this.setState((state)=>({on:!state.on}));
  }

  handleChange(event){
    if(!this.state.on){
      return;
    }
    const value = event.target.value;
    this.setState({volumen: value});
    this.display(`Volume: ${value}%`);
  }
  componentDidMount(){
    document.addEventListener("keypress", (event)=>{
      const evento = Window.event || event;
      const key = evento.charcode || evento.keyCode;
      const char = String.fromCharCode(key).toUpperCase();
      const exits = this.state.bank.filter( item => item.keyTrigger === char);
      if(exits[0]){
         this.play(exits[0]);
      }
    });
  }
  render(){
    return (
      <div id="drum-machine">
        <div id="drum-header">
         <h2 id="display">{this.state.current}</h2>
        </div>  

         <div className="container-drum">
         {this.state.bank.map( 
               item =>
               (<DrumPad 
                key={item.id}
                name={item.id}
                id={item.keyTrigger}
                url={item.url}
                onClick={()=>{this.play(item)}}/>)
          )}
         </div>

         <div id="container-controls">
              <div id="container-volume">  
              <i className='fas fa-volume-up'></i>    
               <input 
                  id="valumen"
                  type="range" 
                  min="0" max="100" 
                  onChange={this.handleChange} 
                  value={this.state.volumen}/>
              </div>
              <div className="controls">
                <p>Change Bank</p>
                <SwitchButton 
                   active={!this.state.bankOne}
                   onClick={this.changeBank}/>
              </div>
              <div className="controls">
                 <p>Power</p>
                 <SwitchButton 
                    active={this.state.on} 
                    onClick={this.toggleOn}/>
              </div>
         </div>
         
      </div>
    )
  }

  
}

const DrumPad = (props)=>{

  return (<button
          className="drum-pad"
          onClick={props.onClick}
          id={props.name}
          type="button"> 
          {props.id}
         <audio className="clip" id={props.id} src={props.url} type="audio/mpeg">
         </audio>
      </button>);
};

export default App;
