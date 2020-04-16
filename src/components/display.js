import React from 'react';
import ReactFCCtest from 'react-fcctest';

class Display extends React.Component{
    render(){
        return(
        <div>
            <span className='display'>{this.props.currentValue}</span>
            <div className='display' id='display'>
                <span>{this.props.result}</span>
            </div>
        <ReactFCCtest/>
        </div>
        )
    }
}

export default Display;