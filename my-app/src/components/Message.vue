<template>
    <div class="box is-info">
        <p>
            <slot></slot>
        </p>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
    .box {
        border: 1px solid black;
        background-color: gray;
        width: 30%;
        margin-top: 3rem;
    }
</style>
