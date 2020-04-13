/* eslint-disable array-callback-return */
import React from 'react';
import Display from './display';
import Keyboard from './keyboard';
import KEYLIST from './keys';
import calculate from './mechanic';
class Control extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            keyList: KEYLIST,
            currentValue: '',
            secondValue: '',
            operator: ''
        }
    this.getValue = this.getValue.bind(this);
    }
componentDidMount() {
    document.addEventListener('click', this.getValue);
}
getValue(e){
    const nodeVal = e.target.firstChild.nodeValue;
    const ISOPERATOR = new RegExp(/\+|-|\/|x/i);
    const ISEQUALIZATOR = new RegExp(/=/);
    const ISDECIMAL = new RegExp(/\./g);
    const ISCLEAR = new RegExp(/a/ig);
    const ISNUMBER = new RegExp(/[0-9]/);
    this.state.keyList.map((element, index, newArr )=>{
        if(ISOPERATOR.test(nodeVal)&&nodeVal===newArr[index].keyTrigger){
            console.log('isOperator');
            this.setState({
                operator: newArr[index].keyTrigger,
                result:''
            })
        } else if ((ISEQUALIZATOR.test(nodeVal)&&nodeVal===newArr[index].keyTrigger)
                    ||(ISOPERATOR.test(this.state.operator)&&ISOPERATOR.test(nodeVal)&&nodeVal===newArr[index].keyTrigger)){
            console.log('isEqu');
            this.setState({
                result: calculate(  parseFloat(this.state.currentValue),
                                    parseFloat(this.state.secondValue),
                                    this.state.operator),
                        })
            this.setState({
                operator: newArr[index].keyTrigger,
                secondValue: '',
                currentValue: this.state.result
            })
        }
        else if (ISDECIMAL.test(nodeVal)&&nodeVal===newArr[index].keyTrigger&&!ISDECIMAL.test(this.state.currentValue)){
            console.log('isDEcimal');
            this.setState({
                currentValue: '0' + nodeVal
            })
        }
        else if (ISCLEAR.test(nodeVal)&&nodeVal===newArr[index].keyTrigger){
            console.log('isClear');
            this.setState({
                currentValue: '', secondValue: '', operator: '', result: ''
            })
        }
        else if (ISNUMBER.test(nodeVal)
                &&nodeVal===String(newArr[index].keyTrigger)
                &&nodeVal!==this.state.currentValue
                &&!ISOPERATOR.test(this.state.operator)){
                console.log(this.state.operator+' empty');
            this.setState({
                currentValue: this.state.currentValue.concat(newArr[index].keyTrigger)
            })
        }
        else if (ISNUMBER.test(nodeVal)
                &&nodeVal===String(newArr[index].keyTrigger)
                &&nodeVal!==this.state.secondValue
                &&ISOPERATOR.test(this.state.operator)){
                    console.log('message from secondVal');
            this.setState({
                secondValue: this.state.secondValue.concat(newArr[index].keyTrigger)
            })
    }
    });
}
    render(){
        let panel;
        panel = this.state.keyList.map((obj, i, panelArr)=>{
            return (
            <Keyboard id={panelArr[i].id}
                keyTrigger={panelArr[i].keyTrigger}
                key={panelArr[i].id}
                onClick={this.getValue}
                />
            )
        });
        return(
        <div className='calculator'>
            <Display currentValue={this.state.currentValue+this.state.operator+this.state.secondValue}
                result={this.state.result}/>
            <span className='keyPad'>{panel}</span>
        </div>
        )
    }
}

export default Control;