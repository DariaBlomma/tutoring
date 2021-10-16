<template>
  <router-view/>
</template>

<style lang="scss">
* {
  // padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-size: 18px;
  color: #dad5d5;
}

.page {
  background-color: #1f1f1f;
  padding: 30px;
  width: 100%;
  height: 100vh;
  display: grid;
  justify-content: center;
}

h1 {
  font-size: 2rem;
  color: white;
}

ul {
  padding-top: 15px;
  list-style-type: none;
}

li {
  padding: 10px;
}

.centered {
  display: flex;
  justify-content: center;
  align-items: center;
}
// #app {

//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
