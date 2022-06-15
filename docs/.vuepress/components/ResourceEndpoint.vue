<template>
  <details class="custom-block details endpoint">
    <summary
      >{{ oper.method }} {{ apiPath }} <span>{{ oper.summary }}</span></summary
    >
    <div
      class="details-body"
      @click.self="
        () => {
          showActiveInput = false;
        }
      "
    >
      <h3>Implementation Notes</h3>
      <div v-html="oper.notes" />
      <h3 v-if="Object.keys(parametersByType).length">Parameters</h3>
      <template
        v-for="paramTypeName in Object.keys(parametersByType).sort(
          (p) => (p === 'query' && 1) || -1
        )"
        class="param-type"
      >
        <h4>{{ paramTypeName }} parameters</h4>
        <div class="param-grid">
          <template
            class="param-grid-row"
            v-for="param in parametersByType[paramTypeName]"
          >
            <div
              class="add-field"
              v-if="activeParameterInput === param.name && showActiveInput"
            >
              <div class="subtract-button">
                <button
                  class="param-button"
                  v-on:click="toggleParamValueInput(param.name)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      d="M140 274c-6.6 0-12-5.4-12-12v-12c0-6.6 5.4-12 12-12h232c6.6 0 12 5.4 12 12v12c0 6.6-5.4 12-12 12H140zm364-18c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-32 0c0-119.9-97.3-216-216-216-119.9 0-216 97.3-216 216 0 119.9 97.3 216 216 216 119.9 0 216-97.3 216-216z"
                    />
                  </svg>
                </button>
              </div>
              <div class="param-value-input">
                <div class="arrow-up"></div>

                <!-- enum -->
                <div class="select" v-if="param.enum">
                  <select
                    @change="
                      (e) => {
                        activeParameterInputValue = e.target.value;
                      }
                    "
                    v-bind:class="{
                      disabled: !activeParameterInputValue,
                    }"
                  >
                    <option
                      v-for="(option, i) in ['select a variant', ...param.enum]"
                      v-bind:value="option"
                      :disabled="i === 0"
                      :selected="
                        option === activeParameterInputValue || i === 0
                      "
                      >{{ option }}</option
                    >
                  </select>
                  <button
                    style="grid-column: 2;"
                    :disabled="
                      !activeParameterInputValue ||
                        activeParameterInputValue ===
                          selectedParams[activeParameterInput]
                    "
                    v-on:click="
                      changeReplparams(
                        param.paramType,
                        param.name,
                        activeParameterInputValue
                      )
                    "
                  >
                    APPLY TO URL
                  </button>
                </div>

                <!-- boolean -->
                <!-- v-model doesn't work with selected and disabled properties of
                     <select> and <option> so we're not using that directive
                --->

                <div class="select" v-else-if="param.type === 'boolean'">
                  <select
                    @change="
                      (e) => {
                        activeParameterInputValue = e.target.value;
                      }
                    "
                    v-bind:class="{
                      disabled: !activeParameterInputValue,
                    }"
                  >
                    <option
                      v-for="(bool, i) in ['select a boolean', 'true', 'false']"
                      v-bind:value="bool"
                      :disabled="i === 0"
                      :selected="bool === activeParameterInputValue || i === 0"
                      >{{ bool }}</option
                    >
                  </select>
                  <button
                    style="grid-column: 2;"
                    :disabled="
                      !activeParameterInputValue ||
                        activeParameterInputValue ===
                          selectedParams[activeParameterInput]
                    "
                    v-on:click="
                      changeReplparams(
                        param.paramType,
                        param.name,
                        activeParameterInputValue
                      )
                    "
                  >
                    APPLY TO URL
                  </button>
                </div>

                <!-- all other types (mainly strings, numbers) -->
                <div v-else>
                  <input
                    v-model="activeParameterInputValue"
                    :placeholder="typeA(param.type)"
                    type="text"
                  />

                  <button
                    v-if="!param.enum"
                    :disabled="
                      !activeParameterInputValue ||
                        activeParameterInputValue ===
                          selectedParams[activeParameterInput]
                    "
                    v-on:click="
                      changeReplparams(
                        param.paramType,
                        param.name,
                        activeParameterInputValue
                      )
                    "
                  >
                    APPLY TO URL
                  </button>
                </div>
              </div>
            </div>

            <div v-else>
              <div class="add-button">
                <button
                  class="param-button"
                  v-on:click="toggleParamValueInput(param.name)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      d="M384 250v12c0 6.6-5.4 12-12 12h-98v98c0 6.6-5.4 12-12 12h-12c-6.6 0-12-5.4-12-12v-98h-98c-6.6 0-12-5.4-12-12v-12c0-6.6 5.4-12 12-12h98v-98c0-6.6 5.4-12 12-12h12c6.6 0 12 5.4 12 12v98h98c6.6 0 12 5.4 12 12zm120 6c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-32 0c0-119.9-97.3-216-216-216-119.9 0-216 97.3-216 216 0 119.9 97.3 216 216 216 119.9 0 216-97.3 216-216z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div
              @click="
                () => {
                  showActiveInput = false;
                }
              "
            >
              <span class="param-name">{{ param.name }}</span> ({{
                (param.enum && "enum") || param.type
              }})
            </div>
            <div>
              {{ param.description }}
              <span v-if="param.enum"> [{{ param.enum.join(",") }}]</span>
            </div>
          </template>
        </div>
      </template>

      <h3>Response</h3>
      <h4>Response Type {{ oper.type }}</h4>
      <div
        v-for="response in Object.entries(
          (models[oper.type] &&
            models[oper.type].properties &&
            models[oper.type].properties) ||
            {}
        )"
      >
        <span class="param-name">{{ response[0] }}</span>
        <span>({{ response[1].type }})</span>
        <span v-if="response[1].format"><{{ response[1].format }}></span>
        <span v-if="response[1].enum">{{ response[1].enum }}</span>
        <span v-if="response[1].description"
          >: {{ response[1].description }},</span
        >
      </div>
      <RestRepl
        :baseUrl="apiPath"
        method="GET"
        v-bind:pathParam="replParams.path"
        v-bind:searchParams="replParams.search"
      />
    </div>
  </details>
</template>

<script>
import RestRepl from "./RestRepl.vue";

export default {
  name: "ResourceEndpoint",
  props: { apiPath: String, models: Object, oper: Object },
  data() {
    return {
      replParams: { path: null, search: {} },
      selectedParams: {},
      activeParameterInput: null,
      activeParameterInputValue: null,
      showActiveInput: false,
    };
  },
  computed: {
    parametersByType: function() {
      return this.oper.parameters.reduce((pSet, p) => {
        if (pSet[p.paramType]) {
          pSet[p.paramType].push(p);
        } else {
          pSet[p.paramType] = [p];
        }
        return pSet;
      }, {});
    },
    disabledSelected: function() {
      return (
        !this.activeParameterInputValue ||
        this.activeParameterInputValue ===
          this.selectedParams[this.activeParameterInput]
      );
    },
  },
  methods: {
    changeReplparams: function(paramType, paramName, paramValue) {
      console.log(`Change ${paramName} to ${paramValue}`);
      this.selectedParams[paramName] = paramValue;
      if (paramType !== "path") {
        this.replParams["search"] = {
          ...this.replParams["search"],
          [paramName]: paramValue,
        };
      } else {
        this.replParams.path = String(paramValue);
      }
      // dismiss the select
      this.toggleParamValueInput(paramName);
    },
    toggleParamValueInput: function(name) {
      console.log(`activate ${name}`);

      if (this.activeParameterInput !== name) {
        this.showActiveInput = true;
        this.activeParameterInput = name;
        this.activeParameterInputValue = this.selectedParams[name];
      } else {
        this.showActiveInput = !this.showActiveInput;
      }
    },
    typeA: function(type) {
      return `type a ${type}`;
    },
  },
};
</script>

<style lang="css">
.param-name {
  font-weight: 600;
  font-size: 0.91rem;
  font-family: "Roboto mono", monospace;
}

.param-grid {
  display: grid;
  position: relative;
  grid-template-columns: 32px 1fr 2fr;
  gap: 10px;
  margin-bottom: 32px;
  overflow: visible;
  word-wrap: anywhere;
}

.param-grid .param-grid-field {
  grid-column-start: 1;
  grid-column-end: 3;
}

.param-grid select {
  width: 100%;
  /* height: 24px; */
  font-size: 0.91rem;
  appearance: none;
  border: none;
  outline: none;
  padding: 8px;
  margin: 7px 32px 6px 0;
  background-color: var(--ripe-app-primary-100);
  border-bottom: 1px solid white;
  color: white;
  font-family: Menlo, monospace;
}

.select::after {
  content: "";
  justify-self: end;
  width: 0.8em;
  height: 0.5em;
  background-color: white;
  /* -webkit-clip-path: polygon(100% 0%, 0 0%, 50% 100%); */
  /* clip-path: polygon(100% 0%, 0 0%, 50% 100%); */
  clip-path: polygon(50% 100%, 100% 0%, 86% 0%, 50% 70%, 14% 0%, 0% 0%);
}

.select select,
.select::after {
  grid-area: select;
  box-sizing: border-box;
}

.select {
  display: grid;
  grid-template-areas: "select";
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  min-width: 15ch;
  max-width: 30ch;
  border: none;
  border-radius: 0;
  padding: 0.25em 0.5em;
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: var(--ripe-app-primary-100);
  color: white;
}

.param-grid option {
  font-size: 0.91rem;
  font-weight: 400;
  background-color: white;
  color: var(--ripe-app-primary-100);
}

.param-button {
  background-color: transparent;
  border: none;
  margin-top: -2px;
  padding: 0;
  cursor: pointer;
}

.add-button svg {
  height: 24px;
  fill: var(--ripe-app-positive-100);
}

.subtract-button svg {
  height: 24px;
  fill: var(--ripe-app-primart-100);
}

.param-value-input {
  grid-column-start: 1;
  grid-column-end: 5;
  background-color: var(--ripe-app-primary-100);
  padding: 8px 8px;
  position: absolute;
  left: -24px;
  margin-top: 6px;
  z-index: 20;
}

.param-value-input input {
  padding: 8px 0px 8px 0px;
  border: 0;
  background-color: var(--ripe-app-primary-100);
  color: white;
  border-bottom: 1px solid white;
  font-family: Menlo, monospace;
  margin: 12px 16px;
  font-size: 0.91rem;
}

.param-value-input input::placeholder,
.param-value-input select.disabled,
.param-value-input button[disabled],
.param-grid option[disabled] {
  color: var(--ripe-app-navbar-footer-item);
  border-color: var(--ripe-app-navbar-footer-item);
  opacity: 1;
}

.param-value-input button {
  cursor: pointer;
  height: 36px;
  border: 1px solid white;
  color: white;
  font-size: 0.8rem;
  margin: 8px 8px 8px 32px;
  background-color: var(--ripe-app-primary-100);
  padding: 9px 12px 8px 8px;
  left: -23px;
}

details > div.details-body {
  background-color: var(--ripe-app-secondary-0);
  padding: 12px 24px 24px;
}

.endpoint .details-body {
  background-color: var(--ripe-app-positive-0);
}

.custom-block.details {
  margin: 18px 0px;
  padding: 0;
  background-color: transparent;
}

.custom-block.details summary {
  padding: 18px;
  font-weight: 600;
  background-color: var(--ripe-app-primary-20);
}

.custom-block.details.endpoint summary {
  background-color: var(--ripe-app-positive-20);
}

.custom-block.details summary > span {
  font-weight: 200;
}

.arrow-up {
  position: absolute;
  top: -10px;
  left: 25px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid var(--ripe-app-primary-100);
}
</style>
