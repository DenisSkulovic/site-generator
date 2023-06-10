import { mount } from '@vue/test-utils';
import ImageDropZoneField from '../ImageDropZoneField.vue';

describe('ImageDropZoneField.vue', () => {
    it('emits change event with file when handleUpload is called', async () => {
        const wrapper = mount(ImageDropZoneField, {
            props: {
                label: 'Test Image Drop Zone',
                value: ''
            },
            global: {
                stubs: {
                    ImageDropZone: {
                        template: '<div />',
                        emits: ['upload']
                    }
                }
            }
        });

        const file = new File(['file'], 'test.png', { type: 'image/png' });
        await wrapper.findComponent({ name: 'ImageDropZone' }).vm.$emit('upload', file);

        const emittedEvent = wrapper.emitted();
        expect(emittedEvent.change).toBeTruthy();
        expect(emittedEvent.change[0]).toEqual([file]);
    });
});