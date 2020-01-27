import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person.js'
    


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
        backgroundColor:'white',
        font:'inherit',
        border:'1px solid blue',
        padding:'8px',
        cursor:'pointer'
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
    }

    return (
      <div className="App">
       <h1>Hi,i am a react app</h1>
       <button
            style={style} 
            onClick={this.togglePersonsHandler}>Toggle Person</button>
        {persons}
      </div>
    );
    }
}

export default App;
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
 */

