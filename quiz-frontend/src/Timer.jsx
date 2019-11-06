import React, {Component} from 'react';

class Timer extends Component {
    constructor(props) {
      super()
      this.props = props
      this.state = {
        min : null,
        sec : null,
        total : 0,
        done : false
      }
    }

  componentDidMount() {
    var total = (this.props.min * 60 ) + Number(this.props.sec);
    this.setState({total : total});
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  timer = setInterval(()  => {
    console.log(this.props.stopTimer);
    //calculations for minutes and seconds
    var minutes = String(Math.floor((this.state.total % (60 * 60)) / 60)).padStart(2, 0);
    var seconds = String(Math.floor((this.state.total % (60)))).padStart(2, 0);
    
    this.setState({
      min : minutes, sec : seconds
    }); 
    this.setState({total : this.state.total - 1});
    // If the count down is over, auto submit
    if (this.state.total < 0) {
      clearInterval(this.timer);
      this.props.timeOver();
    }
  }, 1000);

  render() {
    return (
      <div id="countdown">{this.state.min ? this.state.min + ':' + this.state.sec : 'Ready'}</div>
    )
  }
};

export default Timer;