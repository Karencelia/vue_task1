<script setup>
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

function handleLogout() {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("userFullName");
  localStorage.removeItem("userEmail");
  router.push("/");
}
</script>

<template>
  <nav class="bg-[#008289] border-b border-teal-500">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <RouterLink to="/" class="text-white lg:text-[20px] md:text-[15px] font-semibold htext">
          Eventful Moments.
        </RouterLink>
        <div class="space-x-4">
          <RouterLink to="/mybucket" class="text-white">My Bucket</RouterLink>
          <button @click="handleLogout" class="text-white">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>
