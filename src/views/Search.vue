<template>
  <div class="search page">
    <Navbar/>
      <form name="search" class="autocomplete" @submit.prevent="submit" ref="search">
        <vue-bootstrap-typeahead
                :data="autocomplete_results"
                v-model="autocompleteSearch"
                size="lg"
                placeholder="i.e. 1984.149.1"
                v-on:hit="onAutocompleteSelected"
                v-on:input="onAutocompleteChange"
                v-bind:value="object_number">
            <div slot="append">
                <button @click="submit" class="btn btn-outline-secondary form-control-lg" type="button">Find</button>
            </div>
        </vue-bootstrap-typeahead>
    </form>
      <div v-if="loadingArtwork" class="display-4 text-center">
          <p class="loading animate">Loading<span>.</span><span>.</span><span>.</span></p>
      </div>
      <ArtworkRecord/>
  </div>
</template>

<script>
    import _ from "lodash";
    import Navbar from "@/components/Navbar.vue";
    import ArtworkRecord from "@/components/ArtworkRecord.vue";
    import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
    import axios from 'axios';
    axios.interceptors.request.use(
        (config) => {
            config.headers['Accept'] = 'application/vnd.api+json';
            config.headers['X-Api-Key'] = process.env.VUE_APP_API_KEY;
            return config;
        },

        (error) => {
            return Promise.reject(error);
        }
    );
    import { mapWaitingGetters } from 'vue-wait'

    export default {
      name: "search",
      components: {
        Navbar,
        ArtworkRecord,
        VueBootstrapTypeahead
      },
      props: {},
      data: function () {
          return {
              object_number: '',
              autocompleteSearch: ''
          }
      },
      methods: {
          submit: async function () {
              // TODO: disable the "submit" button if the input value is equal to the current object number.
              this.$wait.start('artwork loading');
              // TODO: pull Artwork from "recent" list if exists, before making the async action!!
              await this.$store.dispatch('artwork/FETCH', this.object_number).then(() => {
                  this.$wait.end('artwork loading');
              });
          },
          onAutocompleteSelected: function(event) {
              this.object_number = event;
              this.submit();
          },
          onAutocompleteChange: function(event) {
              this.object_number = event;
          },
    },
      watch: {
          autocompleteSearch: _.debounce(function(query) { this.$store.dispatch('autocomplete/FETCH', query) }, 500)
      },
      computed: {
          ...mapWaitingGetters({
              loadingArtwork: 'artwork loading',
          }),
          autocomplete_results() {
              return this.$store.state.autocomplete.results;
          }
      },
      created() {},
      mounted() {},
      destroyed() {}
  };
</script>

<style lang="scss">
  #app {
      .autocomplete {
          input, button {
              border-color: #333;
              color: #333;
              border-radius: 0;
          }
          button {
              &:hover {
                  color: #FFF;
              }
              font-size: inherit;
              margin-left: 0.25rem;
          }
          .vbt-autcomplete-list {
              .list-group-item-action.active {
                  background-color: #6c757d;
                  color: #FFF;
              }
          }
      }
  }
</style>