<template>
  <div class="holder">
    <slot></slot>
  </div>
</template>

<script>
  import { getOrientation, getRotationAngle } from '../js/util'
  export default {
    updated() {
      const slot = this.$slots.default[0]
      if (slot.tag !== 'img') {
        console.error('Warning: slot should be an img tag.')
        return
      }
      const holder = this.$el
      const img = holder.childNodes[0]

      getOrientation(img).then(function (currentOrientation) {
        const angle = getRotationAngle(1, currentOrientation)
        const transform = `rotateY(${angle.y}deg) rotateZ(${angle.z}deg)`

        if (angle.z % 180 !== 0) {
          // const height = img.clientHeight
          // const width = img.clientWidth
          holder.style['width'] = '100%'
          holder.style['height'] = 'auto'
        }
        img.style['vertical-align'] = 'bottom'
        img.style['transform'] = transform
        img.style['width'] = '100%'
      })
    }
  }
</script>

<style scoped>
  .holder {
    display: inline-block;
    overflow: hidden;
  }
</style>