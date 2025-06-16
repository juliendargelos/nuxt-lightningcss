<template>
  <div>basic</div>
</template>

<script setup>

</script>

<style>
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
