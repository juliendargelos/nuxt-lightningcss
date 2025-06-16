<template>
  <div class="hey">
    hey
  </div>
</template>

<style scoped>
  .hey {
    background: green;
    width: 100px;
    height: 100px;

    @media (--desktop) {
      background: blue;
    }
  }
</style>
