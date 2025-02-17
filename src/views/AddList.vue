<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();

const form = reactive({
  date: '',
  topic: '',
  details: '',
});

const bucketList = ref([]);

// Load bucket list from localStorage when the component mounts
onMounted(() => {
  const storedList = localStorage.getItem('bucketList');
  if (storedList) {
    bucketList.value = JSON.parse(storedList);
  }
});

// Validate if the date is in the future
const isValidDate = (dateString) => {
  const today = new Date();
  const [month, day, year] = dateString.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  return date > today;
};

const handleSubmit = () => {
  // Input validation
  if (!form.date || !form.topic || !form.details) {
    toast.error('Please fill in all fields');
    return;
  }

  if (!isValidDate(form.date)) {
    toast.error('Please enter a valid date in the future');
    return;
  }

  const newList = {
    id: Date.now(), // Generate a unique ID
    date: form.date,
    topic: form.topic,
    details: form.details,
  };

  // Add new item to the local list
  bucketList.value.push(newList);

  // Save updated list to localStorage
  localStorage.setItem('bucketList', JSON.stringify(bucketList.value));

  // Show success toast
  toast.success('List Added Successfully');

  // Redirect to the bucket list page
  router.push('/mybucket');
};
</script>

<template>
  <div class="flex justify-center lg:justify-start items-center min-h-screen px-4">
    <form @submit.prevent="handleSubmit" class="w-full sm:w-[450px] lg:pl-[120px] mb-[100px]">
      <div class="mb-6">
        <p class="mb-2 text-[12px] text-gray-700">Date in the future <span>(mm/dd/yyyy)</span></p>
        <input 
          type="text"
          v-model="form.date"
          id="date"
          name="date"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="MM/DD/YYYY"
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
          placeholder="Enter title"
        />
      </div>

      <div class="mb-6">
        <p class="mb-2 text-[12px] text-gray-700">Details</p>
        <textarea 
          v-model="form.details"
          id="details"
          name="details"
          class="w-full sm:w-[330px] h-[200px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter details"
        ></textarea>
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
