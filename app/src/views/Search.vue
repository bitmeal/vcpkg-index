<template>
  <v-container>
    <v-row v-for="item in items" :key="item.name">
      <v-col align="center">
        <v-card
          class="rounded-md mx-3 mx-md-12"
          style="max-width: 900px"
          align="start"
        >
          <router-link :to="`/index/pkg/${item.name}`" style="text-decoration: none;">
            <v-card-title class="pkg-title">
              <v-icon class="pkg-icon" color="white" size="96px"
                >mdi-package-variant-closed</v-icon
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
    <v-overlay style="height: 100vh" :value="loading" :absolute="true">
    <v-progress-circular
      indeterminate
      size="128"
    ></v-progress-circular>
  </v-overlay>

  </v-container>
</template>

<script>
export default {
  name: "Search",

  props: {
    db: {
      type: Object,
    },
    search: {
      type: String,
      default: () => {
        return '';
      },
    },
  },

  data() {
    return {
      items: [],
      loading: false,
    };
  },
  methods: {
    updatePackageSearch(search) {
      this.loading = true;
      // console.log(`update for search token ${search}`);
      if(search && search != null && search != '') {
        let query = {
            $or: search
                  .toLowerCase()
                  .split(/\s+/)
                  .filter( token => token != '' )
                  .map( token => token.trim() )
                  .map((token) => {
                    return {
                      fts: (new RegExp(token))
                    }
                  })
          };
        // console.log(query);
        // this.db.find({ fts: (new RegExp(search)) }, (err, docs) => {
        this.db.find(query)
          .sort({ name: 1 })
          .exec((err, docs) => {
            this.loading = false;
            if(!err) {
              this.items = docs;
            }
            else {
              console.error(`error fetching packages for search term '${search}' from db!`);
            }
          }
        );
      }
      else {
        this.db.find({})
          .sort({ name: 1 })
          .exec((err, docs) => {
            this.loading = false;
            if(!err) {
              this.items = docs;
            }
            else {
              console.error('error fetching all packages from db!');
            }
          });
      }
    },
  },
  watch: {
    search(val) { this.updatePackageSearch(val); }
  },
  created() {
    this.updatePackageSearch(this.search);
  }

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
  height: 42px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1) 75%
  );
}
</style>