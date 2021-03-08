<template>
  <v-container>
    <v-row v-for="item in items" :key="item.name">
      <v-col align="center">
        <v-card
          class="rounded-md mx-3 mx-md-12"
          style="max-width: 900px"
          align="start"
        >
          <router-link :to="`/pkg/${item.name}`" style="text-decoration: none;">
            <v-card-title class="pkg-title">
              <v-icon class="pkg-icon" color="white" size="96px"
                >mdi-package-variant</v-icon
              >
              <span class="pkg-title-text">{{ item.name }}</span>
            </v-card-title>
          </router-link>
          <v-card-text
            class="pt-3 px-6 pkg-text"
            style="text-align: justify; max-height: 196px !important"
          >
            <span v-if="item.homepage" style="width: 100%; text-align: right"
              ><a :href="item.homepage">{{ item.homepage }}</a
              ><br
            /></span>
            <span
              v-for="(par, idx) in Array.isArray(item.description)
                ? item.description
                : [item.description]"
              :key="idx"
              class="mb-4"
            >
              {{ par }}<br />
            </span>
            <br />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Search",

  props: {
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },

  data() {
    return {
      //
    };
  },
};
</script>

<style scoped>
.pkg-title {
  background-color: #028bcf;
  color: white;
  overflow: hidden;
  position: relative;
}
.pkg-title-text {
  z-index: 1;
  text-decoration: none;
}
.pkg-icon {
  position: absolute;
  right: -16px;
  top: -24px;
  z-index: 0;
  opacity: 0.2;
}
.pkg-text {
  text-overflow: ellipsis;
  overflow: hidden;
}
.pkg-text:after {
  content: "";
  text-align: right;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 48px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1) 75%
  );
}
</style>