<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute();
const item = ref(null);
const bucketList = ref([]);

onMounted(() => {
  bucketList.value = JSON.parse(localStorage.getItem("bucketList")) || [];
  item.value = bucketList.value.find(i => String(i.id) === route.params.id);
});
</script>

<template>
    <div v-if="item" class="flex flex-col justify-start px-10 pt-[20px] mb-2">
      <h3 class="font-bold text-[20px]">{{ item.topic }}</h3>
      <div>
        <p>{{ item.enddate }}</p>
      </div>
      <p>{{ item.details }}</p>
      <div class="flex gap-4">
        <div>
          <button class="w-40 h-10 py-2 bg-[#60CED4] text-white text-[12px] rounded-md hover:bg-[#60CED4]">
                    Edit
                </button>
        </div>
        <div>
          <button class="w-40 h-10 py-2 bg-red-500 text-white text-[12px] rounded-md hover:bg-red-600">
                    Delete
                </button>
        </div>
      </div>
    </div>
    <div v-else class="pt-[20px] pl-[20px]">
      <p>Item not found</p>
    </div>
  </template>
  
