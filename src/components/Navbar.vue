<template>
  <div>
    <nav class=" blue-grey darken-3">
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo left">Tasks</router-link>
      <ul class="right nav">
        <router-link
          tag="li"
          to="/"
          exact
          active-class="active"
        >
          <a>Добаить задачу</a>
        </router-link>
        <router-link
          tag="li"
          to="/list"
          active-class="active"
        >
          <a>Список задач</a>
        </router-link>
      </ul>
    </div>
  </nav>
  </div>
</template>

<style lang="scss">
  nav {
    padding: 0 25px;
  }

  .nav {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
</style>
