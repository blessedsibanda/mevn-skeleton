<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to the MEVN-Skeleton BoilerPlate
        </v-card-title>
        <v-card-text>
          <p>
            Boilerplate setup for MongoDB, Vue.js, Nuxt.js, Node.js, Express.js and Vuetify to build modern web applications.
          </p>
          <p>
            This boilerplate also includes authentication with <strong>nuxtjs/auth-next</strong> module.
          </p>
          
          <div class="text-xs-right">
            <em><small>&mdash; Blessed Sibanda</small></em>
          </div>
          <hr class="my-3">
          
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/auth/signup"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue';
import VuetifyLogo from '~/components/VuetifyLogo.vue';

export default {
	components: {
		Logo,
		VuetifyLogo,
	},
};
</script>
