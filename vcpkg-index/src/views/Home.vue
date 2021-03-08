<template>
  <v-app>
    <v-main>
      <v-container style="width: 100%; position: relative; display: flex; align-content: center; justify-content: center;" fill-height class="my-0 py-0">
        <v-row>
          <v-col style="display: flex; justify-content: center;">
            <v-icon size="160" color="#028bcf">{{ search_focus ? 'mdi-package-variant' : 'mdi-package-variant-closed' }}</v-icon>
          </v-col>
        </v-row>
        <v-row>
          <v-col style="display: flex; justify-content: center;">
        <h1>vcpkg index</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col style="display: flex; justify-content: center;">
        <v-text-field
          solo dense
          prepend-inner-icon="mdi-magnify"
          clearable
          @keydown.enter="search_pkg(search)"
          @click:clear="search_pkg('')"
          @focus="search_focus = true"
          @blur="search_focus = false"
          v-model="search"
          label="Search vcpkg packages"
          style="max-width: 600px;"
          class="mt-5 mx-3 mx-md-12"
        >
        </v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {
      search: '',
      search_focus: false,
    };
  },
  methods: {
    search_pkg(search) {
      this.$router.push(`/index/search/${search}`);
    },
  },
};
</script>