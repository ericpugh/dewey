<template>
    <div class="home">
        <Navbar/>
        <h1>This is the saved list page.</h1>
        <ul class="list-group">
            <li class="list-group-item">Cras justo odio</li>
            <li class="list-group-item">Dapibus ac facilisis in</li>
            <li class="list-group-item">Morbi leo risus</li>
            <li class="list-group-item">Porta ac consectetur ac</li>
            <li class="list-group-item">Vestibulum at eros</li>
        </ul>
    </div>
</template>

<script>
    import Navbar from "@/components/Navbar.vue";

    export default {
        name: "saved",
        components: {
            Navbar
        }
    };
</script>
