<template>
  <section class="section">
    <div class="container has-text-centered">
      <h1 class="title">Tasks App</h1>
    </div>
    <div class="container">
      <hr />
      <VerifyEmail v-if="user && !user.emailVerified" />
      <div v-if="tasks && user">
        <div v-for="[id, task] of Object.entries(tasks)" :key="task.name">
          <Task
            :name="task.name"
            :description="task.description"
            :active="task.active"
            :id="id"
            :preview="false"
          />
        </div>
        <p class="help is-info">
          Double click tasks to change their active status
        </p>
      </div>
      <div v-else-if="!user">
        <Login />
      </div>
      <div v-else>
        <p class="title">No tasks ;(</p>
        <p>... add one below!</p>
      </div>
    </div>
  </section>
  <section class="section" v-if="user">
    <div class="container">
      <NewTask />
    </div>
  </section>
</template>

<script>
import fb from "@/firebase";
import Task from "@/components/Task.vue";
import NewTask from "@/components/NewTask.vue";
import Login from "@/components/Login.vue";
import VerifyEmail from "@/components/VerifyEmail.vue";

export default {
  name: "Home",
  components: {
    Task,
    NewTask,
    Login,
    VerifyEmail,
  },
  data() {
    return {
      tasks: [],
      user: false,
    };
  },
  async created() {
    const user = fb.auth().currentUser;

    if (user === null) {
      this.user = false;
    } else {
      this.user = user;
    }
    console.log("User:", this.user);

    fb.auth().onAuthStateChanged((user) => {
      console.log("Auth state changed:");
      if (user === null) {
        this.user = false;
      } else {
        this.user = user;
        this.loadTasks()
      }
    });
  },
  methods: {
    async loadTasks() {
      const database = fb.database();
      const tasks_ref = database.ref();

      tasks_ref
        .child("tasks")
        .child(this.user.uid)
        .on("value", (snapshot) => {
          var tasks = snapshot.val();
          console.log(tasks);
          this.tasks = tasks;
        });

      try {
        var snapshot = await tasks_ref
          .child("tasks")
          .child(this.user.uid)
          .once("value");
        var tasks = snapshot.val();

        this.tasks = tasks;
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style scoped>
.help {
  margin: 10px;
}
</style>
