<template>
  <div>basic</div>
</template>

<script setup>

</script>

<style lang="postcss">
  .a {
    color: blue;

    .b {
      color: black;
    }
  }

  @media (--desktop) {
    .a {
      color: yellow;
    }
  }
</style>
