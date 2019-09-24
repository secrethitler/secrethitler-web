<template>
     <div>
        <page-title>Game Over</page-title>

        <div class="container">
            <h3 class="mb-2 font-old text-4xl">{{ data.party }}s have won the game.</h3>
            <p>{{ data.reason }}</p>
        </div>
     </div>            
</template>

<script>
export default {
    props: ['data']
}
</script>

<style>

</style>
