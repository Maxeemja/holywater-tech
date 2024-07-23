import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar.jsx';
import './Quiz.scss';
import {questions} from "../../shared/dummy-data.js";


function Quiz() {
    const {questionId} = useParams();
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
    const [userAnswers, setUserAnswers] = useState({});
    const [language, setLanguage] = useState('en');
    const [multipleSelections, setMultipleSelections] = useState({});

    useEffect(() => {
        const storedAnswers = JSON.parse(localStorage.getItem('quizAnswers')) || {};
        setUserAnswers(storedAnswers);

        const storedLanguage = localStorage.getItem('quizLanguage');
        if (storedLanguage) {
            setLanguage(storedLanguage);
        }

        if (questionId) {
            const question = questions.find((x) => x.id === parseInt(questionId));
            setCurrentQuestion(question);
        }
    }, [questionId]);


    const handleAnswer = (answer) => {
        let newAnswers;
        let newSelections;

        if (currentQuestion.type === 'multiple-select' || currentQuestion.type === 'bubble-select') {
            const currentSelections = multipleSelections[currentQuestion.id] || [];
            if (currentSelections.includes(answer)) {
                newSelections = currentSelections.filter(item => item !== answer);
            } else if (currentSelections.length < currentQuestion.maxSelections) {
                newSelections = [...currentSelections, answer];
            } else {
                return; // Max selections reached
            }
            setMultipleSelections({...multipleSelections, [currentQuestion.id]: newSelections});
            newAnswers = {...userAnswers, [currentQuestion.id]: newSelections};
        } else {
            newAnswers = {...userAnswers, [currentQuestion.id]: answer};
        }

        setUserAnswers(newAnswers);
        localStorage.setItem('quizAnswers', JSON.stringify(newAnswers));

        if (currentQuestion.id === 1) {
            setLanguage(answer);
            localStorage.setItem('quizLanguage', answer);
        }

        if (currentQuestion.type !== 'multiple-select' && currentQuestion.type !== 'bubble-select') {
            const nextQuestionId = questions.find(q => q.id > currentQuestion.id)?.id;
            if (nextQuestionId) {
                navigate(`/quiz/${nextQuestionId}`);
            } else {
                navigate('/email');
            }
        }
    };


    const isOptionSelected = (option) => {
        if (currentQuestion.type === 'bubble-select' || currentQuestion.type === 'multiple-select') {
            return (multipleSelections[currentQuestion.id] || []).includes(option[language]);
        }
        return userAnswers[currentQuestion.id] === option[language];
    };

    const canProceed = () => {
        if (currentQuestion.type === 'bubble-select' || currentQuestion.type === 'multiple-select') {
            return (multipleSelections[currentQuestion.id] || []).length > 0;
        }
        return userAnswers[currentQuestion.id] !== undefined;
    };

    const handleNext = () => {
        if (canProceed()) {
            const nextQuestionId = questions.find(q => q.id > currentQuestion.id)?.id;
            if (nextQuestionId) {
                navigate(`/quiz/${nextQuestionId}`);
            } else {
                navigate('/email');
            }
        }
    };

    const handleBack = () => {
        navigate(`/quiz/${currentQuestion.id - 1}`);
    };

    const renderOptions = () => {
        switch (currentQuestion.type) {
            case 'language-select':
                return currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(option[language] || option.code)}
                        className={`option-button ${isOptionSelected(option) ? 'selected' : ''}`}
                    >
                        {option[language] || option.name}
                    </button>
                ));
            case 'single-select':
                return currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(option[language] || option.code)}
                        className={`option-button ${isOptionSelected(option) ? 'selected' : ''}`}
                    >
                        {option[language] || option.name}
                    </button>
                ));
            case 'single-image-select':
                return currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(option[language])}
                        className={`option-button gender ${isOptionSelected(option) ? 'selected' : ''}`}
                    >
                        <span className="icon">{option.icon}</span>
                        <span>{option[language]}</span>
                    </button>
                ));
            case 'multiple-select':
                return currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(option[language])}
                        className={`option-button checkbox ${isOptionSelected(option) ? 'selected' : ''}`}
                    >
                        <span>{option[language]}</span>
                        <div className="checkbox">
                            {isOptionSelected(option) && <div className="checkbox-inner"></div>}
                        </div>
                    </button>
                ));
            case 'bubble-select':
                return currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(option[language])}
                        className={`option-button bubble ${isOptionSelected(option) ? 'selected' : ''}`}
                    >
                        <img src={option.image} alt={option[language]}/>
                        <span>{option[language]}</span>
                    </button>
                ));
            default:
                return null;
        }
    };

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="quiz-container">
            <ProgressBar current={currentQuestion.id} total={questions.length}/>
            <div className="quiz-header">
                {currentQuestion.id > 1 && (
                    <button onClick={handleBack} className="back-button">&lt;</button>
                )}
                <span className="question-number">{currentQuestion.id}/{questions.length}</span>
            </div>
            <h2 dangerouslySetInnerHTML={{__html: currentQuestion.title[language]}}></h2>
            {currentQuestion.instruction && (
                <p className="instruction">{currentQuestion.instruction[language]}</p>
            )}
            <div className={`options-container ${currentQuestion.type}`}>
                {renderOptions()}
            </div>
            {(currentQuestion.type === 'multiple-select' || currentQuestion.type === 'bubble-select') && (
                <button
                    className="next-button"
                    onClick={handleNext}
                    disabled={!canProceed()}
                >
                    Next
                </button>
            )}
        </div>
    );
}

export default Quiz;