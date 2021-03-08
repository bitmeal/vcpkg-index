<template>
  <router-view :search="search" />
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      search: '',
    };
  },
};
</script>