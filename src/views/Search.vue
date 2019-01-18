<template>
  <div class="search page">
    <Navbar/>
        <div class="autocomplete input-group">
            <input v-model="object_number"
                    type="text"
                    @input="onAutocompleteChange"
                    @keydown.down="onAutocompleteArrowDown"
                    @keydown.up="onAutocompleteArrowUp"
                    @keydown.enter="onAutocompleteEnter"
                    placeholder="i.e. 1984.149.1"
                    autofocus="autofocus"
                    class="form-control table-cell fill-width"
            />
            <div class="input-group-append">
                <button @click="submit" class="btn btn-outline-secondary" type="button">Find</button>
            </div>
            <ul id="autocomplete-results" v-show="isAutocompleteOpen" class="autocomplete-results">
                <li v-if="isAutocompleteLoading" class="loading">
                    Loading results...
                </li>
                <li v-else
                    v-for="(result, i) in autocompleteResults"
                    :key="i"
                    @click="setAutocompleteResult(result)"
                    class="autocomplete-result"
                    :class="{ 'is-active': i === autocompleteArrowCounter }">
                    {{ result }}
                </li>
            </ul>
        </div>

      <div v-if="loadingArtwork" class="display-4 text-center">
          <p class="loading animate">Loading<span>.</span><span>.</span><span>.</span></p>
      </div>

      <ArtworkRecord/>
  </div>
</template>

<script>
    import Artwork from '../models/ArtworkClass'
    import axios from 'axios';
    import Navbar from "@/components/Navbar.vue";
    import ArtworkRecord from "@/components/ArtworkRecord.vue";
    import { mapWaitingGetters } from 'vue-wait'

    export default {
      name: "search",
      components: {
        Navbar,
        ArtworkRecord
      },
      props: {
          autocompleteItems: {
              type: Array,
              required: false,
              default: () => ['1994.17', '1990.26', '1984.149.1', '1968.155.8', '1968.155.64', '1968.155.15', '1967.116', '1965.16.14'],
          }
      },
      data: function () {
          return {
              object_number: '',
              autocompleteResults: [],
              isAutocompleteOpen: false, // TODO: use vue-wat for autocomplete loading?
              isAutocompleteLoading: false,
              autocompleteArrowCounter: 0,
          }
      },
      methods: {
          submit: async function () {
              // TODO: disable the "submit" button if the input value is equal to the current object number.
              this.$wait.start('artwork loading');
              this.isAutocompleteOpen = false;
              this.autocompleteArrowCounter = -1;
              await this.$store.dispatch('artwork/search', this.object_number).then(() => {
                  this.$wait.end('artwork loading');
              });
          },
          onAutocompleteChange() {
              // @TODO: load autocomplete items from American Art API, don't show autocomplete box if empty results.

              // Is the autocomplete data given by an outside ajax request?
//                if (this.isAsync) {
//                    this.isAutocompleteLoading = true;
//                } else {
              // Let's  our flat array
              this.filterAutocompleteResults();
              this.isAutocompleteOpen = true;
//                }
          },
          filterAutocompleteResults() {
              this.autocompleteResults = this.autocompleteItems.filter((item) => {
                  return item.indexOf(this.object_number) > -1;
              });
          },
          setAutocompleteResult(result) {
              this.object_number = result;
              this.isAutocompleteOpen = false;
              this.submit(this.object_number);
          },
          onAutocompleteArrowDown() {
              if (this.autocompleteArrowCounter < this.autocompleteResults.length) {
                  this.autocompleteArrowCounter = this.autocompleteArrowCounter + 1;
              }
          },
          onAutocompleteArrowUp() {
              if (this.autocompleteArrowCounter > 0) {
                  this.autocompleteArrowCounter = this.autocompleteArrowCounter -1;
              }
          },
          onAutocompleteEnter() {
              this.object_number = this.autocompleteResults[this.autocompleteArrowCounter];
              this.isAutocompleteOpen = false;
              this.autocompleteArrowCounter = -1;
          },
          handleAutocompleteClickOutside(evt) {
              if (!this.$el.contains(evt.target)) {
                  this.isAutocompleteOpen = false;
                  this.autocompleteArrowCounter = -1;
              }
          },
    },
      watch: {
          autocompleteItems: function (val, oldValue) {
              // actually compare them
              if (val.length !== oldValue.length) {
                  this.autocompleteResults = val;
                  this.isAutocompleteLoading = false;
              }
          }
      },
      computed: {
          ...mapWaitingGetters({
              loadingArtwork: 'artwork loading',
          })
      },

      mounted() {
          document.addEventListener('click', this.handleAutocompleteClickOutside)
      },
      destroyed() {
          document.removeEventListener('click', this.handleAutocompleteClickOutside)
      }
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