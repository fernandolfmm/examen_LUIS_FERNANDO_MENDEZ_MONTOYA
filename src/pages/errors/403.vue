<template>
  <v-app id="403">
    <v-container fluid fill-height>
      <v-layout align-center justify-center row>
        <div class="text-md-center">
          <h1>403</h1>
          <h2 class="my-3 headline ">Sorry, access denied</h2>
        </div>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'accessDenied',
  mounted() {
    setTimeout(() => {
      this.$router.push('/login')
    }, 1500)
  }
}
</script>

<style scoped>
  h1 {
    font-size: 150px;
    line-height: 150px;
    font-weight: 700;
    color: white;
  }
  h2 {
    color: white;
  }
</style>
