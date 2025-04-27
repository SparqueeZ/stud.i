<template>
  <UserDashboard>
    <section class="content">
      <div class="left-collumn">
        <FormationCard />
        <ProgressionCard />
      </div>
      <div class="right-collumn">
        <RessourcesCard />
      </div>
    </section>
  </UserDashboard>
</template>

<script setup lang="ts">
import FormationCard from '@/components/UserDashboard/FormationCard.vue'
import ProgressionCard from '@/components/UserDashboard/ProgressionCard.vue'
import RessourcesCard from '@/components/UserDashboard/RessourcesCard.vue'
import UserDashboard from '@/layouts/UserDashboard.vue'
</script>

<style scoped lang="scss">
.content {
  padding: 32px;
  display: flex;
  margin-inline: auto;

  .left-collumn {
    min-width: 700px;
    display: flex;
    gap: 32px;
    flex-direction: column;
  }
  .right-collumn {
    min-width: 40%;
    display: flex;
    flex-direction: column;
  }
}

@media (max-width: 1200px) {
  .content {
    flex-direction: column;
    .left-collumn {
      min-width: 100%;
    }
    .right-collumn {
      min-width: 100%;
    }
  }
}

@media (max-width: 768px) {
  .content {
    padding: 16px;
    flex-direction: column;
    gap: 16px;

    .left-collumn,
    .right-collumn {
      min-width: 100%;
    }
  }
}
</style>
