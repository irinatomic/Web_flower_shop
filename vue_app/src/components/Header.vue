<template>
    <div class="header">
        <h1>{{ title }}</h1>
    </div>
</template>
  
<script>
export default {
    name: 'Header',
    props: {
        title: String
    }
}
</script>
  
<style scoped>
.header {
    font-family: 'Gloock', serif;
    text-align: center;
    color: #e2dae8;
    padding: 20px;
    margin-bottom: 5px;
    border-bottom: 2px solid #36213E;
}
</style>
