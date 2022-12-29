<template>
  <div v-if="currentTutorial" class="edit-form">
    <h4 style="color:#CC5600;margin-bottom: 20px;">待办事项</h4>
    <form>
      <div class="form-group">
        <label for="title">标题</label>
        <input type="text" class="form-control" id="title"
          v-model="currentTutorial.title"
        />
      </div>
      <div class="form-group">
        <label for="description">详情</label>
        <input type="text" class="form-control" id="description"
          v-model="currentTutorial.description"
        />
      </div>

      <div class="form-group">
        <label><strong>状态: </strong></label>
        {{ currentTutorial.published ? "已完成" : "待完成" }}
      </div>
    </form>
    <div class="badge_group">
      <button class="badge badge-primary mr-2"
        v-if="currentTutorial.published"
        @click="updatePublished(false)"
      >
        待完成
      </button>
      <button v-else class="badge badge-primary mr-2"
        @click="updatePublished(true)"
      >
        已完成
      </button>

      <button class="badge badge-danger mr-2"
        @click="deleteTutorial"
      >
        删除
      </button>

      <button type="submit" class="badge badge-success"
        @click="updateTutorial"
      >
        更新
      </button>
      <p>{{ message }}</p>
    </div>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "tutorial",
  data() {
    return {
      currentTutorial: null,
      message: ''
    };
  },
  methods: {
    getTutorial(id) {
      TutorialDataService.get(id)
        .then(response => {
          this.currentTutorial = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentTutorial.id,
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
        published: status
      };

      TutorialDataService.update(this.currentTutorial.id, data)
        .then(response => {
          this.currentTutorial.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateTutorial() {
      TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
        .then(response => {
          console.log(response.data);
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteTutorial() {
      TutorialDataService.delete(this.currentTutorial.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "tutorials" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getTutorial(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
.form-group{
  margin-bottom: 20px;
  margin-top: 5px;
  color:#3c2a21;
  font-family: 'Times New Roman', Times, serif;
}
.badge_group{
  display: flex;
  justify-content: center;
}
.badge{
  margin-left:5px;
  margin-right:5px;
  border-width: 0px;
  background-color: #FAC213;
  color:white;
}
</style>
