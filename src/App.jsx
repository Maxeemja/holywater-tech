import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Quiz from './components/Quiz/Quiz.jsx';
import EmailInput from './components/EmailInput/EmailInput.jsx';
import ThankYou from './components/ThankYou/ThankYou.jsx';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Quiz/>}/>
                    <Route path="/quiz/:questionId" element={<Quiz/>}/>
                    <Route path="/email" element={<EmailInput/>}/>
                    <Route path="/thank-you" element={<ThankYou/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;