const path = require("path");

const getConfig = require("vuepress-bar");

const { nav, sidebar } = getConfig({addReadMeToFirstGroup: false, mixDirectoriesAndFilesAlphabetically: true, multipleSideBar: false});

const apiServer = process.env.API_SERVER || "stat.ripe.net/data";


sidebar.forEach((item) => {
if (typeof item.title !== 'undefined') {
if (item !=='' && item.title.includes("Database-")) { item.title = item.title.replace("Database-", "Database "); }
}
})
sidebar.forEach((item) => {
if (typeof item.title !== 'undefined') {
if (item !=='' && item.title.includes("in-")) { item.title = item.title.replace("in-", "In "); }
}
})
sidebar.forEach((item) => {
if (typeof item.title !== 'undefined') {
if (item !=='' && item.title.includes("Is-")) { item.title = item.title.replace("Is-", "Is "); }
}
})
sidebar.forEach((item) => {
if (typeof item.title !== 'undefined') {
if (item !=='' && item.title.includes("Object-")) { item.title = item.title.replace("Object-", "Object "); }
}
})

sidebar.forEach((item) => {
if (typeof item.title !== 'undefined') {
if (item !=='' && item.title.includes("Objects-")) { item.title = item.title.replace("Objects-", "Objects "); }
}
})

sidebar.forEach((item) => {
if (typeof item.title !== 'undefined') {
if (item !=='' && item.title.includes("of-")) { item.title = item.title.replace("of-", "of "); }
}
})
sidebar.forEach((item) => {
if (typeof item.title !== 'undefined') {
if (item !=='' && item.title.includes("Personal-")) { item.title = item.title.replace("Personal-", "Personal "); }
}
})
sidebar.forEach((item) => {
if (typeof item.title !== 'undefined') {
if (item !=='' && item.title.includes("Query-")) { item.title = item.title.replace("Query-", "Query "); }
}
})
sidebar.forEach((item) => {
if (typeof item.title !== 'undefined') {
if (item !=='' && item.title.includes("Ripe")) { item.title = item.title.replace("Ripe", "RIPE"); }
}
})
sidebar.forEach((item) => {
if (typeof item.title !== 'undefined') {
if (item !=='' && item.title.includes("RIPE-")) { item.title = item.title.replace("RIPE-", "RIPE "); }
}
})
sidebar.forEach((item) => {
if (typeof item.title !== 'undefined') {
if (item !=='' && item.title.includes("Rpsl")) { item.title = item.title.replace("Rpsl", "RPSL"); }
}
})
sidebar.forEach((item) => {
if (typeof item.title !== 'undefined') {
if (item !=='' && item.title.includes("the-")) { item.title = item.title.replace("the-", "the "); }
}
})
sidebar.forEach((item) => {
if (typeof item.title !== 'undefined') {
if (item !=='' && item.title.includes("to-")) { item.title = item.title.replace("to-", "to "); }
}
})

module.exports = {
  title: "Docs",
  description: "The RIS Docs Center",
  dest: process.env.BETA ? 'builds/docsbeta' : 'builds/docs',
  base: process.env.BETA ? '/docsbeta/' : '/docs/',
  themeConfig: {
    nav:[],
    sidebar,
    // setting activeHeaderLinks to true automagically
    // opens the sidebar if it's closed when scrolling along
    // a new anchor.
    activeHeaderLinks: true,
    displayAllHeaders: false,
    collapsable: true,
    sidebarDepth: 1,
    searchMaxSuggestions: 20,
    breadcrumbIcon: false,
    breadcrumb: false,
    iconPrefix: false,
    lastUpdated: 'Last Updated'
  },
  plugins: [['@xiaopanda/vuepress-plugin-code-copy', {
        buttonStaticIcon: true,
        buttonIconTitle: 'Copy',
        buttonAlign: 'bottom',
        buttonColor: 'grey'
       }],
       ['@mr-hope/vuepress-plugin-components'],
       // ['vuepress-plugin-global-variables', { variables: { asn: '3333', ip: '193.0.0.0', prefix: '140.78/16', starttime: '2020-12-21T07:00', endtime: '2020-12-21T12:00' } }],
       ['full-searchbar', { encode: 'icase', tokenize: 'full' }],
    // require('vuepress-plugin-full-searchbar')
        ['@vuepress/last-updated', {
          transformer: (timestamp, lang) => {
            const dayjs = require('dayjs')
            const utc = require('dayjs/plugin/utc')

            dayjs.extend(utc)

            return dayjs(timestamp).utc(true).format()
          }
        }
      ]
		],
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-html5-embed'), {
        html5embed: {
          useImageSyntax: true,
          useLinkSyntax: false,
          attributes: {
			  'audio': 'width="740px" controls class="audioplayer"',
			  'video': 'width="740px" height="auto !important" class="audioplayer" controls'
			}
        }
      })
    }
  },
  define: {
    __API_SERVER__: apiServer,
  },
};
