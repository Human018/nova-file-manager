<template>
  <ul
    role="list"
    class="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 md:grid-cols-4 xl:grid-cols-6 xl:gap-x-4"
  >
    <li v-for="file in files">
      <component
        :is="fileCardComponent(file)"
        :file="file"
        :checked="isFileSelected(file) ?? false"
        @click="toggleSelection(file)"
        @dblclick="openPreview(file)"
        :namespace="namespace"
      />

      <preview-modal :file="file"/>
    </li>
  </ul>
</template>

<script>
import { RadioGroup, RadioGroupOption } from '@headlessui/vue'
import ImageCard from './Cards/ImageCard.vue'
import VideoCard from './Cards/VideoCard.vue'
import FileCard from './Cards/FileCard.vue'
import Sidebar from '@/components/Sidebar'
import PreviewModal from '@/components/Modals/PreviewModal'
import InteractsWithFileManagerStore from '@/mixins/InteractsWithFileManagerStore'

export default {
  mixins: [InteractsWithFileManagerStore],

  mutations: [
    'setSelectedFile',
    'selectFile',
    'deselectFile',
    'previewFile',
  ],

  getters: ['isFileSelected'],
  states: ['files', 'selection'],

  data: () => ({
    clicks: 0,
    timer: null,
  }),

  components: {
    PreviewModal,
    RadioGroup,
    RadioGroupOption,
    ImageCard,
    VideoCard,
    FileCard,
    Sidebar,
  },

  methods: {
    fileCardComponent(file) {
      switch (file.type) {
        case 'image':
          return ImageCard
        case 'video':
          return VideoCard
        default:
          return FileCard
      }
    },

    openPreview(file) {
      this.previewFile(file)
    },

    toggleSelection(file) {
      return this.isFileSelected(file) ? this.deselectFile(file) : this.selectFile(file)
    },
  },
}
</script>
