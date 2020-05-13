<template>
  <div class="mx-2">
    <v-layout justify-center>
      <v-flex xs12 sm10 md6>
        <v-card class="mx-auto">
          <v-list>
            <v-subheader>USERS</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item :to="'/users/' + user._id" v-for="user in users" :key="user._id">
                <v-list-item-icon>
                  <v-icon>mdi-account-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="user.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      users: []
    };
  },
  methods: {
    async getUsers() {
      try {
        const res = await this.$axios.get("/api/users");
        this.users = await res.data.users;
        this.users = this.users.filter(u => u._id != this.$auth.user._id);
      } catch (error) {
        console.log(error);
      }
    }
  },
  async mounted() {
    this.getUsers();
  }
};
</script>

<style>
</style>
