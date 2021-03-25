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
    window.timer = setInterval(()  => {
      //calculations for minutes and seconds
      var minutes = String(Math.floor((total % (60 * 60)) / 60)).padStart(2, 0);
      var seconds = String(Math.floor((total % (60)))).padStart(2, 0);
      
      this.setState({
        min : minutes, sec : seconds, total
      }); 
      total--;
      // If the count down is over, auto submit
      if (total < 0) {
        clearInterval(window.timer);
        this.props.timeOver();
      }
    }, 1000);
  }

  componentDidUpdate(){
    if(this.props.submitted){
      clearInterval(window.timer);
    }
  }

  componentWillUnmount() {
    clearInterval(window.timer);
  }  

  render() {
    const {min, sec, total} = this.state;
    return (
      <div className={'countdown ' + (total < 30 ? 'red' : '' ) }>{min ? min + ':' + sec : 'Ready'}</div>
    )
  }
};

export default Timer;