<template>
  <div v-if="name && description" :style="active ? 'border-left: 5px solid rgba(0,255,0, 0.5)' : 'border-left: 5px solid rgba(255,0,0, 0.5)'">
    <span class="subtitle">{{ name }}</span>
    <span class="icon right clickable" @click="deleteTask">
      <i class="fas fa-times has-text-danger"></i>
    </span>
    <p>{{ description }}</p>
  </div>
</template>

<script>
import fb from "@/firebase";

export default {
  props: {
    name: String,
    description: String,
    id: String,
    active: Boolean,
    preview: Boolean
  },
  methods: {
    async deleteTask() {
      const db = fb.database();
      const tasks_ref = db.ref();
      try {
        await tasks_ref.child("tasks/" + this.id).remove();
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>


<style scoped>
div {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
}

.right {
  float: right;
}

.clickable {
  cursor: pointer;
}
</style>