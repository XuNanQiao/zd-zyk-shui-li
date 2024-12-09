<template>
    <svg class="ban-title-box">
        <defs>
            <linearGradient id="gradient" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" :stop-color="color[0]" />
                <stop offset=" 28%" :stop-color="color[1]" />
                <stop offset="100%" :stop-color="color[2]" />
            </linearGradient>
            <filter id="shadow">
                <feDropShadow dx="-0.29" dy="-0.48" stdDeviation="8" flood-color="#001A3E" />
            </filter>
        </defs>
        <text x="50%" y="50%"><slot></slot></text>
    </svg>
</template>
<<script setup lang="ts">

const props = defineProps({
  color: {
    type: Array,
    default: ()=>[]
  }, 
  
})
</script>
<style lang="scss" scoped>
.ban-title-box {
    position: absolute;
    top: 168px;
    width: 100%;
    text-align: center;

    text {
        font-family: 'AlimamaShuHeiTi';
        text-anchor: middle;
        dominant-baseline: middle;
        fill: url(#gradient);
        font-size: 120px;
        font-weight: bold;
        stroke-width: 18px;
        stroke: #fff;
        paint-order: stroke;
        /*先描边*/
        filter: url(#shadow);
    }
}
</style>