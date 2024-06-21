import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import Tasks from './components/Tasks'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    myTaskList: [],
    taskInput: '',
    taskOption: tagsList[0].optionId,
    activeTag: 'INITIAL',
  }

  onClickAddBtn = () => {
    const {taskInput, taskOption} = this.state
    const taskName = taskInput
    const taskCategory = taskOption
    const id = uuid()
    const bgColor = false
    if (taskName.length !== 0) {
      this.setState(prevState => ({
        myTaskList: [
          ...prevState.myTaskList,
          {id, taskName, taskCategory, bgColor},
        ],
        taskInput: '',
        taskOption: tagsList[0].optionId,
      }))
    }
  }

  onChangeTaskInput = event => {
    this.setState({taskInput: event.target.value})
  }

  onChangeTaskOption = event => {
    this.setState({taskOption: event.target.value})
  }

  onClickTag = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  render() {
    const {activeTag, myTaskList, taskInput, taskOption} = this.state

    const filterTagList =
      activeTag === 'INITIAL'
        ? myTaskList
        : myTaskList.filter(each => each.taskCategory === activeTag)
    return (
      <div className="bg-container">
        <form className="task-input-container">
          <h1 className="heading">Create a task!</h1>
          <div className="input-container">
            <label htmlFor="textInput" className="label">
              Task
            </label>
            <input
              id="textInput"
              type="text"
              onChange={this.onChangeTaskInput}
              className="input"
              value={taskInput}
              placeholder="Enter the task here"
            />
          </div>
          <div className="input-container">
            <label htmlFor="optionInput" className="label">
              Tags
            </label>
            <select
              id="optionInput"
              value={taskOption}
              className="select"
              onChange={this.onChangeTaskOption}
            >
              {tagsList.map(eachOption => (
                <option value={eachOption.optionId}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>
          </div>
          <button type="button" className="btn" onClick={this.onClickAddBtn}>
            Add Task
          </button>
        </form>
        <div className="tag-display-container">
          <h1 className="topic">Tags</h1>
          <ul className="list-item-container">
            {tagsList.map(eachTag => (
              <li className="list-item" key={eachTag.optionId}>
                <button
                  className={`${
                    activeTag === eachTag.optionId
                      ? 'tag-btn active-btn'
                      : 'tag-btn'
                  }`}
                  type="button"
                  value={eachTag.optionId}
                  onClick={this.onClickTag}
                >
                  {eachTag.displayText}
                </button>
              </li>
            ))}
          </ul>
          <h1 className="topic">Tasks</h1>
          <ul className="task-container">
            {filterTagList.length === 0 ? (
              <p className="no-task">No Tasks Added Yet</p>
            ) : (
              filterTagList.map(eachTask => (
                <Tasks key={eachTask.id} taskDetails={eachTask} />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}
export default App
