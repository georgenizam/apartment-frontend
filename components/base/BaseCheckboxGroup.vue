<template>
  <div class="checkbox-group">
    <base-checkbox
      v-for="optionItem in options"
      :key="optionItem.value"
      class="checkbox-item"
      :label="optionItem.label"
      :value="optionItem.value"
      :checked="value.includes(optionItem.value)"
      @change-group="handleChange"
      group
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { PropType } from 'vue';
import BaseCheckbox from '~/components/base/BaseCheckbox.vue';
import { ChecboxGroupValue, CheckboxGroupOption } from '~/types/base/checkbox.type';

@Component({
  components: { BaseCheckbox },
})
export default class BaseCheckboxGroup extends Vue {
  @Prop({ type: Array, default: () => [] })
  value: string[];

  @Prop({ type: Array as PropType<CheckboxGroupOption[]>, default: () => [] })
  options: CheckboxGroupOption[];

  handleChange({ value, checked }: ChecboxGroupValue) {
    const updatedValue = [...this.value];

    checked ? updatedValue.push(value) : updatedValue.splice(updatedValue.indexOf(value), 1);

    this.$emit('input', updatedValue);
  }
}
</script>

<style lang="scss" scoped>
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  margin: -10px -10px;
  font-size: inherit;
  .checkbox-item {
    margin: 10px;
    font-size: inherit;
  }
}
</style>
