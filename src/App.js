import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium, { StyleRoot } from 'radium';

class App extends Component {
  // Only works in componets
  state = {
    persons: [
      { id:'gfdg767',name: 'Max', age: 28 },
      { id:'thhuj75',name: 'Manu', age: 29 },
      { id:'3ytytr',name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons:false
  };
 
   //console.log('Was Clicked');
    //Don't do this: this.state.persons[0].name= 'Mad Max';
    //Updates special state for a DOM
  switchNameHandler = (newName) => {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState({
      persons: [
        {  name: newName, age: 28 },
        {  name: 'Manu', age: 29 },
        {  name: 'Stephanie', age: 27 }
      ]
    });
  };
  //Note that reference to name,age,and click are properties which can be used pass to another
  //compentet that does not have access to the

  nameChangeHandler = (event,id) => {
    const personIndex = this.state.persons.findIndex(aperson => {
      return aperson.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };
    //updated person captured here !
    person.name = event.target.value;
    
    //Copy of old array 
    const persons = [...this.state.persons];

    // update one person in from old array
    persons[personIndex] = person;

    //access copy from old array with new value/person
    this.setState({persons: persons })
    
  }
  //In-line style example below

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons]
    persons.splice(personIndex,1);
    this.setState({persons:persons});
  }

  togglePersonHandler = () => {
     const doesShow = this.state.showPersons;
     this.setState({showPersons: !doesShow});

  }
  
    

  render() {
    const style = {
      background: 'Green',
      color: 'white',
      font: 'inherit',
      boarder: '1x solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover':{
        background: 'lightgreen',
        color: 'black'
      }
    };
    let persons = null;
    //Output content conditionally example below 

    if (this.state.showPersons) {
      persons = (
        <div>
        {this.state.persons.map((person, index) =>{
          return <Person 
          click = {() => this.deletePersonHandler(index)}
          name={person.name}
          age ={person.age}
          key = {person.id}
          changed = {(event) => this.nameChangeHandler(event, person.id)}
          />
        })}
        </div>
      );
      // setting stlyes dynamically (i.e change button color) example
      style.backgroundColor = 'red';
      //Note since hover is a string we use [':hover'] and assign the style properties when overwriting it
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      };  
    }
    //Manuel set Dynamic ClassName 
    //let setDynamicClassName = ['red', 'bold'].join(' ');
    
    //Add dynanic logic to setDynamicClassName
    let setDynamicClassName = [];
    if (this.state.persons.length <= 2){
      setDynamicClassName.push('red') // this means -> setDynamicClassName = ['red']
    }
    if (this.state.persons.length <= 1){
      setDynamicClassName.push('bold') // this means -> setDynamicClassName = ['red','bold']
    }
   
  
    return (
      <StyleRoot>
      <div className="App" >
        <h1>Hi, I'm a React App</h1>
        {/* setDynamicClassName -to- setDynamicClassName.join('') which incorporates logic when called  */}
        
          {/* 
           Shows to how add and assign dynamic classes. Note,logic will not work without an added space on join(' ') call
          Not this --> setDynamicClassName.join('')  
          But this --> setDynamicClassName.join(' ') *space
        */}  

        <p className= {setDynamicClassName.join( ' ' )}>This is really working!</p>

        <button 
        style={style}
        onClick={this.togglePersonHandler}>Toggle Persons</button>
        {persons}
      </div>
      </StyleRoot>
    );
    //Important methods: ()=>, Splice,slice, [...] 
    //State should be updated in a immutaable fashion -> create copy, change the state, then update the stare with change state 
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  //Same as above !
 //React.createElement('div',{className: 'App'}, React.createElement('h1',null,'Does this work now' ));
 // return React.createElement('div',{className: 'App'}, React.createElement('h1',null,'Does this work now' ));
  }
}

export default Radium(App);
