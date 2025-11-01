<script setup lang="ts">
import { createNamespace } from "@aeolian-design/utils/src/create";
import { inputProps, inputEmits } from "../../types/input";
import {
  computed,
  inject,
  nextTick,
  onMounted,
  ref,
  useAttrs,
  useSlots,
  watch,
} from "vue-demi";
import { EyeInvisibleOutlined, EyeOutlined, CloseOutlined } from "@vicons/antd";
import { formItemContextKey } from "../../types/form";

defineOptions({
  name: "ao-input",
});
const bem = createNamespace("input");
const props = defineProps(inputProps);
const emits = defineEmits(inputEmits);
const slots = useSlots();
const attrs = useAttrs();
const formItemContext = inject(formItemContextKey);

const inputRef = ref<HTMLInputElement | null>(null);

function setNativeInputValue() {
  if (!inputRef.value) {
    return;
  }
  inputRef.value.value = String(props.modelValue);
}

watch(
  () => props.modelValue,
  () => {
    formItemContext?.validate("change").catch(() => {}); //catch捕获异常，防止传递给父组件
    setNativeInputValue();
  }
);

onMounted(() => {
  setNativeInputValue();
});

function handleInput(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  emits("update:modelValue", value);
  emits("input", value);
}

const passwordVisible = ref(false);
async function focus() {
  await nextTick();
  inputRef.value?.focus();
}

function handlePasswordVisible() {
  passwordVisible.value = !passwordVisible.value;
  focus();
}

const showPwdVisible = computed(() => {
  return (
    props.modelValue && props.showPassword && !props.disabled && !props.readonly
  );
});

const showClear = computed(() => {
  return props.modelValue && !props.disabled && !props.readonly;
});

function handleClear() {
  emits("input", "");
  emits("update:modelValue", "");
  emits("clear");
  focus();
}

function handleBlur(e: FocusEvent) {
  formItemContext?.validate("blur").catch(() => {}); //catch捕获异常，防止传递给父组件
  emits("blur", e);
}
</script>

<template>
  <div :class="[bem.b()]">
    <div :class="[bem.be('group'), 'inline-flex items-center w-full']">
      <span
        v-if="slots.prepend"
        :class="[
          bem.be('group', 'prepend'),
          'px-3 py-1 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-gray-700',
        ]"
      >
        <slot name="prepend"></slot>
      </span>

      <span
        :class="[bem.e('wrapper'), 'flex-1 relative inline-flex items-center']"
      >
        <span
          v-if="slots.prefixIcon"
          :class="[bem.e('prefix'), 'absolute left-2 text-gray-500']"
        >
          <slot name="prefixIcon"></slot>
        </span>

        <input
          ref="inputRef"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          v-bind="attrs"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          @input="handleInput"
          @change="(e)=> emits('change', (e.target as HTMLInputElement).value)"
          @focus="(e) => emits('focus', e)"
          @blur="handleBlur"
          :class="[
            bem.e('inner'),
            'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all',
            {
              'pl-8': slots.prefixIcon,
              'pr-8': slots.suffixIcon,
              'rounded-l-none': slots.prepend,
              'rounded-r-none': slots.append,
            },
          ]"
        />

        <span class="absolute right-2 text-gray-500">
          <span v-if="slots.suffixIcon" :class="[bem.e('suffix')]">
            <slot name="suffixIcon"></slot>
          </span>
          <ao-icon v-if="showPwdVisible" @click="handlePasswordVisible">
            <EyeOutlined v-if="passwordVisible" />
            <eye-invisible-outlined v-else />
          </ao-icon>
          <ao-icon v-if="showClear" @click="handleClear">
            <CloseOutlined />
          </ao-icon>
        </span>
      </span>

      <span
        v-if="slots.append"
        :class="[
          bem.be('group', 'append'),
          'px-3 py-1 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-gray-700',
        ]"
      >
        <slot name="append"></slot>
      </span>
    </div>
  </div>
</template>

<style scoped></style>
