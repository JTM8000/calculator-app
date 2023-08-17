import { useState } from 'react'
import './App.css'

function App() {
  const [answer, setAnswer] = useState("");
  const [ expression, setExpression] = useState("");
  //remove spaces in expression
  const et = expression.trim();

  const isOperator = (symbol: string) => {
    return /[*/+-]/.test(symbol);
  };

  const buttonPress = (symbol: string) => {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } else if (symbol === "negative") {
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    } else if (symbol === "percent") {
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());
    } else if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      // seperate by operators and get last number
      //express split starts with - first
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      console.log("lastNumber :>> ", lastNumber);
      // if last number already has a decimal, don't include another number
      if (lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      // if first #=0, replace with symbol
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        //otherwise add to end
        setExpression(expression + symbol);
      }
    }
  };

  const calculate = () => {
// if last char = operator, do nothing
    if (isOperator(et.charAt(et.length - 1))) return;
//ignore multiple expressions back-to-back 
    const parts = et.split(" ");
    const newParts = [];
/* 
ignore multiple expressions back-to-back 
*/
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression) as string);
    } else {
      setAnswer(eval(newExpression) as string);
    }
    setExpression("");
  };

  return (
    <>
      <div className="container" id="calculator-app">
        <div id="calculator">
        <h1 id ="calc-app">Calculator</h1>
          <div id="display" style={{textAlign:"right"}}>
            <div id="answer">{answer}</div>
            <div id="expression">{expression}</div>
          </div>
          <button id = "clear" onClick= {() => buttonPress("clear")} className="white">AC</button>
          <button id = "negative" onClick= {() => buttonPress("negative")} className="white">+/-</button>
          <button id = "percentage" onClick= {() => buttonPress("percentage")} className="white">%</button>
          <button id = "divide" onClick= {() => buttonPress("/")} className="yellow">/</button>
          <button id = "seven" onClick= {() => buttonPress("7")} className="light-grey">7</button>
          <button id = "eight" onClick= {() => buttonPress("8")} className="light-grey">8</button>
          <button id = "nine" onClick= {() => buttonPress("9")} className="light-grey">9</button>
          <button id = "multiply" onClick= {() => buttonPress("*")} className="yellow">*</button>
          <button id = "four" onClick= {() => buttonPress("4")} className="light-grey">4</button>
          <button id = "five" onClick= {() => buttonPress("5")} className="light-grey">5</button>
          <button id = "six" onClick= {() => buttonPress("6")} className="light-grey">6</button>
          <button id = "subtract" onClick= {() => buttonPress("-")} className="yellow">-</button>
          <button id = "one" onClick= {() => buttonPress("1")} className="light-grey">1</button>
          <button id = "two" onClick= {() => buttonPress("2")} className="light-grey">2</button>
          <button id = "three" onClick= {() => buttonPress("3")} className="light-grey">3</button>
          <button id = "add" onClick= {() => buttonPress("+")} className="yellow">+</button>
          <button id = "zero" onClick= {() => buttonPress("0")} className="light-grey">0</button>
          <button id = "decimal" onClick= {() => buttonPress(".")} className="light-grey">.</button>
          <button id = "equals" onClick= {() => buttonPress("=")} className="yellow">=</button>
        </div>
      </div>
    </>
  )
}

export default App
