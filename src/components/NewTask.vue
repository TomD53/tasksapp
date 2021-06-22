<template>
  <div class="new-task">
    <h1 class="subtitle">Add New Task</h1>
    <Task
      :name="name"
      :description="description"
      :active="active"
      :preview="true"
    />
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input
          type="text"
          class="input"
          placeholder="task name"
          v-model="name"
          @keydown.enter="addTask"
          id="nameInput"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <textarea
          class="textarea"
          placeholder="task description"
          v-model="description"
          @keydown.enter="addTask"
        ></textarea>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" v-model="active" />
          Active
        </label>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button class="button is-link" @click="addTask" :disabled="!formFilled">
          Add Task
        </button>
      </div>
    </div>
    <p class="help is-info" v-if="formFilled">Press enter whilst in the form to submit</p>
  </div>
</template>

<script>
import Task from "@/components/Task.vue";
import fb from "@/firebase";

export default {
  name: "NewTask",
  components: {
    Task,
  },
  computed: {
    formFilled() {
      return this.name && this.description;
    },
  },
  data() {
    return {
      name: "",
      description: "",
      active: true,
      db: false,
    };
  },
  methods: {
    async addTask() {
      if (!this.formFilled) {
        return false;
      }

      const uid = fb.auth().currentUser.uid;
      const db = fb.database();
      const tasks_ref = db.ref();
      var newTaskKey = tasks_ref.child("tasks").push().key;
      try {
        await tasks_ref.child(`/tasks/${uid}/${newTaskKey}`).update({
          name: this.name,
          description: this.description,
          active: this.active,
        });
        this.name = "";
        this.description = "";
        this.active = true;
        const input = document.getElementById("nameInput");
        input.focus();
        input.select();
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>


<style scoped>
.new-task {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
}
</style>