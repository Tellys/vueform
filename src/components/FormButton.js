import { computed, ref, toRefs, watch, onMounted, nextTick } from 'composition-api'
import useElementComponent from './../composables/useElementComponent'
import useConditions from './../composables/useConditions'
import useLabel from './../composables/useLabel'
import { mergeComponentClasses } from './../utils/mergeClasses'
import computedOption from '../utils/computedOption'

export default {
  name: 'FormButton',
  props: {
    button: {
      type: Object,
      required: true
    },
    name: {
      type: [Number, String],
      required: true
    },
    parent: {
      type: Object,
      required: false,
      default: () => ({})
    },
  },
  init(props, context)
  {
    const { button } = toRefs(props)

    // ============ DEPENDENCIES ============

    const { el$, form$, classes: baseClasses, components, theme, mainClass } = useElementComponent(props, context)
    const { available, conditions } = useConditions(props, context, { form$, descriptor: button })
    const { label, isLabelComponent } = useLabel(props, context, { form$, descriptor: button })

    // ================ DATA ================

    const loading = ref(false)

    const disabled = ref(false)

    // ============== COMPUTED ==============

    const align = computedOption('align', button, 'left', ['left', 'center', 'right'])

    const classes = computed(() => {
      let classes = _.clone(baseClasses.value)

      return mergeComponentClasses(classes, {
        [mainClass.value]: {
          [classes[align.value]]: true,
          [classes.loading]: isLoading.value,
          [classes.disabled]: isDisabled.value,
        }
      })
    })

    const isDisabled = computed(() => {
      return typeof button.value.disabled == 'function'
        ? button.value.disabled(form$.value) || disabled.value
        : disabled.value
    })

    const isLoading = computed(() => {
      return typeof button.value.loading == 'function'
        ? button.value.loading(form$.value) || loading.value
        : loading.value
    })

    // =============== METHODS ==============

    const setLoading = (val) => {
      loading.value = val
    }

    const disable = () => {
      disabled.value = true
    }

    const enable = () => {
      disabled.value = false
    }

    const handleClick = () => {
      if (disabled.value || loading.value) {
        return
      }

      if (typeof button.value.onClick == 'function') {
        button.value.onClick(form$.value)
      }
    }

    return {
      // Inject
      el$,
      form$,
      theme,

      // Computed
      align,
      loading,
      disabled,
      isLoading,
      isDisabled,
      mainClass,
      classes,
      components,
      label,
      isLabelComponent,
      available,
      conditions,

      // Methods
      setLoading,
      disable,
      enable,
      handleClick,
    }
  },
}