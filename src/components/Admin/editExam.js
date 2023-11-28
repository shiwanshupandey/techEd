import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./allCourses.css";

function EditExam() {
  const { id } = useParams(); // Access route parameter 'id' using useParams
  const [exam, setExam] = useState({
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
    product: '',
    time: '', 
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/exam/${id}`)
      .then((res) => {
        const examData = res.data;
        setExam({
          questions: examData.questions,
          product: examData.product,
          time: examData.time,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const onChangeInput = (e, field, index) => {
    const updatedQuestions = [...exam.questions];
    updatedQuestions[index][field] = e.target.value;
    setExam({ ...exam, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setExam({
      ...exam,
      questions: [
        ...exam.questions,
        {
          question: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          answer: '',
        },
      ],
    });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...exam.questions];
    updatedQuestions.splice(index, 1);
    setExam({ ...exam, questions: updatedQuestions });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const isAnswerValid = exam.questions.every((question) =>
    [question.option1, question.option2, question.option3, question.option4].includes(question.answer)
  );

  if (!isAnswerValid) {
    setErrorMessage('Error: Answer for each question must be one of the provided options (option1, option2, option3, or option4).');
    setSuccessMessage('');
    return;
  }

    axios
      .put(`http://localhost:5000/exam/${id}`, exam)
      .then((res) => {
        setSuccessMessage('Exam updated successfully!');
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage('Error updating exam. Please check your data and try again.');
        setSuccessMessage('');
        console.error(error);
      });
  };

  return (
    <div className="containe">
      <h3>Edit Exam</h3>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={onSubmit}>
        <div className="random-mb-5">
          <label for="name" className="random-form-label">Product:</label>
          <input
            type="text"
            required
            className="random-form-input"
            value={exam.product._id}
            onChange={(e) => onChangeInput(e, 'product', 0)}
          />
        </div>
        <div className="random-mb-5">
  <label for="name" className="random-form-label">Time (in minutes):</label>
  <input
    type="number"
    required
    className="random-form-input"
    value={exam.time}
    onChange={(e) => setExam({ ...exam, time: e.target.value })}
  />
</div>

        {exam.questions.map((question, index) => (
          <div key={index}>
            <div className="random-mb-5">
              <label for="name" className="random-form-label">Question:</label>
              <input
                type="text"
                required
                className="random-form-input"
                value={question.question}
                onChange={(e) => onChangeInput(e, 'question', index)}
              />
            </div>
            <div className="random-mb-5">
              <label for="name" className="random-form-label">Option1:</label>
              <input
                type="text"
                required
                className="random-form-input"
                value={question.option1}
                onChange={(e) => onChangeInput(e, 'option1', index)}
              />
            </div>
            <div className="random-mb-5">
              <label for="name" className="random-form-label">Option2:</label>
              <input
                type="text"
                required
                className="random-form-input"
                value={question.option2}
                onChange={(e) => onChangeInput(e, 'option2', index)}
              />
            </div>
            <div className="random-mb-5">
              <label for="name" className="random-form-label">Option3:</label>
              <input
                type="text"
                required
                className="random-form-input"
                value={question.option3}
                onChange={(e) => onChangeInput(e, 'option3', index)}
              />
            </div>
            <div className="random-mb-5">
              <label for="name" className="random-form-label">Option4:</label>
              <input
                type="text"
                required
                className="random-form-input"
                value={question.option4}
                onChange={(e) => onChangeInput(e, 'option4', index)}
              />
            </div>
            <div className="random-mb-5">
  <label for="name" className="random-form-label">Answer:</label>
  <select
    required
    className="random-form-input"
    value={question.answer}
    onChange={(e) => onChangeInput(e, 'answer', index)}
  >
    <option value="">Select an answer</option>
    <option value={question.option1}>{question.option1}</option>
    <option value={question.option2}>{question.option2}</option>
    <option value={question.option3}>{question.option3}</option>
    <option value={question.option4}>{question.option4}</option>
  </select>
</div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removeQuestion(index)}
            >
              Remove Question
            </button>
          </div>
        ))}
        <br></br>
        <div className="random-mb-5">
          <button type="button" className="add-employeed-button" onClick={addQuestion}>
            Add Question
          </button>
        </div>
        <div className="random-mb-5">
          <input type="submit" value="Edit Exam" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default EditExam;
