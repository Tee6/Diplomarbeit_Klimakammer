<template>
    <nav>
        <a class="title">Klimakammer</a> |
        <router-link class="navlink" to="/auto">Auto </router-link> |
        <router-link class="navlink" to="/manu">Manuell</router-link>
    </nav>
</template>

<style>
router-view {
    z-index: 3;
}

nav {
    border-style: ridge;
    padding: 10px;
    display: flex;
    align-items: center;
    z-index: 2;
    background-color: white;
}

nav a router-link {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}

.title {
    padding: 10px;
    font-size: larger;
}

.navlink {
    padding-left: 20px;
    padding-right: 20px;
}
</style>
