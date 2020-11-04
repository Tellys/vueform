import { toRefs, ref, computed, onMounted, nextTick, watch } from 'composition-api'
import useFormComponent from './../composables/useFormComponent'
import useConditions from './../composables/useConditions'
import useLabel from './../composables/useLabel'
import useEvents from './../composables/useEvents'
import { mergeComponentClasses } from './../utils/mergeClasses'

export default {
  name: 'FormWizardStep',
  props: {
    /**
     * Name of step within [steps](reference/frontend-form#prop-steps) object.
     */
    name: {
      type: [String, Number],
      required: true,
    },

    /**
     * Step schema within [steps](reference/frontend-form#prop-steps) object.
     */
    step: {
      type: Object,
      required: true,
    },

    /**
     * Form element components.
     */
    elements$: {
      type: Object,
      required: false,
    },

    /**
     * The [visible$](reference/frontend-wizard#prop-visible) step of formWizard$.
     */
    visible$: {
      type: Object,
      required: false,
    },
  },
  init(props, context)
  {  
    const { step, elements$, name, visible$ } = toRefs(props)
    const { containers } = toRefs(context.data)

    // ============ DEPENDENCIES ============

    const { form$, theme, classes: baseClasses, components, mainClass } = useFormComponent(props, context)
    const { available, conditions } = useConditions(props, context, { form$, descriptor: step })
    const { label, isLabelComponent } = useLabel(props, context, { form$, descriptor: step })
    const {
        events, listeners, on, off, fire, fireActive, fireInactive,
        fireComplete, fireEnable, fireDisable,
    } = useEvents(props, context, { form$, descriptor: step }, {
      events: {
        active: [],
        inactive: [],
        complete: [],
        enable: [],
        disable: [],
      },
    })

    // ================ DATA ================

    /**
     * Determines whether the step is active.
     * 
     * @type {boolean}
     * @default false
     */
    const active = ref(false)

    /**
     * Determines whether the step is disabled.
     * 
     * @type {boolean}
     * @default true
     */
    const disabled = ref(true)

    /**
     * Determines whether the step is completed.
     * 
     * @type {boolean}
     * @default false
     */
    const completed = ref(false)

    // ============== COMPUTED ==============

    /**
      * Returns the components of elements within the step.
      * 
      * @type {object}
      */
    const children$ = computed(() => {
      return _.filter(elements$.value, (element$, key) => {
        return step.value.elements.indexOf(key) !== -1
      })
    })

    /**
     * Determines whether the step is visible.
     * 
     * @type {boolean}
     */
    const visible = computed(() => {
      return available.value
    })

    /**
      * Determines whether the step has any invalid elements.
      * 
      * @type {boolean}
      */
    const invalid = computed(() => {
      return _.some(children$.value, { available: true, invalid: true })   
    })

    /**
      * Determines whether the step has any pending elements.
      * 
      * @type {boolean}
      */
    const pending = computed(() => {
      return _.some(children$.value, { available: true, pending: true })   
    })

    /**
     * Class of step.
     * 
     * @type {string|array|object}
     */
    const class_ = computed(() => {
      return step.value.class || null
    })
    
    const classes = computed(() => {
      let classList = baseClasses.value

      classList = mergeComponentClasses(classList, {
        [containers.value.state]: {
          [classList.active]: active.value,
          [classList.inactive]: !active.value,
          [classList.disabled]: disabled.value,
          [classList.enabled]: !disabled.value,
          [classList.completed]: completed.value,
          [classList.incompleted]: !completed.value,
          [classList.valid]: !invalid.value,
          [classList.invalid]: invalid.value,
          [classList.pending]: pending.value,
        }
      })

      // Add tabs's class to main class
      if (class_.value !== null) {
        classList = mergeComponentClasses(classList, {
          [mainClass.value]: class_.value
        })
      }

      return classList
    })

    /**
     * Base label of step.
     * 
     * @private
     * @type {string}
     */
    const baseLabel = computed(() => {
      return step.value.label
    })

    /**
     * Returns the labels object of step schema.
     * 
     * @type {object}
     */
    const labels = computed(() => {
      return step.value.labels || {}
    })

    /**
      * Returns the buttons object of step schema.
      * 
      * @type {object}
      */
    const buttons = computed(() => {
      return step.value.buttons || {}
    })

    /**
      * Determines whether the step has any debouncing elements.
      * 
      * @type {boolean}
      */
    const debouncing = computed(() => {
      return _.some(children$.value, { available: true, debouncing: true })   
    })

    /**
      * Determines whether all the elements in the step has been validated.
      * 
      * @type {boolean}
      */
    const validated = computed(() => {
      return !_.some(children$.value, { available: true, validated: false })
    })

    /**
      * Determines whether the step has any busy elements.
      * 
      * @type {boolean}
      */
    const busy = computed(() => {
      return pending.value || debouncing.value
    })

    /**
      * Determines whether the step is done (complete, validated has no invalid or pending elements).
      * 
      * @type {boolean}
      */
    const done = computed(() => {
      return completed.value
        && validated.value
        && !invalid.value
        && !pending.value
    })

    /**
      * Returns the index of step within the wizard.
      * 
      * @type {integer}
      */
    const index = computed(() => {
      return _.keys(visible$.value).indexOf(name.value)
    })

    const step$ = computed(() => {
      return form$.value.wizard$.steps$[name.value]
    })

    // =============== METHODS ==============


    /**
     * Validate the elements within the step.
     *
     * @public
     * @returns {void}
     */
    const validate = () => {
      // only skip validation if the elements
      // are validated and none is invalid
      if (validated.value && !invalid.value) {
        return 
      }

      _.each(children$.value, (element$) => {
        if ((!element$.validated || element$.invalid) && element$.available) {
          element$.validate()
        }
      })
    }

    /**
      * Prepares to proceed to the next step. If [validateOn](reference/frontend-form#prop-validateOn) contains 'step' it first validates any unvalidated element and wait for async validators to finish. Only continues no elements has `invalid` status.
      *
      * @public
      * @param {function} callback callback to call when the form is ready to proceed
      * @returns {void}
      */
    const proceed = (callback) => {
      if (busy.value) {
        return waitForAsync(callback)
      }

      // prevent next only if the step has invalid
      // elements and they should be validated on step
      if (invalid.value && form$.value.shouldValidateOn('step')) {
        return
      }

      callback()
    }

    /**
     * Activates the step.
     *
     * @public
     * @returns {void}
     */
    const activate = () => {
      if (active.value) {
        return
      }

      active.value = true

     fireActive()
    }

    /**
     * Deactivates the step.
     *
     * @public
     * @returns {void}
     */
    const deactivate = () => {
      if (!active.value) {
        return
      }

      active.value = false

      fireInactive()
    }

    /**
     * Enables the step.
     *
     * @public
     * @returns {void}
     */
    const enable = () => {
      if (!disabled.value) {
        return
      }

      disabled.value = false

      fireEnable()
    }

    /**
     * Disables the step.
     *
     * @public
     * @returns {void}
     */
    const disable = () => {
      if (disabled.value) {
        return
      }
      
      disabled.value = true

      fireDisable()
    }

    /**
     * Completes the step.
     *
     * @public
     * @returns {void}
     */
    const complete = () => {
      if (completed.value) {
        return
      }

      completed.value = true

      fireComplete()
    }

    /**
     * Uncompletes the step.
     *
     * @public
     * @returns {void}
     */
    const uncomplete = () => {
      completed.value = false
    }

    /**
     * Selects the step to become the active step.
     *
     * @public
     * @returns {void}
     */
    const select = () => {
      if (disabled.value) {
        return
      }

      context.emit('select', step$.value)

      _.each(children$.value, (element$) => {
        element$.activate()
      })

      activate()
    }

    /**
      * Apply conditions of the step to the elements within.
      * 
      * @private
      * @returns {void}
      */
    const forwardConditions = () => {
      if (conditions.value.length == 0) {
        return
      }

      _.each(children$.value, (element$) => {
        _.each(step.value.conditions, (condition) => {
          element$.conditions.push(condition)
        })
      })
    }

    /**
      * Waits for all async processes to finish, then invokes a callback.
      * 
      * @private
      * @param {function} callback the function to invoke
      * @returns {void}
      */
    const waitForAsync = (callback) => {
      var unwatch = watch(busy, () => {
        unwatch()
        proceed(callback)
      })
    }

    // ============== WATCHERS ==============

    watch(visible, (val) => {
      // if a revealed step is earlier than the
      // current step, it should be enabled
      if (val && index.value < form$.value.wizard$.current$.index) {
        enable()
      }
    })

    watch(children$, () => {
      if (!active.value) {
        return
      } 

      _.each(children$.value, (element$) => {
        element$.activate()
      })
    }, { deep: false, lazy: true })

    // ================ HOOKS ===============

    onMounted(() => {
      // nextTick is required because elements$
      // only available after form is mounted,
      // which is later than the wizard mount
      nextTick(() => {
        forwardConditions()
      })
    })

    return {
      // Inject
      form$,
      theme,

      // Data
      active,
      disabled,
      completed,
      events,
      listeners,

      // Computed
      children$,
      visible,
      invalid,
      pending,
      classes,
      components,
      conditions,
      available,
      baseLabel,
      labels,
      buttons,
      debouncing,
      validated,
      busy,
      done,
      index,
      step$,
      label,
      isLabelComponent,

      // Methods
      validate,
      proceed,
      activate,
      deactivate,
      enable,
      disable,
      complete,
      uncomplete,
      select,
      forwardConditions,
      waitForAsync,
      on,
      off,
      fire,
      fireActive,
      fireInactive,
      fireComplete,
      fireEnable,
      fireDisable,
    }
  },
}