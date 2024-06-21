import './index.css'

const Tasks = props => {
  const {taskDetails} = props
  const {taskName, taskCategory} = taskDetails
  return (
    <li className="list-items">
      <p className="name">{taskName}</p>
      <p className="category">{taskCategory}</p>
    </li>
  )
}

export default Tasks
