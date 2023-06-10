import { mount } from '@vue/test-utils';
import TextAreaField from '../TextAreaField.vue';

describe('TextAreaField.vue', () => {
    it('emits change event with input value', async () => {
        const wrapper = mount(TextAreaField, {
            props: {
                label: 'Test Text Area Field',
                value: 'Initial value'
            }
        });

        await wrapper.find('textarea').setValue('New value');

        const emittedEvent = wrapper.emitted();
        expect(emittedEvent.change).toBeTruthy();
        expect(emittedEvent.change[0]).toEqual(['New value']);
    });
});