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
    nav: [],
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
  configureWebpack: {
    resolve: {
      alias: {
        '@imgs': path.resolve(__dirname, '../assets/imgs')
      }
    }
  },
  plugins: [
    [
      'vuepress-plugin-merge-pages',
      {
        bundles: [{
          path: 'entire-documentation-(HTML)',
          filter: (pages) => {
            return pages.filter(({ path }) => path.match(new RegExp('/([0-9]+)')))
          },
          mergePages: pages => {
            const pageBreak = '<hr class="page-break" />\n\n'
            const disableSideNavBar='---\nsidebar: false\nnavbar: false\nsearch: false\n---\n'
            const initialValue = `${disableSideNavBar}# Entire Documentation (HTML)\n\n[[TOC]]\n${pageBreak}`

            //Relative links with more than one dash must have just one dash
            var dashRegex= /\-+/g;
            //Link always has the next structure: [*](*#*). We have to remove the second * because now we are pointing to the same doc
            var regex = /(\[.+?(?=\]\())(.+?(?=\#))(.+?(?=\)))/g;


            const totalPages = pages
              .reduce((acc, current) => {
                const contentWithCorrectLinks = current.content.replace(regex, function(matchingWord,firstMatchingPart,secondMatchingPart,thirdMatchingPart){
                  if(secondMatchingPart.startsWith("](http") || secondMatchingPart.startsWith("](https")){ //dont change absolute links
                    return matchingWord;
                  }
                  var contentNoMoreThanOneDashInLinks = thirdMatchingPart.replace(dashRegex, '-')
                  if(contentNoMoreThanOneDashInLinks.startsWith("#x509")){
                    contentNoMoreThanOneDashInLinks = contentNoMoreThanOneDashInLinks.replace('#x509', '#x-509')
                  }
                  return firstMatchingPart+ '](' + contentNoMoreThanOneDashInLinks;
                })
                return `${acc}${contentWithCorrectLinks}\n\n${pageBreak}`
              }, initialValue)
            return totalPages
          }
        }]
      }
    ],
    [
      'vuepress-plugin-dehydrate',{
        noScript: [
          '**/entire-documentation',
        ],
      },
    ],
    ['@xiaopanda/vuepress-plugin-code-copy', {
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
    }]
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
