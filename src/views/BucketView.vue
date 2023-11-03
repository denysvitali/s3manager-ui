<script setup lang="ts">
import router from '@/router';
import type { ListEntry } from '@/types/types';
import { onMounted, ref, watch, type Ref } from 'vue';

let bucket : Ref<string | null> = ref(null);
let tableData: Ref<Array<ListEntry>|null> = ref(null);
let currentDir = ref('');

const endpoint = window._config.endpoint;


const fetchTableData = async () => {
    bucket.value = router.currentRoute.value.params.bucket as string;
    currentDir.value = router.currentRoute.value.params.path as (undefined | string) || '';
    const res = await fetch(`${endpoint}/api/buckets/${bucket.value}/list/${currentDir.value}`);
    tableData.value = (await res.json() as Array<ListEntry>).map((e)=>{
        return {
            ...e,
            icon: e.isDir ? 'el-icon-folder' : 'el-icon-document',
        };
    });
};

const cellClick = (row: ListEntry, column: any, cell: any, event: Event) => {
    let path = '';
    if(currentDir.value == ''){
        path = row.name;
    } else {
        path = currentDir.value + '/' + row.name;
    }
    if (row.isDir) {
        router.push(`/buckets/${bucket.value}/${path}`);
    } else {
        // Download file directly.
        let downloadPath = `${endpoint}/api/buckets/${bucket.value}/objects/${path}`;
        window.open(downloadPath, '_blank');
    }
};

const formatFileSize = (bytes: number) => {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;

  while (bytes >= 1024 && i < sizes.length - 1) {
    bytes /= 1024;
    i++;
  }

  return bytes.toFixed(2) + ' ' + sizes[i];
}

const formatter = (row: any, column: any, cellValue: any, index: number) => {
    switch(column.property){
        case 'name':
            return row.name;
        case 'size':
            if(row.isDir){
                return '';
            }
            return formatFileSize(cellValue);
        case 'lastModified':
            if (cellValue == null) {
                return '';
            }
            return new Date(cellValue).toLocaleString();
        default:
            return cellValue;
    }
};

watch(
  () => router.currentRoute.value.params, 
  ( prev, current ) => {
    tableData.value = null;
    fetchTableData();
  }
);

onMounted(() => {
    fetchTableData();
});

// Reload the table data when the route changes.

</script>

<template>
    <div class="content">
        <el-table
            :data="tableData"
            :default-sort="{ prop: 'name', order: 'ascending' }"
            style="width: 100%"
            v-if="tableData != null"
            @cell-click="cellClick"
        >
            <el-table-column width="50">
                <template #default="scope">
                    <div v-if="scope.row.isDir">
                        <el-icon><Folder /></el-icon>
                    </div>
                    <div v-else>
                        <el-icon><Document /></el-icon>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="Name" sortable/>
            <el-table-column prop="lastModified" label="Last Modified" sortable :formatter="formatter" align="right"/>
            <el-table-column prop="size" label="Size" sortable :formatter="formatter" align="right"/>
        </el-table>

        <el-skeleton v-else :rows="10" />
    </div>
</template>

<script lang="ts">

</script>

<style lang="scss" scoped>
</style>