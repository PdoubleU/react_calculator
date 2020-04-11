/* eslint-disable array-callback-return */
import React from 'react';
import Display from './display';
import Keyboard from './keyboard';
import keyList from './keys';

class Control extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            keyList: keyList,
            currentValue: ' ',
            previousValue: ' ',
            operator: ' '
        }
    this.getValue = this.getValue.bind(this);
    }

componentDidMount() {
    document.addEventListener('keydown', this.getValue);
    }

getValue(e){
    this.state.keyList.map((element, index, newArr ) => {
        if(e.keyCode===107 && e.keyCode===newArr[index].keyCode) {
            this.setState({
                operator: newArr[index].keyTrigger
            })
        } 
        /*else if (e.keyCode===newArr[index].keyCode){
            this.setState({
                currentValue: 0 + newArr[index].keyTrigger
            })
            console.log(this.state.currentValue);
        } 
        else if (e.keyCode===46){
            this.setState({
                currentValue: ' ', previousValue: ' ', operator: ' '
            })
        } 
        else if (e.keyCode===newArr[index].keyCode){
            this.setState({
                currentValue: this.state.currentValue.concat(newArr[index].keyTrigger)
            })
             console.log(this.state.currentValue);
        } */

    });
}
    render(){
        let panel;
        panel = this.state.keyList.map((obj, i, panelArr)=>{
            return (
            <Keyboard id={panelArr[i].keyTrigger}
                    keyCode={panelArr[i].keyCode}
                    key={panelArr[i].id}
                    onClick={this.getValue}
                    />
            )
        });
        return(
        <div className='keypad'>
            {panel}
            <Display    currentValue={this.state.currentValue} 
                    operator={this.state.operator} 
                    previousValue={this.state.previousValue}/>
        </div>
        )
    }
}

export default Control;