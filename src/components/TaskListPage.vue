<template>
    <div>
      <router-link to="/">Вернуться на главную</router-link>
      <h1>Список задач</h1>
      <form @submit.prevent="$store.commit('addTask')">
        <input type="text" v-model="$store.state.newTaskText" placeholder="Введите задачу" />
        <button type="submit">Добавить</button>
      </form>
      <ul>
        <li v-for="task in $store.state.tasks" :key="task.id">
          <span v-if="$store.state.editingTask !== task && task !== null">
            {{ task.text }}
            <button @click="$store.commit('deleteTask', task.id)">Удалить</button>
            <button @click="$store.commit('editTask', task)">Редактировать</button>
          </span>
          <span v-else-if="task !== null">
            <input type="text" v-model="task.text" />
            <button @click="$store.commit('saveTask')">Сохранить</button>
          </span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      this.$store.dispatch('loadTasksFromLocalStorage');
    },
  };
  </script>

<style lang="scss">
h1 {
  font-size: 24px;
  margin-bottom: 16px;
}

form {
  margin-bottom: 16px;
}

input[type="text"] {
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
}

button[type="submit"],
button {
  padding: 8px 16px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

span:first-child {
  flex-grow: 1;
}

span:last-child input[type="text"] {
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
}

span:last-child button {
  padding: 4px 8px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

span:last-child button:first-child {
  margin-left: 8px;
}

span:last-child button:nth-child(2) {
  margin-left: 8px;
}
</style>
