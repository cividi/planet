// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'surface',
  siteDescription: 'Digital tools for the analogue city',
  siteUrl: 'https://cividi.be',

  plugins: [
    {
      // Create posts from markdown files
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Post',
        path: 'content/posts/*.md',
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          tags: {
            typeName: 'Tag',
            create: true
          }
        }
      }
    },{
      // Create pages also from markdown files
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Doc',
        path: 'content/docs/*.md',
      }
    },{
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000, // default
        exclude: [],
        config: {
          '/articles/*': {
            changefreq: 'weekly',
            priority: 0.5
          },
          '/de/*': {
            changefreq: 'monthly',
            priority: 0.7
          }
        }
      }
    }
  ],

  templates: {
    Tag: '/tag/:id',
    Doc: '/p/:lang/:slug',
    Post: '/blog/:lang/:year-:month-:day'
  },

  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        '@gridsome/remark-prismjs'
      ]
    }
  },
}
