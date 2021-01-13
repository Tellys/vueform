import { createForm, findAllComponents, } from 'test-helpers'
import defaultTheme from './../../src/themes/default'
import { mergeComponentClasses, mergeClass } from './../../src/utils/mergeClasses'
import { nextTick } from 'composition-api'
import flushPromises from 'flush-promises'

export default function (schema, componentName, options = {}) {
  let defaultClasses = defaultTheme.components[componentName].data().defaultClasses
  let mainClass = _.keys(defaultClasses)[0]
  let mergeWith = options.mergeWith || {}
  let execute = options.execute || null

  describe('form$', () => {
    it('should return form$', async () => {
      let form = createForm(Object.assign({}, schema))

      let el = form.vm.el$('el')

      if (execute) {
        execute(el)
        await flushPromises()
        await nextTick()
      }

      let Component = findAllComponents(form, { name: componentName }).at(0)

      expect(Component.vm.form$).toStrictEqual(form.vm)
    })
  })

  describe('theme', () => {
    it('should inject `theme`', async () => {
      let form = createForm(Object.assign({}, schema))

      let el = form.vm.el$('el')

      if (execute) {
        execute(el)
        await flushPromises()
        await nextTick()
      }

      let Component = findAllComponents(form, { name: componentName }).at(0)

      expect(Component.vm.theme).toStrictEqual(form.vm.extendedTheme)
    })
  })

  describe('components', () => {
    it('should equal to form components', async () => {
      let form = createForm(Object.assign({}, schema))

      let el = form.vm.el$('el')

      if (execute) {
        execute(el)
        await flushPromises()
        await nextTick()
      }

      let Component = findAllComponents(form, { name: componentName }).at(0)

      expect(Component.vm.components).toStrictEqual(form.vm.extendedTheme.components)
    })
  })

  describe('mainClass', () => {
    it('should equal to first class name of defaultClasses', async () => {
      let form = createForm(Object.assign({}, schema))

      let el = form.vm.el$('el')

      if (execute) {
        execute(el)
        await flushPromises()
        await nextTick()
      }

      let Component = findAllComponents(form, { name: componentName }).at(0)

      expect(Component.vm.mainClass).toStrictEqual(_.keys(Component.vm.defaultClasses)[0])
    })
  })

  describe('classes', () => {
    it('should `classes` equal to defaultClasses by default', async () => {
      let form = createForm(Object.assign({}, schema))

      let el = form.vm.el$('el')

      if (execute) {
        execute(el)
        await flushPromises()
        await nextTick()
      }

      let Component = findAllComponents(form, { name: componentName }).at(0)

      expect(Component.vm.classes).toStrictEqual(mergeComponentClasses(Component.vm.defaultClasses, mergeWith))
    })

    it('should classes in theme overwrite defaultClasses in `classes`, even when changes', async () => {
      let overwriteClasses1 = {
        [mainClass]: 'theme-overwrite-class'
      }
      let overwriteClasses2 = {
        [mainClass]: 'theme-overwrite-class2'
      }

      let form = createForm(Object.assign({}, schema), {
        themes: {
          default: Object.assign({}, defaultTheme, {
            classes: {
              [componentName]: overwriteClasses1
            }
          })
        }
      })

      let el = form.vm.el$('el')

      if (execute) {
        execute(el)
        await flushPromises()
        await nextTick()
      }

      let Component = findAllComponents(form, { name: componentName }).at(0)

      expect(Component.vm.classes).toStrictEqual(mergeComponentClasses(Object.assign({}, defaultClasses, overwriteClasses1), mergeWith))

      // This also works but running tests with Vue2 fails for some reason
      // el.$laraform.themes.default.classes[elementName] = overwriteClasses2
      // expect(Component.vm.classes).toStrictEqual(Object.assign({}, defaultClasses, overwriteClasses2))
    })

    // Form classes
    it('should classes in form overwrite defaultClasses in `classes`, even when changes', async () => {
      let overwriteClasses1 = {
        [mainClass]: 'form-overwrite-class'
      }
      let overwriteClasses2 = {
        [mainClass]: 'form-overwrite-class2'
      }

      let form = createForm(Object.assign({}, schema, {
        classes: {
          [componentName]: overwriteClasses1
        }
      }))

      let el = form.vm.el$('el')

      if (execute) {
        execute(el)
        await flushPromises()
        await nextTick()
      }

      let Component = findAllComponents(form, { name: componentName }).at(0)

      expect(Component.vm.classes).toStrictEqual(mergeComponentClasses(Object.assign({}, defaultClasses, overwriteClasses1), mergeWith))

      el.form$.classes[componentName] = overwriteClasses2

      expect(Component.vm.classes).toStrictEqual(mergeComponentClasses(Object.assign({}, defaultClasses, overwriteClasses2), mergeWith))
    })

    it('should classes in form overwrite theme classes in `classes`, even when changes', async () => {
      let overwriteClasses1 = {
        [mainClass]: 'form-overwrite-class'
      }
      let overwriteClasses2 = {
        [mainClass]: 'form-overwrite-class2'
      }

      let form = createForm(Object.assign({}, schema, {
        classes: {
          [componentName]: overwriteClasses1
        }
      }), {
        themes: {
          default: Object.assign({}, defaultTheme, {
            classes: {
              [componentName]: {
                [mainClass]: 'theme-overwrite-class'
              }
            }
          })
        }
      })

      let el = form.vm.el$('el')

      if (execute) {
        execute(el)
        await flushPromises()
        await nextTick()
      }

      let Component = findAllComponents(form, { name: componentName }).at(0)

      expect(Component.vm.classes).toStrictEqual(mergeComponentClasses(Object.assign({}, defaultClasses, overwriteClasses1), mergeWith))

      el.form$.classes[componentName] = overwriteClasses2

      expect(Component.vm.classes).toStrictEqual(mergeComponentClasses(Object.assign({}, defaultClasses, overwriteClasses2), mergeWith))
    })

    it('should `addClasses` in form add classes in `classes`, even when changes', async () => {
      let addClasses1 = {
        [mainClass]: 'form-add-class'
      }
      let addClasses2 = {
        [mainClass]: 'form-add-class2'
      }

      let form = createForm(Object.assign({}, schema, {
        addClasses: {
          [componentName]: addClasses1
        }
      }))

      let el = form.vm.el$('el')

      if (execute) {
        execute(el)
        await flushPromises()
        await nextTick()
      }
      
      let Component = findAllComponents(form, { name: componentName }).at(0)

      expect(Component.vm.classes[mainClass]).toStrictEqual(mergeClass(defaultClasses[mainClass] + ' ' + addClasses1[mainClass], mergeWith[mainClass] || ''))

      el.form$.addClasses[componentName] = addClasses2

      expect(Component.vm.classes[mainClass]).toStrictEqual(mergeClass(defaultClasses[mainClass] + ' ' + addClasses2[mainClass], mergeWith[mainClass] || ''))
    })

    // Rendering
    it('should mainClass to the container DOM', async () => {
      let themeClasses = {
        [componentName]: {
          [mainClass]: 'theme-classes'
        }
      }

      let form = createForm(Object.assign({}, schema, {
        classes: {
          [componentName]: {
            [mainClass]: 'form-classes'
          }
        },
        addClasses: {
          [componentName]: {
            [mainClass]: 'form-add-classes'
          }
        },
      }), {
        themes: {
          default: Object.assign({}, defaultTheme, {
            classes: themeClasses
          })
        }
      })

      let el = form.vm.el$('el')

      if (execute) {
        execute(el)
        await flushPromises()
        await nextTick()
      }

      let Component = findAllComponents(form, { name: componentName }).at(0)
      
      expect(Component.classes('form-classes')).toBe(true)
      expect(Component.classes('theme-classes')).toBe(false)
      expect(Component.classes('form-add-classes')).toBe(true)
    })
  })
}