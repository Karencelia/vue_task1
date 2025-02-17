<script setup>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const router = useRouter();
const bucketList = ref([]);
const expandItems = ref({});
const fullName = ref("Guest"); // Default to "Guest" if no user is logged in

const fetchAndSaveBucketList = async () => {
  try {
    const response = await fetch('/bucketList.json');
    const data = await response.json();

    localStorage.setItem('bucketList', JSON.stringify(data.bucketList));

    bucketList.value = data.bucketList;

    bucketList.value.forEach(item => {
      expandItems.value[item.id] = false;
    });

    console.log('Bucket list loaded and saved to localStorage.');
  } catch (error) {
    console.error('Error fetching bucket list:', error);
  }
};

onMounted(() => {
  // Retrieve logged-in user details
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  if (loggedInUser) {
    fullName.value = loggedInUser.fullName; // Set the name of the logged-in user
  }

  const storedData = localStorage.getItem('bucketList');

  if (storedData) {
    bucketList.value = JSON.parse(storedData);
    console.log('Bucket list loaded from localStorage:', bucketList.value);
  } else {
    fetchAndSaveBucketList();
  }
});

const getDescription = (details, id) => {
  return expandItems.value[id] ? details : details.substring(0, 534) + '...';
};
</script>

<template>
  <div class="px-6 md:px-12 lg:px-24 py-10">
    <div class="flex flex-col md:flex-row md:justify-between items-start md:items-center">
      <div>
        <h1 class="text-xl md:text-[25px] text-left mt-[10px] mb-1 buckettext">
          Welcome {{ fullName }},
        </h1>
        <p class="text-xs md:text-[10px] mb-6">
          Here are items in your eventful moment bucket.
        </p>
      </div>
      <div class="w-full md:w-auto flex justify-start md:justify-end">
        <button 
          @click="router.push('/addlist')"
          class="w-full md:w-40 h-10 py-2 mb-6 md:mb-10 bg-blue-500 mt-6 text-white text-sm rounded-md hover:bg-blue-600 border border-[#707070]">
          Add Item
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 rounded-lg">
      <div 
        class="shadow-lg rounded-md p-6 hover:bg-[#FFF5A7]" 
        v-for="item in bucketList" 
        :key="item.id">
        <h3 class="text-[14px] buckettext">{{ item.topic }}</h3>

        <p class="mt-6 text-xs md:text-[12px] opacity-100 leading-5">
          {{ getDescription(item.details, item.id) }}
        </p>

        <div class="flex flex-col md:flex-row md:justify-between text-xs md:text-[12px] mt-4">
          <button @click="router.push(`/mybucket/${String(item.id)}`)">
            View Details
          </button>
          <div class="flex gap-4 md:gap-8 mt-2 md:mt-0">
            <p class="text-[#B2B2B2]">{{ item.startdate }}</p>
            <p>{{ item.enddate }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center">
      <button
        type="submit"
        class="w-full md:w-40 h-10 py-2 mb-10 bg-blue-500 mt-6 text-white text-sm rounded-md hover:bg-blue-600 border border-[#707070]">
        Load More
      </button>
    </div>
  </div>
</template>
