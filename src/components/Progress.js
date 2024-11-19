export default function Progress({answer, index, maxPoints, points, questionsLength}) {
    return (
        <header className="progress">
            <progress max={questionsLength} value={index + +(answer !== null)}></progress>
            <p>Question <strong>{index}</strong> / {questionsLength}</p>
            <p><strong>{points}</strong> / {maxPoints}</p>
        </header>
    )
}
