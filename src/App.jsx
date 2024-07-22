import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LanguageSelector from './components/LanguageSelector/LanguageSelector.jsx';
import Quiz from './components/Quiz/Quiz.jsx';
// import EmailInput from './components/EmailInput';
// import ThankYou from './components/ThankYou';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<LanguageSelector/>}/>
                    <Route path="/quiz/:questionId" element={<Quiz/>}/>
                    {/*<Route path="/email" element={<EmailInput/>}/>*/}
                    {/*<Route path="/thank-you" element={<ThankYou/>}/>*/}
                </Routes>
            </div>
        </Router>
    );
}

export default App;