<template>
  <div>
    <h1>Список задач</h1>

    <div class="row select-wrap">
      <div class="input-field col s6">
        <select class="select" ref="select" v-model="filter">
          <option value="" disabled selected>Выбирите статус задачи</option>
          <option value="active">Текущие</option>
          <option value="outdated">Просроченные</option>
          <option value="completed">Завершенные</option>
        </select>
        <label>Сортировать задачи по статусу</label>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button v-if="filter" class="btn btn-small orange" type="button" @click="filter = null">Очистить фильтр</button>
      </div>
    </div>

    <hr>

    <table v-if="tasks.length">
      <thead>
        <tr>
          <th>#</th>
          <th>Название задачи</th>
          <th>Дата</th>
          <th>Описание задачи</th>
          <th>Статус</th>
          <th>Подробнее</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, idx) in displayTasks" :key="task.id">
          <td>{{idx + 1}}</td>
          <td>{{task.title}}</td>
          <td>{{new Date(task.date).toLocaleDateString() }}</td>
          <td>
            <p class="task-text">{{task.description}}</p>
          </td>
          <td>{{task.status}}</td>
          <td>
            <router-link
              tag="button"
              :to="'/task/' + task.id"
              class="btn btn-small"
              type="button">Открыть</router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Задач нет.
      <router-link
        tag="a"
        to="/"
      >
      Добавить новую задачу
      </router-link>
    </p>
  </div>
</template>

<script>
export default {
  data: () => ({
    filter: null,
  }),
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },

    displayTasks() {
      return this.tasks.filter((t) => {
        if (!this.filter) {
          return true;
        }
        return t.status === this.filter;
      });
    },
  },
  mounted() {
    M.FormSelect.init(this.$refs.select);
  },
};
</script>

<style lang="scss">
  .select-wrap {
    margin-bottom: 0;
  }

  .task-text {
    margin: 0;
    padding: 0;
    max-width: 400px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .select {
    max-width: 350px;
  }
</style>
