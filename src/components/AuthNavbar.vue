<script setup>
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <nav class="bg-[#008289] border-b border-teal-500">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <RouterLink to="/" class="text-white lg:text-[20px] md:text-[15px] font-semibold htext">
          Eventful Moments.
        </RouterLink>
        <div class="space-x-4">
          <RouterLink
            to="/login"
            :class="[route.path === '/login' ? 'text-[#FFFFFF] font-bold' : 'text-[#FFFFFF]']"
          >
            Login
          </RouterLink>
          <RouterLink
            to="/register"
            :class="[route.path === '/register' ? 'text-[#FFFFFF] font-bold' : 'text-[#FFFFFF]']"
          >
            Register
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
