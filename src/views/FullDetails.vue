<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute();
const item = ref(null);
const bucketList = ref([]);

onMounted(() => {
  // Load the bucket list from localStorage
  bucketList.value = JSON.parse(localStorage.getItem("bucketList")) || [];

  // Find the item by matching the ID (ensure ID is treated as a string)
  item.value = bucketList.value.find(i => String(i.id) === route.params.id);
});
</script>

<template>
    <div v-if="item" class="flex flex-col justify-start pl-0 pt-[20px] mb-2">
      <h3 class="font-bold text-[20px]">{{ item.topic }}</h3>
      <div>
        <p>{{ item.enddate }}</p>
      </div>
      <p>{{ item.details }}</p>
    </div>
    <div v-else class="pt-[20px] pl-[20px]">
      <p>Item not found</p>
    </div>
  </template>
  
