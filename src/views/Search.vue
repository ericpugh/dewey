<template>
  <div class="search page">
    <Navbar/>
    <form name="search" class="autocomplete" @submit.prevent="submit">
        <vue-bootstrap-typeahead
                :data="autocomplete_results"
                v-model="autocompleteSearch"
                size="lg"
                placeholder="i.e. 1984.149.1"
                v-on:hit="onAutocompleteSelected"
                v-on:input="onAutocompleteChange">
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
              // TODO: pull Artwork from "recent" list if exists, before making the async action.
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
                  // TODO: Filter by on view items.
                  '&sort=object_number';
              '&page[limit]=10';
              await axios.get(endpoint + filters)
                  .then((response) => {
                      // Convert response data to Artwork class.
                      let artworks = response.data.data;
                      // Build results
                      let results = [];
                      _.each(artworks, function (artwork) {
                          results.push(artwork.attributes.object_number)
                      });
                      console.log('Autocomplete results:');
                      console.log(results);
                      // uses Vue.set to be sure to be deeply reactive
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
          position: relative;
          input {
              font-size: inherit;
              border-radius: 0;
          }
          .autocomplete-results {
              padding: 0;
              margin-top: calc(2.25rem + 2px);
              border: 1px solid #eeeeee;
              height: 200px;
              overflow: auto;
              width: 100%;
              position: absolute;
              z-index: 99999;
              background-color: #ffffff;
          }
          .autocomplete-result {
              list-style: none;
              text-align: left;
              padding: 4px 2px;
              cursor: pointer;
          }
          .autocomplete-result.is-active,
          .autocomplete-result:hover {
              background-color: #111111;
              color: #ffffff;
          }
      }
  }
</style>