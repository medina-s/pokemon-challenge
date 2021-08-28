import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      time: 10,
      isOn: false,
      isVisible: false
    }

    this.startTimer = this.startTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }
  
  startTimer(){
    this.setState({isOn:true})
    this.setState({isVisible:false})
    this.fetchPokemon()
    this.timer = setInterval(()=>{
      if(this.state.isOn === true){

        this.setState({
          time: this.state.time - 1
        })}else {
          clearInterval(this.timer)
        }}
        , 1000)
      }
    

  componentDidUpdate(){
    // if(this.state.time === 3){
    //   this.setState({isOn:true})
    //   console.log(this.state.isOn)
    // }
    if(this.state.time === 0 && this.state.isOn === true){
      this.resetTimer()
    }
  }

  resetTimer(){
    this.setState({time: 10})
    this.setState({isOn: false})
    this.setState({isVisible:true})

  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))
  }

  render() {
    if (this.state.isVisible === false){
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.startTimer()}>Start!</button>
        <h1 className={'timer'} >Timer Display</h1>
        {/* <button className={'start'} onClick={()=> this.startTimer()}>Start Timer</button> */}
        <h2>timer:{this.state.time}</h2>
        {/* <button className={'start'} onClick={()=>this.resetTimer()}>Reset Timer</button> */}
        <div className={'pokeWrap'}>
          <img className={'pokeImgInvisible'} src={this.state.pokeSprite} />
          <h1 className={'pokeNameInvisible'}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
    } else {
      return (
        <div className={'wrapper'}>
          <button className={'start'} onClick={() => this.startTimer()}>Start!</button>
          <h1 className={'timer'} >Timer Display</h1>
          {/* <button className={'start'} onClick={()=> this.startTimer()}>Start Timer</button> */}
          <h2>timer:{this.state.time}</h2>
          {/* <button className={'start'} onClick={()=>this.resetTimer()}>Reset Timer</button> */}
          <div className={'pokeWrap'}>
            <img className={'pokeImgVisible'} src={this.state.pokeSprite} />
            <h1 className={'pokeNameVisible'}>{this.state.pokeName}</h1>
          </div>
        </div>
      )
    }
  }
}

export default PokeFetch;