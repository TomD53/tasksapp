<template>
  <div class="box container">
    <h1 class="title">{{ new_account ? "Create New Account" : "Log In" }}</h1>
    <div class="field" v-if="new_account">
      <label class="label">Display Name</label>
      <div class="control has-icons-left">
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
        <input type="text" class="input" placeholder="your name" v-model="display_name" />
      </div>
    </div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left has-icons-right">
        <input
          type="text"
          :class="[
            'input',
            !emailValid && email ? 'is-danger' : '',
            emailValid ? 'is-success' : '',
          ]"
          placeholder="email"
          v-model="email"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i
            :class="[
              'fas',
              email
                ? !emailValid && email
                  ? 'fa-exclamation-triangle'
                  : 'fa-check'
                : '',
            ]"
          ></i>
        </span>
      </div>
      <p class="help is-danger" v-if="!emailValid && email">
        This email is invalid
      </p>
    </div>
    <label class="label">Password</label>
    <div class="field is-grouped">
      <div class="control is-expanded has-icons-left">
        <input
          type="password"
          class="input"
          placeholder="password"
          v-model="password"
          @keydown.enter="login"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-key"></i>
        </span>
      </div>
      <div class="control">
        <button
          :class="['button is-link', loading ? 'is-loading' : '']"
          :disabled="!(email && password) || !emailValid || (!display_name && new_account)"
          @click="() => {
            if (new_account) {
              createAccount()
            } else {
              login()
            }
          }"
        >
          {{ new_account ? "Create Account" : "Log In" }}
        </button>
      </div>
    </div>
    <p class="help is-danger" v-if="error">
      {{ error }}
    </p>
    <p v-if="!new_account">
      Don't have an account already?
      <a @click="toggleNewAccount">Create New Account</a>
    </p>
    <p v-else>
      Already have an account? <a @click="toggleNewAccount">Log in</a>
    </p>
  </div>
</template>

<script>
import fb from "@/firebase";

export default {
  computed: {
    emailValid() {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.email);
    },
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
      loading: false,
      new_account: false,
      display_name: ""
    };
  },
  methods: {
    toggleNewAccount() {
      this.new_account = !this.new_account;
    },
    async login() {
      if (!(this.email && this.password) || !this.emailValid) {
        return;
      }
      this.loading = true;
      try {
        var user = await fb
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        console.log(user);
        this.loading = false;
      } catch (e) {
        console.log(e);
        this.error = e.message;
        this.loading = false;
      }
    },
    async createAccount() {
      if (!(this.email && this.password) || !this.emailValid || (!this.display_name && this.new_account)) {
        return
      }
      this.loading = true
      try {
        await fb.auth().createUserWithEmailAndPassword(this.email, this.password)
        const user = fb.auth().currentUser;
        await user.updateProfile({
          displayName: this.display_name
        });
        console.log("Successfully created and updated new user account")
      } catch(e) {
        console.log(e);
        this.error = e.message
      } finally {
        this.loading = false
      }
    }
  },
};
</script>