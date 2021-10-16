<template>
  <div class="horizonte-6 page">
    <div class='lessons'>
      <h1>Lektionen</h1>
      <ul>
        <li><router-link to="/">Mein Zimmer</router-link></li>
        <li><router-link to="/">Das Essen</router-link></li>
      </ul>
      <Zimmer/>
    </div>
    <div class='hws'>
      <h1>Hausaufgaben</h1>
    </div>
  </div>
  <router-view/>
</template>

<script>
// @ is an alias to /src
import Zimmer from '@/components/Zimmer.vue';

export default {
  name: 'Horizonte6',
  components: {
    Zimmer,
  },
};
</script>
