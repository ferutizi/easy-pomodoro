/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: [{loader: '@svgr/webpack', options: { icon: true } }],
        },
        {
            test: /\.(mp3|wav|ogg)$/i,
            use: [
              {
                loader: 'file-loader', // O 'url-loader' si lo prefieres
                options: {
                  publicPath: '/_next',
                  name: 'static/media/[name].[hash].[ext]',
                },
              },
            ],
          }
        )
        return config;
    },
}

export default nextConfig;