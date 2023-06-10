import { mount } from '@vue/test-utils';
import CSSDropZoneField from '../CSSDropZoneField.vue';

describe('CSSDropZoneField.vue', () => {
    it('emits change event with file when handleUpload is called', async () => {
        const wrapper = mount(CSSDropZoneField, {
            props: {
                label: 'Test CSS Drop Zone',
                value: ''
            },
            global: {
                stubs: {
                    CSSDropZone: {
                        template: '<div />',
                        emits: ['upload']
                    }
                }
            }
        });

        const file = new File(['file'], 'test.css', { type: 'text/css' });
        await wrapper.findComponent({ name: 'CSSDropZone' }).vm.$emit('upload', file);

        const emittedEvent = wrapper.emitted();
        expect(emittedEvent.change).toBeTruthy();
        expect(emittedEvent.change[0]).toEqual([file]);
    });
});