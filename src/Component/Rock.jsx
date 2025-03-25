import React, { useState } from 'react';

const choices = [
    { name: 'Rock', emoji: '🗿' },
    { name: 'Paper', emoji: '📄' },
    { name: 'Scissors', emoji: '✂' }
];

const getRandomChoice = () => choices[Math.floor(Math.random() * choices.length)];

const determineWinner = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) return "It's a Draw!";
    if (
        (userChoice === 'Rock' && computerChoice === 'Scissors') ||
        (userChoice === 'Paper' && computerChoice === 'Rock') ||
        (userChoice === 'Scissors' && computerChoice === 'Paper')
    ) {
        return 'You Win!';
    }
    return 'Computer Wins!';
};

const RockPaperScissors = () => {
    const [userChoice, setUserChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState('');
    const [score, setScore] = useState({ user: 0, computer: 0, draws: 0 });
    const [isComputing, setIsComputing] = useState(false);

    const handleUserChoice = (choice) => {
        setUserChoice(choice);
        setIsComputing(true);
        setTimeout(() => {
            const computerPick = getRandomChoice();
            setComputerChoice(computerPick);
            const winner = determineWinner(choice.name, computerPick.name);
            setResult(winner);

            setScore((prevScore) => ({
                user: winner === 'You Win!' ? prevScore.user + 1 : prevScore.user,
                computer: winner === 'Computer Wins!' ? prevScore.computer + 1 : prevScore.computer,
                draws: winner === "It's a Draw!" ? prevScore.draws + 1 : prevScore.draws,
            }));
            setIsComputing(false);
        }, 150);
    };

    return (
        <div className="container">
            <h1>Rock, Paper, Scissors</h1>
            <div className="buttons">
                {choices.map((choice) => (
                    <button key={choice.name} onClick={() => handleUserChoice(choice)}>
                        {choice.emoji} {choice.name}
                    </button>
                ))}
            </div>
            {userChoice && (
                <div className="result">
                    <p>You chose: <strong>{userChoice.emoji} {userChoice.name}</strong></p>
                    <p>Computer is choosing...</p>
                    {isComputing ? <p className="loading">🤖...</p> : (
                        <p>Computer chose: <strong>{computerChoice.emoji} {computerChoice.name}</strong></p>
                    )}
                    {!isComputing && <p className="winner">{result}</p>}
                </div>
            )}
            <div className="scoreboard">
                <h2>Scoreboard</h2>
                <p>You: {score.user}</p>
                <p>Computer: {score.computer}</p>
                <p>Draws: {score.draws}</p>
            </div>
        </div>
    );
};

export default RockPaperScissors;
