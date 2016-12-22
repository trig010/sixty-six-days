import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import Calendar from './due-dates';

export class Goals extends React.Component {
  constructor(props){
    super(props);
    this.sendUserGoal = this.sendUserGoal.bind(this);
    // this.saveUserGoal = this.saveUserGoal.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchGoals())
  }


  sendUserGoal(event){
    event.preventDefault();
    const userGoal = this.textInput.value;
    console.log('fired off sendUserGoal event', userGoal)
    this.props.dispatch(actions.addGoal(userGoal))
    this.textInput.value='';
  }

  // saveUserGoal(event){
  //   const newUserGoal = event.target.innerText;
  //   console.log(newUserGoal);
    // console.log(event.target.id[0]);
    // this.props.dispatch(actions.updateGoal(newUserGoal))
  // }
  render() {
    // console.log(this.props.userGoals);
    const goals = this.props.userGoals.map((goal, idx) => {
      return <div key={idx}>
        <div key={idx}
          onBlur={(event) => this.props.dispatch(actions.updateGoal(event.target.innerText, goal._id))}
           contentEditable='true'>{goal.goal}</div>
         <button className="btn btn-warning" onClick={() => {this.props.dispatch(actions.deleteGoal(goal._id))}}>
          Delete</button>
          <Calendar />
      </div>
    })
    return (
      <div>
        <form onSubmit={this.sendUserGoal}>
          <label>New Goal</label>
          <br></br>
          <input type="text" ref={input => this.textInput = input}
            placeholder="type your goal"/>
          <button type="submit">Submit</button>
        </form>
        <ul>
          {goals}
        </ul>
        </div>

    )
  }
}

const mapStateToProps = (state, props) => ({
  userGoals: state.goals
})

export default connect(mapStateToProps)(Goals)
