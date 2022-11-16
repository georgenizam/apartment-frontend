<template>
  <div v-if="messages?.length" class="messages">
    <span v-for="messagesItem in messages" :key="messagesItem" class="messages__item">
      {{ messagesItem }}
    </span>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ErrorMessages extends Vue {
  @Prop({ type: Array as PropType<string[]>, default: () => [] })
  messages: string[];
}
</script>

<style lang="scss" scoped>
.messages {
  padding: 0 16px;
  margin-top: 7px;
  display: flex;
  flex-direction: column;
  &__item {
    font-size: 14px;
    color: $color-error;
    & + & {
      margin-top: 5px;
    }
  }
}
</style>
