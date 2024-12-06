<script setup>
import { ref } from 'vue';

const productData = ref({
    name: '',
    desc: '',
    category: '',
    price: 0,
    image: null
})

const rules = {
    required: value => !!value || 'Обязательное поле',
    money: value => value > 0 || 'Введите положительное число',
    fileRequired: value => !!value.length || 'Обязательное поле'
}

const formProduct = ref(null)
const status = ref(null)

const addProduct = async function () {
    const { valid } = await formProduct.value.validate()
    if (valid) {
        fetch("https://httpbin.org/post", {
            method: "POST",
            body: JSON.stringify(productData.value)
        }).then((res) => {
            status.value = res.status
            if (res.status === 200) formProduct.value.reset()
        })
    }
}
</script>

<template>
    <v-container fluid class="d-flex justify-center">
        <AppHeader />
        <v-list width="1000">
            <h1 class="text-h6 text-center">Добавление товара</h1>
            <v-card-text>
                <v-form ref="formProduct">
                    <v-container fluid>
                        <v-text-field v-model="productData.name" :rules="[rules.required]"
                            label="Наименование"></v-text-field>
                        <v-textarea v-model="productData.desc" :rules="[rules.required]" label="Описание"></v-textarea>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="productData.category" :rules="[rules.required]"
                                    label="Категория"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="productData.price" :rules="[rules.required, rules.money]"
                                    label="Стоимость" type="number"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-file-input v-model="productData.image" accept="image/png, image/jpeg, image/bmp"
                            :rules="[rules.fileRequired,]" label="Фото"></v-file-input>
                        <v-btn color="primary" @click="addProduct">Добавить</v-btn>
                        <v-btn class="ml-3" @click="formProduct.reset()">Сбросить</v-btn>
                        <v-alert v-if="status === 200" class="mt-5" type="success">Товар добавлен</v-alert>
                        <v-alert v-if="status !== 200 && status" class="mt-4" type="warning"
                            text="Что-то пошло не так"></v-alert>
                    </v-container>
                </v-form>
            </v-card-text>
        </v-list>
    </v-container>
</template>