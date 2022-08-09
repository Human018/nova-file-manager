<template>
  <InputModal
    :name="name"
    :title="__('Rename file')"
    :on-submit="submit"
  >
    <template v-slot:inputs>
      <div>
        <div
          :class="[
            'w-full border rounded-md space-y-2 px-3 py-2 bg-gray-100 dark:bg-gray-900 shadow-sm focus-within:ring-1 focus-within:ring-blue-600 focus-within:border-blue-600',
            !hasErrors
              ? 'border-gray-400 dark:border-gray-700'
              : 'border-red-400 dark:border-red-700',
          ]"
        >
          <label
            for="name"
            class="block text-xs font-medium text-gray-700 dark:text-gray-200"
          >
            {{ __('File Name') }}
          </label>
          <input
            v-model="value"
            type="text"
            name="name"
            id="name"
            class="block w-full border-0 p-0 bg-gray-100 dark:bg-gray-900 placeholder-gray-400 sm:text-sm text-black dark:text-white focus:outline-none focus:ring-0"
            :placeholder="__('Type your file name here')"
          />
        </div>
        <template v-if="hasErrors">
          <p
            v-if="hasErrors"
            v-for="error in errorsList"
            class="mt-2 text-sm text-red-600"
            id="email-error"
          >
            {{ error }}
          </p>
        </template>
      </div>
    </template>
    <template v-slot:submitButton>
      <Button
        type="submit"
        variant="primary"
        :icon="false"
        :disabled="value === oldName"
        class="w-full sm:w-auto"
      >
        {{ __('Rename file') }}
      </Button>
    </template>
    <template v-slot:cancelButton>
      <Button
        type="button"
        variant="secondary"
        :icon="false"
        @click="closeModal(name)"
        class="w-full sm:w-auto"
      >
        {{ __('Cancel') }}
      </Button>
    </template>
  </InputModal>
</template>

<script>
import Button from '@/components/Elements/Button'
import InputModal from '@/components/Modals/InputModal'
import InteractsWithFileManagerStore from '@/mixins/InteractsWithFileManagerStore'

export default {
  components: {
    InputModal,
    Button,
  },

  props: ['name', 'onSubmit', 'oldName'],

  mixins: [InteractsWithFileManagerStore],

  data: () => ({
    value: null,
  }),

  mounted() {
    this.value = this.oldName
  },

  states: ['errors'],

  actions: ['closeModal'],

  computed: {
    hasErrors() {
      return this.errors?.has('renameFile')
    },

    errorsList() {
      return this.errors?.get('renameFile')
    },
  },

  methods: {
    submit() {
      this.onSubmit(this.value)
    },
  },
}
</script>
