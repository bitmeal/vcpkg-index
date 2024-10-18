(function(){var t={1573:function(t,e,s){const a=s(9539),i=s(978),n=s(5210);i.constants=n,i.__mkdir=i.mkdir,delete i.mkdir,i.mkdir=function(t,e,s){this.existsSync(t)&&e.recursive?s():this.__mkdir(t,"object"===typeof e&&e.mode?e.mode:e,s)}.bind(i);const r=t=>new Proxy(t,{get:(t,e)=>e in t&&t[e]instanceof Function?a.promisify(t[e]):t[e]});let o=i.promises||r(i);i.promises=o,t.exports=i},1708:function(t,e,s){"use strict";var a=s(144),i=function(){var t=this,e=t._self._c;return e("router-view",{attrs:{search:t.search}})},n=[],r={name:"App",data(){return{search:""}}},o=r,c=s(1001),l=(0,c.Z)(o,i,n,!1,null,null,null),p=l.exports,u=s(8345),m=s(1096),f=s(4437),d=s(1200),h=s(3584),y=s(5057),g=s(3551),_=s(5294),x=s(8864),v=function(){var t=this,e=t._self._c;return e(m.Z,[e(g.Z,{staticStyle:{"background-color":"#f5f5f5"}},[e(d.Z,{staticClass:"my-0 py-0",staticStyle:{width:"100%",position:"relative",display:"flex","align-content":"center","justify-content":"center"},attrs:{"fill-height":""}},[e(_.Z,[e(f.Z,{staticStyle:{display:"flex","justify-content":"center"}},[e(y.Z,{class:t.search_focus_transition?"icon-rotate":"",attrs:{size:"160",color:"#028bcf"}},[t._v(" "+t._s(t.search_focus?"mdi-package-variant":"mdi-package-variant-closed")+" ")])],1)],1),e(_.Z,[e(f.Z,{staticStyle:{display:"flex","justify-content":"center"}},[e("h1",{staticStyle:{"text-align":"center"}},[t._v("vcpkg index")])])],1),e(_.Z,[e(f.Z,{staticStyle:{display:"flex","justify-content":"center"}},[e(x.Z,{ref:"searchBarHome",staticClass:"mt-5 mx-3 mx-md-12",staticStyle:{"max-width":"600px"},attrs:{solo:"",dense:"","prepend-inner-icon":"mdi-magnify",clearable:"",label:"Search vcpkg packages"},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search_pkg(t.search)},"click:clear":function(e){return t.search_pkg("")},focus:function(e){return t.animate_icon()},blur:function(e){t.search_focus=!1}},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)],1),e(_.Z,{staticClass:"mt-12"},[e(f.Z,{staticStyle:{display:"flex","justify-content":"center"}},[e("span",{staticClass:"caption mr-1",staticStyle:{color:"gray"}},[t._v(" index built @ ")]),e("span",{staticClass:"font-weight-thin caption",staticStyle:{color:"gray"}},[t._v(" "+t._s(t.timestamp)+" ")])])],1)],1)],1),e(h.Z,{attrs:{padless:""}},[e(f.Z,{staticClass:"text-right ma-0 py-0 px-3",attrs:{cols:"12"}},[e("span",{staticClass:"caption"},[e("router-link",{staticStyle:{"text-decoration":"none"},attrs:{to:"/about"}},[t._v(" about "),e(y.Z,{staticClass:"mb-1 ml-1",attrs:{small:""}},[t._v(" mdi-information ")])],1)],1)])],1)],1)},b=[],k=(s(7658),{name:"HomeView",data(){return{search:"",search_focus:!1,search_focus_transition:!1,timestamp:"2024-10-18T00:10:09.153Z"}},methods:{search_pkg(t){this.$router.push(`/index/search/${t}`)},animate_icon(){this.search_focus_transition=!0,setTimeout((()=>{this.search_focus=!0,setTimeout((()=>{this.search_focus_transition=!1}),550)}),300)}},mounted(){this.$nextTick((()=>{setTimeout((()=>{this.$refs["searchBarHome"].$refs.input.focus()}))}))}}),Z=k,C=(0,c.Z)(Z,v,b,!1,null,"037c6b97",null),S=C.exports,w=s(4192),$=function(){var t=this,e=t._self._c;return e(m.Z,[e(g.Z,{staticStyle:{"background-color":"#f5f5f5"}},[e(d.Z,{staticClass:"my-0 py-0",staticStyle:{width:"100%",position:"relative",display:"flex","align-content":"center","justify-content":"center","max-width":"400px"},attrs:{"fill-height":""}},[e(_.Z,[e(f.Z,{staticStyle:{display:"flex","justify-content":"center"}},[e(y.Z,{class:t.search_focus_transition?"icon-rotate":"",attrs:{size:"160",color:"#028bcf"}},[t._v(" mdi-package-variant ")])],1)],1),e(_.Z,[e(f.Z,{staticStyle:{display:"flex","justify-content":"center"}},[e("h1",{staticStyle:{"text-align":"center"}},[t._v("vcpkg index")])])],1),e(_.Z,[e(f.Z,{staticStyle:{display:"flex","justify-content":"center"}},[e(w.Z,{staticClass:"mx-2",staticStyle:{"max-width":"400px"}})],1)],1),e(_.Z,[e(f.Z,{staticClass:"px-4",staticStyle:{display:"flex","justify-content":"center","text-align":"center"}},[e("span",{staticClass:"font-weight-light"},[t._v(" an online index of packages for the "),e("a",{attrs:{href:"https://github.com/microsoft/vcpkg/"}},[t._v("vcpkg")]),t._v(" package manager - updated every day at midnight ")])])],1),e(_.Z,[e(f.Z,{staticClass:"px-4",staticStyle:{display:"flex","justify-content":"center","text-align":"center"}},[e("span",{staticClass:"font-weight-light font-italic"},[t._v(" this project has no affiliation with Microsoft ")])])],1),e(_.Z,[e(f.Z,{staticStyle:{display:"flex","justify-content":"center"}},[e(w.Z,{staticClass:"mx-2",staticStyle:{"max-width":"400px"}})],1)],1),e(_.Z,[e(f.Z,{staticStyle:{display:"flex","justify-content":"center"}},[e("strong",[t._v("License")]),e("span",{staticClass:"mx-1"},[e("a",{attrs:{href:"http://www.mozilla.org/MPL/2.0/"}},[t._v("MPL-2.0")])])])],1),e(_.Z,[e(f.Z,{staticStyle:{display:"flex","justify-content":"center"}},[e("strong",[t._v("Built by")]),e("span",{staticClass:"mx-1"},[t._v("Arne Wendt")]),e(y.Z,[t._v("mdi-github")]),e("a",{attrs:{href:"http://github.com/bitmeal"}},[t._v("bitmeal")])],1)],1),e(_.Z,[e(f.Z,{staticStyle:{display:"flex","justify-content":"center"}},[e("strong",[t._v("Source")]),e("span",{staticClass:"mx-1"},[e("a",{attrs:{href:"http://github.com/bitmeal/vcpkg-index"}},[t._v("github.com/bitmeal/vcpkg-index")])])])],1),e(_.Z,{staticClass:"mt-12"},[e(f.Z,{staticStyle:{display:"flex","justify-content":"center"}},[e("span",{staticClass:"caption mr-1",staticStyle:{color:"gray"}},[t._v(" built @ ")]),e("span",{staticClass:"font-weight-thin caption",staticStyle:{color:"gray"}},[t._v(" "+t._s(t.timestamp)+" ")])])],1)],1)],1),e(h.Z,{attrs:{padless:""}},[e(f.Z,{staticClass:"text-right ma-0 py-0 px-3",attrs:{cols:"12"}},[e("span",{staticClass:"caption"},[e("router-link",{staticStyle:{"text-decoration":"none"},attrs:{to:"/about"}},[t._v(" about "),e(y.Z,{staticClass:"mb-1 ml-1",attrs:{small:""}},[t._v(" mdi-information ")])],1)],1)])],1)],1)},j=[],P={name:"AboutView",data(){return{timestamp:"2024-10-18T00:10:09.153Z"}}},O=P,T=(0,c.Z)(O,$,j,!1,null,"2768e8f7",null),A=T.exports,z=s(5378),E=s(2370),M=function(){var t=this,e=t._self._c;return e(m.Z,[e(z.Z,{attrs:{app:""}},[e(E.qW,{staticClass:"headline",staticStyle:{"z-index":"1"}},[e("span",{staticClass:"hidden-md-and-down"},[e("router-link",{staticStyle:{"text-decoration":"none"},attrs:{to:"/"}},[t._v(" vcpkg index ")])],1)]),e("div",{staticStyle:{position:"absolute",top:"-8px",left:"0px",width:"100%"}},[e(d.Z,{staticClass:"my-0 py-0",staticStyle:{"z-index":"0",width:"100%",position:"relative",display:"flex","justify-content":"center"}},[e(x.Z,{staticClass:"mt-5 mx-3 mx-md-12",staticStyle:{"max-width":"900px"},attrs:{solo:"",dense:"","prepend-inner-icon":"mdi-magnify",clearable:"",label:"Search vcpkg packages"},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search_pkg(t.search)},"click:clear":function(e){return t.search_pkg("")}},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)],1)],1),e(g.Z,[e("router-view",{attrs:{db:t.db}})],1),e(h.Z,{attrs:{padless:""}},[e(f.Z,{staticClass:"text-right ma-0 py-0 px-3",attrs:{cols:"12"}},[e("span",{staticClass:"caption"},[e("router-link",{staticStyle:{"text-decoration":"none"},attrs:{to:"/about"}},[t._v(" about "),e(y.Z,{staticClass:"mb-1 ml-1",attrs:{small:""}},[t._v(" mdi-information ")])],1)],1)])],1)],1)},B=[];const L=s(5072),F=s(3229),H={fs:"MountableFileSystem",options:{"/db":{fs:"OverlayFS",options:{readable:{fs:"HTTPRequest",options:{index:s(1545),baseUrl:"/db"}},writable:{fs:"InMemory"}}}}};var V={name:"IndexView",data(){return{db:null,search:""}},methods:{search_pkg(t){this.$router.currentRoute.path!=`/index/search/${t}`&&this.$router.push(`/index/search/${t}`)}},computed:{},created(){let t=this.$router.currentRoute.path.match(/\/search\/([^\/]*)\/?/);t&&t[1]&&""!=t[1]&&(this.search=t[1]),F.configure(H,(t=>{if(t)throw console.error("error creating filesystem!"),t;this.db=new L({filename:"/db/vcpkg-index.nedb",autoload:!0})}))}},R=V,D=(0,c.Z)(R,M,B,!1,null,"df03eb62",null),I=D.exports,q=s(3440),U=s(5223),W=s(8236),J=s(6275),N=function(){var t=this,e=t._self._c;return e(d.Z,[t._l(t.items,(function(s){return e(_.Z,{key:s.name},[e(f.Z,{attrs:{align:"center"}},[e(q.Z,{staticClass:"rounded-md mx-3 mx-md-12",staticStyle:{"max-width":"900px"},attrs:{align:"start"}},[e("router-link",{staticStyle:{"text-decoration":"none"},attrs:{to:`/index/pkg/${s.name}`}},[e(U.EB,{staticClass:"pkg-title"},[e(y.Z,{staticClass:"pkg-icon",attrs:{color:"white",size:"96px"}},[t._v("mdi-package-variant-closed")]),e("span",{staticClass:"pkg-title-text"},[t._v(t._s(s.name))])],1)],1),e(U.ZB,{staticClass:"pt-3 px-6 pkg-text",staticStyle:{"text-align":"justify","max-height":"196px !important"}},[s.homepage?e("span",{staticStyle:{width:"100%","text-align":"right"}},[e("a",{attrs:{href:s.homepage}},[t._v(t._s(s.homepage))]),e("br")]):t._e(),t._l(Array.isArray(s.description)?s.description:[s.description],(function(s,a){return e("span",{key:a,staticClass:"mb-4"},[t._v(" "+t._s(s)),e("br")])})),e("br")],2)],1)],1)],1)})),e(W.Z,{staticStyle:{height:"100vh"},attrs:{value:t.loading,absolute:!0}},[e(J.Z,{attrs:{indeterminate:"",size:"128"}})],1)],2)},G=[],K={name:"SearchComponent",props:{db:{type:Object},search:{type:String,default:()=>""}},data(){return{items:[],loading:!1}},methods:{updatePackageSearch(t){if(this.loading=!0,t&&null!=t&&""!=t){let e={$or:t.toLowerCase().split(/\s+/).filter((t=>""!=t)).map((t=>t.trim())).map((t=>({fts:new RegExp(t)})))};this.db.find(e).sort({name:1}).exec(((e,s)=>{this.loading=!1,e?console.error(`error fetching packages for search term '${t}' from db!`):this.items=s}))}else this.db.find({}).sort({name:1}).exec(((t,e)=>{this.loading=!1,t?console.error("error fetching all packages from db!"):this.items=e}))}},watch:{search(t){this.updatePackageSearch(t)}},created(){this.updatePackageSearch(this.search)}},Q=K,X=(0,c.Z)(Q,N,G,!1,null,"80f09556",null),Y=X.exports,tt=s(4944),et=s(248),st=s(1908),at=s(8153),it=s(2595),nt=function(){var t=this,e=t._self._c;return e(d.Z,[e(_.Z,[e(f.Z,{attrs:{align:"center"}},[e(q.Z,{staticClass:"rounded-md mx-3 mx-md-12",staticStyle:{"max-width":"900px"},attrs:{align:"start"}},[e(U.EB,{staticClass:"pkg-title"},[e(y.Z,{staticClass:"pkg-icon",attrs:{color:"white",size:"96px"}},[t._v("mdi-package-variant")]),e("span",{staticStyle:{"z-index":"1"}},[t._v(t._s(t.item.name))])],1),e(U.ZB,{staticClass:"pt-3 px-6 pkg-text",staticStyle:{"text-align":"justify"}},[t.item["homepage"]?[e("span",{staticClass:"subtitle-2"},[t._v("Homepage")]),e("br"),e("span",[e("a",{attrs:{href:t.item.homepage}},[t._v(t._s(t.item.homepage))]),e("br")]),e("br")]:t._e(),t.item["maintainers"]?[e("span",{staticClass:"subtitle-2"},[t._v("Maintainers")]),e("br"),e("span",{staticClass:"font-weight-light"},[t._v(" "+t._s((Array.isArray(t.item.maintainers)?t.item.maintainers:[t.item.maintainers]).join(", "))+" "),e("br")]),e("br")]:t._e(),e("span",{staticClass:"subtitle-2"},[t._v("Latest Version")]),e("br"),e("span",{staticClass:"font-weight-light"},[t._v(t._s(t.item["version"]||t.item["version-string"]||t.item["version-semver"]))]),t.item["license"]?[e("br"),e("br"),e("span",{staticClass:"subtitle-2"},[t._v("License")]),e("br"),e("span",{staticClass:"font-weight-light"},[t._v(t._s(t.item.license))])]:t._e(),t.item["supports"]?[e("br"),e("br"),e("span",{staticClass:"subtitle-2"},[t._v("Supports")]),e("br"),t._l(t.resolvePlatforms(t.item["supports"]),(function(s){return[e(tt.Z,{key:s,staticClass:"ma-1",staticStyle:{color:"white"},attrs:{"x-small":"",color:"!"==s[0]?"red":"green"}},[t._v(t._s("!"==s[0]?s.slice(1):s))])]}))]:t._e(),e(w.Z,{staticClass:"mx-0 my-5"}),t._l(Array.isArray(t.item.description)?t.item.description:[t.item.description],(function(s,a){return[t.item["description"]&&Array.isArray(t.item.description)&&t.item.description.length>1&&0==a?e("span",{key:a,staticClass:"mb-4 font-weight-medium font-italic"},[t._v(" "+t._s(s)),e("br"),e("br")]):t._e(),!t.item["description"]||"string"!=typeof t.item.description&&1!=t.item.description.length&&0==a?t._e():e("span",{key:a,staticClass:"mb-4"},[t._v(" "+t._s(s)),e("br")])]})),t.item["features"]?[e(w.Z,{staticClass:"mx-0 my-5"}),e("span",{staticClass:"subtitle-2"},[t._v("Features")]),e("br"),t.item["default-features"]?e("span",{staticClass:"font-weight-light"},[t._v(" Default "),t._l(t.item["default-features"],(function(s){return e(tt.Z,{key:s,staticClass:"ma-1",attrs:{"x-small":""}},[e("a",{staticStyle:{"text-decoration":"none"},attrs:{href:`#${s}`}},[t._v(" "+t._s(s)+" ")])])}))],2):t._e(),e(et.Z,[t._l(Object.keys(t.item.features),(function(s,a){return[0!=a?e(w.Z,{key:a,staticClass:"ml-5 mr-2 my-2"}):t._e(),e(st.Z,{key:s,staticStyle:{width:"100%"},attrs:{"three-line":""}},[e(at.km,[e(at.V9,{staticClass:"subtitle-2"},[e("a",{attrs:{name:s}}),t._v(" "+t._s(s)+" ")]),t.item.features[s]["description"]?e(at.oZ,[t._v(" "+t._s(t.item.features[s]["description"])+" ")]):t._e(),t.item.features[s]["dependencies"]?[e("span",{staticClass:"font-weight-light"},[t._v(" Depends "),t._l(t.item.features[s]["dependencies"],(function(s,a){return e(it.Z,{key:`${"string"==typeof s?s:s.name}-${a}`,attrs:{bottom:"",disabled:!s["platform"]},scopedSlots:t._u([{key:"activator",fn:function({on:a,attrs:i}){return[e(tt.Z,t._g(t._b({staticClass:"ma-1",attrs:{"x-small":""}},"v-chip",i,!1),a),[e("router-link",{staticStyle:{"text-decoration":"none"},attrs:{to:`/index/pkg/${"string"==typeof s?s:s.name}`}},[t._v(" "+t._s("string"==typeof s?s:s.name)+" "),s["features"]?[e("span",{staticClass:"font-italic"},[t._v(" [ "),t._l(s.features,(function(a,i){return e("router-link",{key:`${"string"==typeof s?s:s.name}-${a}`,staticStyle:{"text-decoration":"none"},attrs:{to:`/index/pkg/${"string"==typeof s?s:s.name}#${a}`}},[t._v(" "+t._s(`${i?", ":""}${a}`)+" ")])})),t._v(" ] ")],2)]:t._e()],2)],1)]}}],null,!0)},[t._l(t.resolvePlatforms(s["platform"]||""),(function(s){return[e(tt.Z,{key:s,staticClass:"ma-1",staticStyle:{color:"white"},attrs:{"x-small":"",color:"!"==s[0]?"red":"green"}},[t._v(t._s("!"==s[0]?s.slice(1):s))])]}))],2)}))],2)]:t._e()],2)],1)]}))],2)]:t._e(),t.item["dependencies"]?[e(w.Z,{staticClass:"mx-0 my-5"}),e("span",{staticClass:"subtitle-2"},[t._v("Dependencies")]),e("br"),t._l(t.item["dependencies"],(function(s,a){return e(tt.Z,{key:`${"string"==typeof s?s:s.name}-${a}`,staticClass:"ma-1",attrs:{small:""}},[e("router-link",{staticStyle:{"text-decoration":"none"},attrs:{to:`/index/pkg/${"string"==typeof s?s:s.name}`}},[t._v(" "+t._s("string"==typeof s?s:s.name)+" "),s["features"]?[e("span",{staticClass:"font-italic"},[t._v(" [ "),t._l(s.features,(function(a,i){return e("router-link",{key:`${"string"==typeof s?s:s.name}-${a}`,staticStyle:{"text-decoration":"none"},attrs:{to:`/index/pkg/${"string"==typeof s?s:s.name}#${a}`}},[t._v(" "+t._s(`${i?",":""}${a}`)+" ")])})),t._v(" ] ")],2)]:t._e()],2)],1)}))]:t._e()],2)],1)],1)],1)],1)},rt=[];const ot=s(2914);var ct={name:"PackageComponent",props:{name:{type:String},db:{type:Object}},data(){return{item:{}}},methods:{resolvePlatforms(t){return ot.parse(t).sort()},getPackage(t){this.db.find({name:t},((e,s)=>{e?console.error(`${e} thrown while fetching ${t}`):0==s.length?console.error(`could not retrieve ${t} from database!`):(1!=s.length&&console.warn(`multiple results for ${t}; using first!`),this.item=s[0])}))}},watch:{name(t){this.getPackage(t)}},created(){this.getPackage(this.name)}},lt=ct,pt=(0,c.Z)(lt,nt,rt,!1,null,"722f3273",null),ut=pt.exports;a.ZP.use(u.ZP);const mt=[{path:"/",name:"home",component:S},{path:"/about",name:"about",component:A},{path:"/index",name:"index",component:I,children:[{path:"/index",name:"searchindex",component:Y},{path:"/index/search",name:"searchall",component:Y},{path:"/index/search/:search",name:"search",props:!0,component:Y},{path:"/index/pkg/:name",name:"package",props:!0,component:ut}]}],ft=new u.ZP({mode:"history",base:"/",routes:mt});var dt=ft,ht=s(3806);a.ZP.use(ht.Z);var yt=new ht.Z({});a.ZP.config.productionTip=!1,new a.ZP({router:dt,vuetify:yt,render:t=>t(p)}).$mount("#app")},2914:function(t,e,s){s(7658);const a=s(3612);function i(t){let e=a(t),s=t=>{let e=t=>t.sort((t=>t.search(/^((arm)|x)((86)|(64)|(hf))?/))).join("-");switch(t.type){case"Compound":return[];case"Identifier":return[t.name];case"UnaryExpression":return s(t.argument).map((e=>`${t.operator}${e}`));case"BinaryExpression":case"LogicalExpression":switch(t.operator){case"||":case"|":return[...s(t.left),...s(t.right)];case"&&":case"&":var a=s(t.right),i=s(t.left);return[...new Set(i.reduce(((t,s)=>(t.push(...a.reduce(((t,a)=>("!"==s[0]&&"!"==a[0]?i.filter((t=>"!"!=t[0])).length?t.push(s):t.push(s,a):"!"!=s[0]&&"!"!=a[0]?t.push(e([s,a])):"!"!=s[0]?(t.push(s),t.push("!"+e([s,a.slice(1)]))):(t.push(a),t.push("!"+e([s.slice(1),a]))),t)),[])),t)),[]))].sort((t=>"!"==t[0]))}}};return s(e)}t.exports.parse=i},1545:function(t){"use strict";t.exports=JSON.parse('{"vcpkg-index.nedb":null}')}},e={};function s(a){var i=e[a];if(void 0!==i)return i.exports;var n=e[a]={id:a,loaded:!1,exports:{}};return t[a].call(n.exports,n,n.exports,s),n.loaded=!0,n.exports}s.m=t,function(){var t=[];s.O=function(e,a,i,n){if(!a){var r=1/0;for(p=0;p<t.length;p++){a=t[p][0],i=t[p][1],n=t[p][2];for(var o=!0,c=0;c<a.length;c++)(!1&n||r>=n)&&Object.keys(s.O).every((function(t){return s.O[t](a[c])}))?a.splice(c--,1):(o=!1,n<r&&(r=n));if(o){t.splice(p--,1);var l=i();void 0!==l&&(e=l)}}return e}n=n||0;for(var p=t.length;p>0&&t[p-1][2]>n;p--)t[p]=t[p-1];t[p]=[a,i,n]}}(),function(){s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,{a:e}),e}}(),function(){s.d=function(t,e){for(var a in e)s.o(e,a)&&!s.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){s.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t}}(),function(){var t={143:0};s.O.j=function(e){return 0===t[e]};var e=function(e,a){var i,n,r=a[0],o=a[1],c=a[2],l=0;if(r.some((function(e){return 0!==t[e]}))){for(i in o)s.o(o,i)&&(s.m[i]=o[i]);if(c)var p=c(s)}for(e&&e(a);l<r.length;l++)n=r[l],s.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return s.O(p)},a=self["webpackChunkvcpkg_index"]=self["webpackChunkvcpkg_index"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=s.O(void 0,[998],(function(){return s(1708)}));a=s.O(a)})();
//# sourceMappingURL=app.6a56f9ce.js.map