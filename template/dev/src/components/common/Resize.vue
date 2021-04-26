<template>
  <div id="app" :style="{ fontSize: fSize+'px' }">
    <slot></slot>
  </div>
</template>

<script>
import { isMobile } from '@/tools/Helpers';

const defaultWidth = 1440;
const defaultFont = 16;
const minWidth = 768;
const minHeight = 600;
const defaultHeight = 720;

export default {
  name: 'Resize',
  mounted() {
    window.addEventListener('resize', this.onResize.bind(this));
    this.$root.$emit('onResize');
  },
  data() {
    return {
      vW: window.innerWidth,
      vH: window.innerHeight,
    };
  },
  computed: {
    isMobileStatus() {
      return isMobile() || this.vW < minWidth;
    },
    fSize() {
      const horizontalRatio = Math.max(minWidth, this.vW) / defaultWidth;
      const verticalRatio = Math.max(minHeight, this.vH) / defaultHeight;
      const minRatio = Math.min(horizontalRatio, verticalRatio);
      return this.isMobileStatus ? defaultFont : defaultFont * minRatio;
    },
  },
  methods: {
    onResize() {
      this.$root.$emit('onResize');
      this.vW = window.innerWidth;
      this.vH = window.innerHeight;
    },
  },
};
</script>
