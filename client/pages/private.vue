<template>
  <v-layout>
    <v-flex class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <h1>This is a private route for authenticated users only</h1>
      <h4>
        <strong>Name:</strong>
        {{ $auth.user.name}}
      </h4>
      <h4>
        <strong>Email:</strong>
        {{ $auth.user.email}}
      </h4>
      <h4>
        <strong>Joined:</strong>
        {{ $auth.user.createdAt | formatDateTime}}
      </h4>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from "moment";
export default {
  middleware: "auth",
  filters: {
    formatDateTime(value) {
      return moment(value).fromNow();
    }
  }
};
</script>
