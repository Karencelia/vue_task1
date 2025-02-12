<script setup>
import router from '@/router';
import { reactive } from 'vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const form = reactive({
  date: '',
  topic: '',
  details: '',
});

const toast = useToast();

const handleSubmit = async () => {
  const newList = {
    date: form.date,
    topic: form.topic,
    details: form.details,
  };

  try {
    const response = await axios.post('/bucketList', newList);
    toast.success('List Added Successfully');
    router.push(`/bucketList/${response.data.id}`);
  } catch (error) {
    console.error('Error fetching List', error);
    toast.error('List Was Not Added');
  }
};
</script>
<template>
  <div class="flex justify-center lg:justify-start items-center min-h-screen px-4">
    <form @submit.prevent="handleSubmit" class="w-full sm:w-[450px] lg:pl-[120px] mb-[100px]">
      <div class="mb-6">
        <p class="mb-2 text-[12px] text-gray-700">Date in the future</p>
        <input 
          type="text"
          v-model="form.date"
          id="date"
          name="date"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div class="mb-6">
        <p class="mb-2 text-[12px] text-gray-700">Title</p>
        <input 
          type="text"
          v-model="form.topic"
          id="topic"
          name="topic"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div class="mb-6">
        <p class="mb-2 text-[12px] text-gray-700">Details</p>
        <input 
          type="text"
          v-model="form.details"
          id="details"
          name="details"
          class="w-full sm:w-[330px] h-[200px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div class="text-center">
        <button 
          type="submit"
          class="w-full sm:w-48 h-10 bg-blue-500 text-white text-[12px] rounded-md hover:bg-blue-600 transition"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>
