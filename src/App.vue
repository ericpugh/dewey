<template>
  <div id="app" class="container" ref="app">
    <!--Get the view from route-->
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Mono|Open+Sans:600');

  #app {
    font-family: "Open Sans", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    text-align: left;
    .page {
      padding-top: 90px;
      .alert {
        margin: 1rem 0;
      }
    }
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
    .loading {
      font-family: "IBM Plex Mono", monospace;
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
    .list-group-item-action {
      cursor: pointer;
    }
  }
</style>
