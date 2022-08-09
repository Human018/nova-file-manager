<template>
  <div class="nova-file-manager">
    <div :class="darkMode && 'dark'">
      <Head :title="__('NovaFileManager.title')" />

      <Heading class="mb-6">{{ __('NovaFileManager.title') }}</Heading>

      <Browser namespace="nova-file-manager" />
    </div>
  </div>
</template>
<script>
import Browser from '@/components/Browser'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: {
    Browser,
  },

  props: {
    config: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    this.setSelection([])
    this.setLimit(null)
    this.init()
    this.setIsFieldMode(false)
  },

  computed: {
    ...mapState('nova-file-manager', ['darkMode']),
  },

  methods: {
    ...mapActions('nova-file-manager', ['init']),
    ...mapMutations('nova-file-manager', [
      'setSelection',
      'setLimit',
      'setPath',
      'setIsFieldMode',
    ]),
  },
}
</script>
