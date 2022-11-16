<template>
  <div
    ref="rootElementRef"
    :class="['app-spinner', { 'app-spinner--fullscreen': fullscreen }]"
    tabindex="0"
    @focusout="catchFocus()"
  >
    <div class="app-spinner__overlay" />
    <div class="app-spinner__icon">
      <spinner-icon />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SpinnerIcon from '~/assets/icons/spinner-icon.svg?inline';

@Component({ components: { SpinnerIcon } })
export default class BaseSpinner extends Vue {
  @Prop({ type: Boolean, default: false })
  fullscreen: boolean;

  @Prop({ type: Boolean, default: false })
  shouldCatchFocus: boolean;

  $refs: {
    rootElementRef: HTMLElement;
  };

  lastActiveElement: HTMLElement | null = null;

  storeLastActiveElement() {
    this.lastActiveElement = document.activeElement as HTMLElement;
  }

  catchFocus() {
    this.$refs.rootElementRef.focus();
  }

  restoreLastFocus() {
    this.lastActiveElement?.focus();
  }

  mounted() {
    this.storeLastActiveElement();
    if (this.shouldCatchFocus) {
      this.catchFocus();
    }
  }

  beforeDestroy() {
    this.restoreLastFocus();
  }
}
</script>

<style lang="scss" scoped>
.app-spinner {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  border-radius: inherit;

  &:focus {
    outline: none;
  }

  &__icon {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    padding: 5px;
    aspect-ratio: 1;
    max-height: 50px;
    background-repeat: no-repeat;
    background-size: contain;
    animation: spinnerAnimation 0.6s infinite linear;
  }

  &__overlay {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: inherit;
  }

  &--fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
  }
}

@keyframes spinnerAnimation {
  0% {
    transform: translate(-50%, -50%) rotate(0);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
