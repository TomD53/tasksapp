<template>
  <div class="notification is-warning">
    <p class="subtitle">Your email is not verified</p>
    <button
      :class="['button', loading ? 'is-loading' : '']"
      @click="verifyEmail"
      v-if="!email_sent"
    >
      Send verification email
    </button>
    <p class="help is-info" v-if="info">
      {{ info }}
    </p>
  </div>
</template>

<script>
import fb from "@/firebase";

export default {
  data() {
    return {
      info: "",
      loading: false,
      email_sent: false,
    };
  },
  methods: {
    async verifyEmail() {
      this.loading = true
      try {
        await fb.auth().currentUser.sendEmailVerification();
        console.log("Sent verification email");
        this.info = `Sent verification email to ${fb.auth().currentUser.email}`
        this.email_sent = true
      } catch (e) {
        this.info = `Failed send verification email to ${fb.auth().currentUser.email}: ${e.message}`
        console.log(e)
      } finally {
        this.loading = false
      }
    },
  },
};
</script>