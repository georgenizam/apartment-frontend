<template>
  <div class="textarea-wrap">
    <textarea v-bind="$attrs" :class="classes" :value="value" @input="handleInput" />
    <label class="label" v-if="withFloatPlaceholder">
      {{ label }}
    </label>
    <error-messages :messages="messages" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { PropType } from 'vue';
import ErrorMessages from '~/components/base/ErrorMessages.vue';

@Component({ components: { ErrorMessages } })
export default class BaseTextarea extends Vue {
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
      'textarea',
      { 'textarea--float-placeholder': this.withFloatPlaceholder },
      { 'textarea--success': this.isSuccess },
      { 'textarea--error': this.isError },
    ];
  }

  handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.$emit('input', target.value);
  }
}
</script>

<style lang="scss" scoped>
.textarea-wrap {
  position: relative;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  min-width: 250px;
  min-height: 120px;
}
.textarea {
  width: 100%;
  min-height: 120px;
  height: 100%;
  resize: none;
  border-radius: inherit;
  padding: 12px 16px;
  border: 1px solid $color-gainsboro;
  @include base-transition();
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
    &:not(:placeholder-shown).textarea:not(:focus) ~ .label {
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
  font-weight: 400;
  color: $color-cadet-gray;
  pointer-events: none;
  @include base-transition();
}
</style>
