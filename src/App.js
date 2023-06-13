import './App.css';
import Prompt from './components/Prompt';
import Score from './components/Score';

function App() {
  return (
    <div className="App">
      <h1 className='main-heading'>Typing Master</h1>
      <div className='content'>
        <Prompt />
        <Score />
      </div>

    </div>
  );
}

export default App;
