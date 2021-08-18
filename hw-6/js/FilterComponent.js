Vue.component('search', {
    data() {
        return {
            search: null
        }
    },
    template: `
        <form action="#" class="search-form" @submit.prevent="filter">
            <input type="text" class="search-field" v-model="search">
            <button type="submit" class="btn-search">
                <i class="fas fa-search"></i>
            </button>
        </form>
    `,
    methods: {
        filter() {
            this.$emit("filter", this.search);
        }
    }
})
