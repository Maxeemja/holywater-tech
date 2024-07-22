import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar.jsx';
import './Quiz.scss';

// Mock questions (replace with actual questions later)
const questions = [
    {
        id: 1,
        type: 'single-select',
        title: {
            en: 'What is your favorite color?',
            fr: 'Quelle est votre couleur préférée?',
            de: 'Was ist deine Lieblingsfarbe?',
            es: '¿Cuál es tu color favorito?'
        },
        options: [
            {en: 'Red', fr: 'Rouge', de: 'Rot', es: 'Rojo'},
            {en: 'Blue', fr: 'Bleu', de: 'Blau', es: 'Azul'},
            {en: 'Green', fr: 'Vert', de: 'Grün', es: 'Verde'},
            {en: 'Yellow', fr: 'Jaune', de: 'Gelb', es: 'Amarillo'}
        ]
    },
    // Add more questions here
];

function Quiz() {
    const {questionId} = useParams();
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        const storedLanguage = localStorage.getItem('quizLanguage');
        if (storedLanguage) {
            setLanguage(storedLanguage);
        }

        const question = questions.find(q => q.id === parseInt(questionId));
        setCurrentQuestion(question);

        const storedAnswers = JSON.parse(localStorage.getItem('quizAnswers')) || {};
        setUserAnswers(storedAnswers);
    }, [questionId]);

    const handleAnswer = (answer) => {
        const newAnswers = {...userAnswers, [currentQuestion.id]: answer};
        setUserAnswers(newAnswers);
        localStorage.setItem('quizAnswers', JSON.stringify(newAnswers));

        if (parseInt(questionId) < questions.length) {
            navigate(`/quiz/${parseInt(questionId) + 1}`);
        } else {
            navigate('/email');
        }
    };

    const handleBack = () => {
        if (parseInt(questionId) > 1) {
            navigate(`/quiz/${parseInt(questionId) - 1}`);
        }
    };

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="quiz-container">
            <ProgressBar current={parseInt(questionId)} total={questions.length}/>
            <div className="quiz-header">
                <button onClick={handleBack} className="back-button">Back</button>
                <span className="question-number">Question {questionId}/{questions.length}</span>
            </div>
            <h2>{currentQuestion.title[language]}</h2>
            <div className="options-container">
                {currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(option[language])}
                        className="option-button"
                    >
                        {option[language]}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Quiz;