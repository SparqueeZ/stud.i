<template>
  <section class="content">
    <aside class="settings-sidebar-wrapper"></aside>
    <section class="settings-section-wrapper">
      <div class="settings-section-title-wrapper">
        <p class="settings-section-title">Général</p>
        <p class="settings-section-description">
          Gérez vos informations personnelles, modifiez vos préférences et configurez les paramètres
          généraux de votre compte.
        </p>
      </div>

      <section class="settings-wrapper">
        <div class="description-wrapper">
          <p class="settings-title">Identité</p>
          <p class="settings-description"></p>
        </div>
        <div class="form-wrapper">
          <div class="form-group">
            <input
              type="text"
              id="lastname"
              placeholder="Votre nom"
              :value="userStore.user.lastname"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              id="firstname"
              placeholder="Votre prénom"
              :value="userStore.user.firstname"
            />
          </div>
        </div>
      </section>

      <section class="settings-wrapper">
        <div class="description-wrapper">
          <p class="settings-title">Email</p>
          <p class="settings-description"></p>
        </div>
        <div class="form-wrapper">
          <div class="form-group">
            <input
              type="email"
              id="email"
              placeholder="Votre email"
              :value="userStore.user.email"
            />
          </div>
        </div>
      </section>

      <section class="settings-wrapper">
        <div class="description-wrapper">
          <p class="settings-title">Mot de passe</p>
          <p class="settings-description"></p>
        </div>
        <div class="form-wrapper">
          <div class="form-group">
            <div class="button">
              <p class="text">Réinitialiser</p>
            </div>
          </div>
        </div>
      </section>

      <section class="settings-wrapper disabled">
        <div class="description-wrapper">
          <p class="settings-title">Authentification multi-facteurs</p>
          <p class="settings-description"></p>
        </div>
        <div class="form-wrapper">
          <div class="form-group">
            <div class="button">
              <p class="text">Activer</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>

<style scoped lang="scss">
.content {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--color-background);
  .settings-sidebar-wrapper {
    width: 0%;
    max-width: 300px;
    height: 100%;
    background-color: var(--color-background);
    border-right: 1px solid var(--color-border);
    // padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .settings-section-wrapper {
    width: 100%;
    // max-width: 800px;
    height: 100%;
    background-color: var(--color-background);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    .settings-section-title-wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 32px;
      background-color: var(--color-background);
      .settings-section-title {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--color-text);
      }
      .settings-section-description {
        font-size: 1rem;
        color: var(--color-text-secondary);
      }
    }
  }

  .settings-wrapper {
    display: flex;
    gap: 16px;
    margin: 0 32px;
    padding: 0 0 16px 0;
    background-color: var(--color-background);
    border-bottom: 1px solid var(--color-border);

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
      user-select: none;
    }
    .description-wrapper {
      display: flex;
      flex-direction: column;
      padding: 8px 0 0 0;
      gap: 8px;
      background-color: var(--color-background);
      width: 30%;
      .settings-title {
        font-size: 1rem;
        color: var(--color-text);
      }
      .settings-description {
        font-size: 0.9rem;
        color: var(--color-text-secondary);
      }
    }

    .form-wrapper {
      display: flex;
      flex-direction: column;
      gap: 16px;
      background-color: var(--color-background);
      width: 70%;
      .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
        label {
          font-size: 1rem;
          color: var(--color-text);
        }
        input {
          padding: 8px;
          border-radius: 4px;
          border: 1px solid var(--color-border);
          font-size: 1rem;
          color: var(--color-text-secondary);
          background-color: transparent;
          transition: all 0.3s ease;
          &:focus {
            color: var(--color-text);
            outline: none;
          }
        }
        .button {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 8px 16px;
          border-radius: 4px;
          background-color: transparent;
          border: 1px solid var(--color-border);
          cursor: pointer;
          transition: all 0.3s ease;
          width: fit-content;
          &:hover {
            background-color: var(--color-text-tertiary);
          }
          .text {
            font-size: 1rem;
            color: var(--color-text);
          }
        }
      }
    }
  }
}
</style>
