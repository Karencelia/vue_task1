<script setup>
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const fullName = ref("");
const email = ref("");
const password = ref("");
const nameError = ref("");
const emailError = ref("");
const passwordError = ref("");

function handleCreateAccount(event) {
  event.preventDefault();

  // Trim values to remove whitespace
  const fullNameValue = fullName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  // Check if fields are empty
  if (!fullNameValue || !emailValue || !passwordValue) {
    nameError.value = fullNameValue ? "" : "Please enter a name";
    emailError.value = emailValue ? "" : "Please enter an email";
    passwordError.value = passwordValue ? "" : "Please enter a password";

    // Remove errors after 2 seconds
    setTimeout(() => {
      nameError.value = "";
      emailError.value = "";
      passwordError.value = "";
    }, 2000);
    return;
  }

  // Get existing users from localStorage
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Check if email is already registered
  const userExists = existingUsers.some((user) => user.email === emailValue);

  if (userExists) {
    emailError.value = "Email is already registered";

    // Remove error after 2 seconds
    setTimeout(() => {
      emailError.value = "";
    }, 2000);
    return;
  }

  // Save new user to localStorage
  const newUser = {
    fullName: fullNameValue,
    email: emailValue,
    password: passwordValue, // Hashing passwords is recommended for security
  };

  existingUsers.push(newUser);
  localStorage.setItem("users", JSON.stringify(existingUsers));

  // Redirect after successful registration
  nextTick(() => {
    router.push("/mybucket");
  });
}
</script>

<template>
  <div class="flex flex-col">
    <Navbar />
    <main class="flex flex-col items-center justify-center flex-1 px-4">
      <div class="w-full max-w-[450px] text-center">
        <h1 class="text-lg lg:text-[25px] font-bold mb-2 text-left create">
          Create an account,
        </h1>

        <form @submit.prevent="handleCreateAccount" class="space-y-4">
          <div>
            <p class="text-left text-[14px] mt-11">Full Name</p>
            <input
              type="text"
              v-model="fullName"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p v-if="nameError" class="text-red-500 text-sm mt-2">{{ nameError }}</p>
          </div>

          <div>
            <p class="text-left text-[14px]">Email</p>
            <input
              type="email"
              v-model="email"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p v-if="emailError" class="text-red-500 text-sm mt-2">{{ emailError }}</p>
          </div>

          <div>
            <p class="text-left text-[14px]">Password</p>
            <input
              type="password"
              v-model="password"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p v-if="passwordError" class="text-red-500 text-sm mt-2">{{ passwordError }}</p>
          </div>

          <button
            type="submit"
            class="w-full sm:w-48 h-10 py-2 bg-blue-500 text-white text-[12px] rounded-md hover:bg-blue-600 transition"
          >
            Create
          </button>
        </form>
      </div>
    </main>
  </div>
</template>
