<template>
  <div class="mx-2">
    <v-layout justify-center>
      <v-flex xs12 sm10 md6>
        <v-alert v-if="error" type="error" :value="true">{{error}}</v-alert>
        <v-form>
          <v-text-field
            label="Email"
            v-model="email"
            required
            :error-messages="emailErrors"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
            required
            :error-messages="passwordErrors"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>

          <v-btn :disabled="$v.$invalid" color="primary mr-2" @click="submit">Submit</v-btn>
          <v-btn @click="clear" color="error">Cancel</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required }
  },
  data() {
    return {
      email: "",
      password: "",
      error: null
    };
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    }
  },
  methods: {
    async submit() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: { email: this.email, password: this.password }
        });
        this.$router.push("/");
      } catch (err) {
        this.error = err.response.data.message;
      }
    },
    clear() {
      this.email = "";
      this.password = "";
    }
  }
};
</script>

<style>
</style>
