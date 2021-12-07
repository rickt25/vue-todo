import { createStore } from 'vuex'
import axios from 'axios'

// JSON Placeholder Server URL
// install json-placeholder & run 'npm run watch' for server
axios.defaults.baseURL =  'http://localhost:3000'

export default createStore({
  state: {
    todos: [],
  },
  mutations: {
    setTodos(state, todos){
      state.todos = todos;
    },
    addTodo(state, todo){
      state.todos.push(todo);
    },
    editTodo(state, todo){
      state.todos = state.todos.map(item => item.id !== todo.id ? item : todo)
    },
    deleteTodo(state, todoId){
      state.todos = state.todos.filter(item => item.id != todoId);
    }
  },
  actions: {
    async getTodos(context){
      try {
        let response = await axios.get('/todos');
        context.commit('setTodos', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async insertTodo(context, todo){
      try{
        let response = await axios.post('/todos', todo);
        context.commit('addTodo', response.data);
      }catch (error){
        console.log(error);
      }
    },
    async updateTodo(context, todo){
      try{
        let response = await axios.patch('/todos/' + todo.id, todo);
        context.commit('editTodo', response.data);
      }catch (error){
        console.log(error);
      }
    },
    async deleteTodo(context, todoId){
      try{
        await axios.delete('/todos/' + todoId, {
          method: 'DELETE'
        });
        console.log(todoId);
        context.commit('deleteTodo', todoId);
      }catch (error){
        console.log(error);
      }
    }
  },
  modules: {
  }
})
