module.exports = {
  title: 'TypeScript FAQ',
  description: 'TypeScript 常见问题解答',
  base: '/typescript-tutorial/',
  port: 6869,
  head: [
    ['link', { rel: 'icon', href: '/image/logo.png' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ],
  plugins: [
    '@vuepress/back-to-top',
    '@vuepress/last-updated',
  ],
  themeConfig: {
    nav: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: 'Github',
        link: 'https://github.com/xiaoboost/typescript-tutorial',
      },
    ],
    sidebarDepth: 1,
    smoothScroll: true,
    lastUpdated: '上次更新',
    logo: '/image/logo.png',
    sidebar: [
      '/enum/enum-literal',
    ],
  },
};
