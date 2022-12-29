<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="搜索待办事项..."
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            <svg t="1672148877799" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3033" width="18" height="22"><path d="M474.453333 884.053333c-225.28 0-409.6-184.32-409.6-409.6s184.32-409.6 409.6-409.6 409.6 184.32 409.6 409.6-184.32 409.6-409.6 409.6z m0-68.266666c187.733333 0 341.333333-153.6 341.333334-341.333334s-153.6-341.333333-341.333334-341.333333-341.333333 153.6-341.333333 341.333333 153.6 341.333333 341.333333 341.333334z m252.586667 54.613333c-13.653333-13.653333-10.24-37.546667 3.413333-47.786667s37.546667-10.24 47.786667 3.413334l64.853333 78.506666c13.653333 13.653333 10.24 37.546667-3.413333 47.786667s-37.546667 10.24-47.786667-3.413333l-64.853333-78.506667z" fill="#ffffff" p-id="3034"></path></svg>
            <!-- <span class="glyphicon glyphicon-search" aria-hidden="true"></span> -->
          </button>
        </div>
      </div>
    </div>
    <div class="list_content">
    <div class="col-md-6">
      <h4 class="big_title">待办事项</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in tutorials"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.title }}
        </li>
      </ul>
    </div>
    <div class="col-md-6" style="margin-left:30px;">
      <div v-if="currentTutorial">
        <h4 class="second_title" style="visibility: hidden;"> {{ currentTutorial.title }}</h4>
        <div class="text_content">
          <label><strong>详情: </strong></label> {{ currentTutorial.description }}
        </div>
        <div class="text_content text_status">
          <label><strong>状态: </strong></label> {{ currentTutorial.published ? "已完成" : "待完成" }}
        </div>
        <div class="badge_row">
          <router-link :to="'/tutorials/' + currentTutorial.id" class="badge">编辑</router-link>
        </div>
      </div>
      <div v-else class="prompt_div">
        <br />
        <p class="prompt">点击待办事项查看详情...</p>
      </div>
    </div>
  </div>
  <div class="button_row">
    <button class="m-3 btn btn-sm btn-danger removebutton" @click="removeAllTutorials">
      一键清除
    </button>
  </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "tutorials-list",
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveTutorials() {
      TutorialDataService.getAll()
        .then(response => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = index;
    },

    removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      TutorialDataService.findByTitle(this.title)
        .then(response => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveTutorials();
  }
};
</script>

<style type="scss">
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.list-group{
  /* --bs-list-group-active-bg: #faeab1; */
  --bs-list-group-active-bg: #FAC213;
}
.list-group-item {
  font-family: 'Times New Roman', Times, serif;
  color:#3c2a21;
}
.list-group-item.active {
  border: var(--bs-list-group-border-width) solid
}
.list_content{
  padding-top: 15px;
  display: flex;
  justify-content: space-around;
  padding-left: 25px;
  /* margin-bottom: 5px; */
}
.col-md-8{
  width: 100%;
}
.btn-outline-secondary{
  margin-left: 10px;
}
.big_title{
  font-family: 'Times New Roman', Times, serif;
  color: #CC5600;
  margin-bottom: 10px;
}
.second_title{
  font-family: 'Times New Roman', Times, serif;
  color: #f39000;
}
.button_row{
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
.removebutton{
  width: 100px;
  font-family: 'Times New Roman', Times, serif;
  /* background-color: #d6143e; */
  /* background-color: #f39000;
  border-color: #f39000; */
  background-color: #d6143e;
  border-color: #d6143e;
  letter-spacing: 1px;
  font-weight: 600;
}
.btn-danger{
  --bs-btn-hover-bg: #f39000;
  --bs-btn-hover-border-color:#f39000;
}
.prompt{
  font-family: 'Times New Roman', Times, serif;
  color:rgb(206, 203, 190);
  /* color:#f39000; */
}
.prompt_div{
  padding-top: 15px;
  letter-spacing: 1px;
}
.input-group .btn {
  font-family: 'Times New Roman', Times, serif;
  /* background-color:#ff9494; */
  background-color:#FAC213;
  border: 2px;
  border-color: white;
  margin-left: 20px;
  color: white;
  font-size:1px;
}
.text_content {
  color: #3c2a21;
  font-family: 'Times New Roman', Times, serif;
  font-size: 20px;
  text-decoration:underline;
}
.text_content label{
  /* font-size: 16px; */
  margin-right: 10px;
  text-decoration:none;
}
.text_status{
  text-decoration:none;
}
.form-control {
  font-family: 'Times New Roman', Times, serif;
  letter-spacing: 1px;
}
.badge {
  font-size: 16px;
  font-family: 'Times New Roman', Times, serif;
  margin-left: -5px;
  color:#CC5600;
  font-weight: 400;
}
.badge_row{
  display: flex;
  justify-content: left;
  margin-top: 10px;
}
button{
  box-shadow: 1px 1px lightgray;
}
.form-group{
  margin-top: 10px;
}
a{
  text-decoration:none;
}
</style>
