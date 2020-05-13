<template>
  <div class="mx-2">
    <v-layout justify-center>
      <v-flex xs12 sm10 md6>
        <v-card class="mx-auto" max-width="400" tile>
          <v-list-item v-for="user in users" :key="user._id">
            <v-list-item-content>
              <v-list-item-title>{{user.name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
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
