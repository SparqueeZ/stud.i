<template>
  <div class="popup-container add-quizz-page">
    <div class="popup-box">
      <div class="popup-header">
        <Icon name="lightbulb" class="popup-icon" />
        <h1>Ajout d’un quiz</h1>
      </div>
      <hr class="separator" />
      <div class="form-section">
        <p class="form-label white-text">Quiz existants</p>
        <div class="existing-quizzes">
          <div
            v-for="(quiz, qIdx) in quizzes"
            :key="qIdx"
            class="quiz-item"
          >
            <div class="quiz-title-row">
              <span class="quiz-title" @click="toggleQuiz(qIdx)">{{ quiz.title }}</span>
              <div class="quiz-title-actions">
                <Icon :name="openedQuiz === qIdx ? 'down' : 'chevron'" class="input-icon" @click="toggleQuiz(qIdx)" />
                <button class="delete-quiz-btn" @click="deleteQuiz(qIdx)">Supprimer</button>
              </div>
            </div>
            <transition name="fade-answers">
              <div v-if="openedQuiz === qIdx" class="quiz-answers">
                <div
                  v-for="(ans, aIdx) in quiz.answers"
                  :key="aIdx"
                  class="quiz-answer draggable-answer"
                  draggable="true"
                  @dragstart="dragStart(qIdx, aIdx)"
                  @dragover.prevent="dragOver(qIdx, aIdx)"
                  @drop="drop(qIdx, aIdx)"
                  :class="{ dragging: isDragging(qIdx, aIdx) }"
                >
                  <span class="drag-handle">☰</span>
                  <span v-if="!isEditing(qIdx, aIdx)">{{ ans.text }}</span>
                  <input
                    v-else
                    class="edit-answer-input"
                    v-model="editValue"
                    @keyup.enter="saveEdit(qIdx, aIdx)"
                    @blur="saveEdit(qIdx, aIdx)"
                    ref="editInput"
                  />
                  <span v-if="ans.correct" class="correct-badge">✔</span>
                  <div class="answer-actions">
                    <Icon name="modify" class="modify-answer-icon" @click="startEdit(qIdx, aIdx, ans.text)" />
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <div v-if="quizzes.length === 0" class="quiz-empty">Aucun quiz pour l’instant.</div>
        </div>
      </div>
      <div class="form-section">
        <p class="form-label white-text">Ajouter un Quiz</p>
        <input type="text" class="input-box" placeholder="Saisissez le titre du quiz ici" v-model="newQuizTitle" />
      </div>
      <div class="form-section">
        <div
          v-for="(answer, idx) in answers"
          :key="idx"
          class="form-group-row"
        >
          <div class="form-group answer-group">
            <input
              type="text"
              class="input-box"
              :placeholder="`Saisissez la réponse ${idx + 1}`"
              v-model="answer.text"
            />
            <input
              type="checkbox"
              class="answer-checkbox"
              v-model="answer.correct"
            />
          </div>
        </div>
      </div>
      <div class="button-section">
        <button class="delete-button" @click="removeAnswer" :disabled="answers.length <= 2">Supprimer une réponse</button>
        <button class="add-button" @click="addAnswer">Ajouter une réponse</button>
      </div>
      <button class="submit-button" @click="addQuiz">Ajouter le Quiz</button>
      <div class="back-link" @click="$router.push('/')">
        <Icon name="back" class="back-icon" />
        <span>Retour au dashboard</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import Icon from '@/components/Icon.vue'

const quizzes = ref([])
const newQuizTitle = ref('')
const answers = ref([
  { text: '', correct: false },
  { text: '', correct: false },
  { text: '', correct: false },
  { text: '', correct: false },
])
const openedQuiz = ref(null)

const dragQuizIdx = ref(null)
const dragAnswerIdx = ref(null)

const editing = ref({ quiz: null, answer: null })
const editValue = ref('')
const editInput = ref(null)

function isDragging(qIdx, aIdx) {
  return dragQuizIdx.value === qIdx && dragAnswerIdx.value === aIdx
}

function dragStart(qIdx, aIdx) {
  dragQuizIdx.value = qIdx
  dragAnswerIdx.value = aIdx
}

function dragOver(qIdx, aIdx) {
  if (dragQuizIdx.value === null || dragAnswerIdx.value === null) return
  if (dragQuizIdx.value !== qIdx) return
  if (dragAnswerIdx.value === aIdx) return
  const arr = quizzes.value[qIdx].answers
  const [moved] = arr.splice(dragAnswerIdx.value, 1)
  arr.splice(aIdx, 0, moved)
  dragAnswerIdx.value = aIdx
}

function drop() {
  dragQuizIdx.value = null
  dragAnswerIdx.value = null
}

function addAnswer() {
  answers.value.push({ text: '', correct: false })
}

function removeAnswer() {
  if (answers.value.length > 2) {
    answers.value.pop()
  }
}

function addQuiz() {
  if (!newQuizTitle.value.trim()) return
  quizzes.value.push({
    title: newQuizTitle.value,
    answers: answers.value.map(a => ({ ...a })),
  })
  newQuizTitle.value = ''
  answers.value = [
    { text: '', correct: false },
    { text: '', correct: false },
    { text: '', correct: false },
    { text: '', correct: false },
  ]
}

function toggleQuiz(idx) {
  openedQuiz.value = openedQuiz.value === idx ? null : idx
}

function deleteQuiz(idx) {
  quizzes.value.splice(idx, 1)
  if (openedQuiz.value === idx) openedQuiz.value = null
  else if (openedQuiz.value > idx) openedQuiz.value--
}

function isEditing(qIdx, aIdx) {
  return editing.value.quiz === qIdx && editing.value.answer === aIdx
}

function startEdit(qIdx, aIdx, value) {
  editing.value = { quiz: qIdx, answer: aIdx }
  editValue.value = value
  nextTick(() => {
    if (editInput.value && editInput.value.focus) {
      editInput.value.focus()
    }
  })
}

function saveEdit(qIdx, aIdx) {
  if (editValue.value.trim() !== '') {
    quizzes.value[qIdx].answers[aIdx].text = editValue.value
  }
  editing.value = { quiz: null, answer: null }
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
  padding: 50px;
  background-color: #161618;
  border: 3px solid #232325;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.popup-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.add-quizz-page .popup-icon {
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
}

.separator {
  border: none;
  height: 2px;
  background-color: #232325;
  margin: 20px 0;
}

.form-section {
  margin-bottom: 20px;
  text-align: left;
}

.form-label {
  color: #626164;
  font-size: 0.95rem;
  margin-bottom: 10px;
}

.input-container {
  position: relative;
  max-width: 100%;
}

.input-box {
  width: calc(100% - 24px);
  padding: 10px;
  border: 2px solid #232325;
  border-radius: 8px;
  background-color: #161618;
  color: #d9d9d9;
  font-size: 0.95rem;
}

.input-box::placeholder {
  color: #626164;
}

.input-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  stroke: #373639;
  width: 20px;
  height: 20px;
}

.form-group-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
}

.answer-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.answer-checkbox {
  width: 20px;
  height: 20px;
  accent-color: #4caf50;
  margin-left: 8px;
  cursor: pointer;
}

.button-section {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
  transform: translateX(-20px);
}

.delete-button {
  padding: 10px;
  background: #ff4d4f;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  color: #161618;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.delete-button:hover {
  background-color: #d9363e;
}

.add-button {
  padding: 10px;
  background: #4caf50;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  color: #161618;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-button:hover {
  background-color: #388e3c;
}

.submit-button {
  padding: 10px;
  background: #fca311;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  color: #161618;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 20px;
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
}

.back-link:hover {
  color: #d9d9d9;
}

.add-quizz-page .back-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  stroke: #373639;
  fill: none;
}

.white-text {
  color: #ffffff;
  font-size: 1rem;
  font-weight: bold;
}

.existing-quizzes {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
}

.quiz-item {
  background: rgba(217, 217, 217, 0.03);
  border: 1px solid #232325;
  border-radius: 8px;
  margin-bottom: 4px;
  padding: 0;
  overflow: hidden;
}

.quiz-title-row {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  font-weight: 600;
  color: #fff;
  font-size: 1rem;
  user-select: none;
}

.quiz-title {
  cursor: pointer;
}

.quiz-title-actions {
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 8px;
}

.quiz-title-row .input-icon {
  margin-left: 0;
  transition: transform 0.2s;
}

.quiz-answers {
  background: rgba(0,0,0,0.15);
  padding: 8px 16px 12px 32px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.quiz-answer {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #d9d9d9;
  font-size: 0.97rem;
  position: relative;
}

.correct-badge {
  color: #4caf50;
  font-weight: bold;
  font-size: 1.1em;
}

.quiz-empty {
  color: #626164;
  font-style: italic;
  padding: 8px 0 0 8px;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.fade-answers-enter-active,
.fade-answers-leave-active {
  transition: max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s;
  overflow: hidden;
}
.fade-answers-enter-from,
.fade-answers-leave-to {
  max-height: 0;
  opacity: 0;
}
.fade-answers-enter-to,
.fade-answers-leave-from {
  max-height: 500px;
  opacity: 1;
}

.delete-quiz-btn {
  margin-left: 12px;
  padding: 4px 10px;
  background: #ff4d4f;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.delete-quiz-btn:hover {
  background: #d9363e;
}

.draggable-answer {
  cursor: grab;
  user-select: none;
  transition: background 0.15s;
  position: relative;
}
.draggable-answer.dragging {
  background: rgba(252, 163, 17, 0.15);
  opacity: 0.7;
}
.drag-handle {
  cursor: grab;
  margin-right: 10px;
  color: #fca311;
  font-size: 1.2em;
  user-select: none;
}

.answer-actions {
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 6px;
}

.modify-answer-icon {
  width: 20px;
  height: 20px;
  stroke: #fca311;
  cursor: pointer;
  transition: stroke 0.2s;
}
.modify-answer-icon:hover {
  stroke: #fff;
}

.edit-answer-input {
  flex: 1;
  min-width: 0;
  padding: 4px 8px;
  border: 1px solid #232325;
  border-radius: 6px;
  background: #232325;
  color: #fff;
  font-size: 0.97rem;
  margin-right: 4px;
}

* {
  font-family: 'Poppins', sans-serif;
}
</style>
