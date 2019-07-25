import API, { deleteTodo } from 'goals-todos-api'

export const [ADD_TODO, REMOVE_TODO, TOGGLE_TODO] = ["ADD_TODO", "REMOVE_TODO", "TOGGLE_TODO"]

function addTodo (todo) {
  return {
    type: ADD_TODO,
    todo: todo
  }
}


function removeTodo (id) {
  return {
    type: REMOVE_TODO,
    id: id
  }
}

function toggleTodo (id) {
  return {
    type: TOGGLE_TODO,
    id: id
  }
}


export function handleAddTodo (name, cb) {
  return (dispatch) => {
    return API.saveTodo(name)
      .then((todo) => {
        dispatch(addTodo(todo))
        cb() // dispatch the action and then callback function
      })
      .catch(() => {
        alert("There was an error. Please try again.")
      })
  }
}

export function handleToggle (id) {
  return (dispatch) => {
    dispatch(toggleTodo(id))

    return API.saveTodoToggle(id)
      .catch(() => {
        dispatch(toggleTodo(id))
        // "untoggle" the UI if it didn't go through
        alert("There was an error. Please try again.")
      })
  }
}

export function handleDeleteTodo (todo) {
  return (dispatch) => {
    // op update first
    dispatch(removeTodo(todo.id))

    return API.deleteTodo(todo.id)
      .catch(() => {
        dispatch(addTodo(todo))
        // put the todo back if there's an error
        alert("There was an error. Please try again.")
      })
  }
}