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
              <span
                ><a :href="item.homepage">{{ item.homepage }}</a
                ><br
              /></span>
              <br>
            </template>
            <template v-if="item['maintainers']">
              <span class="subtitle-2">Maintainers</span><br>
              <span class="font-weight-light">
                {{ (Array.isArray(item.maintainers) ? item.maintainers : [item.maintainers]).join(', ') }}
                <br/>
              </span>
              <br>
            </template>
            <span class="subtitle-2">Latest Version</span><br>
            <span class="font-weight-light">{{ item['version'] || item['version-string'] }}</span>
            <template v-if="item['license']">
              <br>
              <span class="subtitle-2">License</span><br>
              <span class="font-weight-light">{{ item.license }}</span>
            </template>
            <template v-if="item['supports']">
              <br><br>
              <span class="subtitle-2">Supports</span><br>
              <template v-for="pf in resolvePlatforms(item['supports'])">
                <v-chip x-small style="color: white;" :color="pf[0] == '!' ? 'red' : 'green'" class="ma-1" :key="pf">{{ pf[0] == '!' ? pf.slice(1) : pf }}</v-chip>
              </template>
            </template>

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
              <span v-if="item['default-features']" class="font-weight-light">
                Default
                <v-chip x-small class="ma-1" v-for="df in item['default-features']" :key="df">
                  <a :href="`#${df}`" style="text-decoration: none;">
                    {{ df }}
                  </a>
                </v-chip>
              </span>
              <v-list>
                <template v-for="(feature, idx) in Object.keys(item.features)">
                <v-divider class="ml-5 mr-2 my-2" v-if="idx != 0"  :key="idx"></v-divider>
              <v-list-item three-line style="width: 100%" :key="feature">
                <v-list-item-content>
                  <v-list-item-title class="subtitle-2">
                                    <a :name="feature"></a>

                    {{ feature }}
                  </v-list-item-title>
                  <v-list-item-subtitle v-if="item.features[feature]['description']">
                    {{ item.features[feature]['description'] }}
                  </v-list-item-subtitle>
                  <template v-if="item.features[feature]['dependencies']">
                    <span class="font-weight-light">
                      Depends 
                      <v-chip x-small class="ma-1" v-for="(dep, idx) in item.features[feature]['dependencies']" :key="`${(typeof dep == 'string') ? dep : dep.name}-${idx}`">
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
              <v-chip small class="ma-1" v-for="(dep, idx) in item['dependencies']" :key="`${(typeof dep == 'string') ? dep : dep.name}-${idx}`">
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
const pfp = require('../platform-parser');

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
    resolvePlatforms(supports) {
      return pfp.parse(supports).sort();
    },
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