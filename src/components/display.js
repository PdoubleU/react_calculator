/*it takes two properties from controlPanel: currentValue and result.
Its role is to display them in specific area of calculator*/
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
