<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light shadow-sm">
      <router-link to="/" class="navbar-brand">
          <img alt="Smithsonian American Art logo" src="../assets/logo.png" height="30" class="d-inline-block align-top">
          &nbsp; Object Number Lookup
      </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link to="/saved" class="nav-link">
                        <img height="30" width="30" src="~open-iconic/svg/bookmark.svg" alt="bookmark" />
                        Saved
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/help" class="nav-link">
                        <img height="30" width="30" src="~open-iconic/svg/info.svg" alt="info" />
                        Help
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<scritp>

</scritp>

<styles>

</styles>