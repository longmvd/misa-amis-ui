<template>
    <a href="" class="tooltip" v-if="config.isShow" :style="config.position">{{config.title}}</a>
</template>

<script>
export default {
    name: 'BaseTooltip',
    props:['config'],
    methods:{

    }

}
</script>
<style>

</style>