<template>
  <div class="hey">
    hey
  </div>
</template>

<style scoped lang="postcss">
  .hey {
    background: green;
    width: 100px;
    height: 100px;

    @media (--desktop) {
      background: blue;
    }
  }
</style>
