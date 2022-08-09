<template>
  <PanelItem
    :index="index"
    :field="field"
  >
    <template
      v-slot:value
      v-if="field.value?.files"
    >
      <div class="nova-file-manager">
        <div :class="darkMode && 'dark'">
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-2">
            <template v-for="file in field.value?.files">
              <FieldCard :file="file" />
            </template>
          </div>
        </div>
      </div>
    </template>
  </PanelItem>
</template>

<script>
import { CopiesToClipboard } from 'laravel-nova'
import { CheckIcon, ClipboardCopyIcon, DocumentIcon } from '@heroicons/vue/outline'
import { mapMutations, mapState } from 'vuex'
import ImageLoader from '@/components/ImageLoader'
import PreviewModal from '@/components/Modals/PreviewModal'
import FieldCard from '@/components/Cards/FieldCard'
import InteractsWithFileManagerStore from '@/mixins/InteractsWithFileManagerStore'

export default {
  mixins: [CopiesToClipboard, InteractsWithFileManagerStore],

  components: { FieldCard, DocumentIcon, ImageLoader, ClipboardCopyIcon, CheckIcon, PreviewModal },

  props: ['field', 'index'],

  states: ['darkMode'],

  actions: ['init'],

  mutations: ['detectDarkMode', 'previewFile'],

  mounted() {
    this.detectDarkMode()
  },

  data: () => ({
    selected: null,
  }),

  methods: {
    copy(file) {
      this.selected = file
      this.copyValueToClipboard(file.url)

      setTimeout(() => {
        this.selected = null
      }, 1000)
    },

    openPreview(file) {
      this.previewFile(file)
    },
  },
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
