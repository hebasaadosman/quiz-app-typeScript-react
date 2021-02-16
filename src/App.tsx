import React,{MouseEvent,useState} from 'react';
import { BooleanLiteral } from 'typescript';
import { fetchQuizeQuestions,Difficulty,questionState } from "./API";
import QuestionCard from "./components/QuestionCard";
import { GlobalStyle,Wrapper } from "./App.styles";

export type answerObject={
  question:string;
  answer:string;
  correct:boolean;
  correctAnswer:string;
}
const TOTAL_QUSETIONS=10;
const App=() => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<questionState[]>([]);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setgameOver] = useState(true);
  const [userAnswers, setUserAnswers] = useState<answerObject[]>([]);
  const startQuiz=async()=>{
    setLoading(true);
    setgameOver(false);
    const newquestions=await fetchQuizeQuestions(TOTAL_QUSETIONS ,Difficulty.EASY)
    setQuestions(newquestions);
    console.log(questions)
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false)
  }
  
   const checkAnswer=async(e: MouseEvent<HTMLButtonElement>)=>{
    if(!gameOver){
      const answer=e.currentTarget.value;
      const correct=questions[number].correct_answer===answer;
      if(correct) setScore(prev=>prev + 1);
      const answerObject={
        question:questions[number].question,
        answer,
        correct,
        correctAnswer:questions[number].correct_answer
      };
      setUserAnswers((prev) => [...prev,answerObject])
    }
  }
  const nextQuestion=async()=>{
    const nextQues=number+1;
    if(nextQues === TOTAL_QUSETIONS)
    setgameOver(true);
    else 
    setNumber(nextQues);
  }
  return (
    <>
    <GlobalStyle/>
    <Wrapper>
    <h1> Quiz</h1>
   {gameOver || userAnswers.length === TOTAL_QUSETIONS ?
    <button className="start" onClick={startQuiz}> Start </button>:null}
    {!gameOver ? <p className="score">Your Score : {score}</p> :null}
    {loading ? <p>Loading Questions ....</p>:null}
  {!loading && !gameOver ? (<QuestionCard 

    question={questions[number].question}
    answers={questions[number].answers}
    callback={checkAnswer}
    userAnswer={userAnswers ? userAnswers[number]:undefined}
    questionNr={number + 1}
    totalQuestions={TOTAL_QUSETIONS}
    
    />):null}
    {!loading && !gameOver && userAnswers.length === (number + 1) && number !== (TOTAL_QUSETIONS -1) ? 
    <button className="next" onClick={nextQuestion}> Next </button> :null}
    </Wrapper>
    </>
  );
}

export default App;
