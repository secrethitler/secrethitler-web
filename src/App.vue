<template>
    <div>
        <router-view />
    </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Pirata+One|Roboto+Slab|Roboto:400,400i,700,900&display=swap');

body {
    @apply antialiased bg-gray-100 font-sans;
}

@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
