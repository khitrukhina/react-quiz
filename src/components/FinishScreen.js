export default function FinishScreen({ points, maxPoints, highscore, dispatch }) {
  const percentage = (points / maxPoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">
        {' '}
        The highest score <strong>{highscore}</strong>
      </p>
      <button className="btn btn-ui" onClick={dispatch({ type: 'restart' })}>
        Restart quiz
      </button>
    </>
  );
}
