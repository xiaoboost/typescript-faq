module.exports = {
    title: 'Hello VuePress',
    description: 'Just playing around',
    configureWebpack: (_, isServer) => {
        return isServer ? {} : {
            output: {
                publicPath: './',
            },
        };
    },
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            { text: 'External', link: 'https://google.com' },
        ]
    }
};
