import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Timer from './Timer';
import Footer from './Footer';

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case 'newAnswer':
      const currentQuestion = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points: currentQuestion.correctOption === action.payload ? state.points + currentQuestion.points : state.points,
      };
    case 'tick':
      return {
        ...state,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
        secondsRemaining: state.secondsRemaining - 1,
      };
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore: state.points > state.highscore ? state.points : state.highscore,
      };
    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
      };
    default:
      throw new Error('Unknown action');
  }
}

export default function App() {
  const [{ questions, points, status, index, secondsRemaining, answer, highscore }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const questionsLength = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    fetch('http://localhost:9000/questions')
      .then(res => res.json())
      .then(data => {
        dispatch({ type: 'dataReceived', payload: data });
      })
      .catch(() => dispatch({ type: 'dataFailed' }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen dispatch={dispatch} questionsLength={questionsLength} />}
        {status === 'active' && (
          <>
            <Progress
              answer={answer}
              maxPoints={maxPoints}
              points={points}
              questionsLength={questionsLength}
              index={index}
            />
            <Question
              answer={answer}
              dispatch={dispatch}
              question={questions[index]}
              numQuestions={questionsLength}
              index={index}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton dispatch={dispatch} answer={answer} numQuestions={questionsLength} index={index} />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <FinishScreen maxPoints={maxPoints} points={points} highscore={highscore} dispatch={dispatch}></FinishScreen>
        )}
      </Main>
    </div>
  );
}
