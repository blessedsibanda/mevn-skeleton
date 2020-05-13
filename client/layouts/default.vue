<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/users">
          <v-list-item-action>
            <v-icon>mdi-account-group-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <template v-if="$auth.loggedIn">
          <v-list-item to="/private">
            <v-list-item-action>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>My Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="userAction">
            <v-list-item-action>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-else>
          <v-list-item to="/auth/signin">
            <v-list-item-action>
              <v-icon>mdi-account-arrow-right</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sign In</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/auth/signup">
            <v-list-item-action>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sign Up</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dense color="primary" :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-text="title" />

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn to="/" text>Home</v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn to="/users" text>Users</v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn @click="userAction" text>{{ $auth.loggedIn ? 'Sign Out' : 'Sign In' }}</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if="!$auth.loggedIn" class="hidden-sm-and-down">
        <v-btn to="/auth/signup" text>Sign Up</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-row>
          <v-col>
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; {{currentYear}}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      title: "MEVN-Skeleton"
    };
  },
  computed: {
    currentYear() {
      const date = new Date();
      return date.getFullYear();
    }
  },
  methods: {
    async userAction() {
      if (this.$auth.loggedIn) {
        await this.$auth.logout();
      } else {
        this.$router.push("/auth/signin");
      }
    }
  }
};
</script>
