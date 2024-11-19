export default function StartScreen({questionsLength, dispatch}) {
    return (
        <div className="start">
            <h2>Welcome to the React Quiz!</h2>
            <h3>{questionsLength} questions to master your React skills!</h3>
            <button onClick={() => dispatch({type: 'start'})} className="btn btn-ui">Let's start!</button>
        </div>
    )
}
