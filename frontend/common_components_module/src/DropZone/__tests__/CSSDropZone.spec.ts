// @ts-nocheck

import { mount } from '@vue/test-utils'
import DropzoneComponent from '@/path-to-your-component/DropzoneComponent.vue'
import Dropzone from '../Dropzone.vue'

jest.mock('../Dropzone.vue', () => ({
    emits: ['droppedFiles'],
    template: '<div />',
}))

describe('DropzoneComponent', () => {
    let wrapper: any

    beforeEach(() => {
        wrapper = mount(DropzoneComponent, {
            props: {
                downloadUrl: 'https://test-url.com',
                cssExists: false,
            },
        })
    })

    it('renders correctly', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('shows the dropzone when cssExists prop is false', () => {
        expect(wrapper.findComponent(Dropzone).exists()).toBe(true)
    })

    it('hides the dropzone and show the download and change buttons when cssExists prop is true', async () => {
        await wrapper.setProps({ cssExists: true })

        expect(wrapper.findComponent(Dropzone).exists()).toBe(false)
        expect(wrapper.text()).toContain('Download CSS')
        expect(wrapper.text()).toContain('Change')
    })

    it('emit upload event with file when droppedFiles event is emitted by Dropzone', async () => {
        const file = new File([''], 'filename.css', { type: 'text/css' })
        await wrapper.findComponent(Dropzone).vm.$emit('droppedFiles', { item: () => file })

        expect(wrapper.emitted().upload[0]).toEqual([file])
    })

    it('shows the dropzone when changeFile method is called', async () => {
        await wrapper.setProps({ cssExists: true })
        await wrapper.vm.changeFile()

        expect(wrapper.findComponent(Dropzone).exists()).toBe(true)
    })

    it('hides the dropzone when cancelChange method is called', async () => {
        await wrapper.vm.cancelChange()

        expect(wrapper.findComponent(Dropzone).exists()).toBe(false)
    })
})
