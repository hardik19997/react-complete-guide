import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person.js'
import Radium,{ StyleRoot } from 'radium';


class App extends Component{
  /*state is internal word */
  state ={
    persons:[
      {id:1,name:'Max',age:29},
      {id:2,name:'Manu',age:29},
      {id:3,name:'Stephanie',age:26}
    ],
    showPersons:false
  }

//    switchNameHandler=(newName)=>{
//     this.setState({
//         persons:
//         [
//           {name:newName,age:28},
//           {name:"Manu",age:29},
//           {name:"Stephanie",age:27}
//         ]
//     });
//    }

  deletePersonHandler=(personIndex)=>{
    // const persons=this.state.persons;
    const persons=[...this.state.persons];
    persons.splice(personIndex,1)
    this.setState({persons:persons})
  }
/*event object is automatically passed by each handler to each handler method */
   nameChangeHandler=(event,id)=>{
    const personIndex=this.state.persons.findIndex(p=> p.id===id)
    /*Fetech the person JS object mutuably from the state which is the list of person */
    const person={...this.state.persons[personIndex]}
    
    /*change the fetched object */
    person.name=event.target.value;

    /*now create new person list mutuably to update the state */
    const persons=[...this.state.persons]
    persons[personIndex]=person;
    this.setState({persons:persons})
   }

   togglePersonsHandler=(event)=>{
    const doesShow=this.state.showPersons;
    this.setState({showPersons:!doesShow});
   }

  render(){
    const style={
        backgroundColor:'green',
        color:"white",
        font:'inherit',
        border:'1px solid blue',
        padding:'8px',
        cursor:'pointer',
        ':hover':{
          backgroundColor:'lightgreen',
          color:'black'
        }
    };
    
    let persons=null;
    /*This if is Js code not JSX */
    if(this.state.showPersons){
        persons=(
        <div>      
            {
            this.state.persons.map((person,index) =>{
                return <Person key={person.id}
                click={()=>this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                changed={(event)=>this.nameChangeHandler(event,person.id)} />
             })}
        </div>)

        style.backgroundColor='red';
        style[':hover']={
          backgroundColor:'salmon',
          color:'black'
        }
    }

    let classes=[]
    if(this.state.persons.length<=2){
      classes.push('red')
    }
    if(this.state.persons.length<=1){
      classes.push('bold')
    }
    return (
      <StyleRoot>
        <div className="App">
        <h1>Hi,i am a react app</h1>
        <p className={classes.join(' ')}>This is really working</p>
        <button
              style={style} 
              onClick={this.togglePersonsHandler}>Toggle Person</button>
          {persons}
        </div>
      </StyleRoot>
    );
    }
}

export default Radium(App);
/*
How do pass argument to an change handler or to a function which is passed as reference to the child component?
Ans: we have to use bind.We have passed Max as an argument(preferred method)
    {this.switchNameHandler.bind(this,"Max!")}

    Alternative way of doing the same thing is to convert the {this.switchNameHandler}--> to and arrow function This arrow function will return the refernce to the switchNameHandler function with the apporiate argument in passed in.
    {()=>this.switchNameHandler('Maximillion!!')} we have created an anonymous arrow function.This anonymous arrow function will be executed on a click and will return switchNameHandler('Maximillion') as result of its execution.This way of passing argument is a bit inefficient

const style={
          backgroundColor:..
      }
This const is used for inline styling of the button.Please note that all the css property names like background-color have JS counterparts .In there Js counterparts the name are same but are written in camel case eg backgroundColor.Also the css property values are given as strings
<button
        style={style}<--- this is how you give inline styling 
        onClick={()=>this.switchNameHandler('Maximillion!!')}>Switch Name</button> 

{this.state.showPersons=== true<div>Show this div</div>:null}<-- This way we have used a ternary expression for emulating if construct.
This type of construct might get confusing in case of lot of conditions There is an alternative to this.When react has to render something ie in case of an update in the component it calls the entire render method again.The alternate way is to use if() and then put up whatever jsx code you want in variable then display that varible as dynamic content at the place you want.This is done above


OUTPUTING OF LIST DYNAMICALLY
 {
            this.state.persons.map((person,index) =>{
                return <Person
                click={()=>this.deletePersonHandler(index)}
                name={person.name}
                age={person.age} />

 })} The map function automatically populates the index argument so that we can interact with indiviual elements of the list.
 persons.splice(personIndex,1) <-- removes elements from the array persons starting from personIndex and number of element to be remove is mention as the second argument
 deletePersonHandler=(personIndex)=>{
    const persons=this.state.persons;
    persons.splice(personIndex,1)
    this.setState({persons:persons})
  }This method deletes the person when we click on the paragraph of that person.There is a problem with this method.Thing is that we know that persons is an array and arrays are reference type and we are manupulating the state mutably this is not recommended we should create a deep copy of this state and then make changes to that copy and then set the state again.
  Use const person=[...this.state.persons] <-- this is spread operatorat use.
  Please Note:
        When ever we put up a list via tha map function we need to add a key attribute to jsx component to which the array is being mapped this is to support internal working of react.By the use of virtual dom react tries to pin point which components and have change and requires update and for a list by providing the key attribute this proces become more efficent.If we don't provide a key to the list it will always rerender the entire list but when we provide a key attr only the element which has changed will be rerendered.Please note that when ever the list changes the index will also change so index is not a good key


Inside the map function in the person tag we have added this as an attr:-
  changed={(event)=>this.nameChangeHandler(event,person.id)} />
What does this mean is that when in the child element the input text box is changed then ()=> will be called first and method that is called first on a event recieves an event argument and as a result we have specified arrow function to recieved the event argument and then it has passed this event argument to the nameChangedHandler Along with the id of the person element of the list

Limitations of inline styles:
  1.We cannot use pesudo selectors like hover.If we create seprate css file for these pesudo selectors like button:hover.Then the css will apply to all the buttons not the button we want it to apply to.
  2.We cannot use media quries.

We have to install radium a React package that allows us to use pesudo selectors and media quries in inline way.
export default Radium(App); <-- Radium here is a higher order component.It is a component wraping App component injecting some extra functionality.
  ':hover':{
          backgroundColor:'lightgreen',
          color:'black'
        }This is how we add a pesudo selector to a inline style. 

Please note that wrapping the export with radium is enough for pesudo selectors but for transforming selectors like media queries or keyframe animation you need to wrap the application in special component provided by radium called  StyleRoot.We have done this in App.js
 */

