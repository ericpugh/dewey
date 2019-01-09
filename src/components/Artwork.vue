<template>
    <div class="artwork alert">
        <div v-if="loading">
            <img src=""/>
            Loading.....
        </div>

        <code></code>
        <h1>{{ artwork.title }}</h1>
        <p>Molestias eos senectus scelerisque hendrerit sagittis reiciendis orci modi occaecati nibh incididunt minus doloribus fusce reprehenderit nobis cum facilis esse? Maxime rhoncus dignissimos volutpat convallis arcu felis fringilla labore ratione, hic commodo, platea! Ipsum praesent tempor. Explcabo aperiam perspiciatis, error totam enim! Potenti sequi. Parturient! Delectus asperiores vehicula ultrices. Explicabo.</p>
        <p>Pulvinar ab congue, fames hic. Consectetuer, odit? Tortor saepe, totam. Bibendum varius, porta curabitur quis, scelerisque quae praesentium aliquam omnis iaculis modi? Egestas, ultricies blandit nihil mi maiores repudiandae malesuada. Tenetur blanditiis semper odio? Adipisicing fugit? Sem tristique, accumsan a. Dictumst cumque! Earum cupidatat? Porro non soluta aut quo, itaque.</p>
        <p>Molestie anim elementum ad tempor vehicula pulvinar repudiandae mi parturient anim egestas fuga error, purus. Officia. Dis at repellendus aliquam error, cumque? Convallis reiciendis, officiis senectus pellentesque expedita, quo voluptatem. Erat dignissim turpis laudantium, dui quasi incidunt accusantium proin, tellus. Fusce voluptate conubia voluptates diam voluptate incididunt interdum dolorem debitis.</p>
        <p>Modi risus sunt! Eu ut mollitia orci maiores, laudantium aute maiores qui magnis scelerisque, fugit veniam corrupti, etiam eleifend ab eiusmod sociosqu assumenda porttitor. Parturient quo id, voluptates do? Aliqua, expedita beatae ab. Vivamus aliquet, metus. Morbi urna numquam pretium molestiae eum, occaecati facere consequat praesent, nesciunt commodo? Modi fugit.</p>
        <p>Semper! Accumsan tortor ultricies? Maiores mollis, aliquip atque! Augue, ea, aspernatur incididunt? Eros in dolore repellat omnis massa, earum corrupti laborum. Mauris voluptas maecenas per consectetuer alias laboris illum nascetur, habitant eu ultrices! Commodi. Porta tempore? Nam ligula pharetra explicabo, ratione perferendis inceptos a, suspendisse sit eos, euismod? Provident. Voluptatum.</p>
        <p>Molestias eos senectus scelerisque hendrerit sagittis reiciendis orci modi occaecati nibh incididunt minus doloribus fusce reprehenderit nobis cum facilis esse? Maxime rhoncus dignissimos volutpat convallis arcu felis fringilla labore ratione, hic commodo, platea! Ipsum praesent tempor. Explicabo aperiam perspiciatis, error totam enim! Potenti sequi. Parturient! Delectus asperiores vehicula ultrices. Explicabo.</p>
        <p>Pulvinar ab congue, fames hic. Consectetuer, odit? Tortor saepe, totam. Bibendum varius, porta curabitur quis, scelerisque quae praesentium aliquam omnis iaculis modi? Egestas, ultricies blandit nihil mi maiores repudiandae malesuada. Tenetur blanditiis semper odio? Adipisicing fugit? Sem tristique, accumsan a. Dictumst cumque! Earum cupidatat? Porro non soluta aut quo, itaque.</p>
        <p>Molestie anim elementum ad tempor vehicula pulvinar repudiandae mi parturient anim egestas fuga error, purus. Officia. Dis at repellendus aliquam error, cumque? Convallis reiciendis, officiis senectus pellentesque expedita, quo voluptatem. Erat dignissim turpis laudantium, dui quasi incidunt accusantium proin, tellus. Fusce voluptate conubia voluptates diam voluptate incididunt interdum dolorem debitis.</p>
        <p>Modi risus sunt! Eu ut mollitia orci maiores, laudantium aute maiores qui magnis scelerisque, fugit veniam corrupti, etiam eleifend ab eiusmod sociosqu assumenda porttitor. Parturient quo id, voluptates do? Aliqua, expedita beatae ab. Vivamus aliquet, metus. Morbi urna numquam pretium molestiae eum, occaecati facere consequat praesent, nesciunt commodo? Modi fugit.</p>
        <p>Semper! Accumsan tortor ultricies? Maiores mollis, aliquip atque! Augue, ea, aspernatur incididunt? Eros in dolore repellat omnis massa, earum corrupti laborum. Mauris voluptas maecenas per consectetuer alias laboris illum nascetur, habitant eu ultrices! Commodi. Porta tempore? Nam ligula pharetra explicabo, ratione perferendis inceptos a, suspendisse sit eos, euismod? Provident. Voluptatum.</p>
    </div>
</template>

<script>
    // todo: do I move the request to the main App and then set the Artwork component?
    import axios from 'axios';
    axios.defaults.headers.common['Accept'] = 'application/vnd.api+json';
    axios.defaults.headers.common['X-Api-Key'] = process.env.VUE_APP_API_KEY;
//    axios.defaults.headers.common['Content-Type'] = 'application/json';
//    axios.defaults.withCredentials = false;

//    const instance = axios.create({
////        baseURL: 'https://api.si.edu/saam/v1/',
//        headers: {
//            "Access-Control-Allow-Origin": "*",
//            "Access-Control-Allow-Methods": "GET",
//            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
//            "Accept": "application/vnd.api+json",
//            "X-Api-Key": process.env.VUE_APP_API_KEY
//        }
//    });


//    console.log(axios.defaults.headers);
    var endpoint = 'https://api.si.edu/saam/v1/artworks';
    var filters = '?' +
    'filter[object-number-filter][condition][path]=object_number' +
    '&filter[object-number-filter][condition][operator]=%3D' +
    '&filter[object-number-filter][condition][value]=1968.155.8' +
    'filter[is-on-view-filter][condition][path]=is_on_view' +
    '&filter[is-on-view-filter][condition][operator]=%3D' +
    '&filter[is-on-view-filter][condition][value]=true' +
    '&page[limit]=1';

    export default {
        name: 'artwork',
        data () {
            return {
                artwork: {},
                loading: false,
                requestUrl: endpoint + filters
            }
        },
        // Fetches posts when the component is created.
        created() {
            this.loading = true;
            axios.get(this.requestUrl, {credentials: false, mode: 'no-cors'})
                .then((response)  =>  {
                    this.loading = false;
                    this.artwork = response.data.value;
                }, (error)  =>  {
                    this.loading = false;
                    console.log(error);
                })

        },
        methods: {
            getRequestUrl (objectNumber) {
                // TODO: build the endpoint with a given object number
            }
//            getArtworks: function () {
//            }
        },
    }


</script>

<style scoped lang="scss">
    .artwork {
        background-color: #EFEFEF;
        text-align: left;
        margin: 1rem;
    }
</style>
