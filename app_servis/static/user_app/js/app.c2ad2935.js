(function(){"use strict";var t={3539:function(t,r,e){var n=e(7195),o=function(){var t=this,r=t._self._c;return r("div",{attrs:{id:"app"}},[r("Header"),r("nav",[r("router-link",{attrs:{to:"/"}},[t._v(" Proizvodi ")]),t._v(" | "),r("router-link",{attrs:{to:"/create-order"}},[t._v(" Kreiraj narudžbinu ")])],1),r("router-view")],1)},u=[],i=function(){var t=this;t._self._c;return t._m(0)},c=[function(){var t=this,r=t._self._c;return r("div",{staticClass:"header"},[r("h1",[t._v(" Cvećara Božur ")])])}],s={name:"Header"},a=s,d=e(1001),l=(0,d.Z)(a,i,c,!1,null,"6de3897c",null),p=l.exports,f={name:"App",components:{Header:p}},v=f,h=(0,d.Z)(v,o,u,!1,null,null,null),m=h.exports,_=e(2241),P=function(){var t=this,r=t._self._c;return r("div",{staticClass:"products-view"},[r("ProductList")],1)},g=[],C=function(){var t=this,r=t._self._c;return r("div",{staticClass:"product-list"},t._l(t.products,(function(t){return r("Product",{key:t.id,attrs:{product:t}})})),1)},y=[],b=function(){var t=this,r=t._self._c;return r("div",{staticClass:"product-card"},[r("input",{attrs:{type:"hidden"},domProps:{value:t.product.id}}),r("div",{staticClass:"product-info"},[r("h2",[t._v(t._s(t.product.naziv))]),r("p",{staticClass:"description"},[t._v(t._s(t.product.opis))]),r("p",{staticClass:"category"},[t._v("Kategorija: "+t._s(t.product.kategorija.naziv))]),r("p",{staticClass:"price"},[t._v("Cena: "+t._s(t.product.cena)+" RSD")])]),r("router-link",{attrs:{to:{name:"product-details",params:{id:t.product.id}}}},[r("button",{on:{click:function(r){return t.setCurrentProduct(t.product.id)}}},[t._v(" Detalji ")])])],1)},w=[],T={name:"Product",props:{product:Object},methods:{setCurrentProduct(t){this.$store.dispatch("setCurrentProductId",t)}}},I=T,S=(0,d.Z)(I,b,w,!1,null,"88c4f496",null),E=S.exports,O=e(408),k={name:"ProductList",components:{Product:E},computed:{...(0,O.rn)(["products","productIds"])},methods:{...(0,O.nv)(["fetchProducts"])},async mounted(){await this.fetchProducts()}},x=k,j=(0,d.Z)(x,C,y,!1,null,"306cb6e0",null),R=j.exports,D={name:"ProductsView",components:{ProductList:R},data(){return{products:[],current:0,productsPerPage:10}}},N=D,Z=(0,d.Z)(N,P,g,!1,null,"0f2f534f",null),U=Z.exports,A=function(){var t=this,r=t._self._c;return r("div",{staticClass:"details-view"},[r("ProductDetails",{key:t.localId,attrs:{id:t.localId}}),r("div",{staticClass:"navigation-buttons"},[r("button",{attrs:{disabled:t.isFirstItem},on:{click:t.showPrevious}},[t._v("Previous")]),r("button",{attrs:{disabled:t.isLastItem},on:{click:t.showNext}},[t._v("Next")])])],1)},L=[],z=function(){var t=this,r=t._self._c;return r("div",{staticClass:"product-details-container"},[r("div",{staticClass:"product-details"},[t.currentProduct&&0!==Object.keys(t.currentProduct).length?r("div",[r("h2",[t._v(t._s(t.currentProduct.naziv))]),r("p",{staticClass:"wrap-text"},[t._v(" "+t._s(t.currentProduct.opis))]),r("p",[t._v("Cena: "+t._s(t.currentProduct.cena)+" RSD")]),t.currentProduct.cvetovi&&t.currentProduct.cvetovi.length?r("div",[r("h3",[t._v("Cvetovi:")]),r("ul",{staticClass:"flower-list"},t._l(t.currentProduct.cvetovi,(function(e){return r("li",{key:e.id,staticClass:"flower-item"},[t._v(" "+t._s(e.Cvet.naziv)+": "+t._s(e.kolicina)+" ")])})),0)]):t._e(),r("p",[t._v("Kategorija: "+t._s(t.currentProduct.kategorija.naziv))])]):r("div",[t._v(" Loading... ")])])])},F=[],B={name:"ProductDetails",props:{id:{type:Number,required:!0}},computed:{...(0,O.rn)(["currentProduct"])},methods:{...(0,O.nv)(["fetchProduct"])},async mounted(){await this.fetchProduct(this.id)}},H=B,K=(0,d.Z)(H,z,F,!1,null,"19df74de",null),q=K.exports,M={name:"DetailsView",components:{ProductDetails:q},computed:{...(0,O.rn)(["productIds","currentProductId"]),localId(){return this.currentProductId},currentIndex(){return this.productIds.indexOf(this.localId)},isFirstItem(){return 0===this.currentIndex},isLastItem(){return this.currentIndex===this.productIds.length-1}},methods:{...(0,O.nv)(["setCurrentProductId"]),showPrevious(){if(this.currentIndex>0){const t=this.productIds[this.currentIndex-1];this.setCurrentProductId(t)}},showNext(){if(this.currentIndex<this.productIds.length-1){const t=this.productIds[this.currentIndex+1];this.setCurrentProductId(t)}}}},$=M,V=(0,d.Z)($,A,L,!1,null,"a46c5698",null),J=V.exports;n.ZP.use(_.ZP);const G=[{path:"/",name:"home",component:U},{path:"/create-order",name:"create-order",component:()=>e.e(585).then(e.bind(e,5585))},{path:"/product/:id",name:"product-details",component:J,props:!0}],Q=new _.ZP({mode:"history",base:"/user/",routes:G});var W=Q;n.ZP.use(O.ZP);var X=new O.ZP.Store({state:{products:[],productIds:[],currentProduct:{},currentProductId:null,orderStatus:null},mutations:{SET_PRODUCTS(t,r){t.products=r,t.productIds=r.map((t=>t.id))},SET_CURRENT_PRODUCT_ID(t,r){t.currentProductId=r},SET_CURRENT_PRODUCT(t,r){t.currentProduct=r},SET_ORDER_STATUS(t,r){t.orderStatus=r}},actions:{async fetchProducts({commit:t}){try{const r=await fetch("http://localhost:9000/proizvod"),e=await r.json();t("SET_PRODUCTS",e)}catch(r){console.error("Error fetching products:",r)}},async fetchProduct({commit:t},r){try{const e=await fetch(`http://localhost:9000/proizvod/${r}`),n=await e.json();t("SET_CURRENT_PRODUCT",n)}catch(e){console.error("Error fetching product:",e)}},async sendOrder({commit:t},r){try{const e=await fetch("http://localhost:9000/narudzbina",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});e.ok?t("SET_ORDER_STATUS","success"):t("SET_ORDER_STATUS","error")}catch(e){console.error("Error submitting order:",e)}},setCurrentProductId({commit:t},r){t("SET_CURRENT_PRODUCT_ID",r)}},getters:{},modules:{}});n.ZP.config.productionTip=!1,new n.ZP({router:W,store:X,render:t=>t(m)}).$mount("#app")}},r={};function e(n){var o=r[n];if(void 0!==o)return o.exports;var u=r[n]={exports:{}};return t[n].call(u.exports,u,u.exports,e),u.exports}e.m=t,function(){var t=[];e.O=function(r,n,o,u){if(!n){var i=1/0;for(d=0;d<t.length;d++){n=t[d][0],o=t[d][1],u=t[d][2];for(var c=!0,s=0;s<n.length;s++)(!1&u||i>=u)&&Object.keys(e.O).every((function(t){return e.O[t](n[s])}))?n.splice(s--,1):(c=!1,u<i&&(i=u));if(c){t.splice(d--,1);var a=o();void 0!==a&&(r=a)}}return r}u=u||0;for(var d=t.length;d>0&&t[d-1][2]>u;d--)t[d]=t[d-1];t[d]=[n,o,u]}}(),function(){e.n=function(t){var r=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(r,{a:r}),r}}(),function(){e.d=function(t,r){for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})}}(),function(){e.f={},e.e=function(t){return Promise.all(Object.keys(e.f).reduce((function(r,n){return e.f[n](t,r),r}),[]))}}(),function(){e.u=function(t){return"js/"+t+".d66e8d24.js"}}(),function(){e.miniCssF=function(t){return"css/"+t+".a54a407f.css"}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){e.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)}}(),function(){var t={},r="vue_app:";e.l=function(n,o,u,i){if(t[n])t[n].push(o);else{var c,s;if(void 0!==u)for(var a=document.getElementsByTagName("script"),d=0;d<a.length;d++){var l=a[d];if(l.getAttribute("src")==n||l.getAttribute("data-webpack")==r+u){c=l;break}}c||(s=!0,c=document.createElement("script"),c.charset="utf-8",c.timeout=120,e.nc&&c.setAttribute("nonce",e.nc),c.setAttribute("data-webpack",r+u),c.src=n),t[n]=[o];var p=function(r,e){c.onerror=c.onload=null,clearTimeout(f);var o=t[n];if(delete t[n],c.parentNode&&c.parentNode.removeChild(c),o&&o.forEach((function(t){return t(e)})),r)return r(e)},f=setTimeout(p.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=p.bind(null,c.onerror),c.onload=p.bind(null,c.onload),s&&document.head.appendChild(c)}}}(),function(){e.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){e.p="/user/"}(),function(){if("undefined"!==typeof document){var t=function(t,r,e,n,o){var u=document.createElement("link");u.rel="stylesheet",u.type="text/css";var i=function(e){if(u.onerror=u.onload=null,"load"===e.type)n();else{var i=e&&("load"===e.type?"missing":e.type),c=e&&e.target&&e.target.href||r,s=new Error("Loading CSS chunk "+t+" failed.\n("+c+")");s.code="CSS_CHUNK_LOAD_FAILED",s.type=i,s.request=c,u.parentNode&&u.parentNode.removeChild(u),o(s)}};return u.onerror=u.onload=i,u.href=r,e?e.parentNode.insertBefore(u,e.nextSibling):document.head.appendChild(u),u},r=function(t,r){for(var e=document.getElementsByTagName("link"),n=0;n<e.length;n++){var o=e[n],u=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(u===t||u===r))return o}var i=document.getElementsByTagName("style");for(n=0;n<i.length;n++){o=i[n],u=o.getAttribute("data-href");if(u===t||u===r)return o}},n=function(n){return new Promise((function(o,u){var i=e.miniCssF(n),c=e.p+i;if(r(i,c))return o();t(n,c,null,o,u)}))},o={143:0};e.f.miniCss=function(t,r){var e={585:1};o[t]?r.push(o[t]):0!==o[t]&&e[t]&&r.push(o[t]=n(t).then((function(){o[t]=0}),(function(r){throw delete o[t],r})))}}}(),function(){var t={143:0};e.f.j=function(r,n){var o=e.o(t,r)?t[r]:void 0;if(0!==o)if(o)n.push(o[2]);else{var u=new Promise((function(e,n){o=t[r]=[e,n]}));n.push(o[2]=u);var i=e.p+e.u(r),c=new Error,s=function(n){if(e.o(t,r)&&(o=t[r],0!==o&&(t[r]=void 0),o)){var u=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;c.message="Loading chunk "+r+" failed.\n("+u+": "+i+")",c.name="ChunkLoadError",c.type=u,c.request=i,o[1](c)}};e.l(i,s,"chunk-"+r,r)}},e.O.j=function(r){return 0===t[r]};var r=function(r,n){var o,u,i=n[0],c=n[1],s=n[2],a=0;if(i.some((function(r){return 0!==t[r]}))){for(o in c)e.o(c,o)&&(e.m[o]=c[o]);if(s)var d=s(e)}for(r&&r(n);a<i.length;a++)u=i[a],e.o(t,u)&&t[u]&&t[u][0](),t[u]=0;return e.O(d)},n=self["webpackChunkvue_app"]=self["webpackChunkvue_app"]||[];n.forEach(r.bind(null,0)),n.push=r.bind(null,n.push.bind(n))}();var n=e.O(void 0,[998],(function(){return e(3539)}));n=e.O(n)})();
//# sourceMappingURL=app.c2ad2935.js.map