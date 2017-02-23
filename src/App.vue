<template>
  <div id="app">
    <section>
      <v-header :seller="seller"></v-header>
    </section>
    <section>
     <div class="tab">
       <div class="tabItem">
         <router-link to="/good">商品</router-link>
       </div>
       <div class="tabItem">
         <router-link to="/ratings">评论</router-link>
       </div>
       <div class="tabItem">
         <router-link to="/seller">商家</router-link>
       </div>
     </div>
   </section>
   <section>
    <router-view></router-view>
  </section>
</div>
</template>

<script>
  import header from './components/header/header';

  export default {
    components: { 'v-header': header },
    data: function () {
      return {
        seller: {}
      };
    },
    mounted: function () {
      this.$nextTick(function () {
        this.axios.get('/api/seller')
        .then(res => {
          if (res.data.errno === 0) {
            this.seller = res.data.data;
          }
        })
        .catch(function () {
          console.log('axios error...');
        });
      });
    }
  };

</script>

<style>
/*  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }*/
  #app .tab{
    display:flex;
    width:100%;
    height: 40px;
    line-height: 40px;
    border-bottom: solid 1px rgba(7,17,27,0.1);
  }
  #app .tab .tabItem{
    flex:1;
    text-align: center;
  }

  #app .tab .tabItem a{
    display:block;
    font-size: 14px;
    color:rgb(77,85,93);
  }
  #app .tab .tabItem a.active{
    color:rgb(240,20,20);
  }
</style>
