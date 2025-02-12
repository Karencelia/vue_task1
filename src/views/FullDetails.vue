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
  <div v-if="item" class="flex flex-col justify-start px-4 sm:px-6 md:px-10 pt-5">
    <div class="mb-6 sm:mb-8">
      <h3 class="font-bold text-lg sm:text-xl md:text-2xl mb-2">{{ item.topic }}</h3>
      <p class="text-gray-500 text-sm sm:text-base">{{ item.enddate }}</p>
    </div>

    <p class="text-base sm:text-lg md:text-[14px] leading-6 sm:leading-7" v-html="item.details"></p>

    <div class="flex flex-col sm:flex-row gap-4 mt-10">
      <button class="w-full sm:w-40 h-10 py-2 bg-[#60CED4] text-white text-sm rounded-md hover:bg-[#50B6BE] transition">
        Edit
      </button>
      <button class="w-full sm:w-40 h-10 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition">
        Delete
      </button>
    </div>
  </div>

  <div v-else class="pt-5 px-4">
    <p class="text-gray-600">Item not found</p>
  </div>
</template>
