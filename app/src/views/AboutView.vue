<template>
  <v-app>
    <v-main style="background-color: #f5f5f5">
      <v-container
        style="
          width: 100%;
          position: relative;
          display: flex;
          align-content: center;
          justify-content: center;
          max-width: 400px;
        "
        fill-height
        class="my-0 py-0"
      >
        <v-row>
          <v-col style="display: flex; justify-content: center">
            <v-icon
              size="160"
              color="#028bcf"
              :class="search_focus_transition ? 'icon-rotate' : ''"
            >
              mdi-package-variant
            </v-icon>
          </v-col>
        </v-row>
        <v-row>
          <v-col style="display: flex; justify-content: center">
            <h1 style="text-align: center">vcpkg index</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col style="display: flex; justify-content: center">
            <v-divider style="max-width: 400px" class="mx-2"></v-divider>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            style="display: flex; justify-content: center; text-align: center"
            class="px-4"
          >
            <span class="font-weight-light">
              an online index of packages for the
              <a href="https://github.com/microsoft/vcpkg/">vcpkg</a> package
              manager - updated every day at midnight
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            style="display: flex; justify-content: center; text-align: center"
            class="px-4"
          >
            <span class="font-weight-light font-italic">
              this project has no affiliation with Microsoft
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col style="display: flex; justify-content: center">
            <v-divider style="max-width: 400px" class="mx-2"></v-divider>
          </v-col>
        </v-row>
        <v-row>
          <v-col style="display: flex; justify-content: center">
            <strong>License</strong
            ><span class="mx-1"
              ><a href="http://www.mozilla.org/MPL/2.0/">MPL-2.0</a></span
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col style="display: flex; justify-content: center">
            <strong>Built by</strong><span class="mx-1">Arne Wendt</span
            ><v-icon>mdi-github</v-icon
            ><a href="http://github.com/bitmeal">bitmeal</a>
          </v-col>
        </v-row>
        <v-row>
          <v-col style="display: flex; justify-content: center">
            <strong>Source</strong>
            <span class="mx-1">
              <a href="http://github.com/bitmeal/vcpkg-index"
                >github.com/bitmeal/vcpkg-index</a
              >
            </span>
          </v-col>
        </v-row>
        <v-row class="mt-12">
          <v-col style="display: flex; justify-content: center">
            <span class="caption mr-1" style="color: gray"> built @ </span>
            <span class="font-weight-thin caption" style="color: gray">
              {{ timestamp }}
            </span>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer padless>
      <v-col class="text-right ma-0 py-0 px-3" cols="12">
        <span class="caption">
          <router-link to="/about" style="text-decoration: none">
            about
            <v-icon small class="mb-1 ml-1"> mdi-information </v-icon>
          </router-link>
        </span>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "AboutView",
  data() {
    return {
      timestamp: process.env.VUE_APP_TIMESTAMP,
    };
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>