import colors from 'vuetify/es5/util/colors';

export default {
	server: {
		port: 3000, // default: 3000
		host: '0.0.0.0', // default: localhost
	},
	mode: 'universal',
	/*
  ** Headers of the page
  */
	head: {
		titleTemplate: '%s - ' + process.env.npm_package_name,
		title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'description',
				name: 'description',
				content: process.env.npm_package_description || '',
			},
		],
		link: [ { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' } ],
	},
	/*
  ** Customize the progress-bar color
  */
	loading: { color: '#fff' },
	/*
  ** Global CSS
  */
	css: [ '@mdi/font/css/materialdesignicons.css' ],
	/*
  ** Plugins to load before mounting the App
  */
	plugins: [],
	/*
  ** Nuxt.js dev-modules
  */
	buildModules: [ '@nuxtjs/vuetify' ],
	/*
  ** Nuxt.js modules
  */
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		'@nuxtjs/auth-next',
	],
	/*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
	axios: {
		baseURL: 'http://localhost:4000',
	},
	/*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
	vuetify: {
		customVariables: [ '~/assets/variables.scss' ],
		theme: {
			dark: false,
			themes: {
				dark: {
					primary: colors.blue.darken2,
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3,
				},
			},
		},
	},
	auth: {
		redirect: {
			login: '/auth/signin',
			logout: '/',
		},
		strategies: {
			local: {
				token: {
					property: 'token',
					required: true,
					type: 'Bearer',
				},
				user: {
					property: 'user',
					autoFetch: true,
				},
				endpoints: {
					login: { url: '/api/auth/signin', method: 'post' },
					// logout: { url: '/api/auth/logout', method: 'post' },
					user: { url: '/api/auth/me', method: 'get' },
				},
			},
		},
	},
	/*
  ** Build configuration
  */
	build: {
		/*
    ** You can extend webpack config here
    */
		extend(config, ctx) {},
	},
};
