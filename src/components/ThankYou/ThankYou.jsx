import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ThankYou.scss';

function ThankYou() {
    const navigate = useNavigate();

    const handleRetakeQuiz = () => {
        localStorage.removeItem('quizAnswers');
        localStorage.removeItem('quizEmail');
        navigate('/');
    };

    const handleDownloadAnswers = () => {
        const answers = JSON.parse(localStorage.getItem('quizAnswers')) || {};
        const email = localStorage.getItem('quizEmail');

        let csvContent = "order,title,type,answer\n";
        Object.entries(answers).forEach(([questionId, answer]) => {
            csvContent += `${questionId},Question ${questionId},single-select,${answer}\n`;
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", `quiz_answers_${email}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="thank-you">
            <h2>Thank you for completing the quiz!</h2>
            <p>Your answers have been recorded.</p>
            <div className="button-container">
                <button onClick={handleRetakeQuiz}>Retake quiz</button>
                <button onClick={handleDownloadAnswers}>Download my answers</button>
            </div>
        </div>
    );
}

export default ThankYou;