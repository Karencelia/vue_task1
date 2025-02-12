<script setup>
// import Navbar from '@/components/Navbar.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');
const errorMessage = ref('');

function handleLogin(event) {
  event.preventDefault();
  
  if (email.value && password.value) {
    router.push('/mybucket');
  } else {
    errorMessage.value = 'Please fill in all fields';
  }
}
</script>

<template>
  <div class="flex flex-col justify-between">
    <Navbar />

    <main class="flex flex-col items-center justify-center flex-1 mx-4">
      <div class="max-w-md w-full text-center">
        <h1 class="text-lg lg:text-[25px] font-bold mb-2 text-left welcome">
          Welcome back,
        </h1>
        <p class="text-black mb-4 mt-6 text-left text-base md:text-lg lg:text-[14px] leading-normal">
  Hi, my name is Eventful Moments, I am a bucket... no, not the bucket
  of water but I store awesome moments you will like to have in coming
  years.
</p>


        <form @submit="handleLogin" class="space-y-4">
          <div>
            <p class="text-left text-gray-600 text-[14px]">Email</p>
            <input
              v-model="email"
              type="email"
              placeholder=""
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <p class="text-left text-gray-600 text-[14px]">Password</p>
            <input
              v-model="password"
              type="password"
              placeholder=""
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>

          <button
            type="submit"
            class="w-48 h-10 py-2 bg-blue-500 mt-6 text-white text-[12px] rounded-md hover:bg-blue-600 border border-[#707070]"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  </div>
</template>
