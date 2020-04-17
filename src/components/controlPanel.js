/*this component handle with onclick event on particular button.
More details are explaind near appropriate part of code*/
import React from 'react';
import Display from './display';
import Keyboard from './keyboard';
import KEYLIST from './keys';
import calculate from './mechanic';
class Control extends React.Component{
    constructor(props){
        super(props);
        this.initialState = {                 /*initial state is set to use it after pressing 'clear' button as well as on load aplication*/
            keyList: KEYLIST,
            currentValue: '0',
            prevButton: '',
            result: '0'
        }
    this.state = this.initialState;
    this.getValue = this.getValue.bind(this);
    }
componentDidMount() {
    document.addEventListener('click', this.getValue)
}
getValue(e){                        /*function is responsible for recognizing which button was pressed in the application*/
    const ISBUTTON = new RegExp(/[0-9]|\+|-|\/|x|^a|\.|=/gi);/*||*/
    const ISNUMBER = new RegExp(/[0-9]/);                    /*bunch of REGEXP used many times in following if statements. It makes the code cleaner*/
    const ISOPERATOR = new RegExp(/\+|-|\/|x/);              /*||*/
    const NODEVAL = e.target.value;                          /*||*/
    const RESULT = this.state.result;                        /*constans used many times in following if statements. Prepare to make code more redable*/
    const CURRENTVAL = this.state.currentValue;              /*||*/
    const PREVBUTTON = this.state.prevButton;                /*||*/
    if (/^A/.test(NODEVAL)){this.setState(this.initialState) /*restart screen and state to initial one - clear button*/
    } else if(ISBUTTON.test(NODEVAL)&&RESULT.length<=14&&RESULT!=='LIMIT REACHED'){

            if(NODEVAL==='.'&&PREVBUTTON!=='.') {                                                   /*this part checks if pressed button is a dot or previously pressed buton is dot*/
                let CURRENTNUMBER = CURRENTVAL.split(/\+|-|x|\//).slice(-1);                        /*statement makes sure that there is just one dot in each part of eqation*/
                if(!/\./.test(CURRENTNUMBER[0])&&CURRENTNUMBER[0]!==''){                            /*if dot is detected statement do not allow to enter another dot*/
                    this.setState({currentValue: CURRENTVAL + '.', prevButton: NODEVAL,result: RESULT + '.'})
                }
                else if(!/\./.test(CURRENTNUMBER[0])){                                              /*part works with dot button pressed on the very beggining and after operator as well*/
                        this.setState({currentValue: CURRENTVAL + '0.', prevButton: NODEVAL, result: '0.'})
                }                                                                                   /*when the dot button is pressed and this is very first operation it puts zero in front*/
            }

            else if (NODEVAL!=='.'&&ISNUMBER.test(NODEVAL)){                                        /*here if there is initial zero on the screen it will be replaced with enterend number*/
                if(CURRENTVAL==='0'){
                    this.setState({currentValue: NODEVAL, prevButton: NODEVAL, result: NODEVAL})
                }
                else if(ISOPERATOR.test(RESULT)&&!/^-/.test(CURRENTVAL)){                           /*it checks if result has already any operator - if yes, it change it with new one*/
                    this.setState({currentValue: CURRENTVAL + NODEVAL,prevButton: NODEVAL, result: NODEVAL})
                }
                else {this.setState({currentValue: CURRENTVAL + NODEVAL,prevButton: NODEVAL, result: RESULT + NODEVAL})} /*otherwise the number will be just added to existing string*/
            }

            else if (ISOPERATOR.test(NODEVAL)&&CURRENTVAL!=='0'&&CURRENTVAL!=='-'&&CURRENTVAL!=='0.'){       /*check if operator entered consecutively two or more times*/
                let checkLastThreeElements = CURRENTVAL.split('').slice(-3);
                let changeOperator = CURRENTVAL.split('');                                                   /*if yes, previus operator is replaced with new one*/
                if(ISOPERATOR.test(PREVBUTTON)&&NODEVAL!=='-'&&PREVBUTTON!=='-'){
                    changeOperator.splice([changeOperator.length-1],1, NODEVAL);
                    this.setState({currentValue: changeOperator.join(''),prevButton: NODEVAL, result: NODEVAL});
                }
                else if((checkLastThreeElements[1]==='-'&&checkLastThreeElements[2]==='-')){                  /*if we have used already two minuses, this part breaks if statement*/
                }
                else if(ISOPERATOR.test(checkLastThreeElements[1])&&checkLastThreeElements[2]==='-'){           /*it changes last two operators in case of using the third operator - it leaves the last used operator in equation */
                    changeOperator.splice([changeOperator.length-2],2, NODEVAL);
                    this.setState({currentValue: changeOperator.join(''),prevButton: NODEVAL, result: NODEVAL})
                }
                else if(PREVBUTTON!=='-'){
                    this.setState({currentValue: CURRENTVAL + NODEVAL,prevButton: NODEVAL, result: NODEVAL})
                }
                else if(PREVBUTTON==='-'&&NODEVAL==='-'){
                    this.setState({currentValue: CURRENTVAL + NODEVAL,prevButton: NODEVAL})
                }
            }

            else if(NODEVAL==='-'&&CURRENTVAL==='0'){                                            /*when minus pressed on the very begining it remove initial zero and put minus instead */
                this.setState({currentValue: NODEVAL, prevButton: NODEVAL, result: '-'})
            }

            else if(NODEVAL==='='){                                            /*evaluate equation - is using function importet from mechanic.js */
                // eslint-disable-next-line array-callback-return
                const ARRAY = CURRENTVAL.match(/(\/|\+|-|x*){2}?([0-9]*\.?[0-9]*)?/ig).filter((el)=>{if(el!==' ') return el});  /*gives an array of numbers, decimal numbers and operators together like: ['-1','/2','+333',...] */
                var result = ARRAY.reduce((acc, current) => {                   /*map prepared array to recognize correctly negative numbers and positive numbers */
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
                this.setState({currentValue: result.toString(), result: result.toString(), prevButton: '='}) /*return as a result new state with result of equation which is ready for next operations */
        }
    } else if(ISBUTTON.test(NODEVAL)||ISNUMBER.test(NODEVAL)) {this.setState({result: 'LIMIT REACHED'})} /*when we reach limit od 14 digits in result screen this message will appear */
}

render(){
    let panel = this.state.keyList.map((obj, i, panelArr)=>{    /*create keyboard consisting all keys from imported KEYLIST */
        return (
        <Keyboard id={panelArr[i].id}
            keyTrigger={panelArr[i].keyTrigger}
            key={panelArr[i].id}
            onClick={this.getValue}
            />
        )
    });
    return(               /*return display to which are passed properties.Return variable 'panel' */
        <div className='calculator'>
            <Display currentValue={this.state.currentValue}
            result={this.state.result}/>
            <span className='keyPad'>{panel}</span>
        </div>
        )
    }
}

export default Control;