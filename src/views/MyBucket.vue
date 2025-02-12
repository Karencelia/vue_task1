<script setup>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const router = useRouter();
const bucketList = ref([]);
const expandItems = ref({});

const fetchAndSaveBucketList = async () => {
  try {
    const response = await fetch('/bucketList.json');
    const data = await response.json();

    // Save to localStorage
    localStorage.setItem('bucketList', JSON.stringify(data.bucketList));

    // Update reactive bucketList
    bucketList.value = data.bucketList;

    // Initialize expandItems state
    bucketList.value.forEach(item => {
      expandItems.value[item.id] = false;
    });

    console.log('Bucket list loaded and saved to localStorage.');
  } catch (error) {
    console.error('Error fetching bucket list:', error);
  }
};

onMounted(() => {
  const storedData = localStorage.getItem('bucketList');

  if (storedData) {
    // Load from localStorage
    bucketList.value = JSON.parse(storedData);
    console.log('Bucket list loaded from localStorage:', bucketList.value);
  } else {
    // Fetch and save if not in localStorage
    fetchAndSaveBucketList();
  }
});

// const toggleDescription = (id) => {
//   expandItems.value[id] = !expandItems.value[id];
// };

const getDescription = (details, id) => {
  return expandItems.value[id] ? details : details.substring(0, 534) + '...';
};
</script>

<template>
  <div class="px-24 py-10">
    <div class="flex justify-between">
      <div>
        <h1 class="text-[25px] text-left mt-[10px] mb-1 buckettext">Welcome John Doe,</h1>
        <p class="text-[10px] mb-6">Here are items in your eventful moment bucket.</p>
      </div>
      <div>
        <button 
          @click="router.push('/addlist')"
          class="w-40 h-10 py-2 mb-10 bg-blue-500 mt-6 text-white text-[12px] rounded-md hover:bg-blue-600 border border-[#707070]">
          Add Item
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-lg">
      <div class="shadow-lg rounded-md p-6 hover:bg-[#FFF5A7]" v-for="item in bucketList" :key="item.id">
        <h3 class="text-700 text-[14px] buckettext">{{ item.topic }}</h3>

        <p class="mt-6 text-[12px] opacity-100 leading-5">
          {{ getDescription(item.details, item.id) }}
        </p>

        <div class="flex justify-between text-[12px] mt-4">
          <button @click="router.push(`/mybucket/${String(item.id)}`)">
            View Details
          </button>
          <div class="flex gap-8">
            <p class="text-[#B2B2B2]">{{ item.startdate }}</p>
            <p>{{ item.enddate }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex justify-center">
    <button
      type="submit"
      class="w-40 h-10 py-2 mb-10 bg-blue-500 mt-6 text-white text-[12px] rounded-md hover:bg-blue-600 border border-[#707070]">
      Load More
    </button>
  </div>
</template>
