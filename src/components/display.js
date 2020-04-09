import React from 'react';

class Display extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            numberOne: 'x',
            numberTwo: 'y',
            operator: 'z'
        }
    }
render(){
    return(
    <div className='display'>
        <div id='number'>{this.state.numberOne}</div>
        <div id='number'>{this.state.numberTwo}</div>
        <div id='number'>{this.state.operator}</div>
    </div>
    )
}
}

export default Display;