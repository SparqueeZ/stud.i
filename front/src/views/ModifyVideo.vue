<template>
  <div class="popup-container modify-video-page">
    <div class="popup-box">
      <div class="popup-header">
        <Icon name="editvideo" class="popup-icon" />
        <h1>Modifier les vidéos</h1>
      </div>
      <hr class="separator" />
      <div class="video-list">
        <transition-group name="video-transition" tag="div">
          <div
            v-for="(video, index) in videos"
            :key="video.id"
            class="video-item"
            :class="{ dragging: dragIndex === index }"
            draggable="true"
            @dragstart="dragStart(index)"
            @dragover.prevent="dragOver(index)"
            @drop="drop(index)"
          >
            <div class="input-container">
              <div class="icon-box">
                <Icon name="video" class="input-icon" />
              </div>
              <div class="text-box">
                <p class="video-title">{{ video.title }}</p>
              </div>
              <button class="delete-button" @click="confirmDelete(index)">Supprimer</button>
            </div>
          </div>
        </transition-group>
      </div>
      <button class="submit-button">Valider les modifications</button>
      <div class="back-link" @click="$router.push('/')">
        <Icon name="back" class="back-icon" />
        <span>Retour au dashboard</span>
      </div>
    </div>

    <div v-if="showDeletePopup" class="delete-popup">
      <div class="popup-content">
        <p>Êtes-vous sûr de vouloir supprimer cette vidéo ?</p>
        <div class="popup-actions">
          <button class="confirm-button" @click="deleteVideo(deleteIndex)">Oui</button>
          <button class="cancel-button" @click="showDeletePopup = false">Non</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Icon from '@/components/lib/Icon.vue'

const videos = ref([
  { id: 1, title: 'Introduction de la formation' },
  { id: 2, title: "Qu'est-ce que l'OSINT ?" },
  { id: 3, title: 'Les 5 étapes fondamentales' },
])

const dragIndex = ref(null)

const dragStart = (index) => {
  dragIndex.value = index
}

const dragOver = (index) => {
  if (dragIndex.value !== index) {
    const draggedVideo = videos.value.splice(dragIndex.value, 1)[0]
    videos.value.splice(index, 0, draggedVideo)
    dragIndex.value = index
  }
}

const drop = () => {
  dragIndex.value = null
}

const showDeletePopup = ref(false)
const deleteIndex = ref(null)

const confirmDelete = (index) => {
  deleteIndex.value = index
  showDeletePopup.value = true
}

const deleteVideo = (index) => {
  videos.value.splice(index, 1)
  showDeletePopup.value = false
}
</script>

<style scoped lang="scss">
.popup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  font-family: 'Poppins', sans-serif;
}

.popup-box {
  width: 100%;
  max-width: 600px;
  padding: 40px;
  background-color: #161618;
  border: 3px solid #232325;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  font-family: 'Poppins', sans-serif;
}

.popup-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.modify-video-page .popup-icon {
  stroke: var(--color-text);
  width: 24px;
  height: 24px;
  margin-right: 12px;
  fill: none;
}

h1 {
  color: #d9d9d9;
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
}

.separator {
  border: none;
  height: 2px;
  background-color: #232325;
  margin: 20px 0;
}

.video-list {
  margin-bottom: 40px;
}

.video-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background: rgba(217, 217, 217, 0.03);
  border: 1px solid #232325;
  border-radius: 8px;
  padding: 8px;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.video-item.dragging {
  background-color: rgba(252, 163, 17, 0.2);
  border-color: #fca311;
}

.video-transition-enter-active,
.video-transition-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.video-transition-enter-from,
.video-transition-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.input-container {
  display: flex;
  align-items: center;
  flex: 1;
  background: rgba(217, 217, 217, 0.03);
  border: 1px solid #232325;
  border-radius: 8px;
  height: 40px;
  padding: 0 4px;
}

.icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #232325;
  width: 45px;
  height: 100%;
  padding: 0;
  color: #373639;
}

.input-icon {
  stroke: #373639;
  width: 20px;
  height: 20px;
}

.text-box {
  flex: 1;
  padding-left: 12px;
}

.video-title {
  color: #d9d9d9;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  text-align: left;
}

.delete-button {
  padding: 4px 8px;
  background: #ff4d4f;
  border: none;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
  font-family: 'Poppins', sans-serif;
}

.delete-button:hover {
  background-color: #d9363e;
  transform: scale(1.05);
}

.submit-button {
  padding: 10px;
  background: #fca311;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 700;
  color: #161618;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 10px;
  font-family: 'Poppins', sans-serif;
}

.submit-button:hover {
  background-color: #b37400;
}

.back-link {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  color: #626164;
  font-size: 0.95rem;
  cursor: pointer;
  transition: color 0.2s ease;
  font-family: 'Poppins', sans-serif;
}

.back-link:hover {
  color: #d9d9d9;
}

.modify-video-page .back-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  stroke: #373639;
  fill: none;
}

.delete-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #161618;
  border: 2px solid #232325;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  z-index: 1000;
}

.popup-content p {
  color: #d9d9d9;
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;
}

.popup-actions {
  display: flex;
  justify-content: space-around;
}

.confirm-button,
.cancel-button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: 'Poppins', sans-serif;
}

.confirm-button {
  background: #ff4d4f;
  color: #161618;
}

.confirm-button:hover {
  background-color: #d9363e;
}

.cancel-button {
  background: #626164;
  color: #d9d9d9;
}

.cancel-button:hover {
  background-color: #4a4a4a;
}
</style>
