import { mount } from '@vue/test-utils';
import JSDropZoneField from '../JSDropZoneField.vue';

describe('JSDropZoneField.vue', () => {
    it('emits change event with file when handleUpload is called', async () => {
        const wrapper = mount(JSDropZoneField, {
            props: {
                label: 'Test JS Drop Zone',
                value: ''
            },
            global: {
                stubs: {
                    JSDropZone: {
                        template: '<div />',
                        emits: ['upload']
                    }
                }
            }
        });

        const file = new File(['file'], 'test.js', { type: 'application/javascript' });
        await wrapper.findComponent({ name: 'JSDropZone' }).vm.$emit('upload', file);

        const emittedEvent = wrapper.emitted();
        expect(emittedEvent.change).toBeTruthy();
        expect(emittedEvent.change[0]).toEqual([file]);
    });
});