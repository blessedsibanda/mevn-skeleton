<template>
  <v-layout>
    <v-flex class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <h1>This is a private route for authenticated users only</h1>
      <h4>{{ $auth.user.name}}</h4>
      <h4>{{ $auth.user.email}}</h4>
      <h4>{{ $auth.user.createdAt}}</h4>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  middleware: "auth"
};
</script>
