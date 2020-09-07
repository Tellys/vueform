import { createLocalVue } from '@vue/test-utils'
import { createForm, change, setInstances } from './../../../../src/utils/testHelpers'

describe('Max Rule', () => {
  it('should check if numeric value is lower or equal than minimum', (done) => {
    let form = createForm({
      schema: {
        a: {
          type: 'text',
          rules: 'numeric|max:2',
        }
      }
    })

    let a = form.findAllComponents({ name: 'TextElement' }).at(0)
    
    change(a, '1')
    expect(a.vm.invalid).toBe(false)
    
    change(a, '2')
    expect(a.vm.invalid).toBe(false)
    
    change(a, '3')
    expect(a.vm.invalid).toBe(true)
    
    change(a, '1.2')
    expect(a.vm.invalid).toBe(false)
    
    change(a, '1,2')
    expect(a.vm.invalid).toBe(true)
    
    change(a, '2.5')
    expect(a.vm.invalid).toBe(true)
    
    change(a, '2,5')
    expect(a.vm.invalid).toBe(true)

    change(a, 'asdf')
    expect(a.vm.invalid).toBe(true)
    
    change(a, '%/?+')
    expect(a.vm.invalid).toBe(true)
    
    change(a, '3 ')
    expect(a.vm.invalid).toBe(true)
    
    change(a, '-3')
    expect(a.vm.invalid).toBe(false)

    done()
  })

  it('should check if integer value is lower or equal than minimum', (done) => {
    let form = createForm({
      schema: {
        a: {
          type: 'text',
          rules: 'integer|max:2',
        }
      }
    })

    let a = form.findAllComponents({ name: 'TextElement' }).at(0)
    
    change(a, '1')
    expect(a.vm.invalid).toBe(false)
    
    change(a, '2')
    expect(a.vm.invalid).toBe(false)
    
    change(a, '3')
    expect(a.vm.invalid).toBe(true)
    
    change(a, '1.2')
    expect(a.vm.invalid).toBe(true)
    
    change(a, '1,2')
    expect(a.vm.invalid).toBe(true)
    
    change(a, '2.5')
    expect(a.vm.invalid).toBe(true)
    
    change(a, '2,5')
    expect(a.vm.invalid).toBe(true)

    change(a, 'asdf')
    expect(a.vm.invalid).toBe(true)
    
    change(a, '%/?+')
    expect(a.vm.invalid).toBe(true)
    
    change(a, '3 ')
    expect(a.vm.invalid).toBe(true)
    
    change(a, '-3')
    expect(a.vm.invalid).toBe(false)

    done()
  })

  it('should check if string length is lower or equal than minimum', (done) => {
    let form = createForm({
      schema: {
        a: {
          type: 'text',
          rules: 'max:2',
        }
      }
    })

    let a = form.findAllComponents({ name: 'TextElement' }).at(0)
    
    change(a, 'a')
    expect(a.vm.invalid).toBe(false)
    
    change(a, 'as')
    expect(a.vm.invalid).toBe(false)
    
    change(a, 'asd')
    expect(a.vm.invalid).toBe(true)
    
    change(a, 'a吧')
    expect(a.vm.invalid).toBe(false)
    
    change(a, 'Ру')
    expect(a.vm.invalid).toBe(false)
    
    change(a, ' ')
    expect(a.vm.invalid).toBe(false)
    
    change(a, '  ')
    expect(a.vm.invalid).toBe(false)
    
    change(a, '1')
    expect(a.vm.invalid).toBe(false)
    
    change(a, '2')
    expect(a.vm.invalid).toBe(false)
    
    change(a, '4')
    expect(a.vm.invalid).toBe(false)
    
    change(a, '123')
    expect(a.vm.invalid).toBe(true)
    
    change(a, '%!+')
    expect(a.vm.invalid).toBe(true)

    done()
  })

  it('should check if array length is lower or equal than min (v<max)', (done) => {
    const LocalVue = createLocalVue()

    LocalVue.config.errorHandler = done

    let form = createForm({
      schema: {
        a: {
          type: 'list',
          rules: 'array|max:2',
          element: {
            type: 'text'
          }
        }
      }
    })

    let a = form.findAllComponents({ name: 'ListElement' }).at(0)
    
    setInstances(a, 1)

    LocalVue.nextTick(() => {
      a.vm.validate()
      expect(a.vm.invalid).toBe(false)

      done()
    })
  })

  it('should check if array length is lower or equal than min (v=max)', (done) => {
    const LocalVue = createLocalVue()

    LocalVue.config.errorHandler = done

    let form = createForm({
      schema: {
        a: {
          type: 'list',
          rules: 'array|max:2',
          element: {
            type: 'text'
          }
        }
      }
    })

    let a = form.findAllComponents({ name: 'ListElement' }).at(0)
    
    setInstances(a, 2)

    LocalVue.nextTick(() => {
      a.vm.validate()
      expect(a.vm.invalid).toBe(false)

      done()
    })
  })

  it('should check if array length is lower or equal than min (v>max)', (done) => {
    const LocalVue = createLocalVue()

    LocalVue.config.errorHandler = done

    let form = createForm({
      schema: {
        a: {
          type: 'list',
          rules: 'array|max:2',
          element: {
            type: 'text'
          }
        }
      }
    })

    let a = form.findAllComponents({ name: 'ListElement' }).at(0)
    
    setInstances(a, 3)

    LocalVue.nextTick(() => {
      a.vm.validate()
      expect(a.vm.invalid).toBe(true)

      done()
    })
  })
})