module.exports = {
    purge: [
        './assets/**/*.jsx',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                body: ['"Press Start 2P"']
            },
            fontSize: {
                xxs: '.75rem'
            }
        },
    },
    variants: {
        extend: {
            opacity: ['disabled']
        }
    },
    plugins: [],
}