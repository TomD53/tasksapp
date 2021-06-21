<template>
  <section class="section">
    <div class="container has-text-centered">
      <h1 class="title">Tasks App</h1>
    </div>
    <div class="container">
      <hr>
      <div v-if="tasks">
        <div v-for="[id, task] of Object.entries(tasks)" :key="task.name">
          <Task
            :name="task.name"
            :description="task.description"
            :active="task.active"
            :id="id"
            :preview="false"
          />
        </div>
      </div>
      <div v-else>
        <p class="title">No tasks ;(</p>
        <p>... add one below!</p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <NewTask />
    </div>
  </section>
</template>

<script>
import fb from "@/firebase";
import Task from "@/components/Task.vue";
import NewTask from "@/components/NewTask.vue";

export default {
  name: "Home",
  components: {
    Task,
    NewTask,
  },
  data() {
    return {
      tasks: [],
    };
  },
  async created() {
    const database = fb.database();
    const tasks_ref = database.ref();

    tasks_ref.child("tasks").on("value", (snapshot) => {
      var tasks = snapshot.val();
      console.log(tasks);
      this.tasks = tasks;
    });

    try {
      var snapshot = await tasks_ref.child("tasks").once("value");
      var tasks = snapshot.val();

      this.tasks = tasks;
    } catch (e) {
      console.error(e);
    }
  },
};
</script>
