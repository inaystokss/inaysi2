<template>
  <div class="flex min-h-screen text-gray-800">
    <!-- Боковое меню -->
    <aside
      v-if="isMenuOpen"
      class="fixed top-0 left-0 w-60 h-full shadow-lg flex flex-col items-center py-6 z-40"
    >
      <img src="/city.jpg" class="w-20 h-20 mb-4 rounded-full shadow" alt="Logo" />

      <nav class="flex flex-col space-y-2 w-full text-center">
        <NuxtLink to="/" class="p-2 rounded hover:bg-gray-300 transition" :class="active('/')">
          🏠 Home
        </NuxtLink>

        <NuxtLink to="/lab3" class="p-2 rounded hover:bg-gray-300 transition" :class="active('/lab3')">
          🧪 Lab3
        </NuxtLink>

        <NuxtLink to="/lab4" class="p-2 rounded hover:bg-gray-300 transition" :class="active('/lab4')">
          🧩 Lab4
        </NuxtLink>

        <NuxtLink to="/lab5" class="p-2 rounded hover:bg-gray-300 transition" :class="active('/lab5')">
          ⚙️ Lab5
        </NuxtLink>

        <NuxtLink to="/lab6" class="p-2 rounded hover:bg-gray-300 transition" :class="active('/lab6')">
          📷 Lab6
        </NuxtLink>
      </nav>

      <div class="w-4/5 h-px bg-gray-400 my-4"></div>

      <button
        v-if="!isLoggedIn"
        @click="login"
        class="p-2 rounded bg-green-500 text-white hover:bg-green-600"
      >
        🔑 Login
      </button>

      <button
        v-else
        @click="logout"
        class="p-2 rounded bg-red-500 text-white hover:bg-red-600"
      >
        🚪 Logout
      </button>
    </aside>

    <!-- Кнопка меню -->
    <div
      class="fixed top-4 left-4 z-50 bg-gray-100 px-3 py-2 rounded shadow cursor-pointer"
      @click="toggleMenu"
    >
      <span v-if="!isMenuOpen">☰</span>
      <span v-else>✖</span>
    </div>

    <!-- Контент страницы -->
    <main class="flex-1 p-8">
      <Transition name="fade" mode="out-in">
        <NuxtPage />
      </Transition>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isMenuOpen = ref(true);
const isLoggedIn = ref(false);

const active = (path) =>
  route.path === path ? "bg-gray-400 text-white font-semibold" : "";

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function login() {
  isLoggedIn.value = true;
  alert("Вы вошли в систему!");
}

function logout() {
  isLoggedIn.value = false;
  alert("Вы вышли из системы!");
}

/* Безопасные обработчики ошибок */
onMounted(() => {
  if (!process.client) return;

  window.addEventListener("error", (e) => {
    console.error("CLIENT ERROR:", e);
  });

  window.addEventListener("unhandledrejection", (e) => {
    console.error("PROMISE ERROR:", e);
  });
});
</script>

<style>
body {
  background-color: #d1d5db;
  background-image: url("/6_black.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>