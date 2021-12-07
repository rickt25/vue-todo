<template>
  <img class="watermark" src="./assets/logo.png" alt="">
  <main class="container">
    <TodoForm />
    <TodoList />
  </main>
</template>

<script>
import TodoForm from './components/TodoForm.vue';
import TodoList from './components/TodoList.vue';

export default {
  name: 'App',
  components: {
    TodoForm, TodoList
  }
}
</script>

<style lang="scss">
body{
  margin: 0;
  background: #0d1b29;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ececec;
}

.title{
  font-size: 1.5rem;
}

.watermark{
  position: absolute;
  top: 250px;
  left: -100px;
  width: 300px;
  opacity: 0.2;
  animation: spin infinite 10s linear;
}

.container{
  max-width: 600px;
  padding: 1rem;
  margin: auto;
}

@keyframes spin {
  from{
    transform: rotateY(0deg);
  }
  to{
    transform: rotateY(360deg);
  }
}
</style>
