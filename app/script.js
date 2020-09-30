import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'off', //Domyślna wartość.
      time: 1200, //zmienna przechowująca czas licznika (w sekundach).
      timer: null, //zmienna zawierająca przyszły interval. W końcu będziemy musieli odpalać funkcję odmierzającą czas w formie interwału, co sekundę. Na razie może mieć wartość null.
    };
  }

  formatTime = parameter => { 
    if (isNaN(parameter) || parameter < 0){
      return null;
    } 
    let minutes = (('00' + Math.floor((parameter/60)%60)).substr(-2,2));// składnia str.substr(start[, length]) - Zwraca określoną liczbę początkowych znaków w łańcuchu znaków w określonej lokalizacji.
    let seconds = (('00' + Math.floor(parameter%60)).substr(-2,2));// start - Lokalizacja, w której rozpoczyna się wyciąganie znaków (wartość liczbowa pomiędzy 0, a jeden znak mniej niż długość łańcucha znaków).
    let time = minutes + ':' + seconds;// length - Liczba znaków do wyciągnięcia.
    return time;
  };

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  step = () => {
    this.setState({
      timer: this.state.timer,
      time: this.state.time - 1, //(1200sec = 20min - 1sec.)
      status: this.state.status,
    });
    if(this.state.time == 0 && this.state.status == 'work'){
      this.setState({
        time: 20,
        status: 'rest',
      });
      this.playBell();
    } else if(this.state.time == 0 && this.state.status == 'rest'){
      this.setState({
        time: 1200,
        status: 'work',
      });
      this.playBell();
    }
  };
  
  startTimer = () => {
    this.setState({
      timer: setInterval(this.step, 1000),
      time: 1200, //(1200sec = 20min)
      status: 'work',
    });
  };

  stopTimer = () => {
    this.setState({
      timer: clearInterval(this.state.timer), //clearInterval(id) - id to Identyfikator zwracany przez metodę setInterval(). https://www.medianauka.pl/clearInterval-javascript
      time: 0, //(1200sec = 20min)
      status: 'off',
    });
  };

  closeApp = () => {
    window.close();
  };

  render() {
    const { status } = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') && 
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
        }
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">{this.formatTime(this.state.time)}</div>}
        {(status === 'off') && <button className="btn" onClick={ () => this.startTimer()}>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={ () => this.stopTimer()}>Stop</button>}
        <button className="btn btn-close" onClick={ () => this.closeApp()}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
