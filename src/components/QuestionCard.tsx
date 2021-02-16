import React, { FC ,MouseEvent} from 'react'
import {answerObject  } from "../App";
import { ButtonWrapper,Wrapper } from "./QuestionCard.styles";
type Props={
    question:string,
    answers:string [],
    callback:(e: MouseEvent<HTMLButtonElement>)=>void,
    userAnswer:answerObject | undefined,
    questionNr:number,
    totalQuestions:number;
}
const QuestionCard :FC<Props>=({question,answers,callback,userAnswer,questionNr,totalQuestions})=>(

<Wrapper>
    <p className="number">
        Question:{questionNr} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML = {{__html:question}} />
    <div>
  
    {answers.map(answer=>(
        <ButtonWrapper
        key={answer}
        correct={userAnswer?.correctAnswer === answer}
        userClicked={userAnswer?.answer === answer}>
      
        <button disabled={!!userAnswer} onClick={callback} value={answer}> 
                <span dangerouslySetInnerHTML={{__html:answer}}></span>
            </button>
            </ButtonWrapper>
       ))}
      </div>
</Wrapper>

)
export default QuestionCard;