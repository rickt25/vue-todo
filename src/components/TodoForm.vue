<template>
  <div>
    <h1 class="title">Create New Todo</h1>
    <form class="form-group" @submit.prevent="saveTodo">
        <input type="text" class="form-input" v-model="newTodo">
        <button type="submit" class="form-btn">Add Todo</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex'

export default {
  name: 'TodoForm',

  setup(){
    const store = useStore();
    const newTodo = ref('');

    const saveTodo = () => {
      store.dispatch('insertTodo', {
        'title': newTodo.value,
        'completed': false,
      });
      newTodo.value = '';
    }

    return {
      newTodo,
      saveTodo
    }
  },
}
</script>

<style lang="scss">

.form-group{
  display: flex;
  gap: 12px;
  
  .form-input, .form-btn{
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }

  .form-input{
    width: 100%;
    font-size: 1.2rem;
    color: white;
    padding: 0.5rem 1rem;
    border: 2px solid #ececec;
    background: none;
    border-radius: 10px;
    transition: .3s;
    &:focus{
      outline: none;
      color: black;
      background: #ececec;
    }
  }
  .form-btn{
    cursor: pointer;
    font-weight: 700;
    font-size: 1rem;
    color: #202b38;
    background-color: #3FB883;
    white-space: nowrap;
    border-radius: 10px;
    border: none;
    padding: 0.8rem 2rem;
    transition: .3s;

    &:hover{
      transform: translate(5px, -5px);
      box-shadow: -5px 5px 0 0 rgba(255, 255, 255, 0.178);
      background-color: rgb(33, 141, 93);
      color: white;
    }

    &:active{
      box-shadow: none;
      transform: translate(0, 0);
    }
  } 

}

</style>