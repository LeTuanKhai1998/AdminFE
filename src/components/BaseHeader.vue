<template>
    <div class="header" :class="{[`bg-${type}`]: type}" v-lazy:background-image="banner.url">
        <div class="container-fluid">
            <div class="header-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'base-header',
        props: {
            banner: {
                type: Object,
                default: () => ({
                    'url': ''
                }),
            },
            type: {
                type: String,
                default: 'primary',
                description: 'Header background type'
            }
        }, data() {
            return {}
        },

    }
</script>
<style>
</style>
