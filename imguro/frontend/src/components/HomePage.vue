<template>
  <div>
    <h2>Home Page</h2>
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <ImageCard />
        </div>
        <div class="col-lg-3">
          <ImageCard />
        </div>
        <div class="col-lg-3">
          <ImageCard />
        </div>
        <div class="col-lg-3">
          <ImageCard />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageCard from './ImageCard.vue'

export default {
  name: 'HomePage',
  components: {
    ImageCard
  }
}
</script>

<style>
</style>
