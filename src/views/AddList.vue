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
    <div class="block ">
        <form @submit.prevent="handleSubmit">
            <div class="w-[450px] pl-[120px] mb-[100px]">
              <p class=" mb-2 text-[12px]">Date in the future</p>
            <input type="text"
            v-model="form.date"
              id="date"
              name="date"
              placeholder=""
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
            <p class="mt-6 text-[12px]">Title</p>
            <input type="text"
            v-model="form.topic"
              id="topic"
              name="topic"
              placeholder=""
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
            <p class="mt-6 text-[12px]">Details</p>
            <input type="text"
            v-model="form.details"
            id="details"
            name="details"
                class="w-[330px] h-[200px] border rounded-md">

            <div class="text-center mt-6 ">
                <button class="w-48 h-10 py-2 bg-blue-500 text-white text-[12px] rounded-md hover:bg-blue-600">
                    Save
                </button>
            </div>
            </div>
        </form>
    </div>
</template>