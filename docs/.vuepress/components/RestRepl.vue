<template>
  <div class="restbox">
    <div class="url" title="click query parameters to edit">
      <div style="display:inline-block;">{{ method }} {{ decodeURI(url.pathname)
      }}<span
        class="search-params-input"
        v-on:blur="parseSearchParamsStr"
        contenteditable="true"
        >{{ searchParamsStr }}</span
      ></div>
    </div>
    <div class="button-group">
      <span class="hint" v-if="UrlNotReady">Add a path parameter to try</span>
      <mwc-button outlined
        v-if="response && showResponse"
        label="Hide"
        v-on:click="toggleResponse"
      ></mwc-button
      ><mwc-button outlined
        v-if="response && showResponse && !showExpanded"
        label="Expand"
        v-on:click="toggleExpanded"
      ></mwc-button>
      <mwc-button outlined
        v-else-if="response && showResponse && showExpanded"
        label="Collapse"
        v-on:click="toggleExpanded"
      />
      <!-- <button :disabled="UrlNotReady" class="tryit" v-on:click="makeRequest" /> -->
      <mwc-button unelevated :disabled="UrlNotReady" label="Try it" v-on:click="makeRequest"></mwc-button>
    </div>
    <div
      class="response-panel language-json extra-class"
      v-if="response && showResponse"
      v-bind:class="{ expanded: showExpanded, show: showResponse }"
    >
      <pre class="language-json"><code v-html="response"/></pre>
    </div>
    <div class="button-group" v-if="response && showResponse">
      <mwc-button outlined
        v-if="response && showResponse"
        label="Hide"
        v-on:click="toggleResponse"
      ></mwc-button
      ><mwc-button outlined
        v-if="response && showResponse && !showExpanded"
        label="Expand"
        v-on:click="toggleExpanded"
      ></mwc-button>
      <mwc-button outlined
        v-else-if="response && showResponse && showExpanded"
        label="Collapse"
        v-on:click="toggleExpanded"
      />
    </div>
  </div>
</template>

<script>
const prism = require("prismjs");
const apiServer = __API_SERVER__;

export default {
  name: "RestRepl",
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
    import("@material/mwc-button").then(() => {})
    // this.$root.$emit('apiCallItem', decodeURI(this.url.pathname) + this.searchParamsStr)
  },
  watch: {
    searchParamsStr: function (newVal) { 
      // this.$root.$emit('apiCallItem', decodeURI(this.url.pathname) + this.searchParamsStr)
    }
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
.restbox {
  width: 100%;
  margin-top:20px;
  margin-bottom: -50px;
  
}

.string {
  color: #364149;
}

.number {
  color: #008cff;
}

.boolean {
  color: #008cff;
}

.null {
  color: #008cff;
}

.key {
  color: #364149;
}

.restbox .controlbox {
  display: inline-block;
  height: 35px;
  margin-bottom: 21px;
  width: 100%;
}

.restbox .url {
  overflow: hidden;
  font-family: roboto mono, monospace;
  font-size: 0.91rem;
  background-color: #f7f7f7;
  vertical-align: middle;
  margin: 16px 0;
  padding: 12px;
  word-break: break-all;
}

.restbox .url span {
  border-bottom: 1px #ff002f dashed;
  background-color: #fff;
}

.restbox button {
  cursor: pointer;
  font-size: 0.91rem;
  outline: none;
  padding: 8px 15px;
  margin-right: 4px;
  line-height: 20px;
  vertical-align: middle;
  border-radius: 0;
  text-shadow: none;
  color: #ffffff;
  border-color: rgba(0, 0, 0, 0.1);
  border: none;
}

.restbox .button-group {
  display: flex;
  justify-content: right;
  gap: 16px;
  margin-bottom: 16px;
}

.restbox .button-group span.hint {
  align-self: center;
  font-size: 0.91rem;
  color: var(--ripe-app-navbar-footer-item);
}

.restbox button {
  background-color: transparent;
  color: var(--ripe-app-positive-80);
  border: none;
  font-weight: 600;
  height: 36px;
}

.restbox button.tryit {
  border: 1px solid var(--ripe-app-positive-80);
}

.restbox button:disabled {
  color: var(--ripe-app-navbar-footer-item);
  border-color: var(--ripe-app-navbar-footer-item);
  opacity: 1;
  cursor: unset;
}

.restbox button.expandit::after {
  content: "EXPAND";
}

.restbox button.hideit::after {
  content: "HIDE";
}

.restbox button.tryit::after {
  content: "TRY IT!";
}

.restbox button.tryit:disabled::after {
  content: "TRY IT!";
}

.restbox button.collapseit::after {
  content: "COLLAPSE";
}

.restbox button.show {
  display: inline-block;
}

.restbox .response-panel.show {
  margin-top: 24px 0;
}

.restbox .response-panel.show:not(.expanded) {
  display: inline-block;
  max-height: 350px;
  width: 100%;
  overflow-y: scroll;
}

.restbox .response-panel.show.expanded {
  height: 100%;
}
</style>
