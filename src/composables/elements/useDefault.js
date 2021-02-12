import { computed, toRefs } from 'composition-api'
import checkDateFormat from './../../utils/checkDateFormat'

const base = function(props, context, dependencies)
{
  const {
    default: default_
  } = toRefs(props)

  // ============ DEPENDENCIES =============

  const nullValue = dependencies.nullValue

  // ============== COMPUTED ===============

  /**
  * The default value of the element.
  * 
  * @type {string|number}
  */
  const defaultValue = computed(() => {
    return default_.value !== undefined ? default_.value : _.clone(nullValue.value)
  })

  return {
    defaultValue,
  }
}

const date = function(props, context, dependencies)
{
  const {
    default: default_,
  } = toRefs(props)

  // ============ DEPENDENCIES =============

  const nullValue = dependencies.nullValue
  const valueDateFormat = dependencies.valueDateFormat

  // ============== COMPUTED ===============

  /**
  * The default value of the element.
  * 
  * @type {string|Date}
  * @option
  */
  const defaultValue = computed(() => {
    let val = default_.value !== undefined ? default_.value : nullValue.value

    if (_.isEqual(val, nullValue.value)) {
      return val
    }

    checkDateFormat(valueDateFormat.value, val)

    return val instanceof Date ? val : moment(val, valueDateFormat.value, true).toDate()
  })

  return {
    defaultValue,
  }
}

const dates = function(props, context, dependencies)
{
  const {
    default: default_
  } = toRefs(props)

  // ============ DEPENDENCIES =============

  const nullValue = dependencies.nullValue
  const valueDateFormat = dependencies.valueDateFormat

  // ============== COMPUTED ===============

  /**
  * 
  * 
  * @type {array}
  * @option
  */
  const defaultValue = computed(() => {
    let val = default_.value !== undefined ? default_.value : nullValue.value

    if (_.isEqual(val, nullValue.value)) {
      return val
    }

    return _.map(val, (v) => {
      checkDateFormat(valueDateFormat.value, v)

      return v instanceof Date ? v : moment(v, valueDateFormat.value, true).toDate()
    })
  })

  return {
    defaultValue,
  }
}

const multilingual = function(props, context, dependencies)
{
  const {
    default: default_
  } = toRefs(props)

  // ============ DEPENDENCIES =============

  const nullValue = dependencies.nullValue

  // ============== COMPUTED ===============

  /**
  * 
  * 
  * @type {object|string|number}
  * @option
  */
  const defaultValue = computed(() => {
    if (default_.value === undefined) {
      return _.clone(nullValue.value)
    }
    
    let def = _.clone(default_.value)

    if (!_.isPlainObject(def)) {
      let tempDefault = {}

      _.each(nullValue.value, (v, language) => {
        tempDefault[language] = def
      })

      def = tempDefault
    }

    return Object.assign({}, _.clone(nullValue.value), def)
  })

  return {
    defaultValue,
  }
}

export {
  date,
  dates,
  multilingual,
}

export default base