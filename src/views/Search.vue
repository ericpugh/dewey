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
    // import Artwork from '../models/ArtworkClass'
    import Navbar from "@/components/Navbar.vue";
    import ArtworkRecord from "@/components/ArtworkRecord.vue";
    import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
    import axios from 'axios';
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
              autocomplete_results: [],
              autocompleteSearch: ''
          }
      },
      methods: {
          submit: async function () {
              console.log('Artwork fetch:');
              console.log('Object Number: ' + this.object_number);
              // TODO: disable the "submit" button if the input value is equal to the current object number.
              this.$wait.start('artwork loading');
              // TODO: pull Artwork from "recent" list if exists, before making the async action!!
              await this.$store.dispatch('artwork/fetch', this.object_number).then(() => {
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
          async getAutocompleteResults(query) {
              axios.defaults.headers.common['Accept'] = 'application/vnd.api+json';
              axios.defaults.headers.common['X-Api-Key'] = process.env.VUE_APP_API_KEY;
              var endpoint = 'https://cors-anywhere.herokuapp.com/https://api.si.edu/saam/v1/artworks';
              var filters = '?' +
                  'fields[artworks]=object_number' +
                  '&filter[filter-group][group][conjunction]=AND' +
                  '&filter[object-number-filter][condition][path]=object_number' +
                  '&filter[object-number-filter][condition][operator]=STARTS_WITH' +
                  '&filter[object-number-filter][condition][value]=' + query +
                  '&filter[object-number-filter][condition][memberOf]=filter-group' +
                  '&filter[is-on-view-filter][condition][path]=is_on_view' +
                  '&filter[is-on-view-filter][condition][operator]=CONTAINS' +
                  '&filter[is-on-view-filter][condition][value]=1' +
                  '&filter[is-on-view-filter][condition][memberOf]=filter-group' +
                  '&sort=object_number' +
                  '&page[limit]=10';
              await axios.get(endpoint + filters)
                  .then((response) => {
                      let artworks = response.data.data;
                      // Filter results.
                      let results = [];
                      _.each(artworks, function (artwork) {
                          results.push(artwork.attributes.object_number)
                      });
                      this.autocomplete_results = results;
                  })
                  .catch(error => {
                      // in case of error, empties the Artwork
                      this.autocomplete_results = [];
                      return Promise.reject(error);
                  });
          },
    },
      watch: {
          autocompleteSearch: _.debounce(function(query) { this.getAutocompleteResults(query) }, 500)
      },
      computed: {
          ...mapWaitingGetters({
              loadingArtwork: 'artwork loading',
          })
      },
      created() {},
      mounted() {},
      destroyed() {}
  };
</script>

<style lang="scss">
  #app {
    padding-top: 70px;
      .alert {
          margin: 1rem 0;
      }
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