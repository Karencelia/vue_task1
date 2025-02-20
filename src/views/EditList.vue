<script setup>
import { ref, onMounted, reactive, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';


const toast = useToast();

const route = useRoute();
const item = ref(null);
const bucketList = ref([]);

const form = reactive({
  date: '',
  topic: '',
  details: '',
});

onMounted(() => {
  bucketList.value = JSON.parse(localStorage.getItem("bucketList")) || [];
  item.value = bucketList.value.find(i => String(i.id) === route.params.id);

  console.log(item.value.date);
});

watchEffect(() => {
  if (item.value) {
    form.date = item.value.date;
    form.topic = item.value.topic;
    form.details = item.value.details;
  }
});

const edit = () => {
  // Check if all fields are filled
  if (form.date === '' || form.topic === '' || form.details === '') {
    toast.error('All fields are required');
    return;
  }

  // Find the item by its id
  const index = bucketList.value.findIndex(i => String(i.id) === route.params.id);

  if (index !== -1) {
    // Update the item with the new form data
    bucketList.value[index].date = form.date;
    bucketList.value[index].topic = form.topic;
    bucketList.value[index].details = form.details;

    // Save the updated bucketList to localStorage
    localStorage.setItem('bucketList', JSON.stringify(bucketList.value));

    // Display a success message
    toast.success('Item updated successfully');
  } else {
    toast.error('Item not found');
  }
};


console.log(form);
</script>

<template>
  <div class="block">
    <form @submit.prevent="handleSubmit">
      <div class="w-[450px] pl-[120px] mb-[100px]">
        <p class="mb-2 text-[12px]">Date in the future {{ item?.value?.date }}</p>
        <input
          type="text"
          v-model="form.date"
          id="date"
          name="date"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <p class="mt-6 text-[12px]">Title</p>
        <input
          type="text"
          v-model="form.topic"
          id="topic"
          name="topic"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <p class="mt-6 text-[12px]">Details</p>
        <textarea
          v-model="form.details"
          id="details"
          name="details"
          class="w-[330px] h-[200px] border rounded-md"
          required
        ></textarea>

        <div class="text-center mt-6">
          <button @click="edit" class="w-48 h-10 py-2 bg-blue-500 text-white text-[12px] rounded-md hover:bg-blue-600">
            Update
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
