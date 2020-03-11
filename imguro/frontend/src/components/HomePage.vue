<template>
  <div>
    <h2>Home Page</h2>
    <div class="container">
      <div class="row">
        <div class="col-lg-3" v-for="image in latest" :key="image">
          <ImageCard :img="image" />
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
  },
  data() {
    return {
      latest: [
       "http://lorempixel.com/400/200",
       "http://lorempixel.com/400/200",
       "http://lorempixel.com/400/200",
       "http://lorempixel.com/400/200",
       "http://lorempixel.com/400/200"
     ]
    }
  }
}
</script>

<style>
</style>
