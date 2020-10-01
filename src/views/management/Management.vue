<template>
  <div>
    <router-view />
     <admin-nav-bar></admin-nav-bar>
  </div>
</template>
 
<script>
import adminNavBar from "components/content/admin-navbar/AdminNavBar"

export default {
  name:'',
  components:{
    adminNavBar,
  }
}
</script>

<style scoped>

</style>