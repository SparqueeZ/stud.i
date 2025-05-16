<template>
  <WebsiteHeader />
  <section class="home-page">
    <heroBanner />
    <Separator height="100px" width="100%" />
    <offersInfos />
    <Separator height="100px" width="100%" />
    <WhyThisFormation />
    <Separator height="100px" width="100%" />
    <Testimonials />
    <Separator height="100px" width="100%" />
    <Curriculum />
    <Separator height="100px" width="100%" />
    <ParlonsCyberNumbers />
    <!-- <div class="w-content">Hero-banner (Promo de lancement)+ CTA</div> -->
    <!-- <div class="w-content">Vidéo explicative</div> -->
    <!-- <div class="w-content">Cette formation s'adresse a qui ?</div> -->
    <!-- <div class="w-content">Offers Infos</div> -->
    <!-- <div class="w-content">Pourquoi cette formation</div> -->
    <!-- <div class="w-content">Les avantages</div> -->
    <!-- <div class="w-content">Témoignages</div> -->
    <!-- <div class="w-content">Curriculum</div> -->
    <!-- <div class="w-content">Parlons Cyber en chiffres</div> -->
    <div class="w-content">FAQ</div>
    <div class="w-content">Footer</div>
  </section>
</template>

<script setup lang="ts">
import WebsiteHeader from '@/components/website/website-header.vue'
import heroBanner from '@/components/website/home-page/hero-banner.vue'
import offersInfos from '@/components/website/home-page/offers-infos.vue'
import Separator from '@/components/lib/Separator.vue'
import WhyThisFormation from '@/components/website/home-page/why-this-formation.vue'
import Testimonials from '@/components/website/home-page/testimonials.vue'
import Curriculum from '@/components/website/home-page/curriculum.vue'
import ParlonsCyberNumbers from '@/components/website/home-page/parlons-cyber-numbers.vue'
</script>

<style scoped lang="scss">
.inner-padding {
  padding: 0 10rem;
}
.home-page {
  background-image: linear-gradient(to right top, #050c17, #040b16, #030b16, #020a15, #010914);
}
.w-content {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  // background-color: var(--50-color);
  font-size: 3rem;
  &:nth-child(odd) {
    // background-color: var(--100-color);
  }
}
</style>
