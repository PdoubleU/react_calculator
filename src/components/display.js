import React from 'react';

class Display extends React.Component{
    render(){
        return(
        <div className='display'>
            <div id='number' className='number'>{this.props.currentValue}</div>
            <div id='number' className='number'>{this.props.operator}</div>
            <div id='number' className='number'>={this.props.result}</div>
        </div>
        )
    }
}

export default Display;