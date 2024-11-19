export default function Question({ question, answer, dispatch }) {
  const hasAnswer = answer !== null;

  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((o, i) => {
          return (
            <button
              disabled={hasAnswer}
              onClick={() => dispatch({ type: 'newAnswer', payload: i })}
              key={o}
              className={`btn btn-option ${i === answer ? 'answer' : ''} ${hasAnswer ? (i === question.correctOption ? 'correct' : 'wrong') : ''}`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}
