import './App.css';
import Keys from './components/Keys';
import PromptBox from './components/PromptBox';
import Score from './components/Score';
import Timer from './components/Timer';
import TypingBox from './components/TypingBox';


function App() {
  return (
    <div className="App">
      <div className='main-heading'>
        <h1>Typing Master</h1>
      </div>
      <Timer />
      <Keys />
      <div className='content'>
        <PromptBox />
        <TypingBox />
        <Score />
      </div>
    </div>
  );
}

export default App;
