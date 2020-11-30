<template>
  <div class="container">
    <div class="task">
    <div v-if="task">
      <h1>{{task.title}}</h1>
    </div>
    <p v-else>Такой задачи нет.</p>

    <div class="row">
      <div class="cols6 offset-s3">
        <form @submit.prevent="submitHandler">
          <div class="chips" ref="chips"></div>
          <div class="input-field">
            <textarea v-model="description" id="description" class="materialize-textarea description" maxlength="2040"></textarea>
            <label for="description">Описание задачи</label>
            <span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/2040</span>
          </div>
          <input type="text" class="datepicker" ref="picker">
          <div v-if="task.status != 'completed'">
            <button class="btn" type="submit">Обновить задачу</button>
            <button class="btn blue" type="button" @click="completeTask">Завершить задачу</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'task',
  data: () => ({
    description: '',
    chips: null,
    date: null,
  }),
  mounted() {
    this.description = this.task.description,
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'Добавить тег',
      data: this.task.tags,
    });
    this.date = M.Datepicker.init(this.$refs.picker, {
      format: 'd.mm.yyyy',
      defaultDate: new Date(this.task.date),
      setDefaultDate: true,
    });
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  methods: {
    submitHandler() {
      this.$store.dispatch('updateTask', {
        id: this.task.id,
        description: this.description,
        date: this.date.date,
      });
      this.$router.push('/list');
    },

    completeTask() {
      this.$store.dispatch('completeTask', this.task.id);
      this.$router.push('/list');
    },

    destroyed() {
      if (this.date && this.date.destroy) {
        this.date.destroy();
      }

      if (this.chips && this.chips.destroy) {
        this.chips.destroy();
      }
    },
  },
  computed: {
    task() {
      return this.$store.getters.taskById(+this.$route.params.id);
    },
  },
};
</script>

<style lang="scss">
  .btn {
    margin-right: 25px;
    margin-top: 25px;

    &:last-child {
      margin-right: 0;
    }
  }
</style>
