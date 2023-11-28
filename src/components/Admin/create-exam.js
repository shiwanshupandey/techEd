import React, { Component } from 'react';
import axios from 'axios';

class CreateExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      selectedProduct: '',
      questions: [
        {
          question: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          answer: '',
        },
      ],
      successMessage: '',
      errorMessage: '',
      time: 0, // Add the time field to state
    };
    this.addQuestion = this.addQuestion.bind(this);
  this.removeQuestion = this.removeQuestion.bind(this);
  this.handleQuestionChange = this.handleQuestionChange.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
  }
  

  addQuestion = () => {

    this.setState((prevState) => ({
      questions: [
        ...prevState.questions,
        {
          question: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          answer: '',
        },
      ],
      errorMessage: '',
    }));
  };

  removeQuestion = (index) => {
    this.setState((prevState) => {
      const questions = [...prevState.questions];
      questions.splice(index, 1);
      return { questions };
    });
  };

  handleQuestionChange = (e, index) => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      const questions = [...prevState.questions];
      if (name === "answer") {
        
        questions[index].answer = value;
      } else {
        questions[index][name] = value;
      }
      return { questions };
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const examData = {
      product: this.state.selectedProduct,
      questions: this.state.questions,
      time: this.state.time,
    };
    console.log(examData);


    axios
  .post('http://localhost:5000/exam', examData) // Use examData
  .then((res) => {
    this.setState({
      successMessage: 'Exam created successfully!',
      errorMessage: '',
      time: '',
      product: '',
      questions: [],
    });
  })
  .catch((error) => {
    this.setState({
      errorMessage: 'Error creating exam. Please check your data and try again.',
      successMessage: '',
    });
    console.error(error);
  });

  };

  componentDidMount() {
    axios
      .get('http://localhost:5000/teacher') 
      .then((res) => {
        const productsData = res.data;
        if (Array.isArray(productsData)) { // Check if it's an array
          const product = productsData.flatMap((product) => product.products);
          this.setState({ product });
        }
        else {
          // If the API response is not an array, initialize product as an empty array
          this.setState({ product: [] });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <div className="containe">
        <h3>Create New Exam Log</h3>
        {this.state.errorMessage && (
          <div className="alert alert-danger">{this.state.errorMessage}</div>
        )}
        {this.state.successMessage && (
          <div className="alert alert-success">{this.state.successMessage}</div>
        )}
        <form onSubmit={this.onSubmit}>
        <div className="random-mb-5">
  <label for="name" className="random-form-label">Select a Product:</label>
  <select
    required
    className="random-form-input"
    value={this.state.selectedProduct}
    onChange={(e) => this.setState({ selectedProduct: e.target.value })}
  >
    <option value="">Select a product</option>
    {Array.isArray(this.state.product) &&
      this.state.product.map((product, index) => (
        <option key={index} value={product._id}>
          {product.name}
        </option>
      ))}
  </select>
</div>

<div className="random-mb-5">
  <label for="name" className="random-form-label">Time (in minutes):</label>
  <input
    type="number"
    required
    className="random-form-input"
    name="time"
    value={this.state.time}
    onChange={(e) => this.setState({ time: e.target.value })}
  />
</div>


          {this.state.questions.map((question, index) => (
            <div key={index}>
              <div className="random-mb-5">
                <label for="name" className="random-form-label">Question:</label>
                <input
                  type="text"
                  required
                  className="random-form-input"
                  name="question"
                  value={question.question}
                  onChange={(e) => this.handleQuestionChange(e, index)}
                />
              </div>
              <div className="random-mb-5">
                <label for="name" className="random-form-label">Option 1:</label>
                <input
                  type="text"
                  required
                  className="random-form-input"
                  name="option1"
                  value={question.option1}
                  onChange={(e) => this.handleQuestionChange(e, index)}
                />
              </div>
              <div className="random-mb-5">
                <label for="name" className="random-form-label">Option 2:</label>
                <input
                  type="text"
                  required
                  className="random-form-input"
                  name="option2"
                  value={question.option2}
                  onChange={(e) => this.handleQuestionChange(e, index)}
                />
              </div>
              <div className="random-mb-5">
                <label for="name" className="random-form-label">Option 3:</label>
                <input
                  type="text"
                  required
                  className="random-form-input"
                  name="option3"
                  value={question.option3}
                  onChange={(e) => this.handleQuestionChange(e, index)}
                />
              </div>
              <div className="random-mb-5">
                <label for="name" className="random-form-label">Option 4:</label>
                <input
                  type="text"
                  required
                  className="random-form-input"
                  name="option4"
                  value={question.option4}
                  onChange={(e) => this.handleQuestionChange(e, index)}
                />
              </div>
              <div className="random-mb-5">
                <label for="name" className="random-form-label">Answer:</label>
                <select
    required
    className="random-form-input"
    value={question.answer} 
    onChange={(e) => this.handleQuestionChange(e, index)}
    name="answer"
  >
    <option value="">Select an answer</option>
    <option value={question.option1}>Option 1</option>
    <option value={question.option2}>Option 2</option>
    <option value={question.option3}>Option 3</option>
    <option value={question.option4}>Option 4</option>
  </select>
              </div>
              <div className="random-mb-5">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => this.removeQuestion(index)}
                >
                  Remove Question
                </button>
              </div>
            </div>
          ))}
          

          <div className="random-mb-5">
            <button
              type="button"
              className="btn btn-success"
              onClick={this.addQuestion}
            >
              Add Question
            </button>
          </div>
          <div className="random-mb-5">
            <input type="submit" value="Create Exam Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateExam;

