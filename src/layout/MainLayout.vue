<script setup>
import { useRoute } from "vue-router";
import AuthNavbar from "@/components/AuthNavbar.vue";
import MainNavbar from "@/components/MainNavbar.vue";
import Footer from "@/components/Footer.vue";
import { RouterView } from "vue-router";

const route = useRoute();

const isAuthPage = () => {
  return route.path === "/" || route.path === "/register";
};
</script>

<template>
  <div class="h-screen flex flex-col justify-between">
    <component :is="isAuthPage() ? AuthNavbar : MainNavbar" />

    <!-- Main Content -->
    <main class="">
      <RouterView />
    </main>

    <!-- Footer -->
    <div class="text-center text-[14px]">
      <Footer />
    </div>
  </div>
</template>
