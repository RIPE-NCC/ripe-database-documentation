<template>
<CodeGroup>
<CodeGroupItem title="yarn">
```bash
yarn add -D vuepress-theme-hope
```
</CodeGroupItem>

<CodeGroupItem title="npm">
```js
npm i -D vuepress-theme-hope
```
</CodeGroupItem>
</CodeGroup>
</template>

<script>
const prism = require("prismjs");
const apiServer = __API_SERVER__;
import CodeGroup from '@mr-hope/vuepress-plugin-components/lib/client/CodeGroup.vue'
import CodeGroupItem from '@mr-hope/vuepress-plugin-components/lib/client/CodeGroupItem.vue'

export default {
  name: "CodeBlock",
  components: { CodeGroup, CodeGroupItem },
  props: {
    baseUrl: String,
    searchParams: {
      type: Object,
      default: function() {
        return {};
      },
    },
    pathParam: { type: String, default: null },
    method: String,
  },
  data() {
    return {
      response: this.response,
      showResponse: this.showResponse,
      showExpanded: this.showExpanded,
      computedSearchParams: this.searchParams,
      ccopied: false,
    };
  },
  computed: {
    url: function() {
      // strip off the hostname from the baseUrl, we will only
      // allow the hostname set by the env var API_SERVER
      // or its default: 'atlas.ripe.net'
      const cleanUrl = this.baseUrl.replace(/^http[s]?\:\/\/[\w\.]+/, "");
      const newUrl = new URL(
        (this.pathParam &&
          cleanUrl.replace(/\/\{(\w+)\}\//, `/${this.pathParam}/`)) ||
          cleanUrl,
        `https://${apiServer}`
      );
      Object.entries({
        ...this.searchParams,
        ...this.computedSearchParams,
      }).forEach((sp) => {
        newUrl.searchParams.set(sp[0], sp[1]);
      });
      return newUrl;
    },
    searchParamsStr: function() {
      const newParams = Object.entries({
        ...this.searchParams,
        ...this.computedSearchParams,
      });
      return `${(newParams.length && "?") || ""}${newParams
        .map((e) => `${e[0]}=${e[1]}`)
        .join("&")}`;
    },
    UrlNotReady: function() {
      return decodeURI(this.url.pathname).match(/\{\w+\}/);
    },
  },
  mounted () {
  },
  watch: {
    ccopied: function (newVal) { if (this.ccopied) { setTimeout(() => { this.ccopied = false }, 600)}}
  },
  methods: {
    makeRequest: async function() {
      const req = await fetch(this.url.href);
      this.response = prism.highlight(
        JSON.stringify(await req.json(), null, 2),
        prism.languages["javascript"]
      );
      this.showResponse = true;
      this.showExpanded = false;
    },
    parseSearchParamsStr: function() {
      console.log("parse string -> object");
      const newSearchParamsStr = this.$el.querySelector(".search-params-input")
        .textContent;
      this.computedSearchParams = newSearchParamsStr
        .replace(/^\?/, "")
        .split("&")
        .reduce((sps, sp) => {
          const kv = sp.split("=");
          sps[kv[0]] = kv[1];
          return sps;
        }, {});
    },
    toggleResponse: function() {
      this.showResponse = !this.showResponse;
    },
    toggleExpanded: function() {
      this.showExpanded = !this.showExpanded;
    },
    copyCall: function(event) {
      // console.log(event.target.value.split(':')[0])
      // console.log(event.target.value.split(':')[1])
      // console.log(event.target.value.split(':')[2])
      let commandCall = event.target.value.split(':')[2]
      if (event.target.value.split(':')[1] === 'js') {
				commandCall = `var requestOptions = {
					method: '${event.target.value.split(':')[0]}',
					redirect: 'follow'
				};

				fetch("https://${apiServer}${event.target.value.split(':')[2]}", requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.catch(error => console.log('error', error));`
      } else if (event.target.value.split(':')[1] === 'curl') {
				commandCall = `curl --location --request ${event.target.value.split(':')[0]} "https://${apiServer}${event.target.value.split(':')[2]}"`
      }
      if (typeof event.target.value.split(':')[1] !== 'undefined') {
				navigator.clipboard.writeText(commandCall).then(() => {
					/* clipboard successfully set */
					this.ccopied = true
				}, function() {
					/* clipboard write failed */
					alert('problems!');
				});
      }
    },
    testalert: function(event) { alert(event) }
  },
};
</script>

<style scoped>

</style>
