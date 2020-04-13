import React from 'react';
import ReactFCCtest from 'react-fcctest';

class Display extends React.Component{
    render(){
        return(
        <div className='display' id='display'>
            <span className='number'>
                <span>{this.props.currentValue}</span>
                <span>{this.props.result}</span>
            </span>
        <ReactFCCtest/>
        </div>
        )
    }
}

export default Display;