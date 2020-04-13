import React from 'react';
import {inactive, active} from './padstyle';

class Keyboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            keyPad: inactive
        }
    this.changePadStyle = this.changePadStyle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    }
changePadStyle(){
    if(this.state.keyPad.backgroundColor === 'grey'){
            this.setState({
                keyPad: inactive,
            })
        } else {
            this.setState({
                keyPad: active
            })
        }
    }
handleClick(e){
    const ISBUTTON = new RegExp(/[0-9]|\+|-|\/|\*|^a|\.|=/gi)
    if(ISBUTTON.test(e.target.firstChild.nodeValue)){
        this.changePadStyle();
        setTimeout(()=>this.changePadStyle(), 150);
    }
}

render(){
    return(
    <button style={this.state.keyPad} onClick={this.handleClick} className='pad' id={this.props.id}>{this.props.keyTrigger}</button>
    )
    }
}

export default Keyboard;