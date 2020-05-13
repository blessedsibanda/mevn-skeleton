<template>
  <div class="mx-2">
    <v-layout justify-center>
      <v-flex xs12 sm10 md6>
        <v-alert dense v-if="error" type="error" :value="true">{{error}}</v-alert>
        <v-form>
          <v-text-field
            label="Name"
            :counter="40"
            v-model="name"
            required
            :error-messages="nameErrors"
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
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
          <v-text-field
            label="Confirm Password"
            v-model="password2"
            type="password"
            required
            :error-messages="password2Errors"
            @input="$v.password2.$touch()"
            @blur="$v.password2.$touch()"
          ></v-text-field>
          <v-checkbox
            v-model="agree"
            label="Agree to terms and conditions?"
            required
            :error-messages="agreeErrors"
            @change="$v.agree.$touch()"
            @blur="$v.agree.$touch()"
            class="mb-2"
          ></v-checkbox>
          <v-btn :disabled="$v.$invalid" color="primary mr-2" @click="submit">Submit</v-btn>
          <v-btn @click="clear" color="error">Cancel</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  email,
  minLength,
  sameAs
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(40) },
    email: { required, email },
    password: { required, minLength: minLength(6) },
    password2: { required, sameAs: sameAs("password") },
    agree: {
      checked(val) {
        return val;
      }
    }
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password2: "",
      agree: true,
      error: null
    };
  },
  computed: {
    agreeErrors() {
      const errors = [];
      if (!this.$v.agree.$dirty) return errors;
      !this.$v.agree.checked && errors.push("You must agree to continue!");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 40 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
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
      !this.$v.password.minLength &&
        errors.push("Password must be at least 6 characters long");
      !this.$v.password.required && errors.push("Must be valid e-mail");
      return errors;
    },
    password2Errors() {
      const errors = [];
      if (!this.$v.password2.$dirty) return errors;
      !this.$v.password2.required &&
        errors.push("Confirm password is required");
      !this.$v.password2.sameAs && errors.push("Passwords must match");
      return errors;
    }
  },
  methods: {
    async submit() {
      return this.$axios
        .post("/api/auth/signup", {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push("/auth/signin");
        })
        .catch(e => {
          console.log(e);
          this.error = e.response.data.message;
        });
    },
    clear() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.password2 = "";
      this.agree = true;
    }
  }
};
</script>

<style>
</style>
