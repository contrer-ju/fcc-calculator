import React from "react";

const rowOne = [
  {
    keyId: "seven",
    title: "7",
    dataType: "number",
    classValue: "btn btn-primary",
  },
  {
    keyId: "eight",
    title: "8",
    dataType: "number",
    classValue: "btn btn-primary",
  },
  {
    keyId: "nine",
    title: "9",
    dataType: "number",
    classValue: "btn btn-primary",
  },
  {
    keyId: "divide",
    title: "/",
    dataType: "operator",
    classValue: "btn btn-warning",
  },
];

const rowTwo = [
  {
    keyId: "four",
    title: "4",
    dataType: "number",
    classValue: "btn btn-primary",
  },
  {
    keyId: "five",
    title: "5",
    dataType: "number",
    classValue: "btn btn-primary",
  },
  {
    keyId: "six",
    title: "6",
    dataType: "number",
    classValue: "btn btn-primary",
  },
  {
    keyId: "multiply",
    title: "x",
    dataType: "operator",
    classValue: "btn btn-warning",
  },
];

const rowThree = [
  {
    keyId: "one",
    title: "1",
    dataType: "number",
    classValue: "btn btn-primary",
  },
  {
    keyId: "two",
    title: "2",
    dataType: "number",
    classValue: "btn btn-primary",
  },
  {
    keyId: "three",
    title: "3",
    dataType: "number",
    classValue: "btn btn-primary",
  },
  {
    keyId: "subtract",
    title: "-",
    dataType: "operator",
    classValue: "btn btn-warning",
  },
];

const rowFour = [
  {
    keyId: "zero",
    title: "0",
    dataType: "number",
    classValue: "btn btn-primary",
  },
  {
    keyId: "decimal",
    title: ".",
    dataType: "decimal",
    classValue: "btn btn-primary",
  },
  {
    keyId: "equals",
    title: "=",
    dataType: "equals",
    classValue: "btn btn-info",
  },
  {
    keyId: "add",
    title: "+",
    dataType: "operator",
    classValue: "btn btn-warning",
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: "0",
      expressionValue: "0",
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.handleDisplay = this.handleDisplay.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
    document.addEventListener("click", this.handleClick);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
    document.removeEventListener("click", this.handleClick);
  }
  setDisplay(valueName) {
    if (valueName.length > 17) {
      this.setState({
        displayValue: "Digits Limit Reached",
      });
      setTimeout(() => this.clearDisplay(), 1000);
    } else {
      this.setState({
        displayValue: valueName,
      });
    }
  }
  setExpression(valueName) {
    if (valueName.length > 17) {
      this.setState({
        displayValue: "Digits Limit Reached",
      });
      setTimeout(() => this.clearDisplay(), 1000);
    } else {
      this.setState({
        expressionValue: valueName,
      });
    }
  }
  clearDisplay() {
    this.setState({
      displayValue: "0",
      expressionValue: "0",
    });
  }
  handleDisplay(value) {
    const displayShow = document.getElementById(value);

    if (displayShow !== null) {
      const typeKey = displayShow.getAttribute("data-type");
      const titleKey = displayShow.getAttribute("title");
      const equalsInExpressionShow = this.state.expressionValue.indexOf("=");
      const decimalInDisplayShow = this.state.displayValue.indexOf(".");

      if (typeKey === "clear") {
        this.clearDisplay();
      }

      if (typeKey === "back") {
        if (this.state.expressionValue !== "0" && equalsInExpressionShow < 0) {
          let tempExpression = this.state.expressionValue.slice(0, -1);
          if (tempExpression.length === 0) tempExpression = "0";
          this.setExpression(tempExpression);
        }
        if (this.state.displayValue !== "0" && equalsInExpressionShow < 0) {
          let tempDisplay = this.state.displayValue.slice(0, -1);
          if (tempDisplay.length === 0) tempDisplay = "0";
          this.setDisplay(tempDisplay);
        }
        if (equalsInExpressionShow > 0) {
          this.clearDisplay();
        }
      }

      if (typeKey === "number") {
        if (this.state.expressionValue !== "0" && equalsInExpressionShow > 0) {
          this.setExpression(displayShow.getAttribute("title"));
          this.setDisplay(displayShow.getAttribute("title"));
        }
        if (this.state.expressionValue !== "0" && equalsInExpressionShow < 0) {
          this.setExpression(
            this.state.expressionValue + displayShow.getAttribute("title")
          );
        }
        if (this.state.expressionValue === "0") {
          this.setExpression(displayShow.getAttribute("title"));
        }
        if (
          this.state.displayValue === "0" ||
          this.state.displayValue === "+" ||
          this.state.displayValue === "-" ||
          this.state.displayValue === "x" ||
          this.state.displayValue === "/"
        ) {
          this.setDisplay(displayShow.getAttribute("title"));
        } else {
          if (equalsInExpressionShow < 0) {
            this.setDisplay(
              this.state.displayValue + displayShow.getAttribute("title")
            );
          }
        }
      }

      if (typeKey === "operator" && equalsInExpressionShow > 0) {
        this.setExpression(
          this.state.displayValue + displayShow.getAttribute("title")
        );
        this.setDisplay(displayShow.getAttribute("title"));
      }

      if (typeKey === "operator" && equalsInExpressionShow < 0) {
        const lastCharacterInDisplayShow = this.state.expressionValue.slice(-1);
        const beforeLastCharacterInDisplayShow =
          this.state.expressionValue.slice(-2)[0];

        if (
          (lastCharacterInDisplayShow === "+" ||
            lastCharacterInDisplayShow === "x" ||
            lastCharacterInDisplayShow === "/") &&
          (titleKey === "+" || titleKey === "x" || titleKey === "/")
        ) {
          const valueWithoutOperatorInDisplayShow =
            this.state.expressionValue.slice(0, -1);
          this.setExpression(
            valueWithoutOperatorInDisplayShow +
              displayShow.getAttribute("title")
          );
        }
        if (
          (lastCharacterInDisplayShow === "+" ||
            lastCharacterInDisplayShow === "x" ||
            lastCharacterInDisplayShow === "/") &&
          titleKey === "-"
        ) {
          this.setExpression(
            this.state.expressionValue + displayShow.getAttribute("title")
          );
        }
        if (
          lastCharacterInDisplayShow === "-" &&
          titleKey === "-" &&
          (beforeLastCharacterInDisplayShow === "1" ||
            beforeLastCharacterInDisplayShow === "2" ||
            beforeLastCharacterInDisplayShow === "3" ||
            beforeLastCharacterInDisplayShow === "4" ||
            beforeLastCharacterInDisplayShow === "5" ||
            beforeLastCharacterInDisplayShow === "6" ||
            beforeLastCharacterInDisplayShow === "7" ||
            beforeLastCharacterInDisplayShow === "8" ||
            beforeLastCharacterInDisplayShow === "9" ||
            beforeLastCharacterInDisplayShow === "0" ||
            beforeLastCharacterInDisplayShow === ".")
        ) {
          this.setExpression(
            this.state.expressionValue + displayShow.getAttribute("title")
          );
        }
        if (
          lastCharacterInDisplayShow === "-" &&
          (titleKey === "+" || titleKey === "x" || titleKey === "/")
        ) {
          if (
            beforeLastCharacterInDisplayShow === "+" ||
            beforeLastCharacterInDisplayShow === "/" ||
            beforeLastCharacterInDisplayShow === "x"
          ) {
            const valueWithoutOperatorInDisplayShow =
              this.state.expressionValue.slice(0, -2);
            this.setExpression(
              valueWithoutOperatorInDisplayShow +
                displayShow.getAttribute("title")
            );
          } else {
            const valueWithoutOperatorInDisplayShow =
              this.state.expressionValue.slice(0, -1);
            this.setExpression(
              valueWithoutOperatorInDisplayShow +
                displayShow.getAttribute("title")
            );
          }
        }
        if (
          lastCharacterInDisplayShow === "1" ||
          lastCharacterInDisplayShow === "2" ||
          lastCharacterInDisplayShow === "3" ||
          lastCharacterInDisplayShow === "4" ||
          lastCharacterInDisplayShow === "5" ||
          lastCharacterInDisplayShow === "6" ||
          lastCharacterInDisplayShow === "7" ||
          lastCharacterInDisplayShow === "8" ||
          lastCharacterInDisplayShow === "9" ||
          lastCharacterInDisplayShow === "0" ||
          lastCharacterInDisplayShow === "."
        ) {
          this.setExpression(
            this.state.expressionValue + displayShow.getAttribute("title")
          );
        }
        this.setDisplay(displayShow.getAttribute("title"));
      }

      if (typeKey === "decimal" && equalsInExpressionShow > 0) {
        this.setExpression("0" + displayShow.getAttribute("title"));
        this.setDisplay("0" + displayShow.getAttribute("title"));
      }

      if (
        typeKey === "decimal" &&
        decimalInDisplayShow < 0 &&
        equalsInExpressionShow < 0
      ) {
        const lastCharacterInDisplayShow = this.state.expressionValue.slice(-1);
        if (
          lastCharacterInDisplayShow === "+" ||
          lastCharacterInDisplayShow === "-" ||
          lastCharacterInDisplayShow === "x" ||
          lastCharacterInDisplayShow === "/"
        ) {
          this.setExpression(
            this.state.expressionValue + "0" + displayShow.getAttribute("title")
          );
        } else {
          this.setExpression(
            this.state.expressionValue + displayShow.getAttribute("title")
          );
        }

        if (this.state.expressionValue === "0") {
          this.setExpression("0" + displayShow.getAttribute("title"));
        }

        if (
          this.state.displayValue === "0" ||
          this.state.displayValue === "+" ||
          this.state.displayValue === "-" ||
          this.state.displayValue === "x" ||
          this.state.displayValue === "/"
        ) {
          this.setDisplay("0" + displayShow.getAttribute("title"));
        } else {
          this.setDisplay(
            this.state.displayValue + displayShow.getAttribute("title")
          );
        }
      }

      if (typeKey === "equals" && equalsInExpressionShow < 0) {
        if (
          this.state.expressionValue.slice(-1) === "+" ||
          this.state.expressionValue.slice(-1) === "-" ||
          this.state.expressionValue.slice(-1) === "x" ||
          this.state.expressionValue.slice(-1) === "/"
        ) {
          let secureExpressionValue = "";
          for (let i = 0; i < this.state.expressionValue.length - 1; i++) {
            secureExpressionValue =
              secureExpressionValue + this.state.expressionValue[i];
          }
          this.setExpression(secureExpressionValue);
        }
        const expressionString = eval(
          this.state.expressionValue.replace("x", "*").replace("--", "+")
        ).toString(10);
        let result = "";
        if (expressionString.length > 12) {
          for (let i = 0; i < 13; i++) result = result + expressionString[i];
        } else {
          result = expressionString;
        }
        this.setDisplay(result);
        this.setExpression(this.state.expressionValue + "=" + result);
      }
    }
  }
  handleKeyPress(event) {
    rowOne.map((element) =>
      element.title === event.key ? this.handleDisplay(element.keyId) : null
    );
    rowTwo.map((element) =>
      element.title === event.key ? this.handleDisplay(element.keyId) : null
    );
    rowThree.map((element) =>
      element.title === event.key ? this.handleDisplay(element.keyId) : null
    );
    rowFour.map((element) =>
      element.title === event.key ? this.handleDisplay(element.keyId) : null
    );
  }
  handleClick(event) {
    this.handleDisplay(event.target.id);
  }
  render() {
    return (
      <Calculator
        displayValue={this.state.displayValue}
        expressionValue={this.state.expressionValue}
      />
    );
  }
}

const Calculator = function (props) {
  return (
    <div
      id="calculator"
      className="d-flex justify-content-center align-items-center h-100"
      style={{ backgroundColor: "gray" }}
    >
      <div
        style={{ padding: "40px", backgroundColor: "black" }}
        className="d-flex flex-column justify-content-between align-items-end border border-5 border-warning"
      >
        <div
          id="expressionDisplay"
          style={{
            height: "20px",
            width: "195px",
            margin: "auto",
            padding: "5px",
            backgroundColor: "black",
            textAlign: "right",
            lineHeight: "20px",
            color: "orange",
            fontSize: "14px",
            borderLeft: "solid white",
            borderRight: "solid white",
            borderTop: "solid white",
            zIndex: "5",
          }}
        >
          {props.expressionValue}
        </div>
        <div
          id="display"
          style={{
            height: "30px",
            width: "195px",
            margin: "auto",
            padding: "3px",
            backgroundColor: "black",
            textAlign: "right",
            lineHeight: "30px",
            color: "lime",
            fontSize: "18px",
            borderLeft: "solid white",
            borderRight: "solid white",
            borderBottom: "solid white",
          }}
        >
          {props.displayValue}
        </div>
        <div style={{ padding: "15px", backgroundColor: "black" }}></div>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <KeyPad
            id="clear"
            value="AC"
            title="clear"
            dataType="clear"
            classValue="btn btn-danger"
          />
          <KeyPad
            id="back"
            value="&#8592;"
            title="back"
            dataType="back"
            classValue="btn btn-danger"
          />
        </div>
        <TablePad />
      </div>
    </div>
  );
};

const TablePad = function (props) {
  return (
    <div id="pad" className="btn-group btn-group-lg">
      <table>
        <tbody>
          <tr>
            {rowOne.map((element) => (
              <th key={element.keyId}>
                <KeyPad
                  id={element.keyId}
                  value={element.title}
                  title={element.title}
                  dataType={element.dataType}
                  classValue={element.classValue}
                />
              </th>
            ))}
          </tr>
          <tr>
            {rowTwo.map((element) => (
              <th key={element.keyId}>
                <KeyPad
                  id={element.keyId}
                  value={element.title}
                  title={element.title}
                  dataType={element.dataType}
                  classValue={element.classValue}
                />
              </th>
            ))}
          </tr>
          <tr>
            {rowThree.map((element) => (
              <th key={element.keyId}>
                <KeyPad
                  id={element.keyId}
                  value={element.title}
                  title={element.title}
                  dataType={element.dataType}
                  classValue={element.classValue}
                />
              </th>
            ))}
          </tr>
          <tr>
            {rowFour.map((element) => (
              <th key={element.keyId}>
                <KeyPad
                  id={element.keyId}
                  value={element.title}
                  title={element.title}
                  dataType={element.dataType}
                  classValue={element.classValue}
                />
              </th>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const KeyPad = function (props) {
  return (
    <span
      className={props.classValue}
      style={{ width: "40px", padding: "12px", margin: "3px" }}
      id={props.id}
      title={props.title}
      data-type={props.dataType}
    >
      {props.value}
    </span>
  );
};

export default App;
