import React from 'react';
import styled from "styled-components";

class quiz extends React.Component {
    constructor(props){
     super(props);
     this.state = {
       q:[
           ["France","Paris"],
           ["Japan","Tokyo"],
           ["Madagascar","Antananarivo"],
           ["Malta", "Valetta"],
           ["the UK","London"],
           ["the Republic of Ireland","Dublin"],
         ],
       counter: 0
     }
      this.incrementCounter = this.incrementCounter.bind(this);
   }
   incrementCounter() {
     var newCounter = this.state.counter + 1;
     this.setState({counter:newCounter})
   }
   render (){
     return (
      <Wrapper to ="quiz-section">
        <div className='form-group'>
         <h1>Simple Quiz </h1>
         <span>Correct answers: {this.state.counter} / {this.state.q.length}</span>
         {this.state.q.map((qa,index)=> {
           const counter = index+1;
           return <Quiz incrementCounter = {this.incrementCounter} counter={this.state.counter} question={counter+". What is the capital of "+this.state.q[index][0]+"?"} answer={this.state.q[index][1]}/>
         })}
       </div>
      </Wrapper>
       
     )
   }
 }
 
 class Quiz extends React.Component {
   constructor(props){
     super(props);
     this.state = {
       userAnswer: "Your answer",
       isDisabled: "",
       className: "normal",
       buttonValue: "Check answer"
     }
     this.checkAnswer = this.checkAnswer.bind(this);
     this.typeAnswer = this.typeAnswer.bind(this);
   }
   typeAnswer(e) {
     this.setState({userAnswer:e.target.value});
   }
   checkAnswer (e) {
     e.preventDefault();
     var isCorrect = this.state.userAnswer.toLowerCase().trim() === this.props.answer.toLowerCase().trim() ? true : false;
     if (isCorrect) {
       this.props.incrementCounter();
       this.setState({isDisabled:"disabled"});
       this.setState({className:"correct animated rubberBand"});
       this.setState({buttonValue:"Correct answer!"});
     } else {
       this.setState({className:"incorrect animated shake"});
       this.setState({userAnswer:"Try again"});
     }
   }
   render (){
     return (
       <form onSubmit={this.checkAnswer} className="set">
         <div className="form-group">
           <label for="q">{this.props.question} <br/>
             <input name="q" 
               className={classNames(this.state.className)} 
               value={this.state.userAnswer} 
               onChange={this.typeAnswer}
               disabled = {(this.state.isDisabled)? "disabled" : ""}/>
           </label>
         </div> 
         <input type="submit" 
           value={this.state.buttonValue} 
           disabled = {(this.state.isDisabled)? "disabled" : ""} />
         
       </form>
       
     );
   }
 }
 
const Wrapper = styled.section`
display: center;
justify-content: space-between;
margin-top: 5rem;
margin-left: 50rem;
margin-right: 50rem;


.form-group{
    dispaly: flex;
    border:1px solid;
    
}
.correct {
    border-radius:50%;
    border-color:green;
    
  }
  .incorrect {
    border-color:red;
  }
  .set {
    margin-top:2rem;
  }
  `
export default quiz
