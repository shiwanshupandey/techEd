import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import styled from "styled-components";
import useUserData from '../userData';



const MCQExam = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(new Array(questions.length).fill(null));
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [examCompleted, setExamCompleted] = useState(false);
  const [examStarted, setExamStarted] = useState(false); 
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [examId, setExamId] = useState(0);
  const [score, setScore] = useState(0);
  const userData = useUserData();
  const userId = userData?._id;


  const { _id } = useParams();

  const startExam = () => {
    setExamStarted(true);
  };

  const submitExam = () => {
    setExamCompleted(true);
    sendExamResult();
  };


  useEffect(() => {
    axios.get(`http://localhost:5000/exam`)
      .then(response => {
        const data = response.data;
        const selectedProduct = data.find(product => product.product._id === _id);
        console.log(selectedProduct);

        if (selectedProduct) {

          const selectedQuestions = selectedProduct.questions;
          const selectedId = selectedProduct._id;
          const time = selectedProduct.time;
          
          setTimeLeft(time * 60);
          setQuestions(selectedQuestions);
          setExamId(selectedId);
        } else {
          console.warn('Product not found with ID:', _id);
        }
      })
      .catch(error => {
        console.error('Failed to fetch questions:', error);
      });

      
  }, [_id]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0 && !examCompleted) {
        setTimeLeft(prevTime => prevTime - 1);
      } else {
        clearInterval(timer);
        setExamCompleted(true);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft, examCompleted]);

  const sendExamResult = () => {
    const resultData = {
      score: score,
      exam: examId,
      user: userId
    };

    axios.post('http://localhost:5000/result', resultData)
      .then(response => {
        console.log('Exam result sent successfully:', response.data);
        // Optionally, you can perform any action after successfully sending the result
      })
      .catch(error => {
        console.error('Failed to send exam result:', error);
        // Optionally, you can handle errors here
      });
  };

  const handleOptionChange = (value) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[currentQuestionIndex] = value;
      return newOptions;
    });

    setAnsweredQuestions((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: value,
    }));

    // Check if the selected option is correct and update the score
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer;

    if (value === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const nextQuestion = () => {
    if (selectedOption === null) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }
    } else {
      // If an option is selected, proceed as before
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedOption(null);
      }
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const nextButtonText = selectedOption ? 'Next' : 'Skip';

  return (
    <Wrapper>
      {!examStarted && ( 
        <>
          <TermsContent>
            <h2>Terms and Conditions</h2>
            <p>Here are the terms and conditions...</p>
            <StartButton onClick={startExam}>Start Exam</StartButton>
          </TermsContent>
        </>
      )}
  
      {examStarted && questions && questions.length > 0 && !examCompleted && (
        <ExamContainer>
          <h1 className="title">MCQ Exam</h1>
          <Timer>
            Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </Timer>
          <QuestionSection>
            <h3>{questions[currentQuestionIndex].question}</h3>
            <OptionsForm>
          {Object.keys(questions[currentQuestionIndex]).map((key) => {
            if (key.includes('option')) {
              return (
                <Option
                  key={key}
                  onClick={() => handleOptionChange(questions[currentQuestionIndex][key])}
                  selected={selectedOptions[currentQuestionIndex] === questions[currentQuestionIndex][key]}
                >
                  {questions[currentQuestionIndex][key]}
                </Option>
              );
            }
            return null;
          })}
        </OptionsForm>
            <div>
              <PreviousButton onClick={previousQuestion}>Previous</PreviousButton>
              <NextButton onClick={currentQuestionIndex < questions.length - 1 ? nextQuestion : submitExam}>
              {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit Exam'}
            </NextButton>
            </div>
          </QuestionSection>
          
          <QuestionList>
  <ul>
    {questions.map((question, index) => (
      <li
        key={index}
        onClick={() => setCurrentQuestionIndex(index)}
        className={currentQuestionIndex === index ? 'current' : ''}
      >
        {index + 1}
      </li>
    ))}
  </ul>
</QuestionList>

        </ExamContainer>
      )}
      
      {examCompleted && (
        <CompletedText>
          Exam Completed! Your Score: {score} out of {questions.length}
        </CompletedText>
      )}


    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

`;

const QuestionList = styled.div`
  margin-top: 20px;
  h2 {
    margin-bottom: 10px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 0;
    list-style: none
  }
  li {
    flex: 0 0 calc(20% - 10px); /* Five questions in a row */
    padding: 8px;
    margin-bottom: 5px;
    background: #f5f5f5;
    cursor: pointer;
    border-radius: 5px;
    transition: background 0.3s ease;
    &:hover {
      background: #e0e0e0;
    }
  }
  li.current {
    background: #007bff;
    color: #fff;
    &:hover {
      background: #0056b3;
    }
  }
`;



const StartButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
`;

const ExamContainer = styled.div`
  width: 700px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Timer = styled.p`
  text-align: right;
  margin-bottom: 15px;
`;

const QuestionSection = styled.div`
  margin-bottom: 20px;
`;

const OptionsForm = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Option = styled.div`
  margin-bottom: 10px;
  cursor: pointer;
  padding: 8px;
  border-radius: 5px;
  background-color: ${(props) => (props.selected ? '#007bff' : 'transparent')};
  color: ${(props) => (props.selected ? '#fff' : '#000')};
  border: 2px solid ${(props) => (props.selected ? '#007bff' : 'transparent')};
`;


const NextButton = styled.button`
  margin-top: 20px;
  background-color: #007bff;
  color: #fff;
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const PreviousButton = styled.button`
  margin-top: 20px;
  background-color: #777777;
  color: #fff;
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 30px;
`;

const CompletedText = styled.p`
  text-align: center;
  font-size: 24px;
  color: green;
`;

const TermsPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 40px; /* Increased padding for larger size */
  border: 1px solid #ccc;
  border-radius: 10px; /* Adjust border radius for a softer look */
`;


const TermsContent = styled.div`
  text-align: center;
`;

export default MCQExam;



