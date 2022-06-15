<template>
  <div class="search-box">
  <mwc-textfield label="Search..."
			ref="input"
      aria-label="Search"
      :value="query"
      :class="{ 'focused': focused }"
      :placeholder="placeholder"
      autocomplete="off"
      spellcheck="false"
      @input="query = $event.target.value"
      @focus="focused = true"
      @blur="focused = false"
      @keyup.enter="go(focusIndex)"
      @keyup.up="onUp"
      @keyup.down="onDown" 
    ></mwc-textfield>
    <ul v-if="showSuggestions" class="suggestions" :class="{ 'align-right': alignRight }" @mouseleave="unfocus">
      <li
        v-for="(s, i) in suggestions"
        :key="i"
        class="suggestion"
        :class="{ focused: i === focusIndex }"
        @mousedown="go(i)"
        @mouseenter="focus(i)"
      >
        <a :href="s.path + s.slug" @click.prevent>
          <div v-if="s.parentPageTitle" class="parent-page-title" v-html="s.parentPageTitle" />
          <hr style="padding:0;">
          <div class="suggestion-row">
            <!-- <div class="page-title">{{ s.title || s.path }}</div> -->
            <div class="suggestion-content">
              <!-- prettier-ignore -->
              <div v-if="s.headingStr" class="header">
                {{ s.headingDisplay.prefix }}<span class="highlight">{{ s.headingDisplay.highlightedContent }}</span>{{ s.headingDisplay.suffix }}
              </div>
              <!-- prettier-ignore -->
              <div v-if="s.contentStr">
                {{ s.contentDisplay.prefix }}<span class="highlight">{{ s.contentDisplay.highlightedContent }}</span>{{ s.contentDisplay.suffix }}
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import flexsearchSvc from '../services/flexsearchSvc'

// see https://vuepress.vuejs.org/plugin/option-api.html#clientdynamicmodules
import hooks from '@dynamic/hooks'

/* global SEARCH_MAX_SUGGESTIONS, SEARCH_PATHS, SEARCH_HOTKEYS */
export default {
  name: 'SearchBox',
  data() {
    return {
      query: '',
      focused: false,
      focusIndex: 0,
      placeholder: undefined,
      suggestions: null,
    }
  },
  computed: {
    queryTerms() {
      if (!this.query) return []
      const result = flexsearchSvc
        .normalizeString(this.query)
        .split(/[^\p{L}\p{N}_]+/iu)
        .filter(t => t)
      return result
    },
    showSuggestions() {
      return this.focused && this.suggestions && this.suggestions.length
    },

    // make suggestions align right when there are not enough items
    alignRight() {
      const navCount = (this.$site.themeConfig.nav || []).length
      const repo = this.$site.repo ? 1 : 0
      return navCount + repo <= 3
    },
  },
  watch: {
    query() {
      this.getSuggestions()
    },
  },
  /* global OPTIONS */
  mounted() {
    import("@material/mwc-textfield").then(() => {})
    const options = OPTIONS || {}
    flexsearchSvc.buildIndex(this.$site.pages, options)
    this.placeholder = this.$site.themeConfig.searchPlaceholder || ''
    document.addEventListener('keydown', this.onHotkey)

    // set query from URL
    const params = this.urlParams()
    if (params) {
      const query = params.get('query')
      if (query) {
        this.query = decodeURI(query)
        this.focused = true
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onHotkey)
  },
  methods: {
    async getSuggestions() {
      if (!this.query || !this.queryTerms.length) {
        this.suggestions = []
        return
      }
      let suggestions = await flexsearchSvc.match(
        this.query,
        this.queryTerms,
        this.$site.themeConfig.searchMaxSuggestions || SEARCH_MAX_SUGGESTIONS,
      )
      if (hooks.processSuggestions) {
        // augment suggestions with user-provided function
        suggestions = await hooks.processSuggestions(suggestions, this.query, this.queryTerms)
      }
      // console.log(suggestions)
      this.suggestions = suggestions.map(s => ({
        ...s,
        headingDisplay: highlight(s.headingStr, s.headingHighlight),
        contentDisplay: highlight(s.contentStr, s.contentHighlight),
      }))
    },
    getPageLocalePath(page) {
      for (const localePath in this.$site.locales || {}) {
        if (localePath !== '/' && page.path.indexOf(localePath) === 0) {
          return localePath
        }
      }
      return '/'
    },
    isSearchable(page) {
      let searchPaths = SEARCH_PATHS
      // all paths searchables
      if (searchPaths === null) {
        return true
      }
      searchPaths = Array.isArray(searchPaths) ? searchPaths : new Array(searchPaths)
      return (
        searchPaths.filter(path => {
          return page.path.match(path)
        }).length > 0
      )
    },
    onHotkey(event) {
      if (event.srcElement === document.body && SEARCH_HOTKEYS.includes(event.key)) {
        this.$refs.input.focus()
        event.preventDefault()
      }
    },
    onUp() {
      if (this.showSuggestions) {
        if (this.focusIndex > 0) {
          this.focusIndex--
        } else {
          this.focusIndex = this.suggestions.length - 1
        }
      }
    },
    onDown() {
      if (this.showSuggestions) {
        if (this.focusIndex < this.suggestions.length - 1) {
          this.focusIndex++
        } else {
          this.focusIndex = 0
        }
      }
    },
    go(i) {
      if (!this.showSuggestions) {
        return
      }
      if (hooks.onGoToSuggestion) {
        const result = hooks.onGoToSuggestion(i, this.suggestions[i], this.query, this.queryTerms)
        if (result === true) return
      }
      if (this.suggestions[i].external) {
        window.open(this.suggestions[i].path + this.suggestions[i].slug, '_blank')
      } else {
        this.$router.push(this.suggestions[i].path + this.suggestions[i].slug)
        this.query = ''
        this.focusIndex = 0
        this.focused = false

        // reset query param
        const params = this.urlParams()
        if (params) {
          params.delete('query')
          const paramsString = params.toString()
          const newState = window.location.pathname + (paramsString ? `?${paramsString}` : '')
          history.pushState(null, '', newState)
        }
      }
    },
    focus(i) {
      this.focusIndex = i
    },
    unfocus() {
      this.focusIndex = -1
    },
    urlParams() {
      if (!window.location.search) {
        return null
      }
      return new URLSearchParams(window.location.search)
    },
  },
}

function highlight(str, strHighlight) {
  if (!str) return {}
  if (!strHighlight) return { prefix: str }
  const [start, length] = strHighlight
  const end = start + length

  const prefix = str.slice(0, start)
  const highlightedContent = str.slice(start, end)
  const suffix = str.slice(end)
  return { prefix, highlightedContent, suffix }

  // return `${prefix}<span class="highlight">${highlightedContent}</span>${suffix}`
}
</script>

<style lang="stylus">
mwc-textfield {
    --mdc-theme-primary: #080037;
    --mdc-theme-secondary: #080037;

  --mdc-shape-small: 0px;
  --mdc-shape-medium: 0px;
  --mdc-shape-large: 0px;
  width: 100% !important;
  margin-top:0;
  padding:0;
  /* height: 50px; */
  }
.search-box
  width: 100%;
  margin: 0;
  padding:0;
  /* 
display inline-block
  position relative
  margin-right 0rem
  input
    cursor text
    width 10rem
    height: 2rem
    color lighten($textColor, 25%)
    display inline-block
    border 1px solid darken($borderColor, 10%)
    border-radius 2rem
    font-size 0.9rem
    line-height 2rem
    padding 0 0.5rem 0 2rem
    outline none
    transition all .2s ease
    background #fff url(assets/search.svg) 0.6rem 0.5rem no-repeat
    background-size 1rem
    &:focus
      cursor auto
      border-color $accentColor
 */
  .suggestions
    background #fff
    min-width 300px
    max-width 100%
    width: 100vw
    position absolute
    top 42px
    border 1px solid darken($borderColor, 10%)
    border-radius 0px
    padding 0rem
    list-style-type none
    left 200px
    /* 
&.align-right
      right 0
 */
  .suggestion
    line-height 1.4
    // padding 0.4rem 0.6rem
    border-radius 4px
    cursor pointer
    width 100%
    hr
      padding 0
      margin 0
    a
      display block
      white-space normal
      color lighten($textColor, 15%)
      width 100%
      .parent-page-title
        color #080037
        font-weight 600
        background-color white
        padding-top 15px
        padding-left 10px

      .suggestion-row
        border-collapse collapse
        width 100%
        display table
        .page-title
          width: 35%
          border 1px solid $borderColor
          background: #f5f5f5
          border-left none
          display table-cell
          text-align right
          padding 10px
          padding-top 0
          margin-top 0
          font-weight 600
        .suggestion-content
          .highlight
            text-decoration: underline
          border 0px solid $borderColor
          font-weight 400
          border-right none
          width: 65%
          display table-cell
          padding-left 10px
          padding-right 10px
          padding-bottom 10px
          .header
            font-weight 600
            padding-top 10px

    &.focused .suggestion-row
      background-color #f3f4f5
@media (max-width: $MQNarrow)
  .search-box
    input
      cursor pointer
      width 0
      border-color transparent
      position relative
      &:focus
        cursor text
        left 0
        width 10rem
// Match IE11
@media all and (-ms-high-contrast: none)
  .search-box input
    height 2rem
@media (max-width: $MQNarrow) and (min-width: $MQMobile)
  .search-box
    .suggestions
      left 0
@media (max-width: $MQMobile)
  .search-box
    margin-right 0
    input
      left 1rem
    .suggestions
      right 0
@media (max-width: $MQMobileNarrow)
  .search-box
    .suggestions
      width calc(100vw - 4rem)
    input:focus
      width 8rem
</style>
