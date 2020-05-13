<template>
  <div class="mx-2">
    <v-layout justify-center>
      <v-flex xs12 sm10 md6>
        <v-card v-if="!loading" class="mx-auto">
          <v-card-title primary-title>{{user.name}}</v-card-title>
          <v-card-text>
            <p>Joined on {{ user.createdAt|formatDateTime }}</p>
          </v-card-text>
        </v-card>
        <div v-else>Loading...</div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import moment from "moment";
export default {
  middleware: "auth",
  data() {
    return {
      user: null,
      loading: true
    };
  },
  filters: {
    formatDateTime(value) {
      return moment(value).format("LLL");
    }
  },
  methods: {
    async getUser(id) {
      try {
        const res = await this.$axios.get(`/api/users/${id}`);
        this.user = await res.data.user;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    this.getUser(id);
  }
};
</script>

<style>
</style>
