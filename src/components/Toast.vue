<template>
  <div v-if="message" class="container-toast">
    <div class="toast">{{ message }}</div>
  </div>
</template>

<script setup>
defineProps({
  message: { type: String, default: '' }
})
</script>

<style scoped>
.container-toast {
  display: flex;
  justify-content: center;
}
@keyframes slide-top-toast {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}
.toast {
  width: 230px;
  height: 53px;
  background-color: var(--fg);
  color: var(--bg);
  font-size: 17px;
  box-sizing: border-box;
  border: 2px solid var(--bg);
  border-radius: 0.3rem;
  position: fixed;
  z-index: 6;
  bottom: 120px;
  padding: 12px 15px 15px 25px;
  animation: slide-top-toast 0.5s;
}
</style>
