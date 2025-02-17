<script setup>
import { reactive, onMounted } from 'vue';
import router from '@/router';
import { useToast } from 'vue-toastification';

const toast = useToast();

const form = reactive({
  id: null,
  date: '',
  topic: '',
  details: '',
});

const handleSubmit = () => {
  let storedData = JSON.parse(localStorage.getItem("bucketList")) || [];

  if (form.id !== null) {

    const index = storedData.findIndex(item => item.id === form.id);
    if (index !== -1) {
      storedData[index] = { ...storedData[index], ...form };
      toast.success("List Updated Successfully");
    }
  } else {
    const newList = {
      id: storedData.length + 1,
      date: form.date,
      topic: form.topic,
      details: form.details,
    };
    storedData.push(newList);
    toast.success("List Added Successfully");
  }

  localStorage.setItem("bucketList", JSON.stringify(storedData));
  router.push("/mybucket");
};

const loadItem = () => {
  const id = router.currentRoute.value.query.id;
  if (id) {
    let storedData = JSON.parse(localStorage.getItem("bucketList")) || [];
    const item = storedData.find(item => item.id == id);
    if (item) {
      form.id = item.id;
      form.date = item.date;
      form.topic = item.topic;
      form.details = item.details;
    }
  }
};

onMounted(() => {
  loadItem();
});
</script>

<template>
  <div class="block">
    <form @submit.prevent="handleSubmit">
      <div class="w-[450px] pl-[120px] mb-[100px]">
        <p class="mb-2 text-[12px]">Date in the future</p>
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
          <button class="w-48 h-10 py-2 bg-blue-500 text-white text-[12px] rounded-md hover:bg-blue-600">
            {{ form.id ? 'Update' : 'Save' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
