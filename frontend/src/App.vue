<template>
  <div id="app">
    <nav class="navbar navbar-expand topbar">
      <!-- <router-link to="/" class="navbar-brand">bezKoder</router-link> -->
      <div class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/tutorials" class="daiban nav-link" @click="selectdaiban">待办</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link" @click="selecttianjia">添加</router-link>
        </li>
      </div>
    </nav>

    <div class="container_index">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data () {
    return {
      daibanSelected: false,
      tianjiaSelected: false
    }
  },
  methods: {
    selectdaiban(){
      this.daibanSelected = !this.daibanSelected;
      console.log(this.daibanSelected)
    },
    selecttianjia(){
      this.tianjiaSelected = !this.tianjiaSelected;
    },
  }
};
</script>

<style scoped>
  .topbar{
    background-color: #FADB5F;
  }
  .nav-item{
    color: white;
    margin-left: 10px;
    margin-right: 10px;
  }
  .container_index{
    background-color: #F7F2E7;
    width: 100%;
    height: 100%;
    min-height: 1000px;
    padding-top: 50px;
  }
  .navbar-expand {
    flex-wrap: nowrap;
    justify-content: center;
  }
  .nav-link{
    color: #fff;
    font-family: 'Times New Roman', Times, serif;
    font-size: large;
  }
  .router-link-active {
    /* color: #3c2a21; */
    color: #f39000;
    font-weight: 800;
    /* -webkit-text-stroke: 0.6px #CC5600; */
  }
</style>
