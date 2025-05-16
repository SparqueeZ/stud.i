<template>
  <section class="hero-banner-container">
    <Separator height="150px" width="100%" />
    <article class="hero-banner">
      <div class="hb-content">
        <img
          src="../../../assets/img/pc-dec-01.png"
          alt=""
          srcset=""
          class="no-select hb-deco-01"
        />
        <div class="hb-text">
          <h1 class="hb-title">
            Profitez d’une offre de <br />
            lancement !
          </h1>
          <p class="hb-description">
            Apprenez les concept fondamentaux, ou creusez les sujets les plus complexes en
            cybersécurité, le tout en profitant d’une offre de lancement imbattable !
          </p>

          <div class="main-button-container">
            <Button class="cta" text="En savoir plus" />
          </div>
        </div>
        <img
          src="../../../assets/img/pc-dec-03.png"
          alt=""
          srcset=""
          class="no-select hb-deco-03"
        />
      </div>
      <div class="hb-video">
        <img
          src="../../../assets/img/pc-dec-04.png"
          alt=""
          srcset=""
          class="no-select hb-deco-04"
        />
        <div class="video"></div>
      </div>
    </article>
    <Separator height="75px" width="100%" />
    <div class="cta-buttons">
      <Button text="En savoir plus" />
      <Button text="Accéder à la formation" class="cta" />
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from '@/components/lib/Button.vue'
import Videos from '@/components/app/course/videos.vue'
import Separator from '@/components/lib/Separator.vue'
</script>

<style scoped lang="scss">
.hero-banner-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background-image: url('../../../assets/img/pc-dec-02.png');
  background-position: 0 -100px;
  background-size: contain;
  background-repeat: no-repeat;

  /* background-image: linear-gradient(
    to right top,
    #050c17,
    #040b16,
    #030b16,
    #020a15,
    #010914
  ); */
  .hero-banner {
    // padding: 0 22rem;
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    img {
      &.no-select {
        user-select: none;
        -webkit-user-drag: none;
      }
    }
    .hb-content {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .hb-deco-01 {
        position: absolute;
        left: 0;
        height: 80%;
        margin-left: -22rem;
      }
      .hb-deco-03 {
        position: absolute;
        right: 0;
        top: -50px;
        height: 80%;
        margin-right: -18rem;
      }
      .hb-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 1080px;
        .main-button-container {
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .hb-title {
          font-size: clamp(2.5rem, 1vw, 3rem);
          text-align: center;
          font-weight: 800;
          margin-bottom: 2rem;
          line-height: 3.2rem;
        }
        .hb-description {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          text-align: center;
        }
      }
    }
    .hb-video {
      display: flex;
      justify-content: center;
      position: relative;
      align-items: center;
      .hb-deco-04 {
        position: absolute;
        height: 110%;
      }
      // background-image: url("../../../assets/img/pc-dec-04.png");
      // background-position: -100px;
      // background-size: cover;
      // background-repeat: no-repeat;

      .video {
        max-width: 1080px;
        width: 100%;
        aspect-ratio: 16 / 9;
        background-color: #fff;
        border-radius: 0.5rem;
      }
    }
  }
  .cta-buttons {
    display: flex;
    gap: 2rem;
  }
}
</style>
