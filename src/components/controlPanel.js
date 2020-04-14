/* eslint-disable array-callback-return */
import React from 'react';
import Display from './display';
import Keyboard from './keyboard';
import KEYLIST from './keys';
//import calculate from './mechanic';
class Control extends React.Component{
    constructor(props){
        super(props);
        this.initialState = {
            keyList: KEYLIST,
            currentValue: '0',
            lastType: '',
            prevButton: '',
            result: ''
        }
    this.state = this.initialState;
    this.getValue = this.getValue.bind(this);
    }
componentDidMount() {
    document.addEventListener('click', this.getValue)
}
    getValue(e){
        const ISBUTTON = new RegExp(/[0-9]|\+|-|\/|x|^a|\.|=/gi);
        const ISOPERATOR = new RegExp(/\+|-|\/|x/);
        const NODEVAL = e.target.value;
    if(ISBUTTON.test(NODEVAL)){
            if(NODEVAL==='.'&&this.state.prevButton!=='.') {                                /*this part checks if pressed button is a dot or previously pressed buton is dot*/
                let CURRENTNUMBER = this.state.currentValue.split(/\+|-|x|\//).slice(-1);   /*statement makes sure that there is just one dot in each part of eqation*/
                if(!/\./.test(CURRENTNUMBER[0])&&CURRENTNUMBER[0]!==''){                    /*if dot is detected statement do not allow to enter another dot*/
                    this.setState({
                        currentValue: this.state.currentValue + '.',
                        prevButton: NODEVAL
                        })} else if(!/\./.test(CURRENTNUMBER[0])){                          /*part works with dot button pressed on the very beggining and after operator as well*/
                            this.setState({currentValue: this.state.currentValue + '0.',prevButton: NODEVAL})
                        }                                                                   /*when the dot button is pressed and this is very first operation it puts zero in front*/

            }
            else if (NODEVAL!=='.'&&!/^A|=/.test(NODEVAL)&&!ISOPERATOR.test(NODEVAL)){      /*here if there is initial zero on the screen it will be replaced with enterend number*/
                if(this.state.currentValue==='0'){
                    this.setState({
                        currentValue: NODEVAL,
                        prevButton: NODEVAL
                    })                                                                      /*otherwise the number will be just added to existing string*/
                } else {this.setState({currentValue: this.state.currentValue + NODEVAL,prevButton: NODEVAL})};
            }
            else if (NODEVAL!=='.'&&!/^A/.test(NODEVAL)&&ISOPERATOR.test(NODEVAL)){         /*check if operator entered consecutively two or more times*/
                let checkIfNegative = this.state.currentValue.split('').slice(-2);
                console.log(checkIfNegative);                                               /*if yes, previus operator is replaced with new one*/
                if(ISOPERATOR.test(this.state.prevButton)){
                    let changeOperator = this.state.currentValue.split('');
                    changeOperator.splice([changeOperator.length-1],1, NODEVAL);
                    this.setState({currentValue: changeOperator.join(''),prevButton: NODEVAL});
                    console.log(this.state);
                } else if(checkIfNegative[0]==='-'
                        &&checkIfNegative[1]==='-'){
                                console.log('double minus');
                } else {this.setState({currentValue: this.state.currentValue + NODEVAL,prevButton: NODEVAL})}
            }
            else if (/^A/.test(NODEVAL)){                                                   /*restart screen and state to initial one - clear button*/
                this.setState(this.initialState)
            }
        }
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
            <Display currentValue={this.state.currentValue}
                result={this.state.result}/>
            <span className='keyPad'>{panel}</span>
        </div>
        )
    }
}

export default Control;