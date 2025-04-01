import {
  __publicField
} from "./chunk-JVWSFFO4.js";

// node_modules/@technical-design/ripe-app-webcomponents/esm/node_modules/svelte/src/runtime/internal/utils.js
function noop() {
}
function assign(tar, src) {
  for (const k in src) tar[k] = src[k];
  return (
    /** @type {T & S} */
    tar
  );
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));
    if ($$scope.dirty === void 0) {
      return lets;
    }
    if (typeof lets === "object") {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);
      for (let i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }
      return merged;
    }
    return $$scope.dirty | lets;
  }
  return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    const dirty = [];
    const length = $$scope.ctx.length / 32;
    for (let i = 0; i < length; i++) {
      dirty[i] = -1;
    }
    return dirty;
  }
  return -1;
}
function null_to_empty(value) {
  return value == null ? "" : value;
}

// node_modules/@technical-design/ripe-app-webcomponents/esm/node_modules/svelte/src/runtime/internal/dom.js
function append(target, node) {
  target.appendChild(node);
}
function append_styles(target, style_sheet_id, styles) {
  const append_styles_to = get_root_for_style(target);
  if (!append_styles_to.getElementById(style_sheet_id)) {
    const style = element("style");
    style.id = style_sheet_id;
    style.textContent = styles;
    append_stylesheet(append_styles_to, style);
  }
}
function get_root_for_style(node) {
  if (!node) return document;
  const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
  if (root && /** @type {ShadowRoot} */
  root.host) {
    return (
      /** @type {ShadowRoot} */
      root
    );
  }
  return node.ownerDocument;
}
function append_stylesheet(node, style) {
  append(
    /** @type {Document} */
    node.head || node,
    style
  );
  return style.sheet;
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i]) iterations[i].d(detaching);
  }
}
function element(name) {
  return document.createElement(name);
}
function svg_element(name) {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function empty() {
  return text("");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
  if (value == null) node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}
function set_custom_element_data(node, prop, value) {
  const lower = prop.toLowerCase();
  if (lower in node) {
    node[lower] = typeof node[lower] === "boolean" && value === "" ? true : value;
  } else if (prop in node) {
    node[prop] = typeof node[prop] === "boolean" && value === "" ? true : value;
  } else {
    attr(node, prop, value);
  }
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.data === data) return;
  text2.data = /** @type {string} */
  data;
}
function set_style(node, key, value, important) {
  if (value == null) {
    node.style.removeProperty(key);
  } else {
    node.style.setProperty(key, value, important ? "important" : "");
  }
}
function toggle_class(element2, name, toggle) {
  element2.classList.toggle(name, !!toggle);
}
var HtmlTag = class {
  constructor(is_svg = false) {
    /**
     * @private
     * @default false
     */
    __publicField(this, "is_svg", false);
    /** parent for creating node */
    __publicField(this, "e");
    /** html tag nodes */
    __publicField(this, "n");
    /** target */
    __publicField(this, "t");
    /** anchor */
    __publicField(this, "a");
    this.is_svg = is_svg;
    this.e = this.n = null;
  }
  /**
   * @param {string} html
   * @returns {void}
   */
  c(html) {
    this.h(html);
  }
  /**
   * @param {string} html
   * @param {HTMLElement | SVGElement} target
   * @param {HTMLElement | SVGElement} anchor
   * @returns {void}
   */
  m(html, target, anchor = null) {
    if (!this.e) {
      if (this.is_svg)
        this.e = svg_element(
          /** @type {keyof SVGElementTagNameMap} */
          target.nodeName
        );
      else
        this.e = element(
          /** @type {keyof HTMLElementTagNameMap} */
          target.nodeType === 11 ? "TEMPLATE" : target.nodeName
        );
      this.t = target.tagName !== "TEMPLATE" ? target : (
        /** @type {HTMLTemplateElement} */
        target.content
      );
      this.c(html);
    }
    this.i(anchor);
  }
  /**
   * @param {string} html
   * @returns {void}
   */
  h(html) {
    this.e.innerHTML = html;
    this.n = Array.from(
      this.e.nodeName === "TEMPLATE" ? this.e.content.childNodes : this.e.childNodes
    );
  }
  /**
   * @returns {void} */
  i(anchor) {
    for (let i = 0; i < this.n.length; i += 1) {
      insert(this.t, this.n[i], anchor);
    }
  }
  /**
   * @param {string} html
   * @returns {void}
   */
  p(html) {
    this.d();
    this.h(html);
    this.i(this.a);
  }
  /**
   * @returns {void} */
  d() {
    this.n.forEach(detach);
  }
};
function get_custom_elements_slots(element2) {
  const result = {};
  element2.childNodes.forEach(
    /** @param {Element} node */
    (node) => {
      result[node.slot || "default"] = true;
    }
  );
  return result;
}

// node_modules/@technical-design/ripe-app-webcomponents/esm/node_modules/svelte/src/runtime/internal/transitions.js
var outroing = /* @__PURE__ */ new Set();
var outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
    // parent group
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block)) return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2) block.d(1);
        callback();
      }
    });
    block.o(local);
  } else if (callback) {
    callback();
  }
}

// node_modules/@technical-design/ripe-app-webcomponents/esm/node_modules/svelte/src/runtime/internal/lifecycle.js
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component) throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}

// node_modules/@technical-design/ripe-app-webcomponents/esm/node_modules/svelte/src/runtime/internal/scheduler.js
var dirty_components = [];
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = Promise.resolve();
var update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
var seen_callbacks = /* @__PURE__ */ new Set();
var flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length) binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
function flush_render_callbacks(fns) {
  const filtered = [];
  const targets = [];
  render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
  targets.forEach((c) => c());
  render_callbacks = filtered;
}

// node_modules/@technical-design/ripe-app-webcomponents/esm/node_modules/svelte/src/runtime/internal/Component.js
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor) {
  const { fragment, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  add_render_callback(() => {
    const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
    if (component.$$.on_destroy) {
      component.$$.on_destroy.push(...new_on_destroy);
    } else {
      run_all(new_on_destroy);
    }
    component.$$.on_mount = [];
  });
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    flush_render_callbacks($$.after_update);
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance14, create_fragment14, not_equal, props, append_styles2 = null, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: [],
    // state
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    // everything else
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles2 && append_styles2($$.root);
  let ready = false;
  $$.ctx = instance14 ? instance14(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
      if (ready) make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment14 ? create_fragment14($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro) transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor);
    flush();
  }
  set_current_component(parent_component);
}
var SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    constructor($$componentCtor, $$slots, use_shadow_dom) {
      super();
      /** The Svelte component constructor */
      __publicField(this, "$$ctor");
      /** Slots */
      __publicField(this, "$$s");
      /** The Svelte component instance */
      __publicField(this, "$$c");
      /** Whether or not the custom element is connected */
      __publicField(this, "$$cn", false);
      /** Component props data */
      __publicField(this, "$$d", {});
      /** `true` if currently in the process of reflecting component props back to attributes */
      __publicField(this, "$$r", false);
      /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
      __publicField(this, "$$p_d", {});
      /** @type {Record<string, Function[]>} Event listeners */
      __publicField(this, "$$l", {});
      /** @type {Map<Function, Function>} Event listener unsubscribe functions */
      __publicField(this, "$$l_u", /* @__PURE__ */ new Map());
      this.$$ctor = $$componentCtor;
      this.$$s = $$slots;
      if (use_shadow_dom) {
        this.attachShadow({ mode: "open" });
      }
    }
    addEventListener(type, listener, options) {
      this.$$l[type] = this.$$l[type] || [];
      this.$$l[type].push(listener);
      if (this.$$c) {
        const unsub = this.$$c.$on(type, listener);
        this.$$l_u.set(listener, unsub);
      }
      super.addEventListener(type, listener, options);
    }
    removeEventListener(type, listener, options) {
      super.removeEventListener(type, listener, options);
      if (this.$$c) {
        const unsub = this.$$l_u.get(listener);
        if (unsub) {
          unsub();
          this.$$l_u.delete(listener);
        }
      }
    }
    async connectedCallback() {
      this.$$cn = true;
      if (!this.$$c) {
        let create_slot2 = function(name) {
          return () => {
            let node;
            const obj = {
              c: function create() {
                node = element("slot");
                if (name !== "default") {
                  attr(node, "name", name);
                }
              },
              /**
               * @param {HTMLElement} target
               * @param {HTMLElement} [anchor]
               */
              m: function mount(target, anchor) {
                insert(target, node, anchor);
              },
              d: function destroy(detaching) {
                if (detaching) {
                  detach(node);
                }
              }
            };
            return obj;
          };
        };
        await Promise.resolve();
        if (!this.$$cn || this.$$c) {
          return;
        }
        const $$slots = {};
        const existing_slots = get_custom_elements_slots(this);
        for (const name of this.$$s) {
          if (name in existing_slots) {
            $$slots[name] = [create_slot2(name)];
          }
        }
        for (const attribute of this.attributes) {
          const name = this.$$g_p(attribute.name);
          if (!(name in this.$$d)) {
            this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
          }
        }
        for (const key in this.$$p_d) {
          if (!(key in this.$$d) && this[key] !== void 0) {
            this.$$d[key] = this[key];
            delete this[key];
          }
        }
        this.$$c = new this.$$ctor({
          target: this.shadowRoot || this,
          props: {
            ...this.$$d,
            $$slots,
            $$scope: {
              ctx: []
            }
          }
        });
        const reflect_attributes = () => {
          this.$$r = true;
          for (const key in this.$$p_d) {
            this.$$d[key] = this.$$c.$$.ctx[this.$$c.$$.props[key]];
            if (this.$$p_d[key].reflect) {
              const attribute_value = get_custom_element_value(
                key,
                this.$$d[key],
                this.$$p_d,
                "toAttribute"
              );
              if (attribute_value == null) {
                this.removeAttribute(this.$$p_d[key].attribute || key);
              } else {
                this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
              }
            }
          }
          this.$$r = false;
        };
        this.$$c.$$.after_update.push(reflect_attributes);
        reflect_attributes();
        for (const type in this.$$l) {
          for (const listener of this.$$l[type]) {
            const unsub = this.$$c.$on(type, listener);
            this.$$l_u.set(listener, unsub);
          }
        }
        this.$$l = {};
      }
    }
    // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
    // and setting attributes through setAttribute etc, this is helpful
    attributeChangedCallback(attr2, _oldValue, newValue) {
      var _a;
      if (this.$$r) return;
      attr2 = this.$$g_p(attr2);
      this.$$d[attr2] = get_custom_element_value(attr2, newValue, this.$$p_d, "toProp");
      (_a = this.$$c) == null ? void 0 : _a.$set({ [attr2]: this.$$d[attr2] });
    }
    disconnectedCallback() {
      this.$$cn = false;
      Promise.resolve().then(() => {
        if (!this.$$cn && this.$$c) {
          this.$$c.$destroy();
          this.$$c = void 0;
        }
      });
    }
    $$g_p(attribute_name) {
      return Object.keys(this.$$p_d).find(
        (key) => this.$$p_d[key].attribute === attribute_name || !this.$$p_d[key].attribute && key.toLowerCase() === attribute_name
      ) || attribute_name;
    }
  };
}
function get_custom_element_value(prop, value, props_definition, transform) {
  var _a;
  const type = (_a = props_definition[prop]) == null ? void 0 : _a.type;
  value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
  if (!transform || !props_definition[prop]) {
    return value;
  } else if (transform === "toAttribute") {
    switch (type) {
      case "Object":
      case "Array":
        return value == null ? null : JSON.stringify(value);
      case "Boolean":
        return value ? "" : null;
      case "Number":
        return value == null ? null : value;
      default:
        return value;
    }
  } else {
    switch (type) {
      case "Object":
      case "Array":
        return value && JSON.parse(value);
      case "Boolean":
        return value;
      case "Number":
        return value != null ? +value : value;
      default:
        return value;
    }
  }
}
function create_custom_element(Component, props_definition, slots, accessors, use_shadow_dom, extend) {
  let Class = class extends SvelteElement {
    constructor() {
      super(Component, slots, use_shadow_dom);
      this.$$p_d = props_definition;
    }
    static get observedAttributes() {
      return Object.keys(props_definition).map(
        (key) => (props_definition[key].attribute || key).toLowerCase()
      );
    }
  };
  Object.keys(props_definition).forEach((prop) => {
    Object.defineProperty(Class.prototype, prop, {
      get() {
        return this.$$c && prop in this.$$c ? this.$$c[prop] : this.$$d[prop];
      },
      set(value) {
        var _a;
        value = get_custom_element_value(prop, value, props_definition);
        this.$$d[prop] = value;
        (_a = this.$$c) == null ? void 0 : _a.$set({ [prop]: value });
      }
    });
  });
  accessors.forEach((accessor) => {
    Object.defineProperty(Class.prototype, accessor, {
      get() {
        var _a;
        return (_a = this.$$c) == null ? void 0 : _a[accessor];
      }
    });
  });
  if (extend) {
    Class = extend(Class);
  }
  Component.element = /** @type {any} */
  Class;
  return Class;
}
var SvelteComponent = class {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    __publicField(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    __publicField(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(type, callback) {
    if (!is_function(callback)) {
      return noop;
    }
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index4 = callbacks.indexOf(callback);
      if (index4 !== -1) callbacks.splice(index4, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(props) {
    if (this.$$set && !is_empty(props)) {
      this.$$.skip_bound = true;
      this.$$set(props);
      this.$$.skip_bound = false;
    }
  }
};

// node_modules/@technical-design/ripe-app-webcomponents/esm/node_modules/svelte/src/shared/version.js
var PUBLIC_VERSION = "4";

// node_modules/@technical-design/ripe-app-webcomponents/esm/node_modules/svelte/src/runtime/internal/disclose-version/index.js
if (typeof window !== "undefined")
  (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);

// node_modules/@technical-design/ripe-app-webcomponents/esm/src/webcomponents/AppBanner/AppBanner.svelte.js
function add_css(target) {
  append_styles(target, "svelte-1922yi2", ".level-info.svelte-1922yi2.svelte-1922yi2{background-color:var(--ripe-app-info,#29abe2)}.level-positive.svelte-1922yi2.svelte-1922yi2{background-color:var(--ripe-app-positive,#6ebe49)}.level-warning.svelte-1922yi2.svelte-1922yi2{background-color:var(--ripe-app-worried,#ff6a00)}.level-accent.svelte-1922yi2.svelte-1922yi2{background-color:var(--ripe-app-primary-800,#0f154c)}.level-alarm.svelte-1922yi2.svelte-1922yi2{background-color:var(--ripe-app-warning,#ed1c24)}.app-banner.svelte-1922yi2.svelte-1922yi2,a.svelte-1922yi2.svelte-1922yi2,button.svelte-1922yi2.svelte-1922yi2{font-family:var(--ripe-app-font-family),Helvetica,Arial,sans-serif;font-size:.875rem}.app-banner.svelte-1922yi2.svelte-1922yi2{align-items:center;border-bottom:1px solid var(--ripe-app-border-line,#2f2c56);color:#fff;display:flex;padding:8px var(--app-banner-padding-right,8px) 8px var(--app-banner-padding-left,8px);text-rendering:geometricprecision;transition:all .2s ease-in-out}@media(max-width:900px){.app-banner.svelte-1922yi2.svelte-1922yi2{flex-wrap:wrap}}.app-banner.hidden.svelte-1922yi2.svelte-1922yi2{display:none}.banner-text.svelte-1922yi2.svelte-1922yi2{margin:0;padding:12px 16px}.banner-text.svelte-1922yi2 a.svelte-1922yi2{color:#fff}.buttons.svelte-1922yi2.svelte-1922yi2{margin-left:auto;padding:12px 16px;white-space:nowrap}.buttons.svelte-1922yi2 a.svelte-1922yi2,.buttons.svelte-1922yi2 button.svelte-1922yi2{background-color:initial;border:1px solid #fffc;border-radius:4px;color:#fff;margin:0 0 0 10px;padding:9px 10px;text-decoration:none;text-transform:uppercase;white-space:nowrap}.buttons.svelte-1922yi2 a.svelte-1922yi2:focus,.buttons.svelte-1922yi2 a.svelte-1922yi2:hover,.buttons.svelte-1922yi2 button.svelte-1922yi2:focus,.buttons.svelte-1922yi2 button.svelte-1922yi2:hover{background-color:#ffffff26;border:1px solid #ffffff80;cursor:pointer;transition:all .2s ease-in-out}.sr-only.svelte-1922yi2.svelte-1922yi2{clip:rect(0,0,0,0);border-width:0;height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}");
}
var get_buttons_slot_changes = (dirty) => ({});
var get_buttons_slot_context = (ctx) => ({});
function create_if_block_4(ctx) {
  let html_tag;
  let html_anchor;
  return {
    c() {
      html_tag = new HtmlTag(false);
      html_anchor = empty();
      html_tag.a = html_anchor;
    },
    m(target, anchor) {
      html_tag.m(
        /*unsafehtml*/
        ctx[3],
        target,
        anchor
      );
      insert(target, html_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*unsafehtml*/
      8) html_tag.p(
        /*unsafehtml*/
        ctx2[3]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(html_anchor);
        html_tag.d();
      }
    }
  };
}
function create_if_block_3(ctx) {
  let t;
  return {
    c() {
      t = text(
        /*text*/
        ctx[2]
      );
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*text*/
      4) set_data(
        t,
        /*text*/
        ctx2[2]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_if_block_2(ctx) {
  let a;
  let t;
  let mounted;
  let dispose;
  return {
    c() {
      a = element("a");
      t = text(
        /*linktext*/
        ctx[5]
      );
      attr(
        a,
        "href",
        /*linkurl*/
        ctx[4]
      );
      attr(a, "class", "svelte-1922yi2");
    },
    m(target, anchor) {
      insert(target, a, anchor);
      append(a, t);
      if (!mounted) {
        dispose = listen(
          a,
          "click",
          /*linkClickHandler*/
          ctx[9]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*linktext*/
      32) set_data(
        t,
        /*linktext*/
        ctx2[5]
      );
      if (dirty & /*linkurl*/
      16) {
        attr(
          a,
          "href",
          /*linkurl*/
          ctx2[4]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(a);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_1(ctx) {
  let button;
  let t;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      t = text(
        /*custombuttontext*/
        ctx[6]
      );
      attr(button, "class", "svelte-1922yi2");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      append(button, t);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*customButtonHandler*/
          ctx[10]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*custombuttontext*/
      64) set_data(
        t,
        /*custombuttontext*/
        ctx2[6]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = "Dismiss";
      attr(button, "class", "svelte-1922yi2");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*dismissHandler*/
          ctx[8]
        );
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_fragment(ctx) {
  let div1;
  let p;
  let span;
  let t0;
  let t1;
  let t2;
  let div0;
  let t3;
  let t4;
  let t5;
  let div1_class_value;
  let current;
  function select_block_type(ctx2, dirty) {
    if (
      /*text*/
      ctx2[2]
    ) return create_if_block_3;
    if (
      /*unsafehtml*/
      ctx2[3]
    ) return create_if_block_4;
  }
  let current_block_type = select_block_type(ctx);
  let if_block0 = current_block_type && current_block_type(ctx);
  const buttons_slot_template = (
    /*#slots*/
    ctx[15].buttons
  );
  const buttons_slot = create_slot(
    buttons_slot_template,
    ctx,
    /*$$scope*/
    ctx[14],
    get_buttons_slot_context
  );
  let if_block1 = (
    /*linktext*/
    ctx[5] && create_if_block_2(ctx)
  );
  let if_block2 = (
    /*custombuttontext*/
    ctx[6] && create_if_block_1(ctx)
  );
  let if_block3 = !/*permanent*/
  ctx[1] && create_if_block(ctx);
  return {
    c() {
      div1 = element("div");
      p = element("p");
      span = element("span");
      t0 = text(
        /*level*/
        ctx[0]
      );
      t1 = space();
      if (if_block0) if_block0.c();
      t2 = space();
      div0 = element("div");
      if (buttons_slot) buttons_slot.c();
      t3 = space();
      if (if_block1) if_block1.c();
      t4 = space();
      if (if_block2) if_block2.c();
      t5 = space();
      if (if_block3) if_block3.c();
      attr(span, "class", "sr-only svelte-1922yi2");
      attr(p, "role", "status");
      attr(p, "aria-live", "polite");
      attr(p, "class", "banner-text svelte-1922yi2");
      attr(div0, "class", "buttons svelte-1922yi2");
      attr(div1, "class", div1_class_value = "app-banner level-" + /*level*/
      ctx[0] + " svelte-1922yi2");
      toggle_class(
        div1,
        "hidden",
        /*hidden*/
        ctx[7]
      );
      toggle_class(
        div1,
        "permanent",
        /*permanent*/
        ctx[1]
      );
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, p);
      append(p, span);
      append(span, t0);
      append(p, t1);
      if (if_block0) if_block0.m(p, null);
      append(div1, t2);
      append(div1, div0);
      if (buttons_slot) {
        buttons_slot.m(div0, null);
      }
      append(div0, t3);
      if (if_block1) if_block1.m(div0, null);
      append(div0, t4);
      if (if_block2) if_block2.m(div0, null);
      append(div0, t5);
      if (if_block3) if_block3.m(div0, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (!current || dirty & /*level*/
      1) set_data(
        t0,
        /*level*/
        ctx2[0]
      );
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block0) {
        if_block0.p(ctx2, dirty);
      } else {
        if (if_block0) if_block0.d(1);
        if_block0 = current_block_type && current_block_type(ctx2);
        if (if_block0) {
          if_block0.c();
          if_block0.m(p, null);
        }
      }
      if (buttons_slot) {
        if (buttons_slot.p && (!current || dirty & /*$$scope*/
        16384)) {
          update_slot_base(
            buttons_slot,
            buttons_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[14],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[14]
            ) : get_slot_changes(
              buttons_slot_template,
              /*$$scope*/
              ctx2[14],
              dirty,
              get_buttons_slot_changes
            ),
            get_buttons_slot_context
          );
        }
      }
      if (
        /*linktext*/
        ctx2[5]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block_2(ctx2);
          if_block1.c();
          if_block1.m(div0, t4);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (
        /*custombuttontext*/
        ctx2[6]
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
        } else {
          if_block2 = create_if_block_1(ctx2);
          if_block2.c();
          if_block2.m(div0, t5);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
      if (!/*permanent*/
      ctx2[1]) {
        if (if_block3) {
          if_block3.p(ctx2, dirty);
        } else {
          if_block3 = create_if_block(ctx2);
          if_block3.c();
          if_block3.m(div0, null);
        }
      } else if (if_block3) {
        if_block3.d(1);
        if_block3 = null;
      }
      if (!current || dirty & /*level*/
      1 && div1_class_value !== (div1_class_value = "app-banner level-" + /*level*/
      ctx2[0] + " svelte-1922yi2")) {
        attr(div1, "class", div1_class_value);
      }
      if (!current || dirty & /*level, hidden*/
      129) {
        toggle_class(
          div1,
          "hidden",
          /*hidden*/
          ctx2[7]
        );
      }
      if (!current || dirty & /*level, permanent*/
      3) {
        toggle_class(
          div1,
          "permanent",
          /*permanent*/
          ctx2[1]
        );
      }
    },
    i(local) {
      if (current) return;
      transition_in(buttons_slot, local);
      current = true;
    },
    o(local) {
      transition_out(buttons_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      if (if_block0) {
        if_block0.d();
      }
      if (buttons_slot) buttons_slot.d(detaching);
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
      if (if_block3) if_block3.d();
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let hidden;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { id } = $$props;
  let { text: text2 } = $$props;
  let { unsafehtml } = $$props;
  let { level } = $$props;
  let { linkurl } = $$props;
  let { linktext } = $$props;
  let { custombuttontext } = $$props;
  let { dismissed = false } = $$props;
  let { permanent = false } = $$props;
  const allowedLevels = ["info", "positive", "warning", "accent", "alarm", "cookie"];
  let { component } = $$props;
  const dispatchEvent = (eventName) => {
    const event = new CustomEvent(
      eventName,
      {
        detail: { id },
        bubbles: true,
        cancelable: true,
        composed: true
      }
    );
    component.dispatchEvent(event);
  };
  const dismissHandler = () => {
    dispatchEvent("app-banner-closed");
    $$invalidate(7, hidden = true);
  };
  const linkClickHandler = () => {
    dispatchEvent("app-banner-link-clicked");
    if (!permanent) {
      $$invalidate(7, hidden = true);
    }
  };
  const customButtonHandler = () => {
    dispatchEvent("custom-button-clicked");
    if (!permanent) {
      $$invalidate(7, hidden = true);
    }
  };
  $$self.$$set = ($$props2) => {
    if ("id" in $$props2) $$invalidate(11, id = $$props2.id);
    if ("text" in $$props2) $$invalidate(2, text2 = $$props2.text);
    if ("unsafehtml" in $$props2) $$invalidate(3, unsafehtml = $$props2.unsafehtml);
    if ("level" in $$props2) $$invalidate(0, level = $$props2.level);
    if ("linkurl" in $$props2) $$invalidate(4, linkurl = $$props2.linkurl);
    if ("linktext" in $$props2) $$invalidate(5, linktext = $$props2.linktext);
    if ("custombuttontext" in $$props2) $$invalidate(6, custombuttontext = $$props2.custombuttontext);
    if ("dismissed" in $$props2) $$invalidate(12, dismissed = $$props2.dismissed);
    if ("permanent" in $$props2) $$invalidate(1, permanent = $$props2.permanent);
    if ("component" in $$props2) $$invalidate(13, component = $$props2.component);
    if ("$$scope" in $$props2) $$invalidate(14, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*dismissed*/
    4096) {
      $$invalidate(7, hidden = dismissed);
    }
    if ($$self.$$.dirty & /*permanent*/
    2) {
      $$invalidate(1, permanent = permanent === "" || permanent || false);
    }
    if ($$self.$$.dirty & /*level*/
    1) {
      $$invalidate(0, level = allowedLevels.includes(level) ? level : "info");
    }
  };
  return [
    level,
    permanent,
    text2,
    unsafehtml,
    linkurl,
    linktext,
    custombuttontext,
    hidden,
    dismissHandler,
    linkClickHandler,
    customButtonHandler,
    id,
    dismissed,
    component,
    $$scope,
    slots
  ];
}
var AppBanner = class extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance,
      create_fragment,
      safe_not_equal,
      {
        id: 11,
        text: 2,
        unsafehtml: 3,
        level: 0,
        linkurl: 4,
        linktext: 5,
        custombuttontext: 6,
        dismissed: 12,
        permanent: 1,
        component: 13
      },
      add_css
    );
  }
  get id() {
    return this.$$.ctx[11];
  }
  set id(id) {
    this.$$set({ id });
    flush();
  }
  get text() {
    return this.$$.ctx[2];
  }
  set text(text2) {
    this.$$set({ text: text2 });
    flush();
  }
  get unsafehtml() {
    return this.$$.ctx[3];
  }
  set unsafehtml(unsafehtml) {
    this.$$set({ unsafehtml });
    flush();
  }
  get level() {
    return this.$$.ctx[0];
  }
  set level(level) {
    this.$$set({ level });
    flush();
  }
  get linkurl() {
    return this.$$.ctx[4];
  }
  set linkurl(linkurl) {
    this.$$set({ linkurl });
    flush();
  }
  get linktext() {
    return this.$$.ctx[5];
  }
  set linktext(linktext) {
    this.$$set({ linktext });
    flush();
  }
  get custombuttontext() {
    return this.$$.ctx[6];
  }
  set custombuttontext(custombuttontext) {
    this.$$set({ custombuttontext });
    flush();
  }
  get dismissed() {
    return this.$$.ctx[12];
  }
  set dismissed(dismissed) {
    this.$$set({ dismissed });
    flush();
  }
  get permanent() {
    return this.$$.ctx[1];
  }
  set permanent(permanent) {
    this.$$set({ permanent });
    flush();
  }
  get component() {
    return this.$$.ctx[13];
  }
  set component(component) {
    this.$$set({ component });
    flush();
  }
};
customElements.define("app-banner", create_custom_element(AppBanner, { "id": {}, "text": {}, "unsafehtml": {}, "level": {}, "linkurl": {}, "linktext": {}, "custombuttontext": {}, "dismissed": { "type": "Boolean" }, "permanent": { "type": "Boolean" }, "component": {} }, ["buttons"], [], true, (customElementConstructor) => {
  return class extends customElementConstructor {
    constructor() {
      super();
      this.component = this;
    }
  };
}));
var AppBanner$1 = AppBanner;

// node_modules/@technical-design/ripe-app-webcomponents/esm/src/webcomponents/AppCookieConsent/AppCookieConsent.svelte.js
function add_css2(target) {
  append_styles(target, "svelte-13tfp3v", "@media(min-width:1500px){.nowrap.svelte-13tfp3v.svelte-13tfp3v{white-space:nowrap}}.cookie-banner.svelte-13tfp3v.svelte-13tfp3v,a.svelte-13tfp3v.svelte-13tfp3v,button.svelte-13tfp3v.svelte-13tfp3v{font-family:var(--ripe-app-font-family),Helvetica,Arial,sans-serif;font-size:14px}.cookie-banner.svelte-13tfp3v.svelte-13tfp3v{align-items:center;background-color:var(--ripe-app-cookie,#fff);border-bottom:0!important;border-top:1px solid var(--ripe-app-border-line,#2f2c56);bottom:0;color:#080037;display:flex;padding:8px var(--app-banner-padding-right,8px) 8px var(--app-banner-padding-left,8px);position:fixed;right:0;text-rendering:geometricprecision;transition:all .2s ease-in-out;width:calc(100% - 16px);z-index:500000!important}@media(max-width:900px){.cookie-banner.svelte-13tfp3v.svelte-13tfp3v{flex-wrap:wrap}}.banner-text.svelte-13tfp3v.svelte-13tfp3v{margin:0;padding:12px 16px}.banner-text.svelte-13tfp3v a.svelte-13tfp3v{color:#080037}.buttons.svelte-13tfp3v.svelte-13tfp3v{margin-left:auto;padding:12px 16px;white-space:nowrap}.buttons.svelte-13tfp3v button.svelte-13tfp3v{background-color:initial;border:1px solid #080037;border-radius:4px;color:#080037;margin:0 0 0 10px;padding:9px 10px;text-decoration:none;text-transform:uppercase;white-space:nowrap}.buttons.svelte-13tfp3v button.svelte-13tfp3v:focus,.buttons.svelte-13tfp3v button.svelte-13tfp3v:hover{background-color:#08003726;border:1px solid #080037;cursor:pointer;transition:all .2s ease-in-out}.buttons.svelte-13tfp3v button.allcookies.svelte-13tfp3v{background-color:#080037;border:1px solid #080037;color:#fff}.buttons.svelte-13tfp3v button.allcookies.svelte-13tfp3v:focus,.buttons.svelte-13tfp3v button.allcookies.svelte-13tfp3v:hover{background-color:#08003726;border:1px solid #080037;color:#080037!important;cursor:pointer;transition:all .2s ease-in-out}");
}
var get_buttons_slot_changes2 = (dirty) => ({});
var get_buttons_slot_context2 = (ctx) => ({});
function create_if_block2(ctx) {
  let div1;
  let p;
  let t4;
  let div0;
  let t5;
  let button0;
  let t7;
  let button1;
  let current;
  let mounted;
  let dispose;
  const buttons_slot_template = (
    /*#slots*/
    ctx[6].buttons
  );
  const buttons_slot = create_slot(
    buttons_slot_template,
    ctx,
    /*$$scope*/
    ctx[5],
    get_buttons_slot_context2
  );
  return {
    c() {
      div1 = element("div");
      p = element("p");
      p.innerHTML = `We use cookies to ensure that our website functions correctly. We also use performance cookies, which are
      anonymous and privacy-friendly, but you can always refuse them. <span class="nowrap svelte-13tfp3v">Find out more about our cookies in our <a href="https://www.ripe.net/about-us/legal/ripe-ncc-privacy-statement#cookies" class="svelte-13tfp3v">Privacy Statement</a></span>.`;
      t4 = space();
      div0 = element("div");
      if (buttons_slot) buttons_slot.c();
      t5 = space();
      button0 = element("button");
      button0.textContent = "Required Only";
      t7 = space();
      button1 = element("button");
      button1.textContent = "All Cookies";
      attr(p, "role", "status");
      attr(p, "aria-live", "polite");
      attr(p, "class", "banner-text svelte-13tfp3v");
      attr(button0, "class", "svelte-13tfp3v");
      attr(button1, "class", "allcookies svelte-13tfp3v");
      attr(div0, "class", "buttons svelte-13tfp3v");
      attr(div1, "class", "cookie-banner permanent svelte-13tfp3v");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, p);
      append(div1, t4);
      append(div1, div0);
      if (buttons_slot) {
        buttons_slot.m(div0, null);
      }
      append(div0, t5);
      append(div0, button0);
      append(div0, t7);
      append(div0, button1);
      ctx[7](div1);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*requiredonlyClickHandler*/
            ctx[2]
          ),
          listen(
            button1,
            "click",
            /*allcookiesHandler*/
            ctx[3]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (buttons_slot) {
        if (buttons_slot.p && (!current || dirty & /*$$scope*/
        32)) {
          update_slot_base(
            buttons_slot,
            buttons_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[5],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[5]
            ) : get_slot_changes(
              buttons_slot_template,
              /*$$scope*/
              ctx2[5],
              dirty,
              get_buttons_slot_changes2
            ),
            get_buttons_slot_context2
          );
        }
      }
    },
    i(local) {
      if (current) return;
      transition_in(buttons_slot, local);
      current = true;
    },
    o(local) {
      transition_out(buttons_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      if (buttons_slot) buttons_slot.d(detaching);
      ctx[7](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment2(ctx) {
  let if_block_anchor;
  let current;
  let if_block = !/*hidden*/
  ctx[0] && create_if_block2(ctx);
  return {
    c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (!/*hidden*/
      ctx2[0]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*hidden*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block2(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if (if_block) if_block.d(detaching);
    }
  };
}
var matomoCookie = "mtm-paq";
function instance2($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { id } = $$props;
  let { hidden = false } = $$props;
  let component;
  onMount(async () => {
    const cookie = readCookie(matomoCookie);
    if (cookie) {
      $$invalidate(0, hidden = true);
      if (cookie === "accepted") {
        setMatomo("setCookieConsentGiven");
      }
      return false;
    }
  });
  const dispatchEvent = (eventName) => {
    const event = new CustomEvent(
      eventName,
      {
        detail: { id },
        bubbles: true,
        cancelable: true,
        composed: true
      }
    );
    component.dispatchEvent(event);
  };
  const requiredonlyClickHandler = () => {
    dispatchEvent("cookie-banner-requiredonly-clicked");
    setCookie(matomoCookie, "rejected");
    $$invalidate(0, hidden = true);
  };
  const allcookiesHandler = () => {
    dispatchEvent("cookie-banner-allcookies-clicked");
    setCookie(matomoCookie, "accepted");
    setMatomo("setCookieConsentGiven");
    $$invalidate(0, hidden = true);
  };
  const setMatomo = (value) => {
    if (typeof _paq !== "undefined") {
      _paq.push([value]);
    }
  };
  const readCookie = (name) => {
    return (document.cookie.match(`(^|; )${name}=([^;]*)`) || 0)[2];
  };
  const setCookie = (name, val) => {
    const age = 24 * 60 * 60 * 365;
    document.cookie = `${name}=${val}; max-age=${age}; domain=.ripe.net; path=/; secure; SameSite=Lax`;
  };
  function div1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      component = $$value;
      $$invalidate(1, component);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("id" in $$props2) $$invalidate(4, id = $$props2.id);
    if ("hidden" in $$props2) $$invalidate(0, hidden = $$props2.hidden);
    if ("$$scope" in $$props2) $$invalidate(5, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*hidden*/
    1) {
      $$invalidate(0, hidden);
    }
  };
  return [
    hidden,
    component,
    requiredonlyClickHandler,
    allcookiesHandler,
    id,
    $$scope,
    slots,
    div1_binding
  ];
}
var AppCookieConsent = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance2, create_fragment2, safe_not_equal, { id: 4, hidden: 0 }, add_css2);
  }
  get id() {
    return this.$$.ctx[4];
  }
  set id(id) {
    this.$$set({ id });
    flush();
  }
  get hidden() {
    return this.$$.ctx[0];
  }
  set hidden(hidden) {
    this.$$set({ hidden });
    flush();
  }
};
customElements.define("app-cookie-consent", create_custom_element(AppCookieConsent, { "id": {}, "hidden": { "type": "Boolean" } }, ["buttons"], [], true));
var AppCookieConsent$1 = AppCookieConsent;

// node_modules/@technical-design/ripe-app-webcomponents/esm/node_modules/svelte/src/runtime/internal/each.js
function ensure_array_like(array_like_or_iterator) {
  return (array_like_or_iterator == null ? void 0 : array_like_or_iterator.length) !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}

// node_modules/@technical-design/ripe-app-webcomponents/esm/node_modules/svelte/src/runtime/store/index.js
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update2) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update2, subscribe };
}

// node_modules/@technical-design/ripe-app-webcomponents/esm/src/webcomponents/AppNavBar/store.js
var sidebarOpen = writable(false);

// node_modules/@technical-design/ripe-app-webcomponents/esm/src/webcomponents/AppNavBar/AppNavBar.svelte.js
function add_css3(target) {
  append_styles(target, "svelte-j351tz", ".svelte-j351tz.svelte-j351tz::-webkit-scrollbar{background:#0000;width:0}@media only screen and (max-width:1023px){#sidemenu.svelte-j351tz.svelte-j351tz{position:fixed!important}}#overlay.svelte-j351tz.svelte-j351tz{background:#666;display:none;height:100%;left:0;opacity:.3;position:fixed;top:0;width:100%!important;z-index:999}#overlay.menuisopen.svelte-j351tz.svelte-j351tz{display:block}#sidemenu.svelte-j351tz.svelte-j351tz{background-color:var(--ripe-app-navbar-background,#080037);box-shadow:0 0 7px #0000004d;display:flex;flex-direction:column;height:100vh;height:calc(var(--vh, 1vh)*100 - 70px);margin-left:-300px;overflow-x:hidden;overflow-y:scroll;position:sticky;scrollbar-width:none;top:70px;transition:margin-left .2s ease-in-out;-webkit-user-select:none;user-select:none;width:300px;z-index:1000}#sidemenu.svelte-j351tz.svelte-j351tz::-webkit-scrollbar{display:none}#sidemenu.open.svelte-j351tz.svelte-j351tz{margin-left:0}#sidemenu.abs.svelte-j351tz.svelte-j351tz{position:fixed}@media print{#sidemenu.svelte-j351tz.svelte-j351tz{display:none}}#sidemenu.svelte-j351tz #menu.svelte-j351tz{flex:1 0 auto;justify-content:flex-start;margin-top:1rem}#sidemenu.svelte-j351tz #menu menu-item.top-level.svelte-j351tz{margin-bottom:4px}#sidemenu.svelte-j351tz #footer.svelte-j351tz{border-top:1px solid var(--ripe-app-border-line,#2f2c56);justify-content:flex-end;margin-top:3rem;padding-bottom:1rem}");
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[24] = list[i];
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[24] = list[i];
  return child_ctx;
}
function create_if_block_12(ctx) {
  let each_1_anchor;
  let each_value_1 = ensure_array_like(
    /*topLevelItems*/
    ctx[7]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert(target, each_1_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*parsedMenu, topLevelItems, active, selectHandler, menuScrolling, open, expandHandler*/
      1735) {
        each_value_1 = ensure_array_like(
          /*topLevelItems*/
          ctx2[7]
        );
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_1.length;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(each_1_anchor);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_each_block_1(ctx) {
  let menu_item;
  let menu_item_menu_value;
  let menu_item_item_value;
  let menu_item_expanded_value;
  let mounted;
  let dispose;
  return {
    c() {
      menu_item = element("menu-item");
      set_custom_element_data(menu_item, "class", "top-level svelte-j351tz");
      set_custom_element_data(menu_item, "menu", menu_item_menu_value = /*parsedMenu*/
      ctx[2].main);
      set_custom_element_data(menu_item, "item", menu_item_item_value = /*item*/
      ctx[24]);
      set_custom_element_data(
        menu_item,
        "active",
        /*active*/
        ctx[1]
      );
      set_custom_element_data(menu_item, "expanded", menu_item_expanded_value = /*item*/
      ctx[24].expanded);
      set_custom_element_data(
        menu_item,
        "select",
        /*selectHandler*/
        ctx[10]
      );
      set_custom_element_data(
        menu_item,
        "scrolling",
        /*menuScrolling*/
        ctx[6]
      );
      set_custom_element_data(
        menu_item,
        "menuopen",
        /*open*/
        ctx[0]
      );
    },
    m(target, anchor) {
      insert(target, menu_item, anchor);
      if (!mounted) {
        dispose = listen(
          menu_item,
          "expand",
          /*expandHandler*/
          ctx[9]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*parsedMenu*/
      4 && menu_item_menu_value !== (menu_item_menu_value = /*parsedMenu*/
      ctx2[2].main)) {
        set_custom_element_data(menu_item, "menu", menu_item_menu_value);
      }
      if (dirty & /*topLevelItems*/
      128 && menu_item_item_value !== (menu_item_item_value = /*item*/
      ctx2[24])) {
        set_custom_element_data(menu_item, "item", menu_item_item_value);
      }
      if (dirty & /*active*/
      2) {
        set_custom_element_data(
          menu_item,
          "active",
          /*active*/
          ctx2[1]
        );
      }
      if (dirty & /*topLevelItems*/
      128 && menu_item_expanded_value !== (menu_item_expanded_value = /*item*/
      ctx2[24].expanded)) {
        set_custom_element_data(menu_item, "expanded", menu_item_expanded_value);
      }
      if (dirty & /*menuScrolling*/
      64) {
        set_custom_element_data(
          menu_item,
          "scrolling",
          /*menuScrolling*/
          ctx2[6]
        );
      }
      if (dirty & /*open*/
      1) {
        set_custom_element_data(
          menu_item,
          "menuopen",
          /*open*/
          ctx2[0]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(menu_item);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block3(ctx) {
  let each_1_anchor;
  let each_value = ensure_array_like(
    /*parsedMenu*/
    ctx[2].footer
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert(target, each_1_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*parsedMenu, active, selectHandler, menuScrolling, open, expandHandler*/
      1607) {
        each_value = ensure_array_like(
          /*parsedMenu*/
          ctx2[2].footer
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(each_1_anchor);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_each_block(ctx) {
  let menu_item;
  let menu_item_item_value;
  let menu_item_expanded_value;
  let mounted;
  let dispose;
  return {
    c() {
      menu_item = element("menu-item");
      set_custom_element_data(menu_item, "class", "top-level svelte-j351tz");
      set_custom_element_data(menu_item, "item", menu_item_item_value = /*item*/
      ctx[24]);
      set_custom_element_data(
        menu_item,
        "active",
        /*active*/
        ctx[1]
      );
      set_custom_element_data(menu_item, "expanded", menu_item_expanded_value = /*item*/
      ctx[24].expanded);
      set_custom_element_data(
        menu_item,
        "select",
        /*selectHandler*/
        ctx[10]
      );
      set_custom_element_data(
        menu_item,
        "scrolling",
        /*menuScrolling*/
        ctx[6]
      );
      set_custom_element_data(
        menu_item,
        "menuopen",
        /*open*/
        ctx[0]
      );
    },
    m(target, anchor) {
      insert(target, menu_item, anchor);
      if (!mounted) {
        dispose = listen(
          menu_item,
          "expand",
          /*expandHandler*/
          ctx[9]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*parsedMenu*/
      4 && menu_item_item_value !== (menu_item_item_value = /*item*/
      ctx2[24])) {
        set_custom_element_data(menu_item, "item", menu_item_item_value);
      }
      if (dirty & /*active*/
      2) {
        set_custom_element_data(
          menu_item,
          "active",
          /*active*/
          ctx2[1]
        );
      }
      if (dirty & /*parsedMenu*/
      4 && menu_item_expanded_value !== (menu_item_expanded_value = /*item*/
      ctx2[24].expanded)) {
        set_custom_element_data(menu_item, "expanded", menu_item_expanded_value);
      }
      if (dirty & /*menuScrolling*/
      64) {
        set_custom_element_data(
          menu_item,
          "scrolling",
          /*menuScrolling*/
          ctx2[6]
        );
      }
      if (dirty & /*open*/
      1) {
        set_custom_element_data(
          menu_item,
          "menuopen",
          /*open*/
          ctx2[0]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(menu_item);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_fragment3(ctx) {
  let nav;
  let div0;
  let t0;
  let div1;
  let t1;
  let div2;
  let mounted;
  let dispose;
  let if_block0 = (
    /*parsedMenu*/
    ctx[2].main && create_if_block_12(ctx)
  );
  let if_block1 = (
    /*parsedMenu*/
    ctx[2].footer && create_if_block3(ctx)
  );
  return {
    c() {
      nav = element("nav");
      div0 = element("div");
      if (if_block0) if_block0.c();
      t0 = space();
      div1 = element("div");
      if (if_block1) if_block1.c();
      t1 = space();
      div2 = element("div");
      attr(div0, "id", "menu");
      attr(div0, "class", "svelte-j351tz");
      attr(div1, "id", "footer");
      attr(div1, "class", "svelte-j351tz");
      attr(nav, "id", "sidemenu");
      attr(nav, "autoclose", "");
      attr(nav, "class", "svelte-j351tz");
      toggle_class(
        nav,
        "open",
        /*open*/
        ctx[0]
      );
      toggle_class(
        nav,
        "abs",
        /*abs*/
        ctx[5]
      );
      attr(div2, "id", "overlay");
      attr(div2, "class", "svelte-j351tz");
      toggle_class(
        div2,
        "menuisopen",
        /*menuisopen*/
        ctx[4]
      );
    },
    m(target, anchor) {
      insert(target, nav, anchor);
      append(nav, div0);
      if (if_block0) if_block0.m(div0, null);
      append(nav, t0);
      append(nav, div1);
      if (if_block1) if_block1.m(div1, null);
      ctx[18](nav);
      insert(target, t1, anchor);
      insert(target, div2, anchor);
      if (!mounted) {
        dispose = [
          listen(
            div2,
            "click",
            /*handleAutoClose*/
            ctx[8]
          ),
          listen(
            div2,
            "touchstart",
            /*handleAutoClose*/
            ctx[8],
            { passive: true }
          ),
          listen(
            div2,
            "keydown",
            /*handleAutoClose*/
            ctx[8]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (
        /*parsedMenu*/
        ctx2[2].main
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_12(ctx2);
          if_block0.c();
          if_block0.m(div0, null);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (
        /*parsedMenu*/
        ctx2[2].footer
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block3(ctx2);
          if_block1.c();
          if_block1.m(div1, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (dirty & /*open*/
      1) {
        toggle_class(
          nav,
          "open",
          /*open*/
          ctx2[0]
        );
      }
      if (dirty & /*abs*/
      32) {
        toggle_class(
          nav,
          "abs",
          /*abs*/
          ctx2[5]
        );
      }
      if (dirty & /*menuisopen*/
      16) {
        toggle_class(
          div2,
          "menuisopen",
          /*menuisopen*/
          ctx2[4]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(nav);
        detach(t1);
        detach(div2);
      }
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      ctx[18](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance3($$self, $$props, $$invalidate) {
  let initMenu;
  let parsedMenu;
  let expandedItems;
  let topLevelItems;
  let menuScrolling;
  let { menu = "{}" } = $$props;
  let { open } = $$props;
  let { autoclose = true } = $$props;
  let { active } = $$props;
  let sidemenu;
  let menuisopen = false;
  let abs = false;
  let initialRender = true;
  let prevWindowWidth;
  let { component } = $$props;
  let windowWidth = window.innerWidth;
  prevWindowWidth = windowWidth;
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const handleResize = () => {
    $$invalidate(15, windowWidth = window.innerWidth);
    if (autoclose) {
      if (windowWidth < 1024 && prevWindowWidth > 1024) {
        $$invalidate(0, open = false);
        $$invalidate(5, abs = true);
        prevWindowWidth = windowWidth;
      } else if (windowWidth > 1024 && prevWindowWidth < 1024) {
        $$invalidate(0, open = true);
        $$invalidate(5, abs = false);
        prevWindowWidth = windowWidth;
        if (isSafari) {
          const grid = document.getElementById("app-grid");
          grid.style.display = "none";
          grid.offsetHeight;
          grid.style.display = "grid";
        }
      }
    }
  };
  const handleAutoClose = () => {
    if (windowWidth < 1024 && open && autoclose) {
      $$invalidate(0, open = false);
    }
  };
  onMount(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
      const vh2 = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh2}px`);
      handleResize();
    });
    handleAutoClose();
    let isScrolling;
    sidemenu.addEventListener("touchmove", () => {
      $$invalidate(6, menuScrolling = true);
    });
    sidemenu.addEventListener("touchend", () => {
      $$invalidate(6, menuScrolling = false);
    });
    sidemenu.addEventListener("scroll", () => {
      $$invalidate(6, menuScrolling = true);
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(
        function() {
          $$invalidate(6, menuScrolling = false);
        },
        300
      );
    });
    tick().then(() => {
      sidebarOpen.subscribe((value) => {
        $$invalidate(0, open = value);
      });
    });
  });
  onDestroy(() => {
    window.removeEventListener("resize", handleResize);
  });
  const expandHandler = (e) => {
    const expItem = parsedMenu.main.find((i) => i.id === e.detail.id);
    if (expItem) {
      expItem.expanded = e.detail.expanded;
      const expandedChildren = parsedMenu.main.filter((i) => i.parent === e.detail.id && i.expanded);
      expandedChildren.forEach((c) => c.expanded = false);
      $$invalidate(16, expandedItems = parsedMenu.main.filter((i) => i.expanded).map((i) => i.id));
    }
  };
  const setParentActive = (child) => {
    if (child.parent === null || child.parent === "invisible") return;
    const activeParent = parsedMenu.main.find((item) => item.id === child.parent);
    if (!activeParent) {
      return;
    }
    activeParent.hasActive = true;
    setParentActive(activeParent);
  };
  const updateMenuOnActiveChange = (newActiveTitle) => {
    const mainItemActive = parsedMenu.main.find((item) => item.id === active);
    const activeItem = mainItemActive || parsedMenu.footer.find((item) => item.id === active);
    parsedMenu.main.forEach((item) => item.hasActive = false);
    if (mainItemActive) {
      setParentActive(activeItem);
    }
    $$invalidate(1, active = newActiveTitle);
  };
  const selectHandler = (selected) => {
    if (menuScrolling) return;
    const event = new CustomEvent(
      "app-nav-bar-select",
      {
        detail: { selected },
        bubbles: true,
        cancelable: true,
        composed: true
      }
    );
    component.dispatchEvent(event);
    setTimeout(updateMenuOnActiveChange.bind(this, selected.id));
    if (!selected.isParent) {
      handleAutoClose();
    }
  };
  function nav_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      sidemenu = $$value;
      $$invalidate(3, sidemenu);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("menu" in $$props2) $$invalidate(12, menu = $$props2.menu);
    if ("open" in $$props2) $$invalidate(0, open = $$props2.open);
    if ("autoclose" in $$props2) $$invalidate(11, autoclose = $$props2.autoclose);
    if ("active" in $$props2) $$invalidate(1, active = $$props2.active);
    if ("component" in $$props2) $$invalidate(13, component = $$props2.component);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*open*/
    1) {
      $$invalidate(0, open = !!(open || open === ""));
    }
    if ($$self.$$.dirty & /*autoclose*/
    2048) {
      $$invalidate(11, autoclose = !!(autoclose || autoclose === ""));
    }
    if ($$self.$$.dirty & /*open, windowWidth, autoclose*/
    34817) {
      {
        if (open && windowWidth < 1024 && autoclose) {
          $$invalidate(4, menuisopen = true);
        } else {
          $$invalidate(4, menuisopen = false);
        }
      }
    }
    if ($$self.$$.dirty & /*menu*/
    4096) {
      $$invalidate(17, initMenu = Object.entries(JSON.parse(menu)).reduce(
        (acc, kv) => {
          const [k, v] = kv;
          acc[k] = Array.isArray(v) && v.map((i) => ({
            ...i,
            id: i.id || i.title,
            parent: i.parent || null
          })) || v;
          return acc;
        },
        {}
      ));
    }
    if ($$self.$$.dirty & /*initMenu*/
    131072) {
      $$invalidate(2, parsedMenu = initMenu);
    }
    if ($$self.$$.dirty & /*parsedMenu, initialRender, active, expandedItems, initMenu*/
    212998) {
      parsedMenu && (() => {
        if (Object.keys(parsedMenu).length === 0) return;
        if (initialRender && active) {
          const nestedItems = parsedMenu.main.filter((i) => i.parent !== null);
          const nestedActive = nestedItems.find((i) => i.id === active);
          if (nestedActive) {
            const parent = parsedMenu.main.find((i) => i.id === nestedActive.parent);
            parent.expanded = true;
            if (parent.parent !== null) {
              const grandPa = parsedMenu.main.find((i) => i.id === parent.parent);
              grandPa.expanded = true;
            }
          }
          $$invalidate(14, initialRender = false);
        }
        $$invalidate(16, expandedItems = Array.from(new Set(expandedItems.concat(parsedMenu.main.filter((i) => i.expanded).map((i) => i.id)))));
        parsedMenu.main.forEach((i) => {
          if (!i.id) {
            i.id = i.title;
          }
          const ii = initMenu.main.find((ii2) => ii2.id === i.id);
          i.hasActive = i.id === active ? true : !!i.hasActive;
          i.expanded = expandedItems.some((ii2) => ii2 === i.id) || !!i.expanded;
          i.title = ii.title;
          i.subtitle = ii.subtitle;
        });
        parsedMenu.footer.forEach((i) => {
          if (!i.id) {
            i.id = i.title;
          }
          const ii = initMenu.footer.find((ii2) => ii2.id === i.id);
          i.hasActive = i.id === active ? true : !!i.hasActive;
          i.expanded = expandedItems.some((ii2) => ii2 === i.id) || !!i.expanded;
          i.title = ii.title;
          i.subtitle = ii.subtitle;
        });
        $$invalidate(7, topLevelItems = parsedMenu.main.filter((item) => item.parent === null));
        updateMenuOnActiveChange(active);
      })();
    }
    if ($$self.$$.dirty & /*open*/
    1) {
      sidebarOpen.set(open);
    }
  };
  $$invalidate(16, expandedItems = []);
  $$invalidate(7, topLevelItems = []);
  $$invalidate(6, menuScrolling = false);
  return [
    open,
    active,
    parsedMenu,
    sidemenu,
    menuisopen,
    abs,
    menuScrolling,
    topLevelItems,
    handleAutoClose,
    expandHandler,
    selectHandler,
    autoclose,
    menu,
    component,
    initialRender,
    windowWidth,
    expandedItems,
    initMenu,
    nav_binding
  ];
}
var AppNavBar = class extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance3,
      create_fragment3,
      safe_not_equal,
      {
        menu: 12,
        open: 0,
        autoclose: 11,
        active: 1,
        component: 13
      },
      add_css3
    );
  }
  get menu() {
    return this.$$.ctx[12];
  }
  set menu(menu) {
    this.$$set({ menu });
    flush();
  }
  get open() {
    return this.$$.ctx[0];
  }
  set open(open) {
    this.$$set({ open });
    flush();
  }
  get autoclose() {
    return this.$$.ctx[11];
  }
  set autoclose(autoclose) {
    this.$$set({ autoclose });
    flush();
  }
  get active() {
    return this.$$.ctx[1];
  }
  set active(active) {
    this.$$set({ active });
    flush();
  }
  get component() {
    return this.$$.ctx[13];
  }
  set component(component) {
    this.$$set({ component });
    flush();
  }
};
customElements.define("app-nav-bar", create_custom_element(AppNavBar, { "menu": {}, "open": {}, "autoclose": { "type": "Boolean" }, "active": {}, "component": {} }, [], [], true, (customElementConstructor) => {
  return class extends customElementConstructor {
    constructor() {
      super();
      this.component = this;
    }
  };
}));
var AppNavBar$1 = AppNavBar;

// node_modules/@technical-design/ripe-app-webcomponents/esm/src/webcomponents/AppNavBar/MenuItem.svelte.js
function add_css4(target) {
  append_styles(target, "svelte-1hqtabi", ":host{display:block;transition:height .2s ease-in-out}.item.svelte-1hqtabi.svelte-1hqtabi{color:var(--ripe-app-navbar-menuitem,#b8bbd0);cursor:pointer;display:flex;height:60px;position:relative;text-decoration:none;transition:background .2s ease-in-out;-webkit-user-select:none;user-select:none;width:300px}.item.isSelected.svelte-1hqtabi.svelte-1hqtabi{color:var(--ripe-app-navbar-active-menuitem,#fff)}.item.isSelected.svelte-1hqtabi .indicator.svelte-1hqtabi{opacity:1}.item.svelte-1hqtabi.svelte-1hqtabi:focus,.item.svelte-1hqtabi.svelte-1hqtabi:hover{color:var(--ripe-app-navbar-active-menuitem,#fff);outline:none}.item.svelte-1hqtabi:focus-visible .indicator.svelte-1hqtabi,.item.svelte-1hqtabi:hover .indicator.svelte-1hqtabi{opacity:.5}.item.svelte-1hqtabi .indicator.svelte-1hqtabi{background:var(--ripe-app-navbar-indicator,#f59331);height:100%;left:0;opacity:0;position:absolute;top:0;width:6px}.item.svelte-1hqtabi svg.external.svelte-1hqtabi{fill:var(--ripe-app-navbar-menuitem,#b8bbd0);height:.81rem;margin-left:5px;max-width:20px;vertical-align:initial}.item.svelte-1hqtabi .icon.svelte-1hqtabi{align-items:center;display:flex;flex-shrink:0;justify-content:center}.item.svelte-1hqtabi .icon.menuicon.svelte-1hqtabi{width:70px}.item.svelte-1hqtabi .icon.menuicon.svelte-1hqtabi svg{height:24px}.item.svelte-1hqtabi .icon.chevron.svelte-1hqtabi{color:#9d9aac;min-width:60px;transition:transform .1s ease-in-out}.item.svelte-1hqtabi .icon.chevron .svelte-1hqtabi{height:14px;width:14px}.item.svelte-1hqtabi .icon.chevron.expanded.svelte-1hqtabi{transform:rotate(90deg)}.item.svelte-1hqtabi .icon.chevron.hasActive.svelte-1hqtabi{color:gold}.item.svelte-1hqtabi .text.svelte-1hqtabi{display:flex;flex-direction:column;font-family:var(--ripe-app-font-family),Helvetica,Arial,Sans-serif;font-size:.91rem;font-weight:600;justify-content:center;line-height:1.3em;padding-right:1rem;text-rendering:geometricPrecision}.item.svelte-1hqtabi .text .text-wrap.svelte-1hqtabi{-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden;text-overflow:ellipsis}.item.svelte-1hqtabi .text .text-wrap.wrapped-title.svelte-1hqtabi{-webkit-line-clamp:1}.item.svelte-1hqtabi .text .text-wrap.wrapped-subtitle.svelte-1hqtabi{-webkit-line-clamp:2}.item.svelte-1hqtabi .text p.svelte-1hqtabi{display:block;margin:0}.item.svelte-1hqtabi .text .title.svelte-1hqtabi{font-weight:600}.item.svelte-1hqtabi .text .subtitle.svelte-1hqtabi{font-size:.78rem;font-weight:175;letter-spacing:.03333rem}.item.isChild.svelte-1hqtabi.svelte-1hqtabi{height:60px}.menu-level-0.svelte-1hqtabi.svelte-1hqtabi{background-color:var(--ripe-app-primary-900,#080037)}.menu-level-1.svelte-1hqtabi.svelte-1hqtabi{background-color:var(--ripe-app-primary-800,#0f154c)}.menu-level-2.svelte-1hqtabi.svelte-1hqtabi{background-color:var(--ripe-app-primary-700,#171d58)}button.chevron.svelte-1hqtabi.svelte-1hqtabi{background:none;border:none;cursor:pointer;outline:none}button.chevron.svelte-1hqtabi:focus svg.svelte-1hqtabi,button.chevron.svelte-1hqtabi:hover svg.svelte-1hqtabi{color:gold}button.svelte-1hqtabi svg.svelte-1hqtabi{overflow:initial}button.chevron.svelte-1hqtabi:focus-visible path#focus.svelte-1hqtabi{stroke:var(--ripe-app-primary-50,#e3e4ec)}");
}
function get_each_context2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[28] = list[i];
  return child_ctx;
}
function create_if_block_42(ctx) {
  let html_tag;
  let raw_value = (
    /*item*/
    ctx[0].icon + ""
  );
  let html_anchor;
  return {
    c() {
      html_tag = new HtmlTag(false);
      html_anchor = empty();
      html_tag.a = html_anchor;
    },
    m(target, anchor) {
      html_tag.m(raw_value, target, anchor);
      insert(target, html_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*item*/
      1 && raw_value !== (raw_value = /*item*/
      ctx2[0].icon + "")) html_tag.p(raw_value);
    },
    d(detaching) {
      if (detaching) {
        detach(html_anchor);
        html_tag.d();
      }
    }
  };
}
function create_if_block_32(ctx) {
  let svg;
  let path;
  return {
    c() {
      svg = svg_element("svg");
      path = svg_element("path");
      attr(path, "d", "M440,256H424a8,8,0,0,0-8,8V464a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V112A16,16,0,0,1,48,96H248a8,8,0,0,0,8-8V72a8,8,0,0,0-8-8H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V264A8,8,0,0,0,440,256ZM500,0,364,.34a12,12,0,0,0-12,12v10a12,12,0,0,0,12,12L454,34l.7.71L131.51,357.86a12,12,0,0,0,0,17l5.66,5.66a12,12,0,0,0,17,0L477.29,57.34l.71.7-.34,90a12,12,0,0,0,12,12h10a12,12,0,0,0,12-12L512,12A12,12,0,0,0,500,0Z");
      attr(path, "class", "svelte-1hqtabi");
      attr(svg, "class", "external svelte-1hqtabi");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "viewBox", "0 0 512 512");
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, path);
    },
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
function create_if_block_22(ctx) {
  let p;
  let t_value = (
    /*item*/
    ctx[0].subtitle + ""
  );
  let t;
  let p_title_value;
  let p_id_value;
  return {
    c() {
      p = element("p");
      t = text(t_value);
      attr(p, "class", "subtitle text-wrap wrapped-subtitle svelte-1hqtabi");
      attr(p, "title", p_title_value = /*isSubtitleWrapped*/
      ctx[14] ? (
        /*item*/
        ctx[0].subtitle
      ) : "");
      attr(p, "id", p_id_value = `subtitle-${/*item*/
      ctx[0].id}`);
    },
    m(target, anchor) {
      insert(target, p, anchor);
      append(p, t);
      ctx[23](p);
    },
    p(ctx2, dirty) {
      if (dirty & /*item*/
      1 && t_value !== (t_value = /*item*/
      ctx2[0].subtitle + "")) set_data(t, t_value);
      if (dirty & /*isSubtitleWrapped, item*/
      16385 && p_title_value !== (p_title_value = /*isSubtitleWrapped*/
      ctx2[14] ? (
        /*item*/
        ctx2[0].subtitle
      ) : "")) {
        attr(p, "title", p_title_value);
      }
      if (dirty & /*item*/
      1 && p_id_value !== (p_id_value = `subtitle-${/*item*/
      ctx2[0].id}`)) {
        attr(p, "id", p_id_value);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(p);
      }
      ctx[23](null);
    }
  };
}
function create_if_block_13(ctx) {
  let button;
  let svg;
  let path0;
  let path1;
  let button_aria_label_value;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      svg = svg_element("svg");
      path0 = svg_element("path");
      path1 = svg_element("path");
      attr(path0, "id", "focus");
      attr(path0, "stroke-width", "150");
      attr(path0, "d", "m18 36-8 8c-4 4-4 12 0 17l196 195L10 451c-4 5-4 13 0 17l8 8c4 4 12 4 16 0l212-212c4-4 4-12 0-16L34 36c-4-4-12-4-16 0z");
      attr(path0, "class", "svelte-1hqtabi");
      attr(path1, "stroke", "currentColor");
      attr(path1, "stroke-width", "40");
      attr(path1, "d", "m18 36-8 8c-4 4-4 12 0 17l196 195L10 451c-4 5-4 13 0 17l8 8c4 4 12 4 16 0l212-212c4-4 4-12 0-16L34 36c-4-4-12-4-16 0z");
      attr(path1, "class", "svelte-1hqtabi");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "viewBox", "0 0 256 512");
      attr(svg, "class", "svelte-1hqtabi");
      attr(button, "class", "icon chevron svelte-1hqtabi");
      attr(button, "aria-label", button_aria_label_value = /*expanded*/
      ctx[1] ? `Collapse ${/*item*/
      ctx[0].title} menu` : `Expand ${/*item*/
      ctx[0].title} menu`);
      toggle_class(
        button,
        "expanded",
        /*expanded*/
        ctx[1]
      );
      toggle_class(
        button,
        "hasActive",
        /*hasActive*/
        ctx[16]
      );
    },
    m(target, anchor) {
      insert(target, button, anchor);
      append(button, svg);
      append(svg, path0);
      append(svg, path1);
      if (!mounted) {
        dispose = [
          listen(
            button,
            "click",
            /*toggle*/
            ctx[19]
          ),
          listen(
            button,
            "touchend",
            /*toggle*/
            ctx[19]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*expanded, item*/
      3 && button_aria_label_value !== (button_aria_label_value = /*expanded*/
      ctx2[1] ? `Collapse ${/*item*/
      ctx2[0].title} menu` : `Expand ${/*item*/
      ctx2[0].title} menu`)) {
        attr(button, "aria-label", button_aria_label_value);
      }
      if (dirty & /*expanded*/
      2) {
        toggle_class(
          button,
          "expanded",
          /*expanded*/
          ctx2[1]
        );
      }
      if (dirty & /*hasActive*/
      65536) {
        toggle_class(
          button,
          "hasActive",
          /*hasActive*/
          ctx2[16]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block4(ctx) {
  let each_1_anchor;
  let current;
  let each_value = ensure_array_like(
    /*children*/
    ctx[9]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block2(get_each_context2(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & /*menu, children, active, menulevel, select, scrolling, menuopen*/
      1012) {
        each_value = ensure_array_like(
          /*children*/
          ctx2[9]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context2(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block2(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(each_1_anchor);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_each_block2(ctx) {
  let menuitem;
  let current;
  menuitem = new MenuItem({
    props: {
      menu: (
        /*menu*/
        ctx[6]
      ),
      item: (
        /*child*/
        ctx[28]
      ),
      active: (
        /*active*/
        ctx[4]
      ),
      expanded: (
        /*child*/
        ctx[28].expanded
      ),
      menulevel: (
        /*menulevel*/
        ctx[5] + 1
      ),
      select: (
        /*select*/
        ctx[7]
      ),
      scrolling: (
        /*scrolling*/
        ctx[8]
      ),
      menuopen: (
        /*menuopen*/
        ctx[2]
      )
    }
  });
  return {
    c() {
      create_component(menuitem.$$.fragment);
    },
    m(target, anchor) {
      mount_component(menuitem, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const menuitem_changes = {};
      if (dirty & /*menu*/
      64) menuitem_changes.menu = /*menu*/
      ctx2[6];
      if (dirty & /*children*/
      512) menuitem_changes.item = /*child*/
      ctx2[28];
      if (dirty & /*active*/
      16) menuitem_changes.active = /*active*/
      ctx2[4];
      if (dirty & /*children*/
      512) menuitem_changes.expanded = /*child*/
      ctx2[28].expanded;
      if (dirty & /*menulevel*/
      32) menuitem_changes.menulevel = /*menulevel*/
      ctx2[5] + 1;
      if (dirty & /*select*/
      128) menuitem_changes.select = /*select*/
      ctx2[7];
      if (dirty & /*scrolling*/
      256) menuitem_changes.scrolling = /*scrolling*/
      ctx2[8];
      if (dirty & /*menuopen*/
      4) menuitem_changes.menuopen = /*menuopen*/
      ctx2[2];
      menuitem.$set(menuitem_changes);
    },
    i(local) {
      if (current) return;
      transition_in(menuitem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(menuitem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(menuitem, detaching);
    }
  };
}
function create_fragment4(ctx) {
  let div3;
  let a;
  let div0;
  let t0;
  let div1;
  let t1;
  let div2;
  let p;
  let t2_value = (
    /*item*/
    ctx[0].title + ""
  );
  let t2;
  let t3;
  let p_title_value;
  let p_id_value;
  let t4;
  let a_href_value;
  let a_tabindex_value;
  let t5;
  let div3_class_value;
  let t6;
  let div4;
  let div4_class_value;
  let current;
  let mounted;
  let dispose;
  let if_block0 = (
    /*item*/
    ctx[0].icon && create_if_block_42(ctx)
  );
  let if_block1 = (
    /*item*/
    ctx[0].external && create_if_block_32()
  );
  let if_block2 = (
    /*item*/
    ctx[0].subtitle && create_if_block_22(ctx)
  );
  let if_block3 = (
    /*children*/
    ctx[9].length > 0 && create_if_block_13(ctx)
  );
  let if_block4 = (
    /*children*/
    ctx[9].length > 0 && /*expanded*/
    ctx[1] && create_if_block4(ctx)
  );
  return {
    c() {
      div3 = element("div");
      a = element("a");
      div0 = element("div");
      t0 = space();
      div1 = element("div");
      if (if_block0) if_block0.c();
      t1 = space();
      div2 = element("div");
      p = element("p");
      t2 = text(t2_value);
      t3 = space();
      if (if_block1) if_block1.c();
      t4 = space();
      if (if_block2) if_block2.c();
      t5 = space();
      if (if_block3) if_block3.c();
      t6 = space();
      div4 = element("div");
      if (if_block4) if_block4.c();
      attr(div0, "class", "indicator svelte-1hqtabi");
      attr(div1, "class", "icon menuicon svelte-1hqtabi");
      attr(p, "class", "title text-wrap wrapped-title svelte-1hqtabi");
      attr(p, "title", p_title_value = /*isTitleWrapped*/
      ctx[13] ? (
        /*item*/
        ctx[0].title
      ) : "");
      attr(p, "id", p_id_value = `title-${/*item*/
      ctx[0].id}`);
      attr(div2, "class", "text svelte-1hqtabi");
      attr(a, "class", "item svelte-1hqtabi");
      attr(a, "href", a_href_value = /*item*/
      ctx[0].url);
      attr(a, "tabindex", a_tabindex_value = /*item*/
      ctx[0].url ? (
        /*menuopen*/
        ctx[2] ? 0 : -1
      ) : -1);
      toggle_class(
        a,
        "isSelected",
        /*isSelected*/
        ctx[18]
      );
      attr(div3, "class", div3_class_value = null_to_empty(`item ${/*bgClass*/
      ctx[15]}`) + " svelte-1hqtabi");
      toggle_class(
        div3,
        "isSelected",
        /*isSelected*/
        ctx[18]
      );
      toggle_class(
        div3,
        "expanded",
        /*expanded*/
        ctx[1]
      );
      toggle_class(
        div3,
        "isChild",
        /*isChild*/
        ctx[17]
      );
      attr(div4, "class", div4_class_value = null_to_empty(
        /*bgClass*/
        ctx[15]
      ) + " svelte-1hqtabi");
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      append(div3, a);
      append(a, div0);
      append(a, t0);
      append(a, div1);
      if (if_block0) if_block0.m(div1, null);
      append(a, t1);
      append(a, div2);
      append(div2, p);
      append(p, t2);
      append(p, t3);
      if (if_block1) if_block1.m(p, null);
      ctx[22](p);
      append(div2, t4);
      if (if_block2) if_block2.m(div2, null);
      append(div3, t5);
      if (if_block3) if_block3.m(div3, null);
      ctx[24](div3);
      insert(target, t6, anchor);
      insert(target, div4, anchor);
      if (if_block4) if_block4.m(div4, null);
      ctx[25](div4);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            a,
            "click",
            /*setActiveAndToggleExpand*/
            ctx[20]
          ),
          listen(
            a,
            "touchend",
            /*setActiveAndToggleExpand*/
            ctx[20]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (
        /*item*/
        ctx2[0].icon
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_42(ctx2);
          if_block0.c();
          if_block0.m(div1, null);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if ((!current || dirty & /*item*/
      1) && t2_value !== (t2_value = /*item*/
      ctx2[0].title + "")) set_data(t2, t2_value);
      if (
        /*item*/
        ctx2[0].external
      ) {
        if (if_block1) ;
        else {
          if_block1 = create_if_block_32();
          if_block1.c();
          if_block1.m(p, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (!current || dirty & /*isTitleWrapped, item*/
      8193 && p_title_value !== (p_title_value = /*isTitleWrapped*/
      ctx2[13] ? (
        /*item*/
        ctx2[0].title
      ) : "")) {
        attr(p, "title", p_title_value);
      }
      if (!current || dirty & /*item*/
      1 && p_id_value !== (p_id_value = `title-${/*item*/
      ctx2[0].id}`)) {
        attr(p, "id", p_id_value);
      }
      if (
        /*item*/
        ctx2[0].subtitle
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
        } else {
          if_block2 = create_if_block_22(ctx2);
          if_block2.c();
          if_block2.m(div2, null);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
      if (!current || dirty & /*item*/
      1 && a_href_value !== (a_href_value = /*item*/
      ctx2[0].url)) {
        attr(a, "href", a_href_value);
      }
      if (!current || dirty & /*item, menuopen*/
      5 && a_tabindex_value !== (a_tabindex_value = /*item*/
      ctx2[0].url ? (
        /*menuopen*/
        ctx2[2] ? 0 : -1
      ) : -1)) {
        attr(a, "tabindex", a_tabindex_value);
      }
      if (!current || dirty & /*isSelected*/
      262144) {
        toggle_class(
          a,
          "isSelected",
          /*isSelected*/
          ctx2[18]
        );
      }
      if (
        /*children*/
        ctx2[9].length > 0
      ) {
        if (if_block3) {
          if_block3.p(ctx2, dirty);
        } else {
          if_block3 = create_if_block_13(ctx2);
          if_block3.c();
          if_block3.m(div3, null);
        }
      } else if (if_block3) {
        if_block3.d(1);
        if_block3 = null;
      }
      if (!current || dirty & /*bgClass*/
      32768 && div3_class_value !== (div3_class_value = null_to_empty(`item ${/*bgClass*/
      ctx2[15]}`) + " svelte-1hqtabi")) {
        attr(div3, "class", div3_class_value);
      }
      if (!current || dirty & /*bgClass, isSelected*/
      294912) {
        toggle_class(
          div3,
          "isSelected",
          /*isSelected*/
          ctx2[18]
        );
      }
      if (!current || dirty & /*bgClass, expanded*/
      32770) {
        toggle_class(
          div3,
          "expanded",
          /*expanded*/
          ctx2[1]
        );
      }
      if (!current || dirty & /*bgClass, isChild*/
      163840) {
        toggle_class(
          div3,
          "isChild",
          /*isChild*/
          ctx2[17]
        );
      }
      if (
        /*children*/
        ctx2[9].length > 0 && /*expanded*/
        ctx2[1]
      ) {
        if (if_block4) {
          if_block4.p(ctx2, dirty);
          if (dirty & /*children, expanded*/
          514) {
            transition_in(if_block4, 1);
          }
        } else {
          if_block4 = create_if_block4(ctx2);
          if_block4.c();
          transition_in(if_block4, 1);
          if_block4.m(div4, null);
        }
      } else if (if_block4) {
        group_outros();
        transition_out(if_block4, 1, 1, () => {
          if_block4 = null;
        });
        check_outros();
      }
      if (!current || dirty & /*bgClass*/
      32768 && div4_class_value !== (div4_class_value = null_to_empty(
        /*bgClass*/
        ctx2[15]
      ) + " svelte-1hqtabi")) {
        attr(div4, "class", div4_class_value);
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block4);
      current = true;
    },
    o(local) {
      transition_out(if_block4);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div3);
        detach(t6);
        detach(div4);
      }
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      ctx[22](null);
      if (if_block2) if_block2.d();
      if (if_block3) if_block3.d();
      ctx[24](null);
      if (if_block4) if_block4.d();
      ctx[25](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance4($$self, $$props, $$invalidate) {
  let isSelected;
  let isChild;
  let children2;
  let hasActive;
  let bgClass;
  let { item = {} } = $$props;
  let { active = null } = $$props;
  let { expanded = false } = $$props;
  let { isParent = false } = $$props;
  let { menulevel = 0 } = $$props;
  let { menu = [] } = $$props;
  let { select } = $$props;
  let { scrolling = false } = $$props;
  let { menuopen = false } = $$props;
  let childContainer;
  let elTitle, elSubtitle;
  let isTitleWrapped, isSubtitleWrapped;
  afterUpdate(() => {
    elTitle && $$invalidate(13, isTitleWrapped = elTitle.offsetHeight < elTitle.scrollHeight);
    elSubtitle && $$invalidate(14, isSubtitleWrapped = elSubtitle.offsetHeight < elSubtitle.scrollHeight);
  });
  let { component } = $$props;
  const toggle = (e) => {
    e.preventDefault();
    animateChildContainer(!expanded);
    $$invalidate(1, expanded = !expanded);
    dispatchExpandEvent();
  };
  const setActiveAndToggleExpand = (e) => {
    if (scrolling) return;
    e.preventDefault();
    if (e.metaKey && item.url.startsWith("http") || item.external) {
      window.open(`${item.url}`, "_blank");
    } else {
      if (children2.length) {
        $$invalidate(0, item.isParent = true, item);
        toggle(e);
      }
      select(item);
    }
  };
  const dispatchExpandEvent = () => {
    const event = new CustomEvent(
      "expand",
      {
        detail: { id: item.id, expanded },
        bubbles: true,
        cancelable: true,
        composed: true
      }
    );
    component.dispatchEvent(event);
  };
  const animateChildContainer = (isExpanding) => {
    if (typeof childContainer.animate !== "function") return;
    const currentHeight = childContainer.getBoundingClientRect().height;
    const numOfChildren = children2 && children2.length;
    childContainer.animate(
      [
        {
          height: isExpanding ? 0 : `${currentHeight}px`,
          opacity: isExpanding ? 0 : 1
        },
        {
          height: isExpanding ? `${numOfChildren * 60}px` : 0,
          opacity: isExpanding ? 1 : 0
        }
      ],
      { duration: 200, easing: "ease-in-out" }
    );
  };
  function p_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      elTitle = $$value;
      $$invalidate(11, elTitle);
    });
  }
  function p_binding_1($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      elSubtitle = $$value;
      $$invalidate(12, elSubtitle);
    });
  }
  function div3_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      component = $$value;
      $$invalidate(3, component);
    });
  }
  function div4_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      childContainer = $$value;
      $$invalidate(10, childContainer);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("item" in $$props2) $$invalidate(0, item = $$props2.item);
    if ("active" in $$props2) $$invalidate(4, active = $$props2.active);
    if ("expanded" in $$props2) $$invalidate(1, expanded = $$props2.expanded);
    if ("isParent" in $$props2) $$invalidate(21, isParent = $$props2.isParent);
    if ("menulevel" in $$props2) $$invalidate(5, menulevel = $$props2.menulevel);
    if ("menu" in $$props2) $$invalidate(6, menu = $$props2.menu);
    if ("select" in $$props2) $$invalidate(7, select = $$props2.select);
    if ("scrolling" in $$props2) $$invalidate(8, scrolling = $$props2.scrolling);
    if ("menuopen" in $$props2) $$invalidate(2, menuopen = $$props2.menuopen);
    if ("component" in $$props2) $$invalidate(3, component = $$props2.component);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*item, active*/
    17) {
      $$invalidate(18, isSelected = item.id === active);
    }
    if ($$self.$$.dirty & /*item*/
    1) {
      $$invalidate(17, isChild = !item.icon && !item.children);
    }
    if ($$self.$$.dirty & /*item*/
    1) {
      $$invalidate(21, isParent = !!item.children);
    }
    if ($$self.$$.dirty & /*menu, item*/
    65) {
      $$invalidate(9, children2 = menu.filter((i) => i.parent === item.id));
    }
    if ($$self.$$.dirty & /*children, active*/
    528) {
      $$invalidate(16, hasActive = children2.find((child) => child.id === active) || children2.find((child) => child.hasActive));
    }
    if ($$self.$$.dirty & /*menuopen*/
    4) {
      $$invalidate(2, menuopen = menuopen || menuopen === "" || menuopen === "true");
    }
    if ($$self.$$.dirty & /*expanded, menulevel*/
    34) {
      $$invalidate(15, bgClass = expanded ? `menu-level-${Math.min(menulevel + 1, 2)}` : `menu-level-${menulevel};`);
    }
  };
  return [
    item,
    expanded,
    menuopen,
    component,
    active,
    menulevel,
    menu,
    select,
    scrolling,
    children2,
    childContainer,
    elTitle,
    elSubtitle,
    isTitleWrapped,
    isSubtitleWrapped,
    bgClass,
    hasActive,
    isChild,
    isSelected,
    toggle,
    setActiveAndToggleExpand,
    isParent,
    p_binding,
    p_binding_1,
    div3_binding,
    div4_binding
  ];
}
var MenuItem = class extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance4,
      create_fragment4,
      safe_not_equal,
      {
        item: 0,
        active: 4,
        expanded: 1,
        isParent: 21,
        menulevel: 5,
        menu: 6,
        select: 7,
        scrolling: 8,
        menuopen: 2,
        component: 3
      },
      add_css4
    );
  }
  get item() {
    return this.$$.ctx[0];
  }
  set item(item) {
    this.$$set({ item });
    flush();
  }
  get active() {
    return this.$$.ctx[4];
  }
  set active(active) {
    this.$$set({ active });
    flush();
  }
  get expanded() {
    return this.$$.ctx[1];
  }
  set expanded(expanded) {
    this.$$set({ expanded });
    flush();
  }
  get isParent() {
    return this.$$.ctx[21];
  }
  set isParent(isParent) {
    this.$$set({ isParent });
    flush();
  }
  get menulevel() {
    return this.$$.ctx[5];
  }
  set menulevel(menulevel) {
    this.$$set({ menulevel });
    flush();
  }
  get menu() {
    return this.$$.ctx[6];
  }
  set menu(menu) {
    this.$$set({ menu });
    flush();
  }
  get select() {
    return this.$$.ctx[7];
  }
  set select(select) {
    this.$$set({ select });
    flush();
  }
  get scrolling() {
    return this.$$.ctx[8];
  }
  set scrolling(scrolling) {
    this.$$set({ scrolling });
    flush();
  }
  get menuopen() {
    return this.$$.ctx[2];
  }
  set menuopen(menuopen) {
    this.$$set({ menuopen });
    flush();
  }
  get component() {
    return this.$$.ctx[3];
  }
  set component(component) {
    this.$$set({ component });
    flush();
  }
};
customElements.define("menu-item", create_custom_element(MenuItem, { "item": {}, "active": {}, "expanded": { "type": "Boolean" }, "isParent": { "type": "Boolean" }, "menulevel": {}, "menu": {}, "select": {}, "scrolling": { "type": "Boolean" }, "menuopen": { "type": "Boolean" }, "component": {} }, [], [], true));
var MenuItem$1 = MenuItem;

// node_modules/@technical-design/ripe-app-webcomponents/esm/src/webcomponents/AppNavBar/index.js
var index = {
  MenuItem: MenuItem$1,
  AppNavBar: AppNavBar$1
};

// node_modules/@technical-design/ripe-app-webcomponents/esm/src/webcomponents/UserLogin/index.js
var mobileMenuLinksStore = writable([]);
var isMobileStore = writable(false);

// node_modules/@technical-design/ripe-app-webcomponents/esm/src/webcomponents/AppSwitcher/AppSwitcher.svelte.js
function add_css5(target) {
  append_styles(target, "svelte-1f4a07u", '#main.svelte-1f4a07u.svelte-1f4a07u{align-items:center;cursor:pointer;display:flex;font-family:var(--ripe-app-font-family),Helvetica,Arial,Sans-serif;font-size:.875rem;font-weight:600;height:40px;justify-content:center;outline:none;position:relative;-webkit-user-select:none;user-select:none;width:40px}@media(pointer:fine){#main.svelte-1f4a07u:hover circle.svelte-1f4a07u{fill:var(--ripe-app-header-icon-hover,#080037);transform:scale(1.25);transform-origin:16px 16px;transition:transform .1s ease-in}#main.svelte-1f4a07u:hover path.svelte-1f4a07u{fill:#fff}}#main.svelte-1f4a07u:focus circle.svelte-1f4a07u,#main.svelte-1f4a07u:focus-within circle.svelte-1f4a07u{fill:var(--ripe-app-header-icon-hover,#080037);transform:scale(1.25);transform-origin:16px 16px;transition:transform .1s ease-in}#main.svelte-1f4a07u:focus path.svelte-1f4a07u,#main.svelte-1f4a07u:focus-within path.svelte-1f4a07u{fill:#fff}#main.svelte-1f4a07u:focus-within nav.svelte-1f4a07u{display:block}@media only screen and (max-width:400px){#main.svelte-1f4a07u.svelte-1f4a07u{margin-left:.5rem}}@media print{#main.svelte-1f4a07u.svelte-1f4a07u{display:none}}.hideclass.svelte-1f4a07u.svelte-1f4a07u{display:none!important}svg.svelte-1f4a07u.svelte-1f4a07u{all:unset;background:none;border:none;cursor:pointer;height:32px;outline:none;overflow:visible;padding:0;width:32px;z-index:1}svg.svelte-1f4a07u circle.svelte-1f4a07u{fill:none;stroke:none}svg.svelte-1f4a07u path.svelte-1f4a07u{fill:#080037}nav.svelte-1f4a07u.svelte-1f4a07u{display:none;right:-53px;top:20px;width:-moz-fit-content;width:fit-content}nav.svelte-1f4a07u.svelte-1f4a07u,nav.svelte-1f4a07u.svelte-1f4a07u:after{position:absolute}nav.svelte-1f4a07u.svelte-1f4a07u:after{border:10px solid #0000;border-bottom:10px solid var(--ripe-app-navbar-background,#080037);content:" ";height:0;pointer-events:none;right:63px;top:15px;width:0}#apps-list.svelte-1f4a07u.svelte-1f4a07u{background-color:var(--ripe-app-navbar-background,#080037);border-radius:.5rem;column-count:2;list-style:none;margin:35px 0 0;padding:1.5rem 1.5rem 0;z-index:999999}#apps-list.svelte-1f4a07u li.svelte-1f4a07u{padding-bottom:1.25rem}#apps-list.svelte-1f4a07u li a.svelte-1f4a07u{border-bottom:1px solid #0000;color:var(--ripe-app-menuitem,#fff);display:inline-block;overflow:hidden;text-decoration:none;text-overflow:ellipsis;white-space:nowrap}#apps-list.svelte-1f4a07u li a.svelte-1f4a07u:focus,#apps-list.svelte-1f4a07u li a.svelte-1f4a07u:focus-within,#apps-list.svelte-1f4a07u li a.svelte-1f4a07u:hover{border-bottom-color:var(--ripe-app-navbar-active-menuitem,#fff)}#apps-list.svelte-1f4a07u li a.active.svelte-1f4a07u{border-bottom:2px solid var(--ripe-app-navbar-indicator,#f59331)}');
}
function get_each_context3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[12] = list[i];
  return child_ctx;
}
function create_each_block3(ctx) {
  let li;
  let a;
  let t0_value = (
    /*site*/
    ctx[12].title + ""
  );
  let t0;
  let a_href_value;
  let t1;
  let mounted;
  let dispose;
  return {
    c() {
      li = element("li");
      a = element("a");
      t0 = text(t0_value);
      t1 = space();
      attr(a, "href", a_href_value = /*site*/
      ctx[12].url);
      attr(a, "class", "svelte-1f4a07u");
      toggle_class(
        a,
        "active",
        /*site*/
        ctx[12].active === true
      );
      attr(li, "class", "svelte-1f4a07u");
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, a);
      append(a, t0);
      append(li, t1);
      if (!mounted) {
        dispose = listen(a, "click", function() {
          if (is_function(
            /*itemClicked*/
            ctx[3](
              /*site*/
              ctx[12].title
            )
          )) ctx[3](
            /*site*/
            ctx[12].title
          ).apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*sites*/
      1 && t0_value !== (t0_value = /*site*/
      ctx[12].title + "")) set_data(t0, t0_value);
      if (dirty & /*sites*/
      1 && a_href_value !== (a_href_value = /*site*/
      ctx[12].url)) {
        attr(a, "href", a_href_value);
      }
      if (dirty & /*sites*/
      1) {
        toggle_class(
          a,
          "active",
          /*site*/
          ctx[12].active === true
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(li);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_fragment5(ctx) {
  let div;
  let svg;
  let circle;
  let path0;
  let path1;
  let path2;
  let path3;
  let path4;
  let path5;
  let path6;
  let path7;
  let path8;
  let t;
  let nav;
  let ul;
  let mounted;
  let dispose;
  let each_value = ensure_array_like(
    /*sites*/
    ctx[0]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block3(get_each_context3(ctx, each_value, i));
  }
  return {
    c() {
      div = element("div");
      svg = svg_element("svg");
      circle = svg_element("circle");
      path0 = svg_element("path");
      path1 = svg_element("path");
      path2 = svg_element("path");
      path3 = svg_element("path");
      path4 = svg_element("path");
      path5 = svg_element("path");
      path6 = svg_element("path");
      path7 = svg_element("path");
      path8 = svg_element("path");
      t = space();
      nav = element("nav");
      ul = element("ul");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(circle, "cx", "16");
      attr(circle, "cy", "16");
      attr(circle, "r", "15");
      attr(circle, "class", "svelte-1f4a07u");
      attr(path0, "d", "M11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7C10.1046 7 11 7.89543 11 9Z");
      attr(path0, "class", "svelte-1f4a07u");
      attr(path1, "d", "M18 9C18 10.1046 17.1046 11 16 11C14.8954 11 14 10.1046 14 9C14 7.89543 14.8954 7 16 7C17.1046 7 18 7.89543 18 9Z");
      attr(path1, "class", "svelte-1f4a07u");
      attr(path2, "d", "M25 9C25 10.1046 24.1046 11 23 11C21.8954 11 21 10.1046 21 9C21 7.89543 21.8954 7 23 7C24.1046 7 25 7.89543 25 9Z");
      attr(path2, "class", "svelte-1f4a07u");
      attr(path3, "d", "M11 16C11 17.1046 10.1046 18 9 18C7.89543 18 7 17.1046 7 16C7 14.8954 7.89543 14 9 14C10.1046 14 11 14.8954 11 16Z");
      attr(path3, "class", "svelte-1f4a07u");
      attr(path4, "d", "M18 16C18 17.1046 17.1046 18 16 18C14.8954 18 14 17.1046 14 16C14 14.8954 14.8954 14 16 14C17.1046 14 18 14.8954 18 16Z");
      attr(path4, "class", "svelte-1f4a07u");
      attr(path5, "d", "M25 16C25 17.1046 24.1046 18 23 18C21.8954 18 21 17.1046 21 16C21 14.8954 21.8954 14 23 14C24.1046 14 25 14.8954 25 16Z");
      attr(path5, "class", "svelte-1f4a07u");
      attr(path6, "d", "M11 23C11 24.1046 10.1046 25 9 25C7.89543 25 7 24.1046 7 23C7 21.8954 7.89543 21 9 21C10.1046 21 11 21.8954 11 23Z");
      attr(path6, "class", "svelte-1f4a07u");
      attr(path7, "d", "M18 23C18 24.1046 17.1046 25 16 25C14.8954 25 14 24.1046 14 23C14 21.8954 14.8954 21 16 21C17.1046 21 18 21.8954 18 23Z");
      attr(path7, "class", "svelte-1f4a07u");
      attr(path8, "d", "M25 23C25 24.1046 24.1046 25 23 25C21.8954 25 21 24.1046 21 23C21 21.8954 21.8954 21 23 21C24.1046 21 25 21.8954 25 23Z");
      attr(path8, "class", "svelte-1f4a07u");
      attr(svg, "viewBox", "0 0 32 32");
      attr(svg, "class", "svelte-1f4a07u");
      attr(ul, "id", "apps-list");
      attr(ul, "class", "svelte-1f4a07u");
      attr(nav, "class", "svelte-1f4a07u");
      attr(div, "id", "main");
      attr(div, "tabindex", "0");
      attr(div, "aria-label", "Applications");
      attr(div, "aria-haspopup", "menu");
      attr(div, "role", "menuitem");
      attr(div, "class", "svelte-1f4a07u");
      toggle_class(
        div,
        "hideclass",
        /*isMobileMode*/
        ctx[1]
      );
      toggle_class(
        div,
        "mobile",
        /*isMobileMode*/
        ctx[1]
      );
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, svg);
      append(svg, circle);
      append(svg, path0);
      append(svg, path1);
      append(svg, path2);
      append(svg, path3);
      append(svg, path4);
      append(svg, path5);
      append(svg, path6);
      append(svg, path7);
      append(svg, path8);
      append(div, t);
      append(div, nav);
      append(nav, ul);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(ul, null);
        }
      }
      if (!mounted) {
        dispose = listen(
          div,
          "mousedown",
          /*manageFocus*/
          ctx[2]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*sites, itemClicked*/
      9) {
        each_value = ensure_array_like(
          /*sites*/
          ctx2[0]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context3(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block3(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(ul, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
      if (dirty & /*isMobileMode*/
      2) {
        toggle_class(
          div,
          "hideclass",
          /*isMobileMode*/
          ctx2[1]
        );
      }
      if (dirty & /*isMobileMode*/
      2) {
        toggle_class(
          div,
          "mobile",
          /*isMobileMode*/
          ctx2[1]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_each(each_blocks, detaching);
      mounted = false;
      dispose();
    }
  };
}
function instance5($$self, $$props, $$invalidate) {
  let { component } = $$props;
  let sites = [{ title: "Loading...", url: "#", name: "" }];
  let isMobileMode = false;
  let { current = null } = $$props;
  let { appenv = "prod" } = $$props;
  const fallbackSites = [
    {
      title: "RIPE.NET",
      url: "https://www.ripe.net",
      name: "www"
    },
    {
      title: "LIR Portal",
      url: "https://lirportal.ripe.net",
      name: "portal"
    },
    {
      title: "RIPE Database",
      url: "https://apps.db.ripe.net",
      name: "database"
    },
    {
      title: "RIPE Labs",
      url: "https://labs.ripe.net",
      name: "labs"
    },
    {
      title: "RIPEstat",
      url: "https://stat.ripe.net/",
      name: "stat"
    },
    {
      title: "RIPE Atlas",
      url: "https://atlas.ripe.net",
      name: "atlas"
    },
    {
      title: "RIPE NCC Academy",
      url: "https://academy.ripe.net",
      name: "academy"
    },
    {
      title: "RPKI",
      url: "https://dashboard.rpki.ripe.net",
      name: "rpki"
    }
  ];
  function fetchSites(env) {
    const list = env === "pre" ? "pre-list.json" : "list.json";
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => {
        controller.abort();
      },
      2e3
    );
    fetch(`https://www-static.ripe.net/dynamic/app-switcher/${list}`, { signal: controller.signal }).then((response) => response.json()).then((json) => {
      clearTimeout(timeoutId);
      $$invalidate(0, sites = setCurrentSite(json));
    }).catch((error) => {
      if (error.name === "AbortError") {
        console.error("Fetch aborted due to timeout");
      } else {
        console.error("Failed to fetch sites. Using fallback:", error);
      }
      useFallbackSites();
    });
  }
  function useFallbackSites() {
    $$invalidate(0, sites = setCurrentSite(fallbackSites));
  }
  isMobileStore.subscribe((value) => {
    $$invalidate(1, isMobileMode = value);
  });
  function setCurrentSite(list) {
    const currentAppIndex = list.findIndex((x) => x.name === current);
    if (currentAppIndex > 0) {
      list[currentAppIndex].active = true;
    }
    return list;
  }
  function dispatch(eventName, eventDetails = null) {
    const event = new CustomEvent(
      eventName,
      {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    );
    if (eventDetails) {
      event.details = eventDetails;
    }
    component.dispatchEvent(event);
  }
  function manageFocus(e) {
    if (document.activeElement === component) {
      const svg = component.shadowRoot.querySelector("svg");
      if (svg.contains(e.target)) {
        component.shadowRoot.querySelector("#main").blur();
        e.preventDefault();
      }
    }
  }
  function itemClicked(title) {
    dispatch("app-switcher-item-click", { item: title });
  }
  $$self.$$set = ($$props2) => {
    if ("component" in $$props2) $$invalidate(4, component = $$props2.component);
    if ("current" in $$props2) $$invalidate(5, current = $$props2.current);
    if ("appenv" in $$props2) $$invalidate(6, appenv = $$props2.appenv);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*appenv*/
    64) {
      {
        fetchSites(appenv);
      }
    }
    if ($$self.$$.dirty & /*isMobileMode, sites*/
    3) {
      isMobileMode ? mobileMenuLinksStore.set(sites) : mobileMenuLinksStore.set([]);
    }
  };
  return [sites, isMobileMode, manageFocus, itemClicked, component, current, appenv];
}
var AppSwitcher = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance5, create_fragment5, safe_not_equal, { component: 4, current: 5, appenv: 6 }, add_css5);
  }
  get component() {
    return this.$$.ctx[4];
  }
  set component(component) {
    this.$$set({ component });
    flush();
  }
  get current() {
    return this.$$.ctx[5];
  }
  set current(current) {
    this.$$set({ current });
    flush();
  }
  get appenv() {
    return this.$$.ctx[6];
  }
  set appenv(appenv) {
    this.$$set({ appenv });
    flush();
  }
};
customElements.define("app-switcher", create_custom_element(AppSwitcher, { "component": {}, "current": {}, "appenv": {} }, [], [], true, (customElementConstructor) => {
  return class extends customElementConstructor {
    constructor() {
      super();
      this.component = this;
    }
  };
}));
var AppSwitcher$1 = AppSwitcher;

// node_modules/@technical-design/ripe-app-webcomponents/esm/src/webcomponents/LegalAccordion/Chevron.svelte.js
function add_css6(target) {
  append_styles(target, "svelte-lp9zts", ".chevron.svelte-lp9zts{font-size:1.8rem;transform:rotate(-90deg);transition:transform .3s}.chevron.open.svelte-lp9zts{transform:rotate(0deg)}");
}
function create_fragment6(ctx) {
  let svg;
  let path;
  let svg_class_value;
  return {
    c() {
      svg = svg_element("svg");
      path = svg_element("path");
      attr(path, "fill", "#757575");
      attr(path, "d", "M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z");
      attr(svg, "class", svg_class_value = null_to_empty(
        /*open*/
        ctx[0] ? "chevron open" : "chevron"
      ) + " svelte-lp9zts");
      attr(
        svg,
        "height",
        /*height*/
        ctx[2]
      );
      attr(
        svg,
        "width",
        /*width*/
        ctx[1]
      );
      attr(svg, "aria-hidden", "true");
      attr(svg, "focusable", "false");
      attr(svg, "role", "img");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "viewBox", "0 0 448 512");
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, path);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*open*/
      1 && svg_class_value !== (svg_class_value = null_to_empty(
        /*open*/
        ctx2[0] ? "chevron open" : "chevron"
      ) + " svelte-lp9zts")) {
        attr(svg, "class", svg_class_value);
      }
      if (dirty & /*height*/
      4) {
        attr(
          svg,
          "height",
          /*height*/
          ctx2[2]
        );
      }
      if (dirty & /*width*/
      2) {
        attr(
          svg,
          "width",
          /*width*/
          ctx2[1]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
function instance6($$self, $$props, $$invalidate) {
  let { open = false } = $$props;
  let { width = 24 } = $$props;
  let { height = 24 } = $$props;
  $$self.$$set = ($$props2) => {
    if ("open" in $$props2) $$invalidate(0, open = $$props2.open);
    if ("width" in $$props2) $$invalidate(1, width = $$props2.width);
    if ("height" in $$props2) $$invalidate(2, height = $$props2.height);
  };
  return [open, width, height];
}
var Chevron = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance6, create_fragment6, safe_not_equal, { open: 0, width: 1, height: 2 }, add_css6);
  }
  get open() {
    return this.$$.ctx[0];
  }
  set open(open) {
    this.$$set({ open });
    flush();
  }
  get width() {
    return this.$$.ctx[1];
  }
  set width(width) {
    this.$$set({ width });
    flush();
  }
  get height() {
    return this.$$.ctx[2];
  }
  set height(height) {
    this.$$set({ height });
    flush();
  }
};
customElements.define("legal-accordion-chevron", create_custom_element(Chevron, { "open": { "type": "Boolean" }, "width": {}, "height": {} }, [], [], true));
var Chevron$1 = Chevron;

// node_modules/@technical-design/ripe-app-webcomponents/esm/src/webcomponents/LegalAccordion/icons/Cookies.svg.js
var CookiesSVG = '<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">  <path fill="currentColor" d="M352 328c-13.25 0-24 10.74-24 24 0 13.25 10.75 24 24 24s24-10.75 24-24c0-13.26-10.75-24-24-24zm-8-200c0-13.26-10.75-24-24-24s-24 10.74-24 24c0 13.25 10.75 24 24 24s24-10.75 24-24zm-160 64c0-13.26-10.75-24-24-24s-24 10.74-24 24c0 13.25 10.75 24 24 24s24-10.75 24-24zm8 136c-13.25 0-24 10.74-24 24 0 13.25 10.75 24 24 24s24-10.75 24-24c0-13.26-10.75-24-24-24zm96-96c-13.25 0-24 10.74-24 24 0 13.25 10.75 24 24 24s24-10.75 24-24c0-13.26-10.75-24-24-24zm222.37 22.79l-12.08-76.26a132.493 132.493 0 0 0-37.16-72.95l-54.76-54.75c-19.73-19.72-45.18-32.7-72.71-37.05l-76.7-12.15C250.11.54 243.22 0 236.34 0c-20.72 0-41.25 4.88-59.89 14.38l-69.12 35.21a132.25 132.25 0 0 0-57.79 57.8l-35.1 68.87A132.602 132.602 0 0 0 1.62 257.2l12.08 76.27a132.493 132.493 0 0 0 37.16 72.95l54.76 54.75a132.087 132.087 0 0 0 72.71 37.05l76.7 12.14c6.86 1.09 13.75 1.62 20.63 1.62 20.72 0 41.25-4.88 59.88-14.38l69.12-35.21a132.302 132.302 0 0 0 57.79-57.8l35.1-68.87a132.56 132.56 0 0 0 12.82-80.93zm-41.33 66.41l-35.1 68.88c-9.68 19-24.83 34.15-43.8 43.82l-69.12 35.21c-13.98 7.13-29.67 10.89-45.36 10.89-5.21 0-10.47-.41-15.63-1.23l-76.69-12.14c-20.99-3.33-40.04-13.04-55.09-28.08L73.5 383.79c-15.09-15.09-24.84-34.22-28.18-55.33L33.24 252.2c-3.35-21.12.02-42.36 9.72-61.4l35.1-68.88c9.68-19 24.83-34.15 43.8-43.82l69.12-35.21C204.97 35.77 220.65 32 236.34 32c5.21 0 10.47.41 15.62 1.23l76.7 12.15c20.99 3.32 40.04 13.03 55.08 28.08l54.76 54.75c15.09 15.09 24.84 34.22 28.18 55.33l12.08 76.26c3.35 21.12-.02 42.36-9.72 61.4z"/> </svg>';

// node_modules/@technical-design/ripe-app-webcomponents/esm/src/webcomponents/LegalAccordion/icons/Copyright.svg.js
var CopyrightSVG = '<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">  <path fill="currentColor" d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm216 248c0 118.663-96.055 216-216 216-118.663 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.663 0 216 96.055 216 216zM360.474 357.366c-9.414 9.142-44.455 38.966-100.106 38.966-77.825 0-136.513-60.551-136.513-140.846 0-77.951 58.345-137.596 135.431-137.596 53.547 0 85.508 24.785 94.028 32.381a11.96 11.96 0 0 1 1.721 16.001l-8.763 12.08c-4.034 5.561-11.877 6.579-17.203 2.329-8.921-7.122-33.509-23.688-69.062-23.688-54.32 0-94.161 41.791-94.161 98.131 0 58.209 40.791 102.104 94.882 102.104 39.538 0 66.522-22.074 73.851-28.84 5.068-4.681 13.054-4.108 17.423 1.239l9.414 11.534c3.969 4.861 3.564 11.828-.942 16.205z"/> </svg>';

// node_modules/@technical-design/ripe-app-webcomponents/esm/src/webcomponents/LegalAccordion/icons/Legal.svg.js
var LegalSVG = '<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">  <path fill="currentColor" d="M634.4 375.09L525.35 199.12c-3.17-4.75-8.26-7.12-13.35-7.12s-10.18 2.38-13.35 7.12L389.6 375.09c-3.87 5.78-6.09 12.72-5.51 19.64C389.56 460.4 444.74 512 512 512c67.27 0 122.45-51.6 127.91-117.27.57-6.92-1.64-13.86-5.51-19.64zM511.96 238.24L602.27 384H421.02l90.94-145.76zM512 480c-41.28 0-77-26.77-90.42-64h181.2c-13.23 36.87-49.2 64-90.78 64zm17.89-317.21l5.08-15.17c1.4-4.19-.86-8.72-5.05-10.12L379.46 87.15C382.33 79.98 384 72.21 384 64c0-35.35-28.65-64-64-64-29.32 0-53.77 19.83-61.34 46.73L120.24.42c-4.19-1.4-8.72.86-10.12 5.05l-5.08 15.17c-1.4 4.19.86 8.72 5.05 10.12l148.29 49.62c5.91 22.23 23.33 39.58 45.62 45.36V480H104c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8h224c4.42 0 8-3.58 8-8V125.74c8.64-2.24 16.5-6.22 23.32-11.58l160.45 53.68c4.18 1.4 8.71-.86 10.12-5.05zM320 96c-17.64 0-32-14.36-32-32s14.36-32 32-32 32 14.36 32 32-14.36 32-32 32zm-64.09 170.73c.58-6.92-1.64-13.86-5.51-19.64L141.35 71.12C138.18 66.38 133.09 64 128 64s-10.18 2.38-13.35 7.12L5.6 247.09c-3.87 5.78-6.09 12.72-5.51 19.64C5.56 332.4 60.74 384 128 384s122.44-51.6 127.91-117.27zM127.96 110.24L218.27 256H37.02l90.94-145.76zM37.58 288h181.2c-13.23 36.87-49.2 64-90.78 64-41.28 0-77-26.77-90.42-64z"/> </svg>';

// node_modules/@technical-design/ripe-app-webcomponents/esm/src/webcomponents/LegalAccordion/icons/Privacy.svg.js
var PrivacySVG = '<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">  <path fill="currentColor" d="M383.9 308.3l23.9-62.6c4-10.5-3.7-21.7-15-21.7h-43.2c1.5-7.8 2.4-15.8 2.4-24 0-7.2-.9-14.2-2.2-21.1 40.5-9.8 66.2-24.2 66.2-40.2 0-16.5-27-31.2-69.3-41-8.9-33.6-27.4-67.9-41.3-85.4-6.3-8-15.7-12.3-25.3-12.3-9.5 0-12.3 2.4-41.8 17.2-12.8 6.4-24.3 2.1-28.6 0C179.9 2.3 177.3 0 167.9 0c-9.6 0-18.9 4.3-25.2 12.2-13.9 17.5-32.4 51.8-41.3 85.4C59 107.4 32 122.2 32 138.7c0 16.1 25.7 30.5 66.2 40.2-1.3 6.9-2.2 13.9-2.2 21.1 0 8.2.9 16.2 2.4 24H56.3c-11.5 0-19.2 11.7-14.7 22.3l25.8 60.2C27.3 329.8 0 372.7 0 422.4v44.8C0 491.9 20.1 512 44.8 512h358.4c24.7 0 44.8-20.1 44.8-44.8v-44.8c0-48.4-25.8-90.4-64.1-114.1zM128 200c0-2.7.3-5.3.6-7.9 1.3.8 5.1 3.3 5.8 5.4 3.9 11.9 7 24.6 16.5 33.4 8 7.4 47 25.1 64-25 2.8-8.4 15.4-8.4 18.3 0 16 47.4 53.9 34.4 64 25 9.5-8.8 12.7-21.5 16.5-33.4.7-2.1 4.4-4.6 5.8-5.4.3 2.6.6 5.2.6 7.9 0 52.9-43.1 96-96 96S128 252.9 128 200zm-.7-75.5c.7-2.7 12.3-57 40.5-92.5 28.7 14.4 37.7 20.5 56.2 20.5 18.6 0 27.7-6.3 56.2-20.5l.1.1c28.1 35.4 39.7 89.6 40.4 92.4 21.4 4.9 35.8 7.9 51 14.2-24.3 9.9-75.4 21.3-147.7 21.3s-123.4-11.4-147.7-21.3c15.2-6.3 29.9-9.3 51-14.2zM44.8 480c-7.1 0-12.8-5.7-12.8-12.8v-44.8c0-36.5 19.2-69.5 51.4-88.2L108 320l-27.4-64h28.9c4.7 9.6 64.3 108.5 64.3 108.5L142.9 480H44.8zm131.2 0l32-120-21.9-38.4c12.1 3.8 24.6 6.4 37.9 6.4s25.9-2.6 37.9-6.4L240 360l32 120h-96zm240-12.8c0 7.1-5.7 12.8-12.8 12.8h-98.1l-30.8-115.5s59.6-98.9 64.3-108.5h31l-25 65.6 22.5 13.9c30.6 18.9 48.9 51.4 48.9 86.9v44.8z"/> </svg>';

// node_modules/@technical-design/ripe-app-webcomponents/esm/src/webcomponents/LegalAccordion/icons/Terms.svg.js
var TermsSVG = '<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">  <path fill="currentColor" d="M608 352h-64V112C544 50.25 493.75 0 432 0H80C35.88 0 0 35.89 0 80v80c0 17.64 14.34 32 32 32h96v224c0 51.11 40.25 92.62 90.66 95.46v.54h312C590.94 512 640 462.95 640 402.67V384c0-17.64-14.34-32-32-32zM128 160H32V80c0-26.47 21.53-48 48-48s48 21.53 48 48v80zm160 256c0 35.3-28.72 64-64 64s-64-28.7-64-64V80c0-18-5.97-34.62-16.03-48H432c44.12 0 80 35.89 80 80v240H320c-17.66 0-32 14.36-32 32v32zm320-13.33c0 42.64-34.69 77.33-77.34 77.33H295.03c15.35-17.02 24.97-39.32 24.97-64v-32h288v18.67z"/> </svg>';

// node_modules/@technical-design/ripe-app-webcomponents/esm/src/webcomponents/LegalAccordion/LegalAccordion.svelte.js
function add_css7(target) {
  append_styles(target, "svelte-mxcm4x", ":host{font-family:var(--ripe-app-font-family),Helvetica,Verdana,sans-serif}.heading.svelte-mxcm4x.svelte-mxcm4x.svelte-mxcm4x{align-items:center;display:flex}.button-title.svelte-mxcm4x.svelte-mxcm4x.svelte-mxcm4x{display:inline-block;font-family:var(--ripe-app-font-family),Helvetica,Verdana,sans-serif;font-size:1rem;padding-left:20px;padding-right:20px;position:relative}.sub-title.svelte-mxcm4x.svelte-mxcm4x.svelte-mxcm4x{bottom:0;padding-left:54px}.pageinfo.svelte-mxcm4x.svelte-mxcm4x.svelte-mxcm4x{font-size:1rem;font-weight:400;line-height:1.5;padding:0 5px 15px 0;width:100%}.svgwrap.svelte-mxcm4x.svelte-mxcm4x.svelte-mxcm4x{display:inline-block;flex-shrink:0;margin-left:auto;margin-right:auto;width:30px}a{color:var(--ripe-app-primary-400,#42477d)}a:hover{color:var(--ripe-app-primary-800,#0f154c)}a:focus{color:var(--ripe-app-primary-800,#0f154c);outline:2px solid var(--ripe-app-primary-300,#606591)}a:visited{color:var(--ripe-app-primary-900,#080037)}.legalstuff.svelte-mxcm4x h1.svelte-mxcm4x.svelte-mxcm4x{color:var(--ripe-app-primary-900,#080037);font-size:1.563rem;font-weight:700;letter-spacing:-.01562em;line-height:1.3;margin-bottom:0;margin-top:0}.legalstuff.svelte-mxcm4x.svelte-mxcm4x.svelte-mxcm4x{margin:0 auto;max-width:900px}.html-content th{text-align:left;width:33%}.html-content table{border-collapse:collapse;margin-left:70px;margin-right:50px;margin-top:10px}.html-content td{border:1px solid #0000001f;margin:0!important;padding:10px;vertical-align:top}.html-content td p:first-of-type{margin-top:0;padding-top:0}button.svelte-mxcm4x.svelte-mxcm4x.svelte-mxcm4x{appearance:none!important}button.accordion.svelte-mxcm4x.svelte-mxcm4x.svelte-mxcm4x{align-items:center;background-color:initial;border:solid #0000001f;border-radius:0!important;border-width:1px 1px 0;color:#000;cursor:pointer;display:flex;justify-content:space-between;margin:0;min-height:52px;outline-color:#0000001f;outline-style:none;outline-width:0;padding:8px 16px;text-align:left;transition:background-color .4s cubic-bezier(.25,.8,.5,1);width:100%}button.accordion.svelte-mxcm4x.svelte-mxcm4x.svelte-mxcm4x:focus{background-color:silver}.sub.svelte-mxcm4x.svelte-mxcm4x.svelte-mxcm4x{border:0!important;border-left:0!important;border-right:0!important}button.sub.svelte-mxcm4x.svelte-mxcm4x.svelte-mxcm4x:last-of-type{border-bottom:1px solid #0000001f!important}button.sub.active.svelte-mxcm4x.svelte-mxcm4x.svelte-mxcm4x:last-of-type{border-bottom:0 solid #0000001f!important}button.accordion.svelte-mxcm4x.svelte-mxcm4x.svelte-mxcm4x:last-of-type{border-bottom-width:1px}button.accordion.active.svelte-mxcm4x.svelte-mxcm4x.svelte-mxcm4x:last-of-type,button.accordion.active.svelte-mxcm4x.svelte-mxcm4x.svelte-mxcm4x:last-of-type:hover{border-bottom-width:0}button.accordion.svelte-mxcm4x.svelte-mxcm4x.svelte-mxcm4x:hover{background-color:#0000001f;border-bottom:0 solid #0000001f;transition:background-color .4s cubic-bezier(.25,.8,.5,1)}button.accordion.active.svelte-mxcm4x.svelte-mxcm4x.svelte-mxcm4x,button.accordion.svelte-mxcm4x.svelte-mxcm4x.svelte-mxcm4x:last-of-type:hover{border-bottom:1px solid #0000001f}button.accordion.active.svelte-mxcm4x.svelte-mxcm4x.svelte-mxcm4x{background-color:#0000001f}.html-content h1,.html-content h2,.html-content h3,.html-content h4{font-size:1.6rem;font-weight:500;line-height:1.25;margin-bottom:10px;margin-top:15px}p{margin:auto 0;padding:0 0 16px}section.panel.svelte-mxcm4x.svelte-mxcm4x.svelte-mxcm4x{border-left:1px solid #0000001f;border-right:1px solid #0000001f;max-height:0;overflow:auto;transition:max-height .4s}section.panel.subpanel.svelte-mxcm4x.svelte-mxcm4x.svelte-mxcm4x{border-left:0;border-right:0}section.open-panel.svelte-mxcm4x.svelte-mxcm4x.svelte-mxcm4x{height:auto;max-height:10000px;max-width:100%;transition:max-height .4s}section.svelte-mxcm4x div.svelte-mxcm4x button.svelte-mxcm4x{color:#fff;cursor:pointer;font-weight:700;margin:10px 10px 20px;padding:10px 0;width:150px}div.svelte-mxcm4x button.svelte-mxcm4x.svelte-mxcm4x:active,section.svelte-mxcm4x div.svelte-mxcm4x button.svelte-mxcm4x{background-color:#0000001f}.html-content{display:block;width:100%}.html-content>div{display:block;max-width:100%}.html-content>div{padding-left:70px;padding-right:30px}.html-content>div:first-of-type{padding-top:20px}.html-content>div:last-of-type{padding-bottom:30px}");
}
function get_each_context4(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[4] = list[i].open;
  child_ctx[5] = list[i].id;
  child_ctx[6] = list[i].content;
  child_ctx[7] = list[i].title;
  child_ctx[8] = list[i].subpages;
  child_ctx[9] = list;
  child_ctx[10] = i;
  return child_ctx;
}
function get_each_context_12(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[11] = list[i];
  child_ctx[12] = list;
  child_ctx[13] = i;
  return child_ctx;
}
function create_else_block_3(ctx) {
  let em;
  return {
    c() {
      em = element("em");
      em.textContent = "No data returned from API.";
    },
    m(target, anchor) {
      insert(target, em, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(em);
      }
    }
  };
}
function create_if_block5(ctx) {
  let each_1_anchor;
  let each_value = ensure_array_like(
    /*mydata*/
    ctx[0]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block4(get_each_context4(ctx, each_value, i));
  }
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert(target, each_1_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*mydata, Object*/
      1) {
        each_value = ensure_array_like(
          /*mydata*/
          ctx2[0]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context4(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block4(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(each_1_anchor);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_if_block_8(ctx) {
  let html_tag;
  let html_anchor;
  return {
    c() {
      html_tag = new HtmlTag(false);
      html_anchor = empty();
      html_tag.a = html_anchor;
    },
    m(target, anchor) {
      html_tag.m(LegalSVG, target, anchor);
      insert(target, html_anchor, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(html_anchor);
        html_tag.d();
      }
    }
  };
}
function create_if_block_7(ctx) {
  let html_tag;
  let html_anchor;
  return {
    c() {
      html_tag = new HtmlTag(false);
      html_anchor = empty();
      html_tag.a = html_anchor;
    },
    m(target, anchor) {
      html_tag.m(CookiesSVG, target, anchor);
      insert(target, html_anchor, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(html_anchor);
        html_tag.d();
      }
    }
  };
}
function create_if_block_6(ctx) {
  let html_tag;
  let html_anchor;
  return {
    c() {
      html_tag = new HtmlTag(false);
      html_anchor = empty();
      html_tag.a = html_anchor;
    },
    m(target, anchor) {
      html_tag.m(TermsSVG, target, anchor);
      insert(target, html_anchor, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(html_anchor);
        html_tag.d();
      }
    }
  };
}
function create_if_block_5(ctx) {
  let html_tag;
  let html_anchor;
  return {
    c() {
      html_tag = new HtmlTag(false);
      html_anchor = empty();
      html_tag.a = html_anchor;
    },
    m(target, anchor) {
      html_tag.m(PrivacySVG, target, anchor);
      insert(target, html_anchor, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(html_anchor);
        html_tag.d();
      }
    }
  };
}
function create_if_block_43(ctx) {
  let html_tag;
  let html_anchor;
  return {
    c() {
      html_tag = new HtmlTag(false);
      html_anchor = empty();
      html_tag.a = html_anchor;
    },
    m(target, anchor) {
      html_tag.m(CopyrightSVG, target, anchor);
      insert(target, html_anchor, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(html_anchor);
        html_tag.d();
      }
    }
  };
}
function create_else_block_1(ctx) {
  let section;
  let div;
  let show_if;
  let t;
  function select_block_type_4(ctx2, dirty) {
    if (dirty & /*mydata*/
    1) show_if = null;
    if (show_if == null) show_if = !!!/*content*/
    ctx2[6].startsWith("<div");
    if (show_if) return create_if_block_33;
    return create_else_block_2;
  }
  let current_block_type = select_block_type_4(ctx, -1);
  let if_block = current_block_type(ctx);
  return {
    c() {
      section = element("section");
      div = element("div");
      if_block.c();
      t = space();
      attr(div, "class", "html-content");
      attr(section, "class", "panel svelte-mxcm4x");
      toggle_class(
        section,
        "open-panel",
        /*open*/
        ctx[4]
      );
    },
    m(target, anchor) {
      insert(target, section, anchor);
      append(section, div);
      if_block.m(div, null);
      append(section, t);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type_4(ctx2, dirty)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(div, null);
        }
      }
      if (dirty & /*mydata*/
      1) {
        toggle_class(
          section,
          "open-panel",
          /*open*/
          ctx2[4]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(section);
      }
      if_block.d();
    }
  };
}
function create_if_block_14(ctx) {
  let section;
  let t;
  let each_value_1 = ensure_array_like(Object.values(
    /*subpages*/
    ctx[8]
  ));
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_12(get_each_context_12(ctx, each_value_1, i));
  }
  return {
    c() {
      section = element("section");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t = space();
      attr(section, "class", "panel svelte-mxcm4x");
      toggle_class(
        section,
        "open-panel",
        /*open*/
        ctx[4]
      );
    },
    m(target, anchor) {
      insert(target, section, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(section, null);
        }
      }
      append(section, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*Object, mydata*/
      1) {
        each_value_1 = ensure_array_like(Object.values(
          /*subpages*/
          ctx2[8]
        ));
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_12(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_12(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(section, t);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_1.length;
      }
      if (dirty & /*mydata*/
      1) {
        toggle_class(
          section,
          "open-panel",
          /*open*/
          ctx2[4]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(section);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_else_block_2(ctx) {
  let html_tag;
  let raw_value = (
    /*content*/
    ctx[6] + ""
  );
  let html_anchor;
  return {
    c() {
      html_tag = new HtmlTag(false);
      html_anchor = empty();
      html_tag.a = html_anchor;
    },
    m(target, anchor) {
      html_tag.m(raw_value, target, anchor);
      insert(target, html_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*mydata*/
      1 && raw_value !== (raw_value = /*content*/
      ctx2[6] + "")) html_tag.p(raw_value);
    },
    d(detaching) {
      if (detaching) {
        detach(html_anchor);
        html_tag.d();
      }
    }
  };
}
function create_if_block_33(ctx) {
  let div;
  let raw_value = (
    /*content*/
    ctx[6] + ""
  );
  return {
    c() {
      div = element("div");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      div.innerHTML = raw_value;
    },
    p(ctx2, dirty) {
      if (dirty & /*mydata*/
      1 && raw_value !== (raw_value = /*content*/
      ctx2[6] + "")) div.innerHTML = raw_value;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_else_block(ctx) {
  let html_tag;
  let raw_value = (
    /*item*/
    ctx[11].content + ""
  );
  let html_anchor;
  return {
    c() {
      html_tag = new HtmlTag(false);
      html_anchor = empty();
      html_tag.a = html_anchor;
    },
    m(target, anchor) {
      html_tag.m(raw_value, target, anchor);
      insert(target, html_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*mydata*/
      1 && raw_value !== (raw_value = /*item*/
      ctx2[11].content + "")) html_tag.p(raw_value);
    },
    d(detaching) {
      if (detaching) {
        detach(html_anchor);
        html_tag.d();
      }
    }
  };
}
function create_if_block_23(ctx) {
  let div;
  let raw_value = (
    /*item*/
    ctx[11].content + ""
  );
  return {
    c() {
      div = element("div");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      div.innerHTML = raw_value;
    },
    p(ctx2, dirty) {
      if (dirty & /*mydata*/
      1 && raw_value !== (raw_value = /*item*/
      ctx2[11].content + "")) div.innerHTML = raw_value;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_each_block_12(ctx) {
  let button;
  let span1;
  let span0;
  let t0_value = (
    /*item*/
    ctx[11].title + ""
  );
  let t0;
  let t1;
  let legal_accordion_chevron;
  let legal_accordion_chevron_open_value;
  let t2;
  let section;
  let div;
  let show_if;
  let mounted;
  let dispose;
  function click_handler_1() {
    return (
      /*click_handler_1*/
      ctx[3](
        /*item*/
        ctx[11],
        /*each_value_1*/
        ctx[12],
        /*item_index*/
        ctx[13]
      )
    );
  }
  function select_block_type_3(ctx2, dirty) {
    if (dirty & /*mydata*/
    1) show_if = null;
    if (show_if == null) show_if = !!!/*item*/
    ctx2[11].content.startsWith("<div");
    if (show_if) return create_if_block_23;
    return create_else_block;
  }
  let current_block_type = select_block_type_3(ctx, -1);
  let if_block = current_block_type(ctx);
  return {
    c() {
      button = element("button");
      span1 = element("span");
      span0 = element("span");
      t0 = text(t0_value);
      t1 = space();
      legal_accordion_chevron = element("legal-accordion-chevron");
      t2 = space();
      section = element("section");
      div = element("div");
      if_block.c();
      attr(span0, "class", "button-title sub-title svelte-mxcm4x");
      attr(span1, "class", "heading svelte-mxcm4x");
      set_custom_element_data(legal_accordion_chevron, "open", legal_accordion_chevron_open_value = /*item*/
      ctx[11].open);
      attr(button, "class", "accordion sub svelte-mxcm4x");
      toggle_class(
        button,
        "active",
        /*item*/
        ctx[11].open
      );
      attr(div, "class", "html-content");
      attr(section, "class", "panel subpanel svelte-mxcm4x");
      toggle_class(
        section,
        "open-panel",
        /*item*/
        ctx[11].open
      );
    },
    m(target, anchor) {
      insert(target, button, anchor);
      append(button, span1);
      append(span1, span0);
      append(span0, t0);
      append(button, t1);
      append(button, legal_accordion_chevron);
      insert(target, t2, anchor);
      insert(target, section, anchor);
      append(section, div);
      if_block.m(div, null);
      if (!mounted) {
        dispose = listen(button, "click", click_handler_1);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*mydata*/
      1 && t0_value !== (t0_value = /*item*/
      ctx[11].title + "")) set_data(t0, t0_value);
      if (dirty & /*mydata*/
      1 && legal_accordion_chevron_open_value !== (legal_accordion_chevron_open_value = /*item*/
      ctx[11].open)) {
        set_custom_element_data(legal_accordion_chevron, "open", legal_accordion_chevron_open_value);
      }
      if (dirty & /*Object, mydata*/
      1) {
        toggle_class(
          button,
          "active",
          /*item*/
          ctx[11].open
        );
      }
      if (current_block_type === (current_block_type = select_block_type_3(ctx, dirty)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx);
        if (if_block) {
          if_block.c();
          if_block.m(div, null);
        }
      }
      if (dirty & /*Object, mydata*/
      1) {
        toggle_class(
          section,
          "open-panel",
          /*item*/
          ctx[11].open
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(button);
        detach(t2);
        detach(section);
      }
      if_block.d();
      mounted = false;
      dispose();
    }
  };
}
function create_each_block4(ctx) {
  let button;
  let span2;
  let span0;
  let t0;
  let span1;
  let t1_value = (
    /*title*/
    ctx[7] + ""
  );
  let t1;
  let t2;
  let legal_accordion_chevron;
  let legal_accordion_chevron_open_value;
  let t3;
  let if_block1_anchor;
  let mounted;
  let dispose;
  function select_block_type_1(ctx2, dirty) {
    if (
      /*id*/
      ctx2[5] === "copyright-statement"
    ) return create_if_block_43;
    if (
      /*id*/
      ctx2[5] === "ripe-ncc-privacy-statement"
    ) return create_if_block_5;
    if (
      /*id*/
      ctx2[5] === "terms-of-service" || /*id*/
      ctx2[5] === "terms-and-conditions"
    ) return create_if_block_6;
    if (
      /*id*/
      ctx2[5] === "cookies"
    ) return create_if_block_7;
    if (
      /*id*/
      ctx2[5] === "legal"
    ) return create_if_block_8;
  }
  let current_block_type = select_block_type_1(ctx);
  let if_block0 = current_block_type && current_block_type(ctx);
  function click_handler() {
    return (
      /*click_handler*/
      ctx[2](
        /*open*/
        ctx[4],
        /*each_value*/
        ctx[9],
        /*each_index*/
        ctx[10]
      )
    );
  }
  function select_block_type_2(ctx2, dirty) {
    if (
      /*subpages*/
      ctx2[8]
    ) return create_if_block_14;
    return create_else_block_1;
  }
  let current_block_type_1 = select_block_type_2(ctx);
  let if_block1 = current_block_type_1(ctx);
  return {
    c() {
      button = element("button");
      span2 = element("span");
      span0 = element("span");
      if (if_block0) if_block0.c();
      t0 = space();
      span1 = element("span");
      t1 = text(t1_value);
      t2 = space();
      legal_accordion_chevron = element("legal-accordion-chevron");
      t3 = space();
      if_block1.c();
      if_block1_anchor = empty();
      attr(span0, "class", "svgwrap svelte-mxcm4x");
      attr(span1, "class", "button-title svelte-mxcm4x");
      attr(span2, "class", "heading svelte-mxcm4x");
      set_custom_element_data(legal_accordion_chevron, "open", legal_accordion_chevron_open_value = /*open*/
      ctx[4]);
      attr(button, "class", "accordion svelte-mxcm4x");
      toggle_class(
        button,
        "active",
        /*open*/
        ctx[4]
      );
    },
    m(target, anchor) {
      insert(target, button, anchor);
      append(button, span2);
      append(span2, span0);
      if (if_block0) if_block0.m(span0, null);
      append(span2, t0);
      append(span2, span1);
      append(span1, t1);
      append(button, t2);
      append(button, legal_accordion_chevron);
      insert(target, t3, anchor);
      if_block1.m(target, anchor);
      insert(target, if_block1_anchor, anchor);
      if (!mounted) {
        dispose = listen(button, "click", click_handler);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (current_block_type !== (current_block_type = select_block_type_1(ctx))) {
        if (if_block0) if_block0.d(1);
        if_block0 = current_block_type && current_block_type(ctx);
        if (if_block0) {
          if_block0.c();
          if_block0.m(span0, null);
        }
      }
      if (dirty & /*mydata*/
      1 && t1_value !== (t1_value = /*title*/
      ctx[7] + "")) set_data(t1, t1_value);
      if (dirty & /*mydata*/
      1 && legal_accordion_chevron_open_value !== (legal_accordion_chevron_open_value = /*open*/
      ctx[4])) {
        set_custom_element_data(legal_accordion_chevron, "open", legal_accordion_chevron_open_value);
      }
      if (dirty & /*mydata*/
      1) {
        toggle_class(
          button,
          "active",
          /*open*/
          ctx[4]
        );
      }
      if (current_block_type_1 === (current_block_type_1 = select_block_type_2(ctx)) && if_block1) {
        if_block1.p(ctx, dirty);
      } else {
        if_block1.d(1);
        if_block1 = current_block_type_1(ctx);
        if (if_block1) {
          if_block1.c();
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      }
    },
    d(detaching) {
      if (detaching) {
        detach(button);
        detach(t3);
        detach(if_block1_anchor);
      }
      if (if_block0) {
        if_block0.d();
      }
      if_block1.d(detaching);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment7(ctx) {
  let div1;
  let h1;
  let t1;
  let div0;
  let t3;
  function select_block_type(ctx2, dirty) {
    if (
      /*mydata*/
      ctx2[0].length
    ) return create_if_block5;
    return create_else_block_3;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      div1 = element("div");
      h1 = element("h1");
      h1.textContent = "Legal Information";
      t1 = space();
      div0 = element("div");
      div0.textContent = "Below you will find all our legal documentation. Click though items below to visit individual policies and\n    information.";
      t3 = space();
      if_block.c();
      attr(h1, "class", "svelte-mxcm4x");
      attr(div0, "class", "pageinfo svelte-mxcm4x");
      attr(div1, "id", "main");
      attr(div1, "class", "legalstuff svelte-mxcm4x");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, h1);
      append(div1, t1);
      append(div1, div0);
      append(div1, t3);
      if_block.m(div1, null);
    },
    p(ctx2, [dirty]) {
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(div1, null);
        }
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      if_block.d();
    }
  };
}
function instance7($$self, $$props, $$invalidate) {
  let mydata = [];
  let { appname } = $$props;
  onMount(async function() {
    if (appname === void 0) {
      $$invalidate(1, appname = "ripe");
    }
  });
  const click_handler = (open, each_value, each_index) => $$invalidate(0, each_value[each_index].open = !open, mydata);
  const click_handler_1 = (item, each_value_1, item_index) => $$invalidate(0, each_value_1[item_index].open = !item.open, mydata);
  $$self.$$set = ($$props2) => {
    if ("appname" in $$props2) $$invalidate(1, appname = $$props2.appname);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*appname, Object*/
    2) {
      appname && (async () => {
        const apiURL = `https://www-static.ripe.net/dynamic/legal-pages/${appname === void 0 ? "ripe" : appname}-pages.json`;
        const res = await fetch(apiURL);
        const json = await res.json();
        const hash = window.location.hash.substring(1).toLowerCase();
        for (const x in json) {
          if (json[x].id === "legal") {
            for (const sub in json[x].subpages) {
              json[x].subpages[sub].open = false;
            }
          }
        }
        $$invalidate(0, mydata = Object.values(json).map((val) => {
          val.open = hash === val.id;
          return val;
        }));
      })();
    }
  };
  return [mydata, appname, click_handler, click_handler_1];
}
var LegalAccordion = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance7, create_fragment7, safe_not_equal, { appname: 1 }, add_css7);
  }
  get appname() {
    return this.$$.ctx[1];
  }
  set appname(appname) {
    this.$$set({ appname });
    flush();
  }
};
customElements.define("legal-accordion", create_custom_element(LegalAccordion, { "appname": {} }, [], [], true));
var LegalAccordion$1 = LegalAccordion;

// node_modules/@technical-design/ripe-app-webcomponents/esm/src/webcomponents/LegalAccordion/index.js
var index2 = {
  Chevron: Chevron$1,
  LegalAccordion: LegalAccordion$1
};

// node_modules/@technical-design/ripe-app-webcomponents/esm/src/webcomponents/LiveChat/LiveChat.svelte.js
function add_css8(target) {
  append_styles(target, "svelte-1dj158r", ":host{bottom:20px;position:fixed;right:20px}button.svelte-1dj158r.svelte-1dj158r{background-color:var(--ripe-app-navbar-background,#080037);border:1px;border-color:#fff;border-radius:25px;border-style:solid;color:#fff;height:50px;padding-top:5px;width:50px}button.svelte-1dj158r.svelte-1dj158r:focus,button.svelte-1dj158r.svelte-1dj158r:hover{cursor:pointer}.bubble.svelte-1dj158r.svelte-1dj158r{background-color:var(--ripe-app-alarmed,#ed1c24);border-radius:8px;color:var(--ripe-app-navbar-active-menuitem,#fff);font-size:11px;font-weight:700;height:16px;left:35px;line-height:14px;position:absolute;text-align:center;width:16px}.bubble.svelte-1dj158r .text.svelte-1dj158r{position:relative;top:2px}svg.svelte-1dj158r.svelte-1dj158r{height:26px;width:26px}");
}
function create_if_block6(ctx) {
  let span1;
  let span0;
  let t;
  return {
    c() {
      span1 = element("span");
      span0 = element("span");
      t = text(
        /*numberMessages*/
        ctx[0]
      );
      attr(span0, "class", "text svelte-1dj158r");
      attr(span0, "aria-live", "polite");
      attr(span1, "class", "bubble svelte-1dj158r");
    },
    m(target, anchor) {
      insert(target, span1, anchor);
      append(span1, span0);
      append(span0, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*numberMessages*/
      1) set_data(
        t,
        /*numberMessages*/
        ctx2[0]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(span1);
      }
    }
  };
}
function create_fragment8(ctx) {
  let div;
  let t;
  let button;
  let mounted;
  let dispose;
  let if_block = (
    /*numberMessages*/
    ctx[0] && create_if_block6(ctx)
  );
  return {
    c() {
      div = element("div");
      if (if_block) if_block.c();
      t = space();
      button = element("button");
      button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 512 512" class="svelte-1dj158r"><path fill="currentColor" d="M128 216a24 24 0 1 0 0 48 24 24 0 1 0 0-48zm128 0a24 24 0 1 0 0 48 24 24 0 1 0 0-48zm128 0a24 24 0 1 0 0 48 24 24 0 1 0 0-48zM256 32C115 32 0 125 0 240c0 48 20 91 53 126-15 40-46 73-46 74a24 24 0 0 0 17 40c62 0 110-26 139-46 29 9 60 14 93 14 141 0 256-93 256-208S397 32 256 32zm0 384c-28 0-56-4-83-13l-15-5-13 10c-23 16-59 35-103 39 12-15 30-40 41-69l7-19-14-15c-29-30-44-66-44-104 0-97 101-176 224-176s224 79 224 176-100 176-224 176z"></path></svg>`;
      attr(button, "aria-label", "Start live chat");
      attr(button, "class", "svelte-1dj158r");
      attr(div, "id", "main");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block) if_block.m(div, null);
      append(div, t);
      append(div, button);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*loadLiveChat*/
          ctx[1]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (
        /*numberMessages*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block6(ctx2);
          if_block.c();
          if_block.m(div, t);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block) if_block.d();
      mounted = false;
      dispose();
    }
  };
}
function instance8($$self, $$props, $$invalidate) {
  let { chatkey } = $$props;
  let { accessurl = null } = $$props;
  let numberMessages = null;
  let loadScript = true;
  let { component } = $$props;
  onMount(async () => {
    component.addEventListener("live-chat-open", (e) => {
      loadLiveChat();
    });
  });
  const getUserData = () => {
    const usercookie = document.cookie.includes("crowd.ripe.hint");
    const https_regexp2 = /^(https?:\/\/)?/;
    const ending_slash_regexp = /\/$/;
    const accessLoginUrl = accessurl && accessurl.replace(https_regexp2, "https://").replace(ending_slash_regexp, "") || "https://access.ripe.net";
    const accessUserUrl = `${accessLoginUrl}/user/profile/chat`;
    if (accessLoginUrl && usercookie) {
      zE("webWidget", "updateSettings", {
        webWidget: {
          authenticate: {
            chat: {
              jwtFn(callback) {
                fetch(accessUserUrl, {
                  credentials: "include",
                  cache: "no-store"
                }).then(function(res) {
                  if (res.ok) {
                    res.text().then((jwt) => callback(jwt));
                  } else {
                    callback("unauthenticated");
                  }
                });
              }
            }
          }
        }
      });
    }
  };
  const loadLiveChat = () => {
    if (loadScript) {
      const s = document.createElement("script");
      const f = document.getElementsByTagName("script")[0];
      s.type = "text/javascript";
      s.async = true;
      s.onload = function() {
        loadScript = false;
        zE("webWidget", "open");
        zE("webWidget:on", "close", function() {
          zE("webWidget", "hide");
          $$invalidate(0, numberMessages = null);
        });
        zE("webWidget:on", "chat:popout", function() {
          zE("webWidget", "hide");
        });
        zE("webWidget:on", "chat:unreadMessages", function(number) {
          $$invalidate(0, numberMessages = number);
        });
        zE("webWidget:on", "chat:end", function() {
          zE("webWidget", "hide");
        });
        getUserData();
      };
      s.id = "ze-snippet";
      s.src = "https://static.zdassets.com/ekr/snippet.js?key=" + chatkey;
      f.parentNode.insertBefore(s, f);
    } else {
      zE("webWidget", "show");
      zE("webWidget", "open");
    }
  };
  $$self.$$set = ($$props2) => {
    if ("chatkey" in $$props2) $$invalidate(2, chatkey = $$props2.chatkey);
    if ("accessurl" in $$props2) $$invalidate(3, accessurl = $$props2.accessurl);
    if ("component" in $$props2) $$invalidate(4, component = $$props2.component);
  };
  return [numberMessages, loadLiveChat, chatkey, accessurl, component];
}
var LiveChat = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance8, create_fragment8, safe_not_equal, { chatkey: 2, accessurl: 3, component: 4 }, add_css8);
  }
  get chatkey() {
    return this.$$.ctx[2];
  }
  set chatkey(chatkey) {
    this.$$set({ chatkey });
    flush();
  }
  get accessurl() {
    return this.$$.ctx[3];
  }
  set accessurl(accessurl) {
    this.$$set({ accessurl });
    flush();
  }
  get component() {
    return this.$$.ctx[4];
  }
  set component(component) {
    this.$$set({ component });
    flush();
  }
};
customElements.define("live-chat", create_custom_element(LiveChat, { "chatkey": {}, "accessurl": {}, "component": {} }, [], [], true, (customElementConstructor) => {
  return class extends customElementConstructor {
    constructor() {
      super();
      this.component = this;
    }
  };
}));
var LiveChat$1 = LiveChat;

// node_modules/@technical-design/ripe-app-webcomponents/esm/src/webcomponents/QuestionMark/QuestionMark.svelte.js
function add_css9(target) {
  append_styles(target, "svelte-1dnwdx", "#question-icon.svelte-1dnwdx.svelte-1dnwdx{height:38px;width:38px;z-index:1}#question-icon.svelte-1dnwdx circle.hover-ring.svelte-1dnwdx{fill:none;stroke:none;transform:translate(-50,-50)}#question-icon.svelte-1dnwdx path.question-mark.svelte-1dnwdx{fill:#080037}@media(pointer:fine){#question-icon.svelte-1dnwdx.svelte-1dnwdx:hover{cursor:pointer}#question-icon.svelte-1dnwdx:hover circle.hover-ring.svelte-1dnwdx{fill:#080037;stroke:none;transform:scale(1.25);transform-origin:center;transition:transform .1s ease-in}#question-icon.svelte-1dnwdx:hover path.question-mark.svelte-1dnwdx{fill:#fff}}#question-mark-actions.svelte-1dnwdx.svelte-1dnwdx{background:none;cursor:pointer;font-family:var(--ripe-app-font-family),Helvetica,Arial,Sans-serif;font-weight:400;height:38px;outline:none;position:relative;-webkit-user-select:none;user-select:none;width:38px}@media(pointer:fine){#question-mark-actions.svelte-1dnwdx:hover path.question-mark.svelte-1dnwdx{fill:#fff}#question-mark-actions.svelte-1dnwdx:hover circle.hover-ring.svelte-1dnwdx{stroke:none;fill:var(--ripe-app-header-icon-hover,#080037);transform:scale(1.25);transform-origin:center;transition:transform .1s ease-in}}#question-mark-actions.svelte-1dnwdx:focus path.question-mark.svelte-1dnwdx,#question-mark-actions.svelte-1dnwdx:focus-within path.question-mark.svelte-1dnwdx{fill:#fff}#question-mark-actions.svelte-1dnwdx:focus circle.hover-ring.svelte-1dnwdx,#question-mark-actions.svelte-1dnwdx:focus-within circle.hover-ring.svelte-1dnwdx{stroke:none;fill:var(--ripe-app-header-icon-hover,#080037);transform:scale(1.25);transform-origin:center;transition:transform .1s ease-in}#question-mark-actions.svelte-1dnwdx .content.svelte-1dnwdx{display:none}#question-mark-actions.svelte-1dnwdx:focus-within .content.svelte-1dnwdx{display:block}.content.svelte-1dnwdx.svelte-1dnwdx{position:absolute;right:-9px;top:24px;width:312px;z-index:1}@media print{#question-mark-actions.svelte-1dnwdx.svelte-1dnwdx{display:none}}");
}
function create_fragment9(ctx) {
  let div1;
  let svg;
  let circle;
  let path;
  let t;
  let div0;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[4].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[3],
    null
  );
  return {
    c() {
      div1 = element("div");
      svg = svg_element("svg");
      circle = svg_element("circle");
      path = svg_element("path");
      t = space();
      div0 = element("div");
      if (default_slot) default_slot.c();
      attr(circle, "class", "hover-ring svelte-1dnwdx");
      attr(circle, "cx", "256");
      attr(circle, "cy", "256");
      attr(circle, "r", "200");
      attr(path, "class", "question-mark svelte-1dnwdx");
      attr(path, "transform", "scale(1.3) translate(-60,-60)");
      attr(path, "d", "M272.1,287v-7.4c0-4.9,1-8.9,3.1-11.9c2.1-3,7.1-7.5,15-13.3c11.5-8.2,19.3-15.6,23.4-22.1c4.1-6.6,6.2-14.4,6.2-23.4c0-13.5-5-24.4-15-32.5c-10-8.1-23.4-12.2-40.3-12.2c-20.5,0-39.9,5.1-58.2,15.4l13.4,26.9c15.8-8,29.8-12.1,42.1-12.1c7.1,0,12.6,1.4,16.5,4.2c3.9,2.8,5.9,6.9,5.9,12.2c0,4.8-1.4,9.1-4.1,12.9c-2.8,3.9-8.4,8.9-17,15c-8.9,6.6-15.1,12.8-18.5,18.6c-3.4,5.8-5,12.7-5,20.6v9.1H272.1z M241.2,344.5c3.8,3.6,9.1,5.5,16,5.5c6.7,0,12-1.9,15.8-5.6c3.8-3.7,5.7-8.8,5.7-15.3c0-6.7-1.9-11.9-5.6-15.5c-3.7-3.6-9-5.4-15.8-5.4c-7.1,0-12.4,1.8-16.1,5.3c-3.7,3.5-5.5,8.7-5.5,15.6C235.6,335.7,237.5,340.9,241.2,344.5z");
      attr(svg, "id", "question-icon");
      attr(svg, "version", "1.1");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
      attr(svg, "x", "0px");
      attr(svg, "y", "0px");
      attr(svg, "viewBox", "0 0 512 512");
      set_style(svg, "overflow", "visible");
      set_style(svg, "enable-background", "new 0 0 512 512");
      attr(svg, "xml:space", "preserve");
      attr(svg, "aria-label", "question icon");
      attr(svg, "class", "svelte-1dnwdx");
      attr(div0, "class", "content svelte-1dnwdx");
      attr(div1, "id", "question-mark-actions");
      attr(div1, "tabindex", "0");
      attr(div1, "class", "action-btn svelte-1dnwdx");
      toggle_class(
        div1,
        "mobile",
        /*isMobileMode*/
        ctx[0]
      );
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, svg);
      append(svg, circle);
      append(svg, path);
      append(div1, t);
      append(div1, div0);
      if (default_slot) {
        default_slot.m(div0, null);
      }
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            div1,
            "mousedown",
            /*manageFocus*/
            ctx[1]
          ),
          listen(
            div1,
            "keydown",
            /*manageFocus*/
            ctx[1]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        8)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[3],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[3]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[3],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (!current || dirty & /*isMobileMode*/
      1) {
        toggle_class(
          div1,
          "mobile",
          /*isMobileMode*/
          ctx2[0]
        );
      }
    },
    i(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      if (default_slot) default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance9($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { component } = $$props;
  let isMobileMode = false;
  isMobileStore.subscribe((value) => {
    $$invalidate(0, isMobileMode = value);
  });
  function manageFocus(e) {
    const hasFocus = document.activeElement === component;
    if (document.activeElement === component) {
      const svg = component.shadowRoot.querySelector("svg");
      if (svg.contains(e.target)) {
        component.shadowRoot.querySelector("#question-mark-actions").blur();
        e.preventDefault();
      }
    }
    const gainedFocus = !hasFocus && document.activeElement === component;
    if (gainedFocus) {
      const event = new CustomEvent(
        "ripe-app-question-click",
        {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      );
      component.dispatchEvent(event);
    }
  }
  $$self.$$set = ($$props2) => {
    if ("component" in $$props2) $$invalidate(2, component = $$props2.component);
    if ("$$scope" in $$props2) $$invalidate(3, $$scope = $$props2.$$scope);
  };
  return [isMobileMode, manageFocus, component, $$scope, slots];
}
var QuestionMark = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance9, create_fragment9, safe_not_equal, { component: 2 }, add_css9);
  }
  get component() {
    return this.$$.ctx[2];
  }
  set component(component) {
    this.$$set({ component });
    flush();
  }
};
customElements.define("question-mark", create_custom_element(QuestionMark, { "component": {} }, ["default"], [], true, (customElementConstructor) => {
  return class extends customElementConstructor {
    constructor() {
      super();
      this.component = this;
    }
  };
}));
var QuestionMark$1 = QuestionMark;

// node_modules/@technical-design/ripe-app-webcomponents/esm/src/webcomponents/QuestionMark/RollOver.svelte.js
function add_css10(target) {
  append_styles(target, "svelte-1hd55i0", '#hover-body.svelte-1hd55i0{background-color:var(--ripe-app-navbar-background,#080037);border-radius:.5rem;color:#fff;margin-top:30px;min-width:312px;padding:0;position:relative;z-index:999999}::slotted(h4),::slotted(p){font-size:.91rem;margin:0;padding:8px 16px}::slotted(p.version){font-size:.78rem;margin-top:16px}::slotted(p){color:var(--ripe-app-primary-100,#b8bbd0);font-weight:150}#hover-body.light-theme.svelte-1hd55i0{background-color:var(--ripe-app-primary-100,#b8bbd0)}#hover-body.light-theme.svelte-1hd55i0 ::slotted(h4),#hover-body.light-theme.svelte-1hd55i0 ::slotted(p){color:var(--ripe-app-primary-900,#080037)}#hover-body.light-theme.svelte-1hd55i0 ::slotted(a){color:var(--ripe-app-secondary-100,green);text-decoration:none}::slotted(h4){color:var(--ripe-app-primary-100,#b8bbd0);font-size:1rem;font-weight:600;padding-top:16px}::slotted(a){cursor:pointer;font-size:.91rem;font-weight:100;margin-left:16px;text-decoration:underline}::slotted(button){background-color:var(--ripe-app-primary-900);background:none;border:none;color:var(--ripe-app-primary-100,#b8bbd0);cursor:pointer;font-size:.91rem;margin-left:16px;padding:9px 16px}::slotted(button:hover){background-color:var(--ripe-app-primary-60)}#hover-body.light-theme.svelte-1hd55i0:after{border-bottom-color:var(--ripe-app-primary-100,#b8bbd0)}#hover-body.svelte-1hd55i0:after{border:10px solid #0000;border-bottom:10px solid var(--ripe-app-navbar-background,#080037);content:" ";height:0;margin-left:-10px;pointer-events:none;position:absolute;right:18px;top:-20px;width:0}');
}
function create_fragment10(ctx) {
  let div1;
  let div0;
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[2].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[1],
    null
  );
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      if (default_slot) default_slot.c();
      attr(div0, "id", "hover-body");
      attr(div0, "class", "svelte-1hd55i0");
      toggle_class(
        div0,
        "light-theme",
        /*lighttheme*/
        ctx[0]
      );
      attr(div1, "id", "hover-wrapper");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      if (default_slot) {
        default_slot.m(div0, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        2)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[1],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[1]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[1],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (!current || dirty & /*lighttheme*/
      1) {
        toggle_class(
          div0,
          "light-theme",
          /*lighttheme*/
          ctx2[0]
        );
      }
    },
    i(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      if (default_slot) default_slot.d(detaching);
    }
  };
}
function instance10($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { lighttheme } = $$props;
  $$self.$$set = ($$props2) => {
    if ("lighttheme" in $$props2) $$invalidate(0, lighttheme = $$props2.lighttheme);
    if ("$$scope" in $$props2) $$invalidate(1, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*lighttheme*/
    1) {
      $$invalidate(0, lighttheme = lighttheme || lighttheme === "");
    }
  };
  return [lighttheme, $$scope, slots];
}
var RollOver = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance10, create_fragment10, safe_not_equal, { lighttheme: 0 }, add_css10);
  }
  get lighttheme() {
    return this.$$.ctx[0];
  }
  set lighttheme(lighttheme) {
    this.$$set({ lighttheme });
    flush();
  }
};
customElements.define("roll-over", create_custom_element(RollOver, { "lighttheme": {} }, ["default"], [], true));
var RollOver$1 = RollOver;

// node_modules/@technical-design/ripe-app-webcomponents/esm/src/webcomponents/QuestionMark/index.js
var index3 = {
  QuestionMark: QuestionMark$1,
  RollOver: RollOver$1
};

// node_modules/@technical-design/ripe-app-webcomponents/esm/src/webcomponents/RipeHeader/RipeHeader.svelte.js
function add_css11(target) {
  append_styles(target, "svelte-wajdnq", ':host{display:flex;height:70px;position:sticky;top:0;-webkit-user-select:none;user-select:none;width:100%;z-index:99999}#ripe-header.svelte-wajdnq.svelte-wajdnq{align-items:center;background:#fff;box-shadow:0 0 9px #0000004d;display:flex;height:70px;justify-content:space-between;left:0;padding-top:var(--ripe-header-padding-top,0);position:fixed;top:0;width:100%}@media print{#ripe-header.svelte-wajdnq.svelte-wajdnq{position:static}}#ripe-header.svelte-wajdnq #menu-container.svelte-wajdnq{display:flex;height:100%}#ripe-header.svelte-wajdnq #menu-container.svelte-wajdnq ::slotted(svg){height:34px;margin-left:20px;margin-top:18px}@media only screen and (max-width:500px){#ripe-header.svelte-wajdnq #menu-container.svelte-wajdnq ::slotted(svg){height:24px;margin-top:23px;max-width:100px}}#ripe-header.svelte-wajdnq #burger-menu-hidden.svelte-wajdnq{width:calc(1.4rem - 20px)}#ripe-header.svelte-wajdnq #burger-menu.svelte-wajdnq{align-items:center;display:flex;height:70px;justify-content:center;width:70px}@media print{#ripe-header.svelte-wajdnq #burger-menu.svelte-wajdnq{display:none}}#ripe-header.svelte-wajdnq #burger-menu button.svelte-wajdnq{background:var(--ripe-app-navbar-background,#080037);border:0;cursor:pointer;display:inline-block;height:100%;padding:0;transition:background .2s ease-in-out;vertical-align:middle;width:100%}#ripe-header.svelte-wajdnq #burger-menu button.svelte-wajdnq:after,#ripe-header.svelte-wajdnq #burger-menu button.svelte-wajdnq:before{content:""}#ripe-header.svelte-wajdnq #burger-menu button span.svelte-wajdnq,#ripe-header.svelte-wajdnq #burger-menu button.svelte-wajdnq:after,#ripe-header.svelte-wajdnq #burger-menu button.svelte-wajdnq:before{background:#fff;border-radius:.05em;display:block;height:3px;margin:0 auto 3px;transition:transform .2s ease-in-out,opacity .2s ease-in-out,background .2s ease-in-out;width:40%}#ripe-header.svelte-wajdnq #burger-menu button.svelte-wajdnq:focus-visible{background:var(--ripe-app-primary-100,#b8bbd0)}#ripe-header.svelte-wajdnq #burger-menu button:focus-visible span.svelte-wajdnq,#ripe-header.svelte-wajdnq #burger-menu button.svelte-wajdnq:focus-visible:after,#ripe-header.svelte-wajdnq #burger-menu button.svelte-wajdnq:focus-visible:before{background:var(--ripe-app-primary-900,#080037)}#ripe-header.svelte-wajdnq #burger-menu button.light-theme.svelte-wajdnq:focus-visible{background:var(--ripe-app-navbar-background,#080037)}#ripe-header.svelte-wajdnq #burger-menu button.light-theme:focus-visible span.svelte-wajdnq,#ripe-header.svelte-wajdnq #burger-menu button.light-theme.svelte-wajdnq:focus-visible:after,#ripe-header.svelte-wajdnq #burger-menu button.light-theme.svelte-wajdnq:focus-visible:before{background:#fff}#ripe-header.svelte-wajdnq #burger-menu button.light-theme.svelte-wajdnq{background:var(--ripe-app-primary-100,#b8bbd0)}#ripe-header.svelte-wajdnq #burger-menu button.light-theme span.svelte-wajdnq,#ripe-header.svelte-wajdnq #burger-menu button.light-theme.svelte-wajdnq:after,#ripe-header.svelte-wajdnq #burger-menu button.light-theme.svelte-wajdnq:before{background:var(--ripe-app-primary-900,#080037)}#ripe-header.svelte-wajdnq #burger-menu button.active span.svelte-wajdnq{opacity:0}#ripe-header.svelte-wajdnq #burger-menu button.active.svelte-wajdnq:before{transform:translateY(6px) rotate(135deg)}#ripe-header.svelte-wajdnq #burger-menu button.active.svelte-wajdnq:after{transform:translateY(-6px) rotate(-135deg)}#ripe-header.svelte-wajdnq #burger-menu button.svelte-wajdnq:focus{outline:0}#ripe-header.svelte-wajdnq #actions-container.svelte-wajdnq{align-items:center;display:flex;gap:.5rem;height:100%;padding:0 1.4rem 0 0}@media only screen and (max-width:400px){#actions-container.svelte-wajdnq.svelte-wajdnq{justify-content:flex-start}}#skip-nav.svelte-wajdnq.svelte-wajdnq{clip:rect(0,0,0,0);border-width:0;height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}#skip-nav.svelte-wajdnq.svelte-wajdnq:focus{clip:auto;background-color:#fff;height:auto;left:4px;margin:0;outline:4px solid var(--ripe-app-primary-300,#606591);overflow:visible;padding:16px;position:fixed;top:4px;white-space:normal;width:auto;z-index:10}');
}
var get_logo_app_slot_changes = (dirty) => ({});
var get_logo_app_slot_context = (ctx) => ({});
function create_if_block_15(ctx) {
  let a;
  let t;
  let a_href_value;
  return {
    c() {
      a = element("a");
      t = text("Skip to main content");
      attr(a, "id", "skip-nav");
      attr(a, "href", a_href_value = /*skipnav*/
      ctx[4] || "#main");
      attr(a, "class", "svelte-wajdnq");
    },
    m(target, anchor) {
      insert(target, a, anchor);
      append(a, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*skipnav*/
      16 && a_href_value !== (a_href_value = /*skipnav*/
      ctx2[4] || "#main")) {
        attr(a, "href", a_href_value);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(a);
      }
    }
  };
}
function create_else_block2(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      attr(div, "id", "burger-menu-hidden");
      attr(div, "class", "svelte-wajdnq");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_if_block7(ctx) {
  let div;
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      button = element("button");
      button.innerHTML = `<span class="svelte-wajdnq"></span>`;
      attr(button, "aria-label", "menu-button");
      attr(button, "class", "svelte-wajdnq");
      toggle_class(
        button,
        "active",
        /*open*/
        ctx[0]
      );
      toggle_class(
        button,
        "light-theme",
        /*lighttheme*/
        ctx[1]
      );
      attr(div, "id", "burger-menu");
      attr(div, "class", "svelte-wajdnq");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, button);
      if (!mounted) {
        dispose = [
          listen(
            button,
            "click",
            /*toggleMenu*/
            ctx[5]
          ),
          listen(
            button,
            "touchstart",
            /*toggleMenu*/
            ctx[5]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*open*/
      1) {
        toggle_class(
          button,
          "active",
          /*open*/
          ctx2[0]
        );
      }
      if (dirty & /*lighttheme*/
      2) {
        toggle_class(
          button,
          "light-theme",
          /*lighttheme*/
          ctx2[1]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment11(ctx) {
  let div2;
  let t0;
  let div0;
  let t1;
  let a;
  let t2;
  let div1;
  let current;
  let if_block0 = (
    /*skipnav*/
    ctx[4] !== null && /*skipnav*/
    ctx[4] !== void 0 && create_if_block_15(ctx)
  );
  function select_block_type(ctx2, dirty) {
    if (!/*hidemenu*/
    ctx2[3]) return create_if_block7;
    return create_else_block2;
  }
  let current_block_type = select_block_type(ctx);
  let if_block1 = current_block_type(ctx);
  const logo_app_slot_template = (
    /*#slots*/
    ctx[8]["logo-app"]
  );
  const logo_app_slot = create_slot(
    logo_app_slot_template,
    ctx,
    /*$$scope*/
    ctx[7],
    get_logo_app_slot_context
  );
  const default_slot_template = (
    /*#slots*/
    ctx[8].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[7],
    null
  );
  return {
    c() {
      div2 = element("div");
      if (if_block0) if_block0.c();
      t0 = space();
      div0 = element("div");
      if_block1.c();
      t1 = space();
      a = element("a");
      if (logo_app_slot) logo_app_slot.c();
      t2 = space();
      div1 = element("div");
      if (default_slot) default_slot.c();
      attr(
        a,
        "href",
        /*homeurl*/
        ctx[2]
      );
      attr(a, "aria-label", "go-home-link");
      attr(div0, "id", "menu-container");
      attr(div0, "class", "svelte-wajdnq");
      attr(div1, "id", "actions-container");
      attr(div1, "class", "svelte-wajdnq");
      attr(div2, "id", "ripe-header");
      attr(div2, "class", "svelte-wajdnq");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      if (if_block0) if_block0.m(div2, null);
      append(div2, t0);
      append(div2, div0);
      if_block1.m(div0, null);
      append(div0, t1);
      append(div0, a);
      if (logo_app_slot) {
        logo_app_slot.m(a, null);
      }
      append(div2, t2);
      append(div2, div1);
      if (default_slot) {
        default_slot.m(div1, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*skipnav*/
        ctx2[4] !== null && /*skipnav*/
        ctx2[4] !== void 0
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_15(ctx2);
          if_block0.c();
          if_block0.m(div2, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block1) {
        if_block1.p(ctx2, dirty);
      } else {
        if_block1.d(1);
        if_block1 = current_block_type(ctx2);
        if (if_block1) {
          if_block1.c();
          if_block1.m(div0, t1);
        }
      }
      if (logo_app_slot) {
        if (logo_app_slot.p && (!current || dirty & /*$$scope*/
        128)) {
          update_slot_base(
            logo_app_slot,
            logo_app_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[7],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[7]
            ) : get_slot_changes(
              logo_app_slot_template,
              /*$$scope*/
              ctx2[7],
              dirty,
              get_logo_app_slot_changes
            ),
            get_logo_app_slot_context
          );
        }
      }
      if (!current || dirty & /*homeurl*/
      4) {
        attr(
          a,
          "href",
          /*homeurl*/
          ctx2[2]
        );
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        128)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[7],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[7]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[7],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current) return;
      transition_in(logo_app_slot, local);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(logo_app_slot, local);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div2);
      }
      if (if_block0) if_block0.d();
      if_block1.d();
      if (logo_app_slot) logo_app_slot.d(detaching);
      if (default_slot) default_slot.d(detaching);
    }
  };
}
function instance11($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { open } = $$props;
  let { hidemenu = false } = $$props;
  let { lighttheme } = $$props;
  let { skipnav } = $$props;
  let { homeurl = "/" } = $$props;
  let { component } = $$props;
  const toggleMenu = (e) => {
    e.preventDefault();
    sidebarOpen.set(!open);
  };
  const dispatchToggle = (state) => {
    const event = new CustomEvent(
      "ripe-header-menu-toggle",
      {
        detail: { open: state },
        bubbles: true,
        cancelable: true,
        composed: true
      }
    );
    component.dispatchEvent(event);
  };
  sidebarOpen.subscribe((value) => {
    const emit = open != null && value !== open;
    $$invalidate(0, open = value);
    if (emit) {
      dispatchToggle(value);
    }
  });
  $$self.$$set = ($$props2) => {
    if ("open" in $$props2) $$invalidate(0, open = $$props2.open);
    if ("hidemenu" in $$props2) $$invalidate(3, hidemenu = $$props2.hidemenu);
    if ("lighttheme" in $$props2) $$invalidate(1, lighttheme = $$props2.lighttheme);
    if ("skipnav" in $$props2) $$invalidate(4, skipnav = $$props2.skipnav);
    if ("homeurl" in $$props2) $$invalidate(2, homeurl = $$props2.homeurl);
    if ("component" in $$props2) $$invalidate(6, component = $$props2.component);
    if ("$$scope" in $$props2) $$invalidate(7, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*lighttheme*/
    2) {
      $$invalidate(1, lighttheme = lighttheme === "" || lighttheme);
    }
    if ($$self.$$.dirty & /*homeurl*/
    4) {
      $$invalidate(2, homeurl = homeurl === "" || homeurl === null ? "/" : homeurl);
    }
    if ($$self.$$.dirty & /*open*/
    1) {
      sidebarOpen.set(open);
    }
  };
  return [
    open,
    lighttheme,
    homeurl,
    hidemenu,
    skipnav,
    toggleMenu,
    component,
    $$scope,
    slots
  ];
}
var RipeHeader = class extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance11,
      create_fragment11,
      safe_not_equal,
      {
        open: 0,
        hidemenu: 3,
        lighttheme: 1,
        skipnav: 4,
        homeurl: 2,
        component: 6
      },
      add_css11
    );
  }
  get open() {
    return this.$$.ctx[0];
  }
  set open(open) {
    this.$$set({ open });
    flush();
  }
  get hidemenu() {
    return this.$$.ctx[3];
  }
  set hidemenu(hidemenu) {
    this.$$set({ hidemenu });
    flush();
  }
  get lighttheme() {
    return this.$$.ctx[1];
  }
  set lighttheme(lighttheme) {
    this.$$set({ lighttheme });
    flush();
  }
  get skipnav() {
    return this.$$.ctx[4];
  }
  set skipnav(skipnav) {
    this.$$set({ skipnav });
    flush();
  }
  get homeurl() {
    return this.$$.ctx[2];
  }
  set homeurl(homeurl) {
    this.$$set({ homeurl });
    flush();
  }
  get component() {
    return this.$$.ctx[6];
  }
  set component(component) {
    this.$$set({ component });
    flush();
  }
};
customElements.define("ripe-header", create_custom_element(RipeHeader, { "open": {}, "hidemenu": { "type": "Boolean" }, "lighttheme": {}, "skipnav": {}, "homeurl": {}, "component": {} }, ["logo-app", "default"], [], true, (customElementConstructor) => {
  return class extends customElementConstructor {
    constructor() {
      super();
      this.component = this;
    }
  };
}));
var RipeHeader$1 = RipeHeader;

// node_modules/@technical-design/ripe-app-webcomponents/esm/src/webcomponents/ScrollToTop/ScrollToTop.svelte.js
function add_css12(target) {
  append_styles(target, "svelte-vkpxbj", "button.svelte-vkpxbj{align-items:center;background:none;border:none;bottom:75px;cursor:pointer;display:flex;justify-content:center;opacity:1;position:fixed;right:20px;transition:visibility 0s linear 0s,opacity .3s;visibility:visible}@media print{button.svelte-vkpxbj{display:none}}.hidden.svelte-vkpxbj{opacity:0;transition:visibility 0s linear .3s,opacity .3s;visibility:hidden}svg.svelte-vkpxbj{height:40px;width:40px}");
}
function create_fragment12(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.innerHTML = `<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svelte-vkpxbj"><path fill="#444" d="M8 256a248 248 0 1 1 496 0 248 248 0 0 1-496 0zm231-114L104 278c-10 9-10 24 0 34l17 17c9 9 24 9 33 0l102-102 102 102c9 9 24 9 34 0l17-17c9-10 9-25 0-34L273 142c-9-9-25-9-34 0z"></path></svg>`;
      attr(button, "aria-label", "Scroll to the top of the page");
      attr(button, "class", "svelte-vkpxbj");
      toggle_class(
        button,
        "hidden",
        /*hidden*/
        ctx[0]
      );
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = [
          listen(
            window,
            "scroll",
            /*handleOnScroll*/
            ctx[2]
          ),
          listen(
            button,
            "click",
            /*scrollToTop*/
            ctx[1]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*hidden*/
      1) {
        toggle_class(
          button,
          "hidden",
          /*hidden*/
          ctx2[0]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance12($$self, $$props, $$invalidate) {
  let hidden = true;
  const scrollToTop = () => {
    document.body.scrollIntoView();
    $$invalidate(0, hidden = true);
  };
  const scrollContainer = () => {
    return document.documentElement || document.body;
  };
  const handleOnScroll = () => {
    if (!scrollContainer()) {
      return;
    }
    $$invalidate(0, hidden = scrollContainer().scrollTop <= 80);
  };
  return [hidden, scrollToTop, handleOnScroll];
}
var ScrollToTop = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance12, create_fragment12, safe_not_equal, {}, add_css12);
  }
};
customElements.define("scroll-to-top", create_custom_element(ScrollToTop, {}, [], [], true));
var ScrollToTop$1 = ScrollToTop;

// node_modules/@technical-design/ripe-app-webcomponents/esm/src/webcomponents/UserLogin/UserLogin.svelte.js
function add_css13(target) {
  append_styles(target, "svelte-kzxacd", '#main.svelte-kzxacd.svelte-kzxacd{align-items:center;cursor:pointer;display:flex;font-family:var(--ripe-app-font-family),Helvetica,Arial,Sans-serif;font-size:.875rem;font-weight:500;height:40px;justify-content:center;outline:none;position:relative;-webkit-user-select:none;user-select:none;width:40px}#main.svelte-kzxacd>a#login.svelte-kzxacd{align-items:inherit;display:flex;height:inherit;justify-content:inherit;width:inherit}#main.svelte-kzxacd .exclamation-mark.svelte-kzxacd{fill:var(--ripe-app-primary-900,#080037)}@media print{#main.svelte-kzxacd.svelte-kzxacd{display:none}}#main.svelte-kzxacd svg.svelte-kzxacd{fill:none;enable-background:new 0 0 512 512;height:32px;overflow:visible;width:32px;z-index:1}#main.svelte-kzxacd svg.logged-in .st0.svelte-kzxacd{fill:var(--ripe-app-worried-80,#ff7a36)}#main.svelte-kzxacd svg path.svelte-kzxacd{fill:var(--ripe-app-primary-900,#080037)}#main.svelte-kzxacd svg circle.hover-ring.svelte-kzxacd{fill:none;stroke:none;transition:fill .1s ease-in,transform .1s ease-in}@media(pointer:fine){#main.svelte-kzxacd:hover .exclamation-mark.svelte-kzxacd,#main.svelte-kzxacd:hover svg path.svelte-kzxacd{fill:#fff}#main.svelte-kzxacd:hover #user-ring.svelte-kzxacd{stroke-width:4;transition:stroke-width .1s ease-in}#main.svelte-kzxacd:hover .hover-ring.svelte-kzxacd{fill:var(--ripe-app-primary-900,#080037);stroke:none;transform:scale(1.25);transform-origin:center;transition:transform .1s ease-in}}#main.svelte-kzxacd:focus .exclamation-mark.svelte-kzxacd,#main.svelte-kzxacd:focus svg path.svelte-kzxacd,#main.svelte-kzxacd:focus-within .exclamation-mark.svelte-kzxacd,#main.svelte-kzxacd:focus-within svg path.svelte-kzxacd{fill:#fff}#main.svelte-kzxacd:focus #user-ring.svelte-kzxacd,#main.svelte-kzxacd:focus-within #user-ring.svelte-kzxacd{stroke-width:4;transition:stroke-width .1s ease-in}#main.svelte-kzxacd:focus .hover-ring.svelte-kzxacd,#main.svelte-kzxacd:focus-within .hover-ring.svelte-kzxacd{fill:var(--ripe-app-primary-900,#080037);stroke:none;transform:scale(1.25);transform-origin:center;transition:transform .1s ease-in}#main.svelte-kzxacd:focus-within nav.svelte-kzxacd{display:block}#main:not(.mobile).logged-in.svelte-kzxacd.svelte-kzxacd{height:44px;margin:0 8px;width:44px}#main:not(.mobile).logged-in.svelte-kzxacd svg.svelte-kzxacd{height:inherit;width:inherit}#main.mobile.svelte-kzxacd nav.svelte-kzxacd{top:25px}#main.mobile.svelte-kzxacd nav.svelte-kzxacd:after{right:27px}nav.svelte-kzxacd.svelte-kzxacd{display:none;right:-1rem;text-align:left;top:27px;width:-moz-fit-content;width:fit-content}nav.svelte-kzxacd.svelte-kzxacd,nav.svelte-kzxacd.svelte-kzxacd:after{position:absolute}nav.svelte-kzxacd.svelte-kzxacd:after{border:10px solid #0000;border-bottom:10px solid var(--ripe-app-primary-900,#080037);content:" ";height:0;pointer-events:none;right:28px;top:10px;width:0}nav.svelte-kzxacd ul.svelte-kzxacd{background:var(--ripe-app-primary-900,#080037);border-radius:.5rem;list-style:none;margin:30px 0 0;padding:0}nav.svelte-kzxacd ul li.svelte-kzxacd{padding:.75rem 1.25rem;position:relative}nav.svelte-kzxacd ul li.svelte-kzxacd:first-of-type{padding-top:1.5rem}nav.svelte-kzxacd ul li.svelte-kzxacd:last-of-type{padding-bottom:1.5rem}nav.svelte-kzxacd ul li.divider.svelte-kzxacd{border-bottom:1px solid var(--ripe-app-primary-100,#b8bbd0)}nav.svelte-kzxacd ul li a.svelte-kzxacd{border-bottom:1px solid #0000;color:var(--ripe-app-menuitem,#fff);display:inline-block;overflow:hidden;text-decoration:none;text-overflow:ellipsis;white-space:nowrap}nav.svelte-kzxacd ul li a.svelte-kzxacd:focus,nav.svelte-kzxacd ul li a.svelte-kzxacd:hover{border-bottom-color:var(--ripe-app-navbar-active-menuitem,#fff)}nav.svelte-kzxacd ul li a.active.svelte-kzxacd{border-bottom:2px solid var(--ripe-app-navbar-indicator,#f59331)}');
}
function get_each_context5(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[28] = list[i];
  return child_ctx;
}
function create_else_block3(ctx) {
  let a;
  let svg;
  let circle;
  function select_block_type_1(ctx2, dirty) {
    if (typeof /*userRequestProcessed*/
    ctx2[0] === "string") return create_if_block_34;
    return create_else_block_12;
  }
  let current_block_type = select_block_type_1(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      a = element("a");
      svg = svg_element("svg");
      circle = svg_element("circle");
      if_block.c();
      attr(circle, "class", "hover-ring svelte-kzxacd");
      attr(circle, "cx", "16");
      attr(circle, "cy", "16");
      attr(circle, "r", "15");
      attr(svg, "id", "user-login-icon");
      attr(svg, "class", "not-logged-in svelte-kzxacd");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "viewBox", "0 0 32 32");
      attr(a, "id", "login");
      attr(
        a,
        "href",
        /*accessLoginUrlWithOriginal*/
        ctx[3]
      );
      attr(a, "aria-label", "Sign in to RIPE NCC Access");
      attr(a, "class", "svelte-kzxacd");
    },
    m(target, anchor) {
      insert(target, a, anchor);
      append(a, svg);
      append(svg, circle);
      if_block.m(svg, null);
    },
    p(ctx2, dirty) {
      if (current_block_type !== (current_block_type = select_block_type_1(ctx2))) {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(svg, null);
        }
      }
      if (dirty & /*accessLoginUrlWithOriginal*/
      8) {
        attr(
          a,
          "href",
          /*accessLoginUrlWithOriginal*/
          ctx2[3]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(a);
      }
      if_block.d();
    }
  };
}
function create_if_block_24(ctx) {
  let svg;
  let g;
  let clipPath;
  let circle0;
  let image;
  let circle1;
  return {
    c() {
      svg = svg_element("svg");
      g = svg_element("g");
      clipPath = svg_element("clipPath");
      circle0 = svg_element("circle");
      image = svg_element("image");
      circle1 = svg_element("circle");
      attr(circle0, "cx", "24");
      attr(circle0, "cy", "24");
      attr(circle0, "r", "23");
      attr(clipPath, "id", "circle-clip");
      attr(image, "id", "user-img");
      attr(
        image,
        "href",
        /*accessPictureUrl*/
        ctx[5]
      );
      attr(image, "clip-path", "url(#circle-clip)");
      attr(image, "x", "1.5");
      attr(image, "y", "1.5");
      attr(image, "width", "45");
      attr(image, "height", "45");
      attr(image, "preserveAspectRatio", "xMidYMid slice");
      attr(circle1, "id", "user-ring");
      attr(circle1, "cx", "24");
      attr(circle1, "cy", "24");
      attr(circle1, "r", "23");
      attr(circle1, "fill", "none");
      attr(circle1, "stroke", "var(--ripe-app-primary-900, #080037)");
      attr(circle1, "stroke-width", "2");
      attr(circle1, "class", "svelte-kzxacd");
      attr(svg, "id", "user-login-icon");
      attr(svg, "class", "logged-in svelte-kzxacd");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "viewBox", "0 0 48 48");
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, g);
      append(g, clipPath);
      append(clipPath, circle0);
      append(g, image);
      append(g, circle1);
    },
    p(ctx2, dirty) {
      if (dirty & /*accessPictureUrl*/
      32) {
        attr(
          image,
          "href",
          /*accessPictureUrl*/
          ctx2[5]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
function create_if_block_16(ctx) {
  let svg;
  let circle;
  let path;
  let svg_class_value;
  return {
    c() {
      svg = svg_element("svg");
      circle = svg_element("circle");
      path = svg_element("path");
      attr(circle, "class", "hover-ring mobile trans svelte-kzxacd");
      attr(circle, "cx", "20");
      attr(circle, "cy", "256");
      attr(circle, "r", "256");
      attr(path, "class", "st0 svelte-kzxacd");
      attr(path, "transform", "translate(-10, 0)");
      attr(path, "d", "M32 224c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM0 136c0 17.7 14.3 32 32 32s32-14.3 32-32-14.3-32-32-32-32 14.3-32 32zm0 240c0 17.7 14.3 32 32 32s32-14.3 32-32-14.3-32-32-32-32 14.3-32 32z");
      attr(svg, "class", svg_class_value = null_to_empty(
        /*userLoggedIn*/
        ctx[1] ? "logged-in" : ""
      ) + " svelte-kzxacd");
      attr(svg, "id", "mobile-menu-icon");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "viewBox", "0 0 64 512");
      attr(svg, "aria-label", "mobile menu icon");
      attr(svg, "role", "button");
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, circle);
      append(svg, path);
    },
    p(ctx2, dirty) {
      if (dirty & /*userLoggedIn*/
      2 && svg_class_value !== (svg_class_value = null_to_empty(
        /*userLoggedIn*/
        ctx2[1] ? "logged-in" : ""
      ) + " svelte-kzxacd")) {
        attr(svg, "class", svg_class_value);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
function create_else_block_12(ctx) {
  let path;
  return {
    c() {
      path = svg_element("path");
      attr(path, "transform", "translate(6, 4)");
      attr(path, "d", "M14.0875 12.9375C12.7982 12.9375 12.1783 13.6562 10.0625 13.6562C7.94668 13.6562 7.33125 12.9375 6.0375 12.9375C2.7043 12.9375 0 15.6418 0 18.975V20.8438C0 22.0342 0.96582 23 2.15625 23H17.9688C19.1592 23 20.125 22.0342 20.125 20.8438V18.975C20.125 15.6418 17.4207 12.9375 14.0875 12.9375ZM18.6875 20.8438C18.6875 21.2391 18.3641 21.5625 17.9688 21.5625H2.15625C1.76094 21.5625 1.4375 21.2391 1.4375 20.8438V18.975C1.4375 16.4369 3.49941 14.375 6.0375 14.375C6.91797 14.375 7.79395 15.0938 10.0625 15.0938C12.3266 15.0938 13.207 14.375 14.0875 14.375C16.6256 14.375 18.6875 16.4369 18.6875 18.975V20.8438ZM10.0625 11.5C13.2385 11.5 15.8125 8.92598 15.8125 5.75C15.8125 2.57402 13.2385 0 10.0625 0C6.88652 0 4.3125 2.57402 4.3125 5.75C4.3125 8.92598 6.88652 11.5 10.0625 11.5ZM10.0625 1.4375C12.4389 1.4375 14.375 3.37363 14.375 5.75C14.375 8.12637 12.4389 10.0625 10.0625 10.0625C7.68613 10.0625 5.75 8.12637 5.75 5.75C5.75 3.37363 7.68613 1.4375 10.0625 1.4375Z");
      attr(path, "class", "svelte-kzxacd");
    },
    m(target, anchor) {
      insert(target, path, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(path);
      }
    }
  };
}
function create_if_block_34(ctx) {
  let path;
  return {
    c() {
      path = svg_element("path");
      attr(path, "transform", "translate(-.5, -.5) scale(0.065)");
      attr(path, "d", "M256 40c118.6 0 216 96.1 216 216 0 119.3-96.6 216-216 216-119.2 0-216-96.6-216-216 0-119.2 96.6-216 216-216m0-32C119 8 8 119.1 8 256c0 137 111 248 248 248s248-111 248-248C504 119.1 393 8 256 8zm-11.5 120h23c6.8 0 12.3 5.7 12 12.5l-7 168c-.3 6.4-5.6 11.5-12 11.5h-9c-6.4 0-11.7-5.1-12-11.5l-7-168c-.3-6.8 5.2-12.5 12-12.5zM256 340c-15.5 0-28 12.5-28 28s12.5 28 28 28 28-12.5 28-28-12.5-28-28-28z");
      attr(path, "class", "exclamation-mark svelte-kzxacd");
    },
    m(target, anchor) {
      insert(target, path, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(path);
      }
    }
  };
}
function create_if_block8(ctx) {
  let nav;
  let ul;
  let each_value = ensure_array_like(
    /*links*/
    ctx[4]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block5(get_each_context5(ctx, each_value, i));
  }
  return {
    c() {
      nav = element("nav");
      ul = element("ul");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(ul, "class", "links svelte-kzxacd");
      attr(nav, "class", "svelte-kzxacd");
    },
    m(target, anchor) {
      insert(target, nav, anchor);
      append(nav, ul);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(ul, null);
        }
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*links*/
      16) {
        each_value = ensure_array_like(
          /*links*/
          ctx2[4]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context5(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block5(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(ul, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(nav);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_each_block5(ctx) {
  let li;
  let a;
  let t0_value = (
    /*link*/
    ctx[28].title + ""
  );
  let t0;
  let a_href_value;
  let a_aria_label_value;
  let t1;
  let mounted;
  let dispose;
  return {
    c() {
      li = element("li");
      a = element("a");
      t0 = text(t0_value);
      t1 = space();
      attr(a, "href", a_href_value = /*link*/
      ctx[28].url);
      attr(a, "aria-label", a_aria_label_value = /*link*/
      ctx[28].title);
      attr(a, "class", "svelte-kzxacd");
      toggle_class(
        a,
        "active",
        /*link*/
        ctx[28].active
      );
      attr(li, "class", "svelte-kzxacd");
      toggle_class(
        li,
        "divider",
        /*link*/
        ctx[28].divider
      );
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, a);
      append(a, t0);
      append(li, t1);
      if (!mounted) {
        dispose = listen(a, "click", function() {
          if (is_function(
            /*link*/
            ctx[28].onClick
          )) ctx[28].onClick.apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*links*/
      16 && t0_value !== (t0_value = /*link*/
      ctx[28].title + "")) set_data(t0, t0_value);
      if (dirty & /*links*/
      16 && a_href_value !== (a_href_value = /*link*/
      ctx[28].url)) {
        attr(a, "href", a_href_value);
      }
      if (dirty & /*links*/
      16 && a_aria_label_value !== (a_aria_label_value = /*link*/
      ctx[28].title)) {
        attr(a, "aria-label", a_aria_label_value);
      }
      if (dirty & /*links*/
      16) {
        toggle_class(
          a,
          "active",
          /*link*/
          ctx[28].active
        );
      }
      if (dirty & /*links*/
      16) {
        toggle_class(
          li,
          "divider",
          /*link*/
          ctx[28].divider
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(li);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_fragment13(ctx) {
  let div;
  let t;
  let mounted;
  let dispose;
  function select_block_type(ctx2, dirty) {
    if (
      /*isMobileMode*/
      ctx2[2]
    ) return create_if_block_16;
    if (
      /*userLoggedIn*/
      ctx2[1]
    ) return create_if_block_24;
    return create_else_block3;
  }
  let current_block_type = select_block_type(ctx);
  let if_block0 = current_block_type(ctx);
  let if_block1 = (
    /*links*/
    ctx[4].length > 0 && create_if_block8(ctx)
  );
  return {
    c() {
      div = element("div");
      if_block0.c();
      t = space();
      if (if_block1) if_block1.c();
      attr(div, "id", "main");
      attr(div, "tabindex", "0");
      attr(div, "aria-label", "User Login");
      attr(div, "aria-haspopup", "menu");
      attr(div, "class", "svelte-kzxacd");
      toggle_class(
        div,
        "logged-in",
        /*userLoggedIn*/
        ctx[1]
      );
      toggle_class(
        div,
        "mobile",
        /*isMobileMode*/
        ctx[2]
      );
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if_block0.m(div, null);
      append(div, t);
      if (if_block1) if_block1.m(div, null);
      if (!mounted) {
        dispose = listen(
          div,
          "mousedown",
          /*manageFocus*/
          ctx[6]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block0) {
        if_block0.p(ctx2, dirty);
      } else {
        if_block0.d(1);
        if_block0 = current_block_type(ctx2);
        if (if_block0) {
          if_block0.c();
          if_block0.m(div, t);
        }
      }
      if (
        /*links*/
        ctx2[4].length > 0
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block8(ctx2);
          if_block1.c();
          if_block1.m(div, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (dirty & /*userLoggedIn*/
      2) {
        toggle_class(
          div,
          "logged-in",
          /*userLoggedIn*/
          ctx2[1]
        );
      }
      if (dirty & /*isMobileMode*/
      4) {
        toggle_class(
          div,
          "mobile",
          /*isMobileMode*/
          ctx2[2]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if_block0.d();
      if (if_block1) if_block1.d();
      mounted = false;
      dispose();
    }
  };
}
var https_regexp = /^(https?:\/\/)?/;
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop();
    if (cookieValue) {
      return cookieValue.split(";").shift() || null;
    }
  }
  return null;
}
function instance13($$self, $$props, $$invalidate) {
  let accessLoginUrl;
  let accessLogoutUrl;
  let accessPictureUrl;
  let accessUserUrl;
  let accessProfileUrl;
  let accessLoginUrlWithOriginal;
  let accessLogoutUrlWithOriginal;
  let { logoutredirecturl = null } = $$props;
  let { accessurl = null } = $$props;
  let { loginurl = null } = $$props;
  let { logouturl = null } = $$props;
  let { pictureurl = null } = $$props;
  let { userlinks = [] } = $$props;
  let { mobilebreakpoint = 768 } = $$props;
  let user = { uuid: null };
  let userRequestProcessed = null;
  let userLoggedIn = false;
  let isMobileMode = false;
  let mobileMenuLinks = [];
  let isMounted = false;
  let links = [];
  const usercookie = getCookie("crowd.ripe.hint") === "true";
  let { component } = $$props;
  mobileMenuLinksStore.subscribe((value) => {
    $$invalidate(16, mobileMenuLinks = value);
  });
  onMount(async () => {
    window.addEventListener("resize", windowSize);
    $$invalidate(17, isMounted = true);
  });
  const optionals = (condition, values) => condition ? values : [];
  function manageFocus(e) {
    if (document.activeElement === component) {
      const svg = component.shadowRoot.querySelector("svg");
      if (svg.contains(e.target)) {
        component.shadowRoot.querySelector("#main").blur();
        e.preventDefault();
      }
    }
  }
  isMobileStore.subscribe((value) => {
    $$invalidate(2, isMobileMode = value);
  });
  function windowSize() {
    isMobileStore.set(window.innerWidth < mobilebreakpoint);
  }
  function itemClicked(title) {
    dispatch("app-switcher-item-click", { item: title });
  }
  function dispatch(eventName, eventDetails = null) {
    const event = new CustomEvent(
      eventName,
      {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    );
    if (eventDetails) {
      event.details = eventDetails;
    }
    component.dispatchEvent(event);
  }
  $$self.$$set = ($$props2) => {
    if ("logoutredirecturl" in $$props2) $$invalidate(8, logoutredirecturl = $$props2.logoutredirecturl);
    if ("accessurl" in $$props2) $$invalidate(7, accessurl = $$props2.accessurl);
    if ("loginurl" in $$props2) $$invalidate(9, loginurl = $$props2.loginurl);
    if ("logouturl" in $$props2) $$invalidate(10, logouturl = $$props2.logouturl);
    if ("pictureurl" in $$props2) $$invalidate(11, pictureurl = $$props2.pictureurl);
    if ("userlinks" in $$props2) $$invalidate(12, userlinks = $$props2.userlinks);
    if ("mobilebreakpoint" in $$props2) $$invalidate(13, mobilebreakpoint = $$props2.mobilebreakpoint);
    if ("component" in $$props2) $$invalidate(14, component = $$props2.component);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*accessurl*/
    128) {
      $$invalidate(7, accessurl = accessurl ? accessurl.replace(https_regexp, "https://") : "https://access.ripe.net");
    }
    if ($$self.$$.dirty & /*loginurl, accessurl*/
    640) {
      $$invalidate(22, accessLoginUrl = loginurl || accessurl);
    }
    if ($$self.$$.dirty & /*logouturl, accessurl*/
    1152) {
      $$invalidate(21, accessLogoutUrl = logouturl || `${accessurl}/logout`);
    }
    if ($$self.$$.dirty & /*accessurl*/
    128) {
      $$invalidate(18, accessUserUrl = `${accessurl}/user/profile`);
    }
    if ($$self.$$.dirty & /*accessurl, isMounted, userRequestProcessed, accessUserUrl*/
    393345) {
      if (accessurl && isMounted && !userRequestProcessed && usercookie) {
        fetch(accessUserUrl, {
          credentials: "include",
          cache: "no-store"
        }).then((response) => {
          if (response.status === 200) {
            $$invalidate(1, userLoggedIn = true);
            response.json().then((r) => {
              $$invalidate(0, userRequestProcessed = true);
              $$invalidate(15, user = r);
            });
          } else {
            $$invalidate(0, userRequestProcessed = false);
          }
        }).catch((e) => {
          $$invalidate(1, userLoggedIn = false);
          $$invalidate(0, userRequestProcessed = "Login not available");
        });
      }
    }
    if ($$self.$$.dirty & /*pictureurl, user, accessurl*/
    34944) {
      $$invalidate(5, accessPictureUrl = pictureurl || (user && user.uuid ? `${accessurl}/picture/${user.uuid}` : ""));
    }
    if ($$self.$$.dirty & /*accessurl*/
    128) {
      $$invalidate(20, accessProfileUrl = `${accessurl}/profile`);
    }
    if ($$self.$$.dirty & /*accessLoginUrl*/
    4194304) {
      $$invalidate(3, accessLoginUrlWithOriginal = `${accessLoginUrl}/?originalUrl=${encodeURIComponent(window.location.href)}`);
    }
    if ($$self.$$.dirty & /*accessLogoutUrl, logoutredirecturl*/
    2097408) {
      $$invalidate(19, accessLogoutUrlWithOriginal = `${accessLogoutUrl}?originalUrl=${encodeURIComponent(logoutredirecturl || window.location.href)}`);
    }
    if ($$self.$$.dirty & /*mobilebreakpoint*/
    8192) {
      isMobileStore.set(window.innerWidth < mobilebreakpoint);
    }
    if ($$self.$$.dirty & /*isMobileMode, userLoggedIn, userRequestProcessed, accessLoginUrlWithOriginal, accessProfileUrl, user, userlinks, accessLogoutUrlWithOriginal, mobileMenuLinks*/
    1675279) {
      $$invalidate(4, links = [
        ...optionals(isMobileMode && !userLoggedIn && typeof userRequestProcessed !== "string", [
          {
            url: accessLoginUrlWithOriginal,
            title: "Login",
            divider: true
          }
        ]),
        ...optionals(typeof userRequestProcessed === "string", [
          {
            url: accessLoginUrlWithOriginal,
            title: "Retry Login",
            onClick: () => {
            },
            divider: isMobileMode
          }
        ]),
        ...optionals(userLoggedIn, [
          {
            url: accessProfileUrl,
            title: `${user.firstName} ${user.lastName}`,
            onClick: () => {
            }
          },
          ...userlinks.map((link) => ({
            ...link,
            onClick: () => {
            }
          })),
          {
            url: accessLogoutUrlWithOriginal,
            title: "Logout",
            onClick: () => {
            },
            divider: isMobileMode
          }
        ]),
        ...mobileMenuLinks.map((link) => ({
          ...link,
          onClick: () => itemClicked(link.title)
        }))
      ]);
    }
  };
  return [
    userRequestProcessed,
    userLoggedIn,
    isMobileMode,
    accessLoginUrlWithOriginal,
    links,
    accessPictureUrl,
    manageFocus,
    accessurl,
    logoutredirecturl,
    loginurl,
    logouturl,
    pictureurl,
    userlinks,
    mobilebreakpoint,
    component,
    user,
    mobileMenuLinks,
    isMounted,
    accessUserUrl,
    accessLogoutUrlWithOriginal,
    accessProfileUrl,
    accessLogoutUrl,
    accessLoginUrl
  ];
}
var UserLogin = class extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance13,
      create_fragment13,
      safe_not_equal,
      {
        logoutredirecturl: 8,
        accessurl: 7,
        loginurl: 9,
        logouturl: 10,
        pictureurl: 11,
        userlinks: 12,
        mobilebreakpoint: 13,
        component: 14
      },
      add_css13
    );
  }
  get logoutredirecturl() {
    return this.$$.ctx[8];
  }
  set logoutredirecturl(logoutredirecturl) {
    this.$$set({ logoutredirecturl });
    flush();
  }
  get accessurl() {
    return this.$$.ctx[7];
  }
  set accessurl(accessurl) {
    this.$$set({ accessurl });
    flush();
  }
  get loginurl() {
    return this.$$.ctx[9];
  }
  set loginurl(loginurl) {
    this.$$set({ loginurl });
    flush();
  }
  get logouturl() {
    return this.$$.ctx[10];
  }
  set logouturl(logouturl) {
    this.$$set({ logouturl });
    flush();
  }
  get pictureurl() {
    return this.$$.ctx[11];
  }
  set pictureurl(pictureurl) {
    this.$$set({ pictureurl });
    flush();
  }
  get userlinks() {
    return this.$$.ctx[12];
  }
  set userlinks(userlinks) {
    this.$$set({ userlinks });
    flush();
  }
  get mobilebreakpoint() {
    return this.$$.ctx[13];
  }
  set mobilebreakpoint(mobilebreakpoint) {
    this.$$set({ mobilebreakpoint });
    flush();
  }
  get component() {
    return this.$$.ctx[14];
  }
  set component(component) {
    this.$$set({ component });
    flush();
  }
};
customElements.define("user-login", create_custom_element(UserLogin, { "logoutredirecturl": {}, "accessurl": {}, "loginurl": {}, "logouturl": {}, "pictureurl": {}, "userlinks": {}, "mobilebreakpoint": {}, "component": {} }, [], [], true, (customElementConstructor) => {
  return class extends customElementConstructor {
    constructor() {
      super();
      this.component = this;
      this.addEventListener("access-logout", () => {
        this.userLoggedIn = false;
      });
    }
  };
}));
var UserLogin$1 = UserLogin;
export {
  AppBanner$1 as AppBanner,
  AppCookieConsent$1 as AppCookieConsent,
  index as AppNavBar,
  AppSwitcher$1 as AppSwitcher,
  index2 as LegalAccordion,
  LiveChat$1 as LiveChat,
  index3 as QuestionMark,
  RipeHeader$1 as RipeHeader,
  ScrollToTop$1 as ScrollToTop,
  UserLogin$1 as UserLogin
};
//# sourceMappingURL=@technical-design_ripe-app-webcomponents.js.map
