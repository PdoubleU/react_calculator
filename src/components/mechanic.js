function calculate(numOne, numTwo, operator){
    var result;
    switch(operator){
      case '+': result = Math.decimal(numOne+numTwo,4);
      break;
      case '-': result = Math.decimal(numOne-numTwo,4);
      break;
      case '*': result = Math.decimal(numOne*numTwo,4);
      break;
      case '/': result = Math.decimal(numOne/numTwo,4);
      break;
      default: result = undefined;
    }
    return result;
}
Math.decimal = function(n, k)
{
    var factor = Math.pow(10, k+1);
    n = Math.round(Math.round(n*factor)/10);
    return n/(factor/10);
}

export default calculate;