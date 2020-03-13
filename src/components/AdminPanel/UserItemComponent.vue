<template>
  <v-card class="mr-1 mb-1 pa-1">
    <v-toolbar flat>
      <v-icon>mdi-account</v-icon>
      <v-toolbar-title class="font-weight-light">{{
        item.email
        }}
      </v-toolbar-title>
      <v-spacer/>
      <v-btn @click="isEditing = !isEditing" color="orange" fab small>
        <v-icon v-if="isEditing">mdi-close</v-icon>
        <v-icon v-else>mdi-pencil</v-icon>
      </v-btn>
    </v-toolbar>
    <v-text-field :disabled="!isEditing" label="Почта" v-model="item.email"/>
    <v-text-field :disabled="!isEditing" label="Имя" v-model="item.firstName"/>
    <v-text-field :disabled="!isEditing" label="Фамилия" v-model="item.secondName"/>
    <v-text-field :disabled="!isEditing" label="Пароль" v-model="item.password"/>
    <v-text-field :disabled="!isEditing" label="Роль" v-model="item.role"/>
    <v-text-field :disabled="!isEditing" label="Класс" v-model="item.classNumber"/>
    <v-text-field :disabled="!isEditing" label="Дата регистрации" v-model="item.registrationTime"/>
    <v-text-field :disabled="!isEditing" label="Предметы для изучения" v-model="item.subjects"/>
    <v-autocomplete
        :disabled="!isEditing"
        :items="$store.getters.GetList"
        chips
        label="Предметы для изучения"
        multiple
        v-model="item.subjects"
    />
    <v-divider/>
    <v-card-actions>
      <v-spacer/>
      <v-btn class="error">
        <v-icon>mdi-delete</v-icon>
        Удалить пользователя
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
    export default {
        name: "UserItemComponent",
        props: {
            item: Object,
        },
        data() {
            return {
                isEditing: false
            };
        }
    };
</script>

<style scoped></style>
