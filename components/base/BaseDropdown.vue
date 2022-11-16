<template>
  <div v-click-outside="handleClickOutside" class="dropdown">
    <div class="dropdown-toggle" @click="toggleDropdown">
      <slot name="toggle" :isOpen="isOpen">toggle</slot>
    </div>
    <div class="dropdown-content" v-show="isOpen">
      <slot name="content">content</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BaseDropdown extends Vue {
  isOpen: boolean = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  handleClickOutside() {
    this.isOpen && this.toggleDropdown();
  }
}
</script>

<style lang="scss" scoped>
.dropdown {
  border-radius: inherit;
  &-toggle {
    cursor: pointer;
    border-radius: inherit;
  }
  &-content {
    margin-top: 10px;
    position: absolute;
    left: 0;
    z-index: 10;
    background: $color-white;
    border-radius: 5px;
    padding: 10px 10px;
    box-shadow: 0 10px 20px 0 rgb(0 0 0 / 10%);
  }
}
</style>
