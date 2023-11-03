<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import type { Bucket } from '@/types/types';
import router from '@/router';

let buckets: Ref<Array<Bucket> | null> = ref(null);
const fetchBuckets = async () => {
  const res = await fetch(`${window._config.endpoint}/api/buckets`);
  buckets.value = await res.json();
};

const visitBucket = (name: string) => {
  router.push(`/buckets/${name}`);
};

onMounted(() => {
  fetchBuckets();
});

</script>

<template>
  <main>
    <h3>Buckets</h3>
    <div v-if="buckets == null">
      <el-skeleton :rows="3" />
    </div>
    <div v-else>
      <div class="grid-content bg-purple-dark">
        <el-row :gutter="20" v-for="bucket in buckets" :key="bucket.name">
          <el-card shadow="hover" class="bucket-card" @click="visitBucket(bucket.name)">
            <div slot="header" class="clearfix">
              <span class="bucket-name">{{ bucket.name }}</span>
            </div>
            <div>
              <p>Created: {{ new Date(bucket.creationDate).toLocaleString() }}</p>
            </div>
          </el-card>
        </el-row>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.bucket-card {
  cursor: pointer;
  width: 100%;
  height: 100%;

  .bucket-name {
    font-weight: bold;
  }
}
</style>
