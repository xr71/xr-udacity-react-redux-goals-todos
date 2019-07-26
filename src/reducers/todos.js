import { ADD_TODO } from "../actions/todos";

export default function todos (state=[], action) {
  switch (action.type) {
    case ADD_TODO :
      return state.concat([action.todo])
    defualt : 
      return state
  }
}