/* eslint-disable array-callback-return */
import React from 'react';
import Display from './display';
import Keyboard from './keyboard';
import keyList from './keys';
import calculate from './mechanic';
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

getValue(e){
    this.state.keyList.map((element, index, newArr )=>{
        if((e.keyCode===107||e.keyCode===106||e.keyCode===111||e.keyCode===109)
            &&e.keyCode===newArr[index].keyCode&&this.state.operator===' ') {
            this.setState({
                operator: newArr[index].keyTrigger,
                previousValue: this.state.currentValue,
                currentValue: ' ',
                result:' '
            })
        } else if ((e.keyCode===107||e.keyCode===106||e.keyCode===111||e.keyCode===109)
        &&e.keyCode===newArr[index].keyCode&&this.state.operator!==' '){
            this.setState({
                result: calculate(  parseFloat(this.state.previousValue),
                                    parseFloat(this.state.currentValue),
                                    this.state.operator),
                        })
            this.setState({
                operator: newArr[index].keyTrigger,
                previousValue: this.state.result,
                currentValue: ' '
            })
        }
        else if (e.keyCode===newArr[index].keyCode&&e.keyCode===110){
            this.setState({
                currentValue: 0 + newArr[index].keyTrigger
            })
        }
        else if (e.keyCode===46&&e.keyCode===newArr[index].keyCode){
            this.setState({
                currentValue: ' ', previousValue: ' ', operator: ' ', result: ' '
            })
        }
        else if (e.keyCode===newArr[index].keyCode&&e.keyCode!==13){
            this.setState({
                currentValue: this.state.currentValue.concat(newArr[index].keyTrigger)
            })
        } else if (e.keyCode===13&&e.keyCode===newArr[index].keyCode){
            this.setState({
                result: calculate(  parseFloat(this.state.previousValue),
                                    parseFloat(this.state.currentValue),
                                    this.state.operator),
                        })
            this.setState({
                currentValue: this.state.result
            })
            }
    });
}
componentDidMount() {
    document.addEventListener('keydown', this.getValue);
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
                    previousValue={this.state.previousValue}
                    result={this.state.result}/>
        </div>
        )
    }
}

export default Control;