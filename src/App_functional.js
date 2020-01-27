//useState <-- All the hooks start from use keyword.This useState allows us to manage state in functional components
import React, { useState } from 'react';
import './App.css';
/*You should give a name with uppercase first character to the component you have imported */
import Person from './Person/Person.js'

const app=props=>{
  /*useState returns an array with exactly 2 elements.First element is our current state.The second element will always be a function that allows us to update this state such that react is aware of it and will rerender the required components*/
  const [ personsState,setPersonsState ]=
  useState({
    persons:[
            {name:'Max',age:29},
            {name:'Manu',age:29},
            {name:'Stephanie',age:26}
             ],
    // otherState:"some other value"
  })

  /*we have created multilpe states slices and can manage then with different methods. */
  const [otherState,setOtherState]=useState('some other state')

  /*You can have a arrow function inside of a function. */
  const switchNameHandler=()=>{
    setPersonsState(
      {
        persons:
        [
          {name:"Maximilian",age:28},
          {name:"Manu",age:29},
          {name:"Stephanie",age:27}
        ],
        // otherState:personsState.otherState <-- manually added older state data
      }
    );
  }
    return (
      <div className="App">
       <h1>Hi,i am a react app</h1>
       <button onClick={switchNameHandler}>Switch Name</button>
       <Person name={personsState.persons[0].name} age={personsState.persons[0].age}/>
       <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>My Hobbies:Racing</Person>
       <Person name={personsState.persons[2].name} age={personsState.persons[2].age}/>
      </div>
    );
}

export default app;


  /*state is internal word */
  // state ={
  //   persons:[
  //     {name:'Max',age:29},
  //     {name:'Manu',age:29},
  //     {name:'Stephanie',age:26}
  //   ]
  // }




/*
Usually you could render multiple jsx tag or components using ReactDOM.render() but in pratice we render only the root component ie App component in our case to the div with id root

<div className="App">
       <h1>Hi,i am a react app</h1>
</div>
The jsx code written above is equivalent to :-

React.createElement('div',{className:'App'},
                      React.createElement('h1',null,'Hi,i am a react app'))

Babel will convert jsx into the above js code.(We have imported React for this purpose only for the conversion process).JSX must have only one root element
Class component are also called stateful component.
While props are passed from outside the state is managed from inside the component.You can also handle react state in functional component using react hooks.
This keyword refers to the class in ES6 sntax.

Note:-
  If the state changes(only works on state) it will lead react to rerender our DOM or update our DOM.
  Actually only changes in props and/or state tiggers the React to rerender you components and potentially update the DOM in the browser.
  Props:- props allows you to pass data from a parent(wraping) component to child component.

When you extend Components you will get setState method along with it.
HOW DO YOU CHANGE STATE IN FUNCTIONAL COMPONENT?
Ans:- We set state using REACT HOOKS in functional components. 
      We will convert this app class into functional component and manage state using react hooks.

REACT HOOKS :- Its basically just a collection of functions exposed to you by react which you can use in functinal components
Verry verry important observation.
  The function you get with react hooks to set State ie the useState method return an array with exactly 2 elements and 2nd element of this array is a method that allow us to setState with in that functional component.Now the imp observation is that this method DOES NOT MERGE THE STATE (LIKE setState METHOD IN CLASS COMPONENT DID) RATHER IS UPDATES THE STATE TO NEW STATE.SO WHEN U USED THIS METHOD PROVIDED BY useState method YOU HAVE TO MANUALLY ADD OLD STATE DATA TO PRESERVE IT 
  But instead of manually adding old state data what we can do is to have as many calls we want to the useState method.And we can have different method for changing different states slices which were generated by all the calls to the useState method.



Handler name is usaually given to functions that handle some event.
Always set state using setState method in Class components 
In functional component above setPersonState method has been provide to us via the useState method of react Hook to set state
Stateful component are also called smart component or smart components.In practice you wanna have a couple of stateful component.The idea is that you have way more presentational or stateless components.The component we have created above is stateful.
*/