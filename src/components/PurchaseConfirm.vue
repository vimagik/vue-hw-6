<script setup>
const dialog = defineModel()
</script>

<template>
    <v-dialog v-model="dialog" width="auto">
        <v-card min-width="400" prepend-icon="mdi-cart-check" title="Подтверждение">
            <v-card-text>
                Товар добавлен в корзину
            </v-card-text>
            <v-btn block @click="dialog = false">ОК</v-btn>
        </v-card>
    </v-dialog>
</template>
