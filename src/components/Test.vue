<template>
    <div class="emit">Ha ha</div>
    <button @click="showData">HIHIHIHI</button>
</template>
<script>
export default {
    name: 'TestVue',
    data(){
        return {
            name: 'Long'
        }
    },
    emits:['showName'],
    methods: {
        showData(){
            this.$emit('showName', this.name+=1)
        }
    }
}
</script>
<style>

</style>