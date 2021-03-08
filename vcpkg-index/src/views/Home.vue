<template>
  <v-app>
    <v-main style="background-color: #f5f5f5;">
      <v-container style="width: 100%; position: relative; display: flex; align-content: center; justify-content: center;" fill-height class="my-0 py-0">
        <v-row>
          <v-col style="display: flex; justify-content: center;">
            <v-icon size="160" color="#028bcf" :class="search_focus_transition ? 'icon-rotate' : ''">
              {{ search_focus ? 'mdi-package-variant' : 'mdi-package-variant-closed' }}
            </v-icon>
          </v-col>
        </v-row>
        <v-row>
          <v-col style="display: flex; justify-content: center;">
            <h1 style="text-align: center;">vcpkg index</h1>
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
          @focus="animate_icon()"
          @blur="search_focus = false"
          v-model="search"
          label="Search vcpkg packages"
          style="max-width: 600px;"
          class="mt-5 mx-3 mx-md-12"
        >
        </v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-12">
          <v-col style="display: flex; justify-content: center;">
          <span class="caption mr-1" style="color: gray;">
            index built @
          </span>
          <span class="font-weight-thin caption" style="color: gray;">
            {{ timestamp }}
          </span>
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
      search_focus_transition: false,
      timestamp: process.env.VUE_APP_TIMESTAMP,
    };
  },
  methods: {
    search_pkg(search) {
      this.$router.push(`/index/search/${search}`);
    },
    animate_icon() {
      this.search_focus_transition = true;
      setTimeout(() => {
        this.search_focus = true;
        setTimeout(() => {
          this.search_focus_transition = false;
        }, 550);
      }, 250);
    }
  },
};
</script>

<style scoped>
.icon-rotate {
    -webkit-animation:spin 0.8s linear infinite;
    -moz-animation:spin 0.8s linear infinite;
    animation:spin 0.8s linear infinite;
}
@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
</style>