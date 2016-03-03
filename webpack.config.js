module.exports = {
    entry: './main.js',
    output: {
        filename: './dist/dist.js'
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                query: {
                  presets: ['react']
                }
            }
        ]
    },
}
