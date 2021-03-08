<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="hidden-md-and-down">vcpkg index</span>
      </v-toolbar-title>
      <!-- <v-spacer class="hidden-sm-and-down" style></v-spacer> -->
      <div style="position: absolute; top: -8px; left: 0px; width: 100%;"> <!-- class="hidden-sm-and-down"> -->
      <v-container style="width: 100%; position: relative; display: flex; justify-content: center;" class="my-0 py-0">
        <v-text-field
          solo dense
          prepend-inner-icon="mdi-magnify"
          clearable
          @keydown.enter="search_pkg(search)"
          @click:clear="search_pkg('')"
          v-model="search"
          style="max-width: 900px;"
          class="mt-5 mx-3 mx-md-12"
        >
        </v-text-field>
      </v-container>
      </div>
    </v-app-bar>

    <v-main>
      <router-view :db="db"/>
    </v-main>
  </v-app>
</template>

<script>
const DB = require('nedb');

const index = require('./vcpkg-index.json');

export default {
  name: "App",
  data() {
    return {
      db: new DB(),
      packages: [],
      search: ''
    };
  },
  methods: {
    search_pkg(search) {
      if(this.$router.currentRoute.path != `/search/${search}`) {
        this.$router.push(`/search/${search}`);
      }
    },
  },
  computed: {
  },
  created() {
    this.db.insert(
      Object.values(index).map((pkg) => {
        // drop: $<key> and _id
        let drop_restricted = (obj) => {
          Object.keys(obj).forEach((key) => {
            if(key[0] == '$' || key == '_id') {
              delete obj[key];
            }
            if(typeof obj[key] === 'object' && obj[key] !== null) {
              drop_restricted(obj[key]);
            }
          })
        };
        drop_restricted(pkg);
        // make full text search property
        return Object.assign({},
          {fts: [
              pkg['name'] || '',
              pkg['homepage'] || '',
              ((m) => { return Array.isArray(m) ? m : [m]})(pkg['maintainers'] || []).join(' '),
              Object.keys(pkg['features'] || {}).map((feature) => {return `${feature} ${pkg.features[feature]['description'] || ''}`}).join(' '),
              (Array.isArray(pkg.description) ? pkg.description : [pkg.description]).join(' ')
            ]
            .join(' ')
            .toLowerCase()
          },
          pkg
        );
      }),
      (err, docs) => {
        this.packages = docs;
        
        if(err) {
          console.log(`an error occured while inserting packages to db: ${err}`);
        }
      }
    );
  }
};
</script>