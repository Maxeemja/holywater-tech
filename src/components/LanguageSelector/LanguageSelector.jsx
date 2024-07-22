import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './LanguageSelector.scss';

const languages = [
    {code: 'en', name: 'English'},
    {code: 'fr', name: 'Français'},
    {code: 'de', name: 'Deutsch'},
    {code: 'es', name: 'Español'},
];

function LanguageSelector() {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const navigate = useNavigate();

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedLanguage) {
            localStorage.setItem('quizLanguage', selectedLanguage);
            navigate('/quiz/1');
        }
    };

    return (
        <div className="language-selector">
            <h1>Select Your Language</h1>
            <form onSubmit={handleSubmit}>
                <select value={selectedLanguage} onChange={handleLanguageChange}>
                    <option value="">Choose a language</option>
                    {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                            {lang.name}
                        </option>
                    ))}
                </select>
                <button type="submit" disabled={!selectedLanguage}>
                    Start Quiz
                </button>
            </form>
        </div>
    );
}

export default LanguageSelector;