<template>
  <div id="app" class="container" ref="app">
    <!--Get the view from route-->
    <router-view/>
  </div>
</template>

<style lang="scss">
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    text-align: left;
    /**
     * Pure CSS "loading" animation
     */
    @keyframes blink {
      0% {
        opacity: .2;
      }
      20% {
        opacity: 1;
      }
      100% {
        opacity: .2;
      }
    }
    .loading.animate {
      span {
        animation-name: blink;
        animation-duration: 1.4s;
        animation-iteration-count: infinite;
        animation-fill-mode: both;
      }
      span:nth-child(2) {
        animation-delay: .2s;
      }
      span:nth-child(3) {
        animation-delay: .4s;
      }
    }

  }
</style>
