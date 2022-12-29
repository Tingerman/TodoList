<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">标题</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="tutorial.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">详情</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="tutorial.description"
          name="description"
        />
      </div>

      <div class="button_row">
        <button @click="saveTutorial" class="btn btn-success">提交</button>
      </div>
    </div>
    <div v-else>
      <div class="success_prompt">
        <h4>提交成功!</h4>
      </div>
      <div class="button_row">
        <button class="btn btn-success" @click="newTutorial">继续添加</button>
      </div>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveTutorial() {
      var data = {
        title: this.tutorial.title,
        description: this.tutorial.description
      };

      TutorialDataService.create(data)
        .then(response => {
          this.tutorial.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newTutorial() {
      this.submitted = false;
      this.tutorial = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 350px;
  margin: auto;
}
label{
  font-family: 'Times New Roman', Times, serif;
  letter-spacing: 1px;
  color: #3c2a21;
}
h4 {
  font-family: 'Times New Roman', Times, serif;
  letter-spacing: 1px;
  color: #3c2a21;
}
.btn {
  font-family: 'Times New Roman', Times, serif;
  letter-spacing: 1px;
}
.btn-success {
  background-color: #FAC213;
  margin-top: 0px;
  border: 0px;
  box-shadow: 1px 1px lightgray;
}
.button_row{
  display: flex;
  justify-content: center;
}
.form-group{
  width: 350px;
}
.success_prompt{
  margin-bottom: 50px;
}
</style>
