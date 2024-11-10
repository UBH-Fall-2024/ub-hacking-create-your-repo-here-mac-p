import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
    const [buttonClicked, setButtonClicked] = useState(false);

    const handleClick = () => {
        setButtonClicked(!buttonClicked);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Welcome to My React Website</h1>
            <button
                onClick={handleClick}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: buttonClicked ? 'green' : 'blue',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                }}
            >
                {buttonClicked ? 'Clicked!' : 'Click Me'}
            </button>
        </div>
    );
}

export default App;