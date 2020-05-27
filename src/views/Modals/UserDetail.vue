<template>
    <modal :show.sync="isVisible">
        <template slot="header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        </template>
        <div>
            ...
        </div>
        <template slot="footer">
            <base-button type="secondary" @click="isVisible = false">Close</base-button>
            <base-button type="primary">Save changes</base-button>
        </template>
    </modal>
</template>

<script>
    export default {
        name: "UserDetail",
        props:{
            isVisible:{
                type: Boolean
            }
        }
    }
</script>

<style scoped>

</style>