<template>
  <Resize>
    <router-view></router-view>
  </Resize>
</template>
<script>
import Resize from '@/components/common/Resize.vue';

export default {
  name: 'App',
  components: {
    Resize,
  },
};
</script>
