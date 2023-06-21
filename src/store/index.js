import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tasks: [],
        newTaskText: '',
        taskId: 1,
        editingTask: null,
    },

    mutations: {

        addTask(state) {
            if (state.newTaskText.trim() !== '') {
              if (state.editingTask) {
                state.editingTask = null;
              } else {
                state.tasks.push({ id: state.taskId++, text: state.newTaskText });
                this.commit('saveTodosToLocalStorage');
              }
              state.newTaskText = '';
            }
          },

          deleteTask(state, taskId) {
            state.tasks = state.tasks.filter(task => task.id !== taskId);
            this.commit('saveTodosToLocalStorage');
          },
      
          editTask(state, task) {
            state.editingTask = task;
            this.commit('saveTodosToLocalStorage');
          },
      
          saveTask(state) {
            state.editingTask = null;
            this.commit('saveTodosToLocalStorage');
          },
      
          saveTodosToLocalStorage(state) {
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
          },
      
          loadTodosFromLocalStorage(state) {
            const savedTodos = localStorage.getItem('tasks');
            if (savedTodos) {
              state.tasks = JSON.parse(savedTodos);
              state.taskId = state.tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1;
            }
          },
        },
      
        actions: {
          loadTasksFromLocalStorage({ commit }) {
            commit('loadTodosFromLocalStorage');
          },
        },

    getters: {

    },

    modules: {

    }
});
