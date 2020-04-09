import React from 'react';
import Display from './display';
import Keyboard from './keyboard';
import keyList from './keys';

class Control extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            keyList: keyList
        }
    }
    render(){
        let panel;
        panel = this.state.keyList.map((obj, i, panelArr)=>{
            return (
                <Keyboard id={panelArr[i].keyTrigger}
                          keyCode={panelArr[i].keyCode}
                          />
            )
        });
        return(
        <div className='keypad'>
            {panel}
            <Display/>
        </div>
        )
    }
}

export default Control;