/*
 * ------------------------------------------------
 * Arrow Functions
 * ------------------------------------------------
 * Content:
 * A. Convert Functions into Arrow Functions so
 * they have a more concise synthax
 * Types of functions with examples:
 *  1. Functions with Parameters
 *  2. Single Parameter Arrow Functions
 *  3. Implicit Return
 *  4. Anomymous Arrow Functions
 * B. Arrow Functions Redefine the 'this' Keyword
 * Inside of Them as Opposed to Normal Functions
 * Examples with classes:
 * Example 1
 * Example 2
 * Example 3-a
 * Example 3-b
 * ------------------------------------------------
 */

/*
 * A. Convert Functions into Arrow Functions
 */

/*
 * 1. Functions with Parameters
 */

function sum(a, b) {
  return a + b;
}

// Arrow version
let sum2 = (a, b) => {
  return a + b;
}

// Arrow version
// Whatever goes from the arrow, is going
// to be returned from the function
// E.g.: the result of a + b
let sum3 = (a, b) => a + b;

/*
 * 2. Single Parameter Arrow Functions
 */

function isPositive(number) {
  return number >= 0;
}

// Arrow version
let isPositive2 = (number) => {
  return number >= 0;
}

// Arrow version
let isPositive3 = (number) => number >= 0;

// Arrow version
// Because the f has only one parameter
// we can actually completely remove these
// parenthesis.
// 'number' is still the parameter. Everything
// after it will ne returned since there is no
// curly braces afterwars, inside of the
// function argument
let isPositive4 = number => number >= 0;

/*
 * 3. Implicit Return
 */

function randomNumber() {
  return Math.random;
}

// Arrow version
let randomNumber2 = () => Math.random;

/*
 * 4. Anomymous Arrow Functions
 * functions with no name
 */

document.addEventListener('click', function() {
  console.log('Click');
})

// Arrow version
// Remove the function keyword and put an arrow
document.addEventListener('click', () => {
  console.log('Click');
})

// Arrow version
// Put to one line
document.addEventListener('click', () => console.log('Click'));

/*
 * B. Arrow Functions Redefine the 'this' Keyword
 * Inside of Them as Opposed to Normal Functions
 */

/*
 * Example 1
 * In the instantiation, 'this' prints "undefined"
 * inside of the function. That is because 'this'
 * is different inside of a function, compared to
 * 'this' inside the arrow function.
 * In the function, it defines 'this' whether the
 * function is called. The function is called in
 * the instantiation so it has the same scope as
 * if it would be out, in the global scope.
 * In the arrow function, 'this' in the call is
 * the same 'this' inside of the "method". 'this'
 * actually does not get redefined.
 * More and more devs are using arrow function in
 * almost all cases because is more intuitive to
 * have 'this' be defined in the scope that you
 * call (it).
 *
 */

class Person {
  constructor(name) {
    this.name = name;
  }

  // using arrow (right!)
  printNameArrow() {
    setTimeout(() => {
      console.log('Arrow: ' + this.name)
    }, 100);
  }

  // using function (wrong!)
  printNameFunction () {
    setTimeout(function() {
      console.log('Function: ' + this.name)
    }, 100);
  }
}

let person = new Person('Bobby');

person.printNameArrow(); // Prints: Arrow: Bobby
person.printNameFunction(); //Prints: Function: undefined

//Printing the function "method" works the same as
// printing it here, like this:
console.log (person.this.name); // Prints: Function:

/*
 * Example 2
 * This is similar to the example 1, but in ReactJS,
 * and it has 'this' in the "properties" section
 * of a class, instead of in its methods
 * BTW, the class passes 'props' as argument in the
 * constructor, so it is an example of code using
 * React's lift state up
 *
 */

// A piece of code from a Class PostList using
// 'this' properties
import React, { Component } from 'react';

class PostDetail extends Component {
  constructor (props) {
    super(props);
    // A 'this' line like this can be removed
    // if we use arrow function in its method,
    // in this case the method 'titleWasClicked':
    // this.titleWasClicked = this.titleWasClicked.bind(this)
    this.toggleContent = this.toggleContent.bind(this);
    this.handleRemoveContentButton = this.handleRemoveContentButton.bind(this);
    this.state = {
      showContent: true,
      postItem: null
    };
  }

  handleRemoveContentButton (event) {
    if (this.props.didHandleRemove) {
      this.props.didHandleRemove(this.props.post)
    }
  }

  // Method/function titleWasClicked
  // Here, the event passed can be any
  // To replace this arrow function
  // with a regular function version
  // just change this line:
  // titleWasClicked = (event) {
  titleWasClicked = (event) => {
    event.preventDefault()
    const {dataCallback} = this.props
    // console.log(dataCallback)
    let newPostItem = this.props.post
    newPostItem['title'] = 'This is my awesome new title';
    this.setState({
      postItem: newPostItem
    })
    if (dataCallback !== undefined) {
      dataCallback(newPostItem)
    }
    //
  }
  // More class methods here ... 
}

/*
 * Example 3-a
 * File: App.js. The App is written as a class
 * instead of the classic function App.
 * This is a ReactJS code that changes the default
 * word "red" to "green", by using setState with
 * Arrow Function
 * Compare it to the regular function example
 *
 */

import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red'
    };
  }

  changeColor = () => {
    this.setState({
      color: 'green'
    });
  }

  render() {
    return(
      <div className='App'>
        <h3>{this.state.color}</h3>
        <button onClick={this.changeColor}></button>
      </div>
    );
  }
}

export default App;

/*
 * Example 3-b
 * File: App.js. The App is written as a class
 * instead of the classic function App.
 * This is a ReactJS code that changes the default
 * word "red" to "green", by using setState with
 * Regular Function
 * Compare it to the arrow function example
 * 
 */

import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red'
    };
    // Without arrow function binding is required
    // here in the "attributes" section
    this.changeColor = this.changeColor.bind(this);
  }

  /*
  changeColor = () => {
    this.setState({
      color: 'green'
    });
  }
  */

  // Regular functions require the bind method
  // in the constructor to work
  changeColor() {
    this.setState({
      color: 'green'
    });
  }

  render() {
    return(
      <div className='App'>
        <h3>{this.state.color}</h3>
        <button onClick={this.changeColor}></button>
      </div>
    );
  }
}

export default App;
