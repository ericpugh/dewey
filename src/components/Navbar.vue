<template>
    <b-navbar toggleable="md" type="light" fixed="top" class="bg-light shadow-sm">
        <b-navbar-brand>
            <router-link to="/" class="navbar-brand" v-scroll-to="{ el: '#app', duration: 300, easing: 'ease-out'}">
                <img alt="Smithsonian American Art logo" src="../assets/logo.png" height="30" class="d-inline-block align-top">
                &nbsp; <span class="navbar-text d-none d-sm-inline">Object Number Lookup</span>
            </router-link>
        </b-navbar-brand>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_collapse">
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item>
                    <router-link to="/recent" class="nav-link" v-scroll-to="{ el: '#app', duration: 300, easing: 'ease-out'}">
                        <img height="30" width="30" src="~open-iconic/svg/bookmark.svg" alt="bookmark" />
                        Recent
                    </router-link>
                </b-nav-item>
                <b-nav-item>
                    <router-link to="/help" class="nav-link" v-scroll-to="{ el: '#app', duration: 300, easing: 'ease-out'}">
                        <img height="30" width="30" src="~open-iconic/svg/info.svg" alt="info" />
                        Help
                    </router-link>
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>
