module.exports = {
    entry: './frontend/main.js',
    output: {
        filename: './frontend/dist/dist.js'
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                query: {
                  presets: ['es2015', 'react']
                }
            }
        ]
    },
}
