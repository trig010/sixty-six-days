import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions/actions';
import Calendar from './Calendar';
import FlatButton from 'material-ui/FlatButton';

class GoalsList extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.dispatch(actions.fetchGoals());
    }
    render() {
        console.log('goals props: ', this.props)
        let goalsArray = this.props.goals.goals;
        let sticker = {};
        console.log('goalsArray: ', goalsArray)

        const goalsList = goalsArray.map((goal, i) => {
                let strikeThru = goal.completed
                    ? "strikeThru"
                    : "";
                let randomize25 = Math.floor(Math.random() * 25);
                let stickersArray = this.props.stickers.stickers;
                stickersArray.length <= 1
                    ? null
                    : sticker = stickersArray[randomize25]
                if(sticker.earned === true) {
                    sticker = stickersArray[randomize25]
                }

                return (
                    <div className="goal-container" key={i}>
                        <div className="goal-box" id={i}>
                            <div className={`goal-text ${strikeThru}`} onBlur={(event) => this.props.dispatch(actions.updateGoal(event.target.innerText, goal._id))} contentEditable='true'>{goal.goal}
                            </div>

                        </div>
                        <div className="goal-footer">
                            <div className="calendar">
                                <Calendar goal={goal.goal} />
                            </div>
                            <div className="buttons-group">
                                <FlatButton className="done" primary={true} onClick={() => {
                                    if (goal.completed === false) {
                                        sticker.earned = true;
                                        this.props.dispatch(actions.earnSticker(sticker, goal._id));
                                        this.props.dispatch(actions.showStickers());
                                    } else {
                                        sticker.earned = false;
                                        sticker = '';
                                        this.props.dispatch(actions.removeSticker(sticker, goal._id));
                                    }
                                }}>
                                    Done!</FlatButton>
                                <FlatButton className="delete" secondary={true} onClick={() => {
                                    this.props.dispatch(actions.deleteGoal(goal._id))
                                }}>
                                    Delete</FlatButton>
                            </div>
                        </div>
                    </div>
                )
            })

            if(this.props.goals.loading === true){
            return (
                <div className="goals">
                    <h3>Your Goals</h3>
                    Your goals will appear here...
                </div>
            )
            } else {
                return (
                    <div className="goals">
                        <h3>Your Goals</h3>
                        {goalsList}
                    </div>
                )
            }
    }
}

const mapStateToProps = (state, props) => ({goals: state.goals, stickers: state.stickers})

export default connect(mapStateToProps)(GoalsList);
