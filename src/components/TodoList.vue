<template>
  <div class="todo-list">
    <h1 class="title">Todo Lists</h1>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <span v-if="editId != todo.id" class="todo-title">{{ todo.title }}</span>

        <form v-if="editId == todo.id" class="todo-edit-form" @submit.prevent="updateTodo(todo.id)">
          <input type="text" v-model="editTodoTitle">
        </form>
        
        <div v-if="editId != todo.id" class="action">
          <button @click.stop="editTodo(todo.id)" class="btn btn-edit center">
            <font-awesome-icon class="white" icon="edit" />
          </button>
          <button @click.stop="deleteTodo(todo.id)" class="btn btn-delete center">
            <font-awesome-icon class="white" icon="trash" />
          </button>
        </div>

        <div v-if="editId == todo.id" class="action">
          <button @click.stop="editId = 0" class="btn btn-delete center">
            <font-awesome-icon class="white" icon="times" />
          </button>
          <button @click.stop="updateTodo()" class="btn btn-edit center">
            <font-awesome-icon class="white" icon="check" />            
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { computed, ref } from 'vue'
  import { useStore } from 'vuex'

  export default {
    name: 'TodoList',

    setup(){
      const store = useStore();
      const editTodoTitle = ref('');
      const editId = ref(0);
      
      const getTodos = () => {
        store.dispatch('getTodos');
      }

      const editTodo = (id) => {
        editId.value = id;
        editTodoTitle.value = store.state.todos.find(item => item.id == id).title;
      }

      const updateTodo = () => {
        store.dispatch('updateTodo', {
          id: editId.value,
          completed: "false",
          title: editTodoTitle.value
        });
        editId.value = 0;
      }

      const deleteTodo = (id) => {
        store.dispatch('deleteTodo', id);
      }

      // Function call
      getTodos();

      return{
        todos: computed(() => store.state.todos),
        getTodos,
        editTodo,
        updateTodo,
        deleteTodo,
        editId,
        editTodoTitle,
      }
    },
  }
</script>

<style lang="scss">
.center{
  display: grid;
  place-items: center;
}

.white{
  color: white;
}

.todo-list{
  margin-top: 2rem;
  
  ul{
    list-style-type: none;
    padding: 0;
  }

  li{
    width: 100%;
    padding: 0.5rem 1.2rem 0.5rem 1.5rem;
    text-align: left;
    border-radius: 10px;
    border: 2px solid white;
    box-sizing: border-box;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    display: flex;
    align-items: center;
    margin-bottom: 1.2rem;

    .todo-title{
      font-size: 1rem;
    }

    .action{
      margin-left: auto;
      display: flex;
      gap: 0.5rem;

      .btn{
        cursor: pointer;
        border: none;
        border-radius: 5px;
        padding: 0.4rem;
        display: flex;
        justify-content: center;
        align-content: center;
      }

      .btn-edit{
        background: rgb(42, 179, 7);
      }

      .btn-delete{
        background: rgb(255, 61, 61);
      }
    }

    .icon-delete{
      width: 20px;
    }
  }
}
</style>