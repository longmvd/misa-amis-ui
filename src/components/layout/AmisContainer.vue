<template>
    <div class="container">
        <amis-header></amis-header>
        <amis-content></amis-content>
    </div>
</template>

<script>
import AmisHeader from './AmisHeader.vue'
import AmisContent from './AmisContent.vue';
export default {
    name: 'AmisContainer',
    components: {
        AmisHeader,
        AmisContent
    },
    props: {

    }
};
</script>
<style></style>

