<template>
  <label class="checkbox" :class="{ nowrap: nowrap }">
    <input
      class="checkbox__input"
      type="checkbox"
      :checked="checked"
      :value="value"
      @change="handleChange"
    />
    <span class="checkbox__checkmark" />
    {{ label }}
  </label>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BaseCheckbox extends Vue {
  @Prop({ type: Boolean, default: false })
  nowrap: boolean;

  @Prop({ type: String, default: '' })
  value: string;

  @Model('change', { type: Boolean, default: false })
  checked: boolean;

  @Prop({ type: Boolean, default: false })
  group: boolean;

  @Prop({ type: String, required: true })
  label: string;

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (this.group) {
      return this.$emit('change-group', { value: this.value, checked: target.checked });
    }

    this.$emit('change', target.checked);
  }
}
</script>

<style lang="scss" scoped>
.checkbox {
  display: block;
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  @include no-select();
  font-size: $fontsize;
  &.nowrap {
    @include nowrap();
  }
}
.checkbox__input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  appearance: none;
  z-index: -1;
}
.checkbox__checkmark {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  //top: 2px;
  left: 0;
  height: 20px;
  width: 20px;
  border-radius: 5px;
  background-color: $color-gainsboro;
  border: 1px solid #ccc;
  transition: background-color 0.25s ease, border-color 0.25s ease;
}
.checkbox:hover input ~ .checkbox__checkmark {
  background-color: $color-light-gray;
}
.checkbox input:checked ~ .checkbox__checkmark {
  background-color: $color-accent;
  background-image: url('~@/assets/icons/check-icon.svg');
  background-repeat: no-repeat;
  background-position: center;
  border-color: $color-accent;
}
</style>
