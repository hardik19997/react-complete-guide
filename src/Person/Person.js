import React from 'react'
import './Person.css'

const person=(props)=>{
return(
    <div className="Person">
        <p onClick={props.click}>I am {props.name} and I am {props.age} years old</p>
        <p>{props.children}</p>
        {/* we have a 2 way binding changes are propaged upto parent component which changes state
        and also when these changes happen these changes to the input field will change the state in the parent component and these changes are then propagated back to child component and displayed as {props.name}*/}
        <input type="text" onChange={props.changed} value={props.name}/>
    </div>
) 
};

export default person;
/*
Note:-
     for the funtional component the function name can be lower case.File name should have upper case first character
Functional component are also called stateless components.
Note:-
    If we have some dynamic content like JS code in our jsx code we need to wrap it in {}.

By deafaut React JS passes a argument in functional component and you can give it any name eg props here and this agrument will have all the properties of this component and properties means the attributes. These props are used in js component to get some values from outside of the component.
Note:-
    When using props in class component always use this.props

How do you handle Props which as passed as the child of the component?
Ans:-These props are called children props and can be access by props.children.There children can be any HTML content anything!!

If want to have some information inside the component and change from the inside then you have to use State.You can define state only in class components.
It is a good practice to create as many as stateless components as possible.

When you need to use a method of the parent element you can PASS THE METHOD AS REFERENCE FROM THE PARENT as a  property of the child element.YOU CAN PASS DOWN CHANGE HANDLER TO CHANGE THE STATE OF PARENT COMPONENT THIS IS ALLOWED BECAUSE SOMETIME YOU WANT TO CHANGE THE STATE OF ELEMENT FORM ITS CHILD ELEMENT AND CHILD ELMENT SHOULD NOT HAVE DIRECT ACCESS TO THAT STATE 

2 WAY BINDING 
always always when you have you have to set the value of a input field you can use value=some_code but in addition to this you should always provide a onChange handler for that input tag otherwise you will be struck with the value forever
Webpack is our bundler will not pack the css with this js file rather it will pack it with the index.html file
*/