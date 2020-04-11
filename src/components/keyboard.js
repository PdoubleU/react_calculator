import React from 'react';
import {inactive, active} from './padstyle';

class Keyboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            keyPad: inactive
        }
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.changePadStyle = this.changePadStyle.bind(this);
    }
componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    }
componentWillUnmount(){
    document.addEventListener('keydown', this.handleKeyPress);
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
handleKeyPress(e){
    if(e.keyCode === this.props.keyCode){
        this.changePadStyle();
        setTimeout(() => this.changePadStyle(), 200);
    }
}
render(){
    return(
    <div>
        <div style={this.state.keyPad} onClick={this.handleKeyPress}>{this.props.id}</div>
    </div>
    )
    }
}

export default Keyboard;