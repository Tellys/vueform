import { inject } from 'vue'

const base = function(props, context, dependencies)
{
  // =============== INJECT ===============

  /**
  * The size of the component.
  * 
  * @type {component}
  */
  let Size = inject('Size')

  return {
    Size,
  }
}

export default base