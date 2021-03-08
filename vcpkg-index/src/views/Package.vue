<template>
  <v-container>
    <v-row>
      <v-col align="center">
        <v-card
          class="rounded-md mx-3 mx-md-12"
          style="max-width: 900px"
          align="start"
        >
          <v-card-title class="pkg-title">
            <v-icon class="pkg-icon" color="white" size="96px"
              >mdi-package-variant</v-icon
            >
            <span style="z-index: 1">{{ item.name }}</span>
          </v-card-title>
          <v-card-text class="pt-3 px-6 pkg-text" style="text-align: justify">
            <template v-if="item['homepage']">
              <span class="subtitle-2">Homepage</span><br>
              <span style="width: 100%; text-align: right"
                ><a :href="item.homepage">{{ item.homepage }}</a
                ><br
              /></span>
              <br>
            </template>
            <template v-if="item['maintainers']">
              <span class="subtitle-2">Maintainers</span><br>
              <span class="font-weight-light" style="width: 100%; text-align: right">
                {{ (Array.isArray(item.maintainers) ? item.maintainers : [item.maintainers]).join(', ') }}
                <br/>
              </span>
              <br>
            </template>
            <span class="subtitle-2">Latest Version</span><br>
            <span class="font-weight-light">{{ item['version-string'] }}</span>
            <v-divider class="mx-0 my-5"></v-divider>
            <template
              v-for="(par, idx) in Array.isArray(item.description)
                ? item.description
                : [item.description]"
            >
            <span :key="idx" class="mb-4 font-weight-medium font-italic" v-if="item['description'] && (Array.isArray(item.description) && item.description.length > 1 && idx == 0)" >
              {{ par }}<br /><br />
            </span>
            <span :key="idx" class="mb-4" v-if="item['description'] && (typeof item.description == 'string' || item.description.length == 1 || idx != 0)">
              {{ par }}<br />
            </span>
            </template>
            <template v-if="item['features']">
              <v-divider class="mx-0 my-5"></v-divider>
              <span class="subtitle-2">Features</span><br>
              <v-list>
                <template v-for="(feature, idx) in Object.keys(item.features)">
                <v-divider class="ml-5 mr-2 my-2" v-if="idx != 0"  :key="idx"></v-divider>
              <v-list-item three-line style="width: 100%" :key="feature">
                <v-list-item-content>
                  <v-list-item-title class="subtitle-2">
                    {{ feature }}
                  </v-list-item-title>
                  <v-list-item-subtitle v-if="item.features[feature]['description']">
                    {{ item.features[feature]['description'] }}
                  </v-list-item-subtitle>
                  <template v-if="item.features[feature]['dependencies']">
                    <span class="font-weight-light">
                      Depends 
                      <v-chip x-small class="ma-1" v-for="(dep, idx) in item.features[feature]['dependencies']" :key="((typeof dep == 'string') ? dep : dep.name) + `${idx}`">
                        <router-link :to="`/pkg/${(typeof dep == 'string') ? dep : dep.name}`" style="text-decoration: none;" >
                          {{ (typeof dep == 'string') ? dep : dep.name }}
                        </router-link>
                      </v-chip>
                    </span>
                  </template>
                </v-list-item-content>
              </v-list-item>
                </template>
              </v-list>
            </template>
            <template v-if="item['dependencies']">
            <v-divider class="mx-0 my-5"></v-divider>
              <span class="subtitle-2">Dependencies</span><br>
              <v-chip small class="ma-1" v-for="dep in item['dependencies']" :key="(typeof dep == 'string') ? dep : dep.name">
                <router-link :to="`/pkg/${(typeof dep == 'string') ? dep : dep.name}`" style="text-decoration: none;" >
                  {{ (typeof dep == 'string') ? dep : dep.name }}
                </router-link>
              </v-chip>
            </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Package",

  props: {
    name: {
      type: String,
    },
    db: {
      type: Object,
    },
  },

  data() {
    return {
      item: {},
    };
  },
  methods: {
    getPackage(name) {
      this.db.find({ name: name }, (err, docs) => {
        if(err) {
          console.log(`${err} thrown while fetching ${name}`);
        }
        else if (docs.length == 0) {
          console.log(`could not retrieve ${name} from database!`);
        }
        else {
          if(docs.length != 1) {
            console.log(`multiple results for ${name}; using first!`);
          }
          console.log(docs[0]);
          this.item = docs[0];
        }
      });
    }
  },
  watch: {
    name(val) { this.getPackage(val); }
  },
  created() {
    this.getPackage(this.name);
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
.pkg-icon {
  position: absolute;
  right: -16px;
  top: -24px;
  z-index: 0;
  opacity: 0.2;
}
</style>