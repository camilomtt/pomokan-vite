import React, { Component } from 'react';
import './PomodoroTimer.css';

class PomodoroTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 25,
      seconds: 0,
      isRunning: false,
    };
  }

  startTimer = () => {
    if (!this.state.isRunning) {
      this.timerInterval = setInterval(this.tick, 1000);
      this.setState({ isRunning: true });
    }
  };

  pauseTimer = () => {
    clearInterval(this.timerInterval);
    this.setState({ isRunning: false });
  };

  resetTimer = () => {
    clearInterval(this.timerInterval);
    this.setState({ minutes: 25, seconds: 0, isRunning: false });
  };

  tick = () => {
    const { minutes, seconds } = this.state;
    if (minutes === 0 && seconds === 0) {
      this.pauseTimer();
      // Aquí puedes agregar una acción cuando el temporizador llega a cero, como un sonido de alarma.
    } else {
      if (seconds === 0) {
        this.setState({ minutes: minutes - 1, seconds: 59 });
      } else {
        this.setState({ seconds: seconds - 1 });
      }
    }
  };

  render() {
    const { minutes, seconds, isRunning } = this.state;
    const totalSeconds = minutes * 60 + seconds;
    const progressBarStyle = {
      width: isRunning ? `${(totalSeconds / (25 * 60)) * 100}%` : '0%',
    };

    return (
      <div className="pomodoro-timer">
        <div className="timer">
          {minutes < 10 ? '0' : ''}
          {minutes}:{seconds < 10 ? '0' : ''}
          {seconds}
        </div>
        <div className="progress-bar">
          <div className="progress" style={progressBarStyle}></div>
        </div>
        <div className="controls">
          {!isRunning ? (
            <button onClick={this.startTimer}>Iniciar</button>
          ) : (
            <button onClick={this.pauseTimer}>Pausar</button>
          )}
          <button onClick={this.resetTimer}>Reiniciar</button>
        </div>
      </div>
    );
  }
}

export default PomodoroTimer;
