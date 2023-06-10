import { mount } from '@vue/test-utils';
import TextInputField from '../TextInputField.vue';

describe('TextInputField.vue', () => {
    it('emits change event with input value', async () => {
        const wrapper = mount(TextInputField, {
            props: {
                label: 'Test Text Field',
                value: 'Initial value'
            }
        });

        await wrapper.find('input').setValue('New value');

        const emittedEvent = wrapper.emitted();
        expect(emittedEvent.change).toBeTruthy();
        expect(emittedEvent.change[0]).toEqual(['New value']);
    });
});