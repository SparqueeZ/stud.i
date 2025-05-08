<template>
  <div class="test-page">
    <button @click="$router.push('/add-video')" class="test-button">Ouvrir la popup</button>
    <button @click="$router.push('/congrats')" class="test-button">Ouvrir Félicitations</button>
  </div>
</template>

<style scoped>
.test-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.test-button {
  padding: 10px 20px;
  background-color: #fca311;
  border: none;
  border-radius: 8px;
  color: #161618;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.test-button:hover {
  background-color: #b37400;
}
</style>
