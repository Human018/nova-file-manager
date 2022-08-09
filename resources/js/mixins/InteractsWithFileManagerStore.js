import { store } from '@/store/store'
import { namespace } from '@/helpers'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  props: {
    namespace: {
      type: String,
      required: true,
      default: 'nova-file-manager',
    },
  },


  actions: [],
  getters: [],
  mutations: [],
  states: [],

  beforeCreate() {
    let module = this.$props.namespace

    if (this.$options.getters.length) {
      this.$options.computed = {
        ...this.$options.computed,
        ...mapGetters(module, this.$options.getters),
      }
    }

    if (this.$options.states.length) {
      this.$options.computed = {
        ...this.$options.computed,
        ...mapState(module, this.$options.states),
      }
    }

    if (this.$options.actions.length) {
      this.$options.methods = {
        ...this.$options.methods,
        ...mapActions(module, this.$options.actions),
      }
    }

    if (this.$options.mutations.length) {
      this.$options.methods = {
        ...this.$options.methods,
        ...mapMutations(module, this.$options.mutations),
      }
    }

    console.log(module, this.$options.__file, this.$options)
  },
}
