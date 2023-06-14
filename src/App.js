import './App.css';
import PromptBox from './components/PromptBox';
import Score from './components/Score';
import Timer from './components/Timer';
import TypingBox from './components/TypingBox';

function App() {
  return (
    <div className="App">
      <Timer />
      <div className='content'>
        <PromptBox />
        <TypingBox />
        <Score />
      </div>

    </div>
  );
}

export default App;
