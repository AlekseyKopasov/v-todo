<template>
  <div class="task">
    <h1>Новая задача</h1>

    <div class="row">
      <div class="cols6 offset-s3">
        <form @submit.prevent="submitHandler">
          <div class="input-field">
            <input v-model="title" id="title" type="text" class="validate" required>
            <label for="title">Заголовок задачи</label>
            <span class="helper-text" data-error="Это поле обязательно для заполнения"></span>
          </div>
          <div class="chips" ref="chips"></div>
          <div class="input-field">
            <textarea v-model="description" id="description" class="materialize-textarea" maxlength="2040"></textarea>
            <label for="description">Описание задачи</label>
            <span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/2040</span>
          </div>
          <input type="text" class="datepicker" ref="picker">
          <button class="btn" type="submit">Создать задачу</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'create',
  data: () => ({
    description: '',
    title: '',
    chips: null,
    date: null,
  }),
  mounted() {
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'Добавить тег',
    });
    M.updateTextFields();
    this.date = M.Datepicker.init(this.$refs.picker, {
      format: 'd.mm.yyyy',
      defaultDate: new Date(),
      setDefaultDate: true,
    });
  },
  methods: {
    submitHandler() {
      const task = {
        title: this.title,
        description: this.description,
        id: Date.now(),
        status: 'active',
        tags: this.chips.chipsData,
        date: this.date.date,
      };

      this.$store.dispatch('createTask', task);
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
};
</script>

<style lang="scss">
  h1 {
    text-align: center;
  }

  .task {
    max-width: 640px;
    margin: 0 auto;
  }
</style>
