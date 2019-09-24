<template>
    <div>
        <page-title>You have been executed</page-title>

        <div class="container flex justify-center py-16 px-8">
            <div class="max-w-4xl">
                <img src="../assets/skull.png" alt="Skull" />
            </div>
            <div class="flex justify-center py-4">
                <router-link
                    class="btn shadow"
                    :to="{ name: 'info', params: { id: $route.params.id } }"
                >Back</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
</style>
