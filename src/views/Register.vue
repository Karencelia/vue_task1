<script setup>
import { ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const fullName = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');

function handleCreateAccount(event) {
  event.preventDefault();

  if (!fullName.value || !email.value || !password.value) {
    errorMessage.value = 'All fields are required';
    return;
  }

  nextTick(() => {
    router.push('/mybucket');
  });
}
</script>

<template>
  <div class="flex flex-col justify-between">
    <Navbar />
    <main class="flex flex-col items-center justify-center flex-1 mx-4">
      <div class="w-[450px] text-center">
        <h1 class="text-lg lg:text-[25px] font-bold mb-2 text-left create">Create an account,</h1>

        <form @submit.prevent="handleCreateAccount" class="space-y-4">
          <div>
            <p class="text-left text-[14px] mt-11">Fullname</p>
            <input
              type="text"
              v-model="fullName"
              class="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <p class="text-left text-[14px]">Email</p>
            <input
              type="email"
              v-model="email"
              class="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <p class="text-left text-[14px]">Password</p>
            <input
              type="password"
              v-model="password"
              class="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            class="w-48 h-10 py-2 bg-blue-500 text-white text-[12px] rounded-md hover:bg-blue-600"
          >
            Create
          </button>
          <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
        </form>
      </div>
    </main>
  </div>
</template>
