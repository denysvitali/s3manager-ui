<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import router from './router';
import { computed } from 'vue';

const path = computed(()=>{
  return router.currentRoute.value.path.split('/').slice(1)
});

</script>

<template>
  <header>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">
        home
      </el-breadcrumb-item>
      
      <el-breadcrumb-item :to="{ path: '/' + path.slice(0,idx+1).join('/') }" v-for="idx in path.keys()">
        {{ path[idx] }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </header>

  <RouterView />
</template>

<script lang="ts">

</script>

<style lang="scss" scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  overflow: hidden;

  div.wrapper {
    nav {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }
  margin-bottom: 20px;
}
</style>
