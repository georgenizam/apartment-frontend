<template>
  <div class="input-wrap">
    <input
      :class="classes"
      v-bind="$attrs"
      :placeholder="label"
      ref="input"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @keydown.esc="$refs.input.blur()"
    />
    <label v-if="withFloatPlaceholder" class="label">
      {{ label }}
    </label>
    <error-messages :messages="messages" />
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Component, Vue, Prop } from 'vue-property-decorator';
import ErrorMessages from '@/components/base/ErrorMessages.vue';

@Component({ components: { ErrorMessages } })
export default class BaseInput extends Vue {
  @Prop({ type: String, default: ' ' })
  label: string;

  @Prop({ type: Boolean, default: false })
  withFloatPlaceholder: boolean;

  @Prop({ type: Boolean, default: false })
  isSuccess: boolean;

  @Prop({ type: Boolean, default: false })
  isError: boolean;

  @Prop({ type: Array as PropType<string[]>, default: () => [] })
  messages: string[];

  @Prop({ default: null })
  value: string | null;

  get classes() {
    return [
      'input',
      { 'input--float-placeholder': this.withFloatPlaceholder },
      { 'input--success': this.isSuccess },
      { 'input--error': this.isError },
    ];
  }
}
</script>

<style lang="scss" scoped>
.input-wrap {
  position: relative;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  max-width: 700px;
  height: inherit;
}
.input {
  height: inherit;
  width: 100%;
  border-radius: inherit;
  //padding: 12px 16px;
  padding: 7px 16px;
  border: 1px solid $color-gainsboro;
  &--float-placeholder {
    padding-top: 18px;
    padding-bottom: 6px;
    &::placeholder {
      color: transparent;
    }
    &:focus {
      //background: transparent;
    }
    &:focus ~ .label,
    &:not(:placeholder-shown).input:not(:focus) ~ .label {
      //top: 2px;
      transform: translateY(-13px);
      //left: 6px;
      font-size: 13px;
    }
  }
  &--success {
    border-color: $color-success;
  }
  &--error {
    border-color: $color-error;
  }
}
.label {
  position: absolute;
  top: 15px;
  left: 16px;
  font-size: 16px;
  font-weight: 500;
  color: $color-cadet-gray;
  pointer-events: none;
  @include base-transition();
}
</style>
