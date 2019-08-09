<template>
    <div>

        <div class="border-b-4 border-red-800 bg-red-600 text-yellow-200">
            <div class="container">
                <div class="flex flex-wrap items-center relative lg:w-3/4 mx-auto px-4">
                    <div class="w-full lg:w-1/2 py-16">
                        <h1
                            class="font-old font-bold uppercase tracking-widest text-6xl whitespace-no-wrap"
                        >Secret Hitler</h1>
                        <div class="text-white font-serif text-xl mb-12">
                            <p
                                class="mb-4"
                            >Secret Hitler is a social deduction game for 5-10 people about finding and stopping the Secret Hitler.</p>
                        </div>
                        <div class="flex">
                            <router-link :to="{ name: 'game.join' }" class="btn mr-6">Join Game</router-link>

                            <router-link
                                :to="{ name: 'game.create' }"
                                class="btn btn--secondary"
                            >Create a new Game</router-link>
                        </div>
                    </div>
                    <div class="w-full lg:w-1/2 hidden lg:flex justify-center relative py-4">
                        <img
                            src="../assets/landingpage/illustration.png"
                            alt="Illustration"
                            class="illustration mx-auto"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-yellow-100">
            <div class="container flex justify-center">
                <div class="flex flex-wrap relative lg:w-3/4 -mx-4">
                    <div class="w-full lg:w-1/2 pt-12 pxl-4 pr-12">
                        <img src="../assets/landingpage/liberal.png" alt="">
                    </div>
                    <div class="w-full lg:w-1/2 py-12 text-gray-700 font-serif text-lg px-4">
                        <p
                            class="mb-4"
                        >Players are secretly divided into two teams: the liberals, who have a majority, and the fascists, who are hidden to everyone but each other. If the liberals can learn to trust each other, they have enough votes to control the elections and save the day. But the fascists will say whatever it takes to get elected, advance their agenda, and win the game.</p>
                        <p
                            class="mb-4"
                        >The standard edition is identical to the edition of Secret Hitler that shipped to Kickstarter backers in 2016, including foil inlays on the boards and wooden placards for the Chancellor and President.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
h1 {
    @screen lg {
        font-size: 5rem;
    }
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.illustration {
    // bottom: -9rem;
    max-width: 12rem;
}

.btn {
    @apply bg-white font-sans border-4 border-white text-red-600 uppercase font-bold tracking-wider px-6 py-3 leading-none text-lg;
    transition: all 0.2s ease;

    &:hover {
    }

    &.btn--secondary {
        @apply bg-transparent text-white;
    }
}
</style>

