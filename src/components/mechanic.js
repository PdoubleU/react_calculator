function calculate(numOne, operator, numTwo){
    let result;
    Math.decimal = function(n, k) {
        let factor = Math.pow(10, k+1);
        n = Math.round(Math.round(n*factor)/10);
        return n/(factor/10);
    }
    switch(operator){
      case '+':
      result = Math.decimal(numOne + numTwo,4);
      break;
      case '-':
      result = Math.decimal(numOne - numTwo,4);
      break;
      case 'x':
      result = Math.decimal(numOne * numTwo,4);
      break;
      case '/':
      result = Math.decimal(numOne / numTwo,4);
      break;
      default:
      result = null;
    }
    return result;
}

export default calculate;