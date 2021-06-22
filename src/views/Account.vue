<template>
  <section class="section">
    <div v-if="user">
      <div class="container has-text-centered content">
        <p class="title">Welcome to your account {{ user.displayName }}</p>
      </div>
      <div class="container">
        <div class="tile is-ancestor">
          <div class="tile is-parent"></div>
        </div>

        <div class="tile is-ancestor">
          <div class="tile is-vertical">
            <div class="tile">
              <div class="tile is-parent">
                <article class="tile is-child notification">
                  <p class="title">Profile Details</p>
                  <p>Coming soon ;)</p>
                </article>
              </div>
              <div class="tile is-parent is-vertical">
                <article class="tile is-child notification">
                  <p class="title">Account Controls</p>
                  <button class="button is-link" @click="signOut">
                    Sign Out
                  </button>
                </article>
                <article class="tile is-child notification">
                  <p class="title">Your Notifications</p>
                  <VerifyEmail v-if="user && !user.emailVerified" />
                  <p v-else>You don't have any notifications</p>
                </article>
              </div>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child notification is-danger">
                <h1 class="subtitle">Danger Zone</h1>
                <button
                  class="button is-danger is-light"
                  @click="deleteAccount"
                >
                  Delete Account
                </button>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Login v-else />
  </section>
</template>

<script>
import fb from "@/firebase";
import Login from "@/components/Login.vue";
import VerifyEmail from "@/components/VerifyEmail.vue";

export default {
  components: {
    Login,
    VerifyEmail,
  },
  data() {
    return {
      user: false,
    };
  },
  async created() {
    const user = fb.auth().currentUser;

    this.user = user;
    console.log("User:", this.user);

    fb.auth().onAuthStateChanged((user) => {
      console.log("Auth state changed:");
      if (user === null) {
        this.user = false;
      } else {
        this.user = user;
      }
    });
  },
  methods: {
    async signOut() {
      try {
        await fb.auth().signOut();
        console.log("Signed out");
      } catch (e) {
        console.log("An error happened when trying to sign out", e);
        alert(e.message);
      }
    },
    async deleteAccount() {
      if (
        confirm("Are you sure you want to delete your account? This action is irreversible")
      ) {
        try {
          await fb.auth().currentUser.delete()
        } catch(e) {
          alert(`Error deleting your account: ${e.message}`)
        }
      }
    },
  },
};
</script>