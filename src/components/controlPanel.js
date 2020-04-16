import React from 'react';
import Display from './display';
import Keyboard from './keyboard';
import KEYLIST from './keys';
import calculate from './mechanic';
class Control extends React.Component{
    constructor(props){
        super(props);
        this.initialState = {
            keyList: KEYLIST,
            currentValue: '0',
            previusValue: '',
            prevButton: '',
            result: '0'
        }
    this.state = this.initialState;
    this.getValue = this.getValue.bind(this);
    }
componentDidMount() {
    document.addEventListener('click', this.getValue)
}
getValue(e){
    const ISBUTTON = new RegExp(/[0-9]|\+|-|\/|x|^a|\.|=/gi);
    const ISNUMBER = new RegExp(/[0-9]/);
    const ISOPERATOR = new RegExp(/\+|-|\/|x/);
    const NODEVAL = e.target.value;
    if (/^A/.test(NODEVAL)){                                                                        /*restart screen and state to initial one - clear button*/
        this.setState(this.initialState)
    } else if(ISBUTTON.test(NODEVAL)&&this.state.result.length<=14&&this.state.result!=='LIMIT REACHED'){

            if(NODEVAL==='.'&&this.state.prevButton!=='.') {                                        /*this part checks if pressed button is a dot or previously pressed buton is dot*/
                let CURRENTNUMBER = this.state.currentValue.split(/\+|-|x|\//).slice(-1);           /*statement makes sure that there is just one dot in each part of eqation*/
                if(!/\./.test(CURRENTNUMBER[0])&&CURRENTNUMBER[0]!==''){                            /*if dot is detected statement do not allow to enter another dot*/
                    this.setState({
                        currentValue: this.state.currentValue + '.',
                        prevButton: NODEVAL,
                        result: this.state.result + '.'
                        })
                }
                else if(!/\./.test(CURRENTNUMBER[0])){                                              /*part works with dot button pressed on the very beggining and after operator as well*/
                        this.setState({currentValue: this.state.currentValue + '0.',prevButton: NODEVAL, result: '0.'})
                }                                                                                   /*when the dot button is pressed and this is very first operation it puts zero in front*/
            }

            else if (NODEVAL!=='.'&&ISNUMBER.test(NODEVAL)){                                        /*here if there is initial zero on the screen it will be replaced with enterend number*/
                if(this.state.currentValue==='0'){
                    this.setState({
                        currentValue: NODEVAL,
                        prevButton: NODEVAL,
                        result: NODEVAL
                    })                                                                              /*otherwise the number will be just added to existing string*/
                } else if(ISOPERATOR.test(this.state.result)&&!/^-/.test(this.state.currentValue)){
                    this.setState({currentValue: this.state.currentValue + NODEVAL,prevButton: NODEVAL, result: NODEVAL})
                } else {this.setState({currentValue: this.state.currentValue + NODEVAL,prevButton: NODEVAL, result: this.state.result + NODEVAL})}
            }

            else if (ISOPERATOR.test(NODEVAL)&&this.state.currentValue!=='0'&&this.state.currentValue!=='-'
                    &&this.state.currentValue!=='0.'){                                              /*check if operator entered consecutively two or more times*/
                let checkLastThreeElements = this.state.currentValue.split('').slice(-3);           /*if yes, previus operator is replaced with new one*/
                if(ISOPERATOR.test(this.state.prevButton)){
                    let changeOperator = this.state.currentValue.split('');
                    changeOperator.splice([changeOperator.length-1],1, NODEVAL);
                    this.setState({currentValue: changeOperator.join(''),prevButton: NODEVAL, result: NODEVAL});
                }
                else if((checkLastThreeElements[1]==='-'&&checkLastThreeElements[2]==='-')
                        ||(ISOPERATOR.test(checkLastThreeElements[1])&&checkLastThreeElements[2]==='-')){/*if we have used already two minuses, this part breaks if statement*/
                }
                else if(this.state.prevButton!=='-'){                                               /*it returns nothing(breaks the if statement in case of: add, multiply or divide operator was used and we have minus as well as last operator)*/
                    this.setState({currentValue: this.state.currentValue + NODEVAL,prevButton: NODEVAL, result: NODEVAL})
                }
                else if(this.state.prevButton==='-'&&NODEVAL==='-'){
                    this.setState({currentValue: this.state.currentValue + NODEVAL,prevButton: NODEVAL})
                }
            }

            else if(NODEVAL==='-'&&this.state.currentValue==='0'){
                this.setState({
                    currentValue: NODEVAL,
                    prevButton: NODEVAL,
                    result: '-'
                })
            }

            else if(NODEVAL==='='){
                // eslint-disable-next-line array-callback-return
                const ARRAY = this.state.currentValue.match(/(\/|\+|-|x*){2}?([0-9]*\.?[0-9]*)?/ig).filter((el)=>{if(el!==' ') return el});
                var result = ARRAY.reduce((acc, current) => {
                    if(/^(\/|\+|-|x){2}/.test(current)){
                        const OPERATOR = current.slice(0,1);
                        const NUMBER = parseFloat(current.slice(1,));
                        return calculate(parseFloat(acc), OPERATOR, NUMBER);
                    } else {
                        const OPERATOR = current.slice(0,1);
                        const NUMBER = parseFloat(current.slice(1,));
                        return calculate(parseFloat(acc), OPERATOR, NUMBER);
                    }
                });
                this.setState({currentValue: result.toString(), result: result.toString(), prevButton: '='})
        }
    } else {this.setState({result: 'LIMIT REACHED'})}
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