<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline" style="z-index: 1">
        <span class="hidden-md-and-down">
          <router-link to="/" style="text-decoration: none">
            vcpkg index
          </router-link>
        </span>
      </v-toolbar-title>
      <!-- <v-spacer class="hidden-sm-and-down" style></v-spacer> -->
      <div style="position: absolute; top: -8px; left: 0px; width: 100%">
        <!-- class="hidden-sm-and-down"> -->
        <v-container
          style="
            z-index: 0;
            width: 100%;
            position: relative;
            display: flex;
            justify-content: center;
          "
          class="my-0 py-0"
        >
          <v-text-field
            solo
            dense
            prepend-inner-icon="mdi-magnify"
            clearable
            @keydown.enter="search_pkg(search)"
            @click:clear="search_pkg('')"
            v-model="search"
            label="Search vcpkg packages"
            style="max-width: 900px"
            class="mt-5 mx-3 mx-md-12"
          >
          </v-text-field>
        </v-container>
      </div>
    </v-app-bar>

    <v-main>
      <router-view :db="db" />
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
// process.platform = 'win64'; // patch platform to disable nedb directory fsync
const DB = require('nedb');

const browserfs = require('browserfs');
const fs_config = {
  fs: 'MountableFileSystem',
  options: {
    '/db': {
      fs: 'OverlayFS',
      options: {
        readable: {
          fs: 'HTTPRequest',
          options: {
            index: require('./../dbfs.json'),
            baseUrl: '/db',
          },
        },
        writable: {
          fs: 'InMemory'
        }
      }
    }
  }
};

export default {
  name: 'Index',
  data() {
    return {
      db: null, //new DB(),
      // packages: [],
      search: '',
    };
  },
  methods: {
    search_pkg(search) {
      if (this.$router.currentRoute.path != `/index/search/${search}`) {
        this.$router.push(`/index/search/${search}`);
      }
    },
  },
  computed: {},
  created() {
    /* eslint-disable-next-line no-useless-escape */
    let sp = this.$router.currentRoute.path.match(/\/search\/([^\/]*)\/?/);
    if (sp && sp[1] && sp[1] != '') {
      this.search = sp[1];
    }

    browserfs.configure(fs_config, (err) => {
      if (err) {
        console.error('error creating filesystem!');
        throw err;
      }

      this.db = new DB({ filename: '/db/vcpkg-index.nedb', autoload: true});
    });
  },
};
</script>

<style scoped>
</style>