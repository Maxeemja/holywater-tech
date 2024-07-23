import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar.jsx';
import './Quiz.scss';

const languages = [{code: 'en', name: 'English'}, {code: 'fr', name: 'Français'}, {
    code: 'de',
    name: 'Deutsch'
}, {code: 'es', name: 'Español'},];

const questions = [{
    id: 1, type: 'language-select', title: {
        en: 'Select your preferred language',
        fr: 'Sélectionnez votre langue préférée',
        de: 'Wählen Sie Ihre bevorzugte Sprache',
        es: 'Seleccione su idioma preferido'
    }, options: languages
}, {
    id: 2,
    type: 'single-select',
    title: {
        en: 'What is your favorite color?',
        fr: 'Quelle est votre couleur préférée?',
        de: 'Was ist deine Lieblingsfarbe?',
        es: '¿Cuál es tu color favorito?'
    },
    options: [{en: 'Red', fr: 'Rouge', de: 'Rot', es: 'Rojo'}, {
        en: 'Blue',
        fr: 'Bleu',
        de: 'Blau',
        es: 'Azul'
    }, {en: 'Green', fr: 'Vert', de: 'Grün', es: 'Verde'}, {en: 'Yellow', fr: 'Jaune', de: 'Gelb', es: 'Amarillo'}]
}, {
    id: 3,
    type: 'checkbox-select',
    title: {
        en: 'What do you <span class="highlight">hate</span> the most in a book?', // ... (other languages)
    },
    options: [{en: 'Lack of logic'}, {en: 'A slow speed'}, {en: 'Lack of humor'}, {en: 'Way too generic ending'},],
    maxSelections: 4  // Allow multiple selections
}, {
    id: 4,
    type: 'multiple-select',
    title: {
        en: 'What are your favorite topics?', // ... (other languages)
    },
    instruction: {
        en: 'Choose up to 3 topics you like', // ... (other languages)
    },
    options: [{en: 'Werewolf', image: 'werewolf.png'}, {en: 'Action', image: 'action.png'}, {
        en: 'Royal Obsession',
        image: 'royal.png'
    }, {en: 'Billionaire', image: 'billionaire.png'}, {en: 'Romance', image: 'romance.png'}, {
        en: 'Young Adult',
        image: 'young-adult.png'
    }, {en: 'Bad Boy', image: 'bad-boy.png'},],
    maxSelections: 3
},];

function Quiz() {
    const {questionId} = useParams();
    const navigate = useNavigate();
    const [currentQuestionId, setCurrentQuestionId] = useState(questionId ? parseInt(questionId) : 1);
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
            setCurrentQuestionId(parseInt(questionId));
        }
    }, [questionId]);

    const currentQuestion = questions.find(q => q.id === currentQuestionId);

    const handleAnswer = (answer) => {
        if (currentQuestion.type === 'checkbox-select') {
            const currentSelections = multipleSelections[currentQuestionId] || [];
            let newSelections;
            if (currentSelections.includes(answer)) {
                newSelections = currentSelections.filter(item => item !== answer);
            } else {
                newSelections = [...currentSelections, answer];
            }
            setMultipleSelections({...multipleSelections, [currentQuestionId]: newSelections});
            setUserAnswers({...userAnswers, [currentQuestionId]: newSelections});
        } else {
            setUserAnswers({...userAnswers, [currentQuestionId]: answer});
        }
        if (currentQuestion.type === 'multiple-select' || currentQuestion.type === 'bubble') {
            const currentSelections = multipleSelections[currentQuestionId] || [];
            let newSelections;
            if (currentSelections.includes(answer)) {
                newSelections = currentSelections.filter(item => item !== answer);
            } else if (currentSelections.length < currentQuestion.maxSelections) {
                newSelections = [...currentSelections, answer];
            } else {
                return; // Max selections reached
            }
            setMultipleSelections({...multipleSelections, [currentQuestionId]: newSelections});
            setUserAnswers({...userAnswers, [currentQuestionId]: newSelections});
        } else {
            setUserAnswers({...userAnswers, [currentQuestionId]: answer});
        }

        const newAnswers = {...userAnswers, [currentQuestionId]: answer};
        setUserAnswers(newAnswers);
        localStorage.setItem('quizAnswers', JSON.stringify(newAnswers));

        if (currentQuestionId === 1) {
            setLanguage(answer);
            localStorage.setItem('quizLanguage', answer);
        }

        const nextQuestionId = questions.find(q => q.id > currentQuestionId)?.id;
        if (nextQuestionId) {
            navigate(`/quiz/${nextQuestionId}`);
        } else {
            navigate('/email');
        }
    };


    const isOptionSelected = (option) => {
        if (currentQuestion.type === 'multiple-select' || currentQuestion.type === 'bubble' || currentQuestion.type === 'checkbox-select') {
            return (multipleSelections[currentQuestionId] || []).includes(option[language]);
        }
        return userAnswers[currentQuestionId] === option[language];
    };

    const canProceed = () => {
        if (currentQuestion.type === 'checkbox-select') {
            return (multipleSelections[currentQuestionId] || []).length > 0;
        }
        return userAnswers[currentQuestionId] !== undefined;
    };

    const handleNext = () => {
        if (canProceed()) {
            const nextQuestionId = questions.find(q => q.id > currentQuestionId)?.id;
            if (nextQuestionId) {
                navigate(`/quiz/${nextQuestionId}`);
            } else {
                navigate('/email');
            }
        }
    };

    const handleBack = () => {
        const prevQuestionId = questions.find(q => q.id < currentQuestionId)?.id;
        if (prevQuestionId) {
            navigate(`/quiz/${prevQuestionId}`);
        }
    };

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="quiz-container">
            <ProgressBar current={currentQuestionId} total={questions.length}/>
            <div className="quiz-header">
                {currentQuestionId > 1 && (
                    <button onClick={handleBack} className="back-button">Back</button>
                )}
                <span className="question-number">{currentQuestionId}/{questions.length}</span>
            </div>
            <h2 dangerouslySetInnerHTML={{__html: currentQuestion.title[language]}}></h2>
            <div className={`options-container ${currentQuestion.type}`}>
                {currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(option[language])}
                        className={`option-button ${isOptionSelected(option) ? 'selected' : ''} ${currentQuestion.type}`}
                    >
                        <span>{option[language]}</span>
                        {currentQuestion.type === 'checkbox-select' && (
                            <div className="checkbox">
                                {isOptionSelected(option) && <div className="checkbox-inner"></div>}
                            </div>
                        )}
                    </button>
                ))}
            </div>
            {currentQuestion.type === 'checkbox-select' && (
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