<template>
     <div>
        <div class="font-serif text-white py-4 lg:py-6 mb-8 bg-red-600">
            <h1 class="text-3xl font-bold text-center">Game Over</h1>
        </div>

        <div class="container">
            <h3 class="mb-2">{{ data.party }} have won the game.</h3>
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
