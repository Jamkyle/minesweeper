import React, { Component } from 'react'

export class Button extends Component {
  state = { show : false, x:this.props.x, y :this.props.y }
  name = this.props.name
  show = this.state.show
  action = ()=> {
    if(!this.show){
      this.props.action({ x: this.props.x, y: this.props.y })
      this.toggle()
    }
  }

  toggle = () => {
    this.setState({ show: true })
    this.show = true
  }

  render(){
    return <div className={ 'button ' } onClick={ () => this.action() } style={{ background : this.show && '#555'}}>
            <label> { this.state.show && this.props.name } </label>
          </div>
  }

}
