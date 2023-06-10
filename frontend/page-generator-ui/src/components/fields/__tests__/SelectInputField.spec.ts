import { mount } from '@vue/test-utils';
import SelectInputField from '../SelectInputField.vue';

describe('SelectInputField.vue', () => {
    it('emits change event with selected value', async () => {
        const options = [{ label: 'Option 1', value: 'value1' }, { label: 'Option 2', value: 'value2' }];
        const wrapper = mount(SelectInputField, {
            props: {
                label: 'Test Select Field',
                value: 'value1',
                options: options
            }
        });

        await wrapper.find('select').setValue('value2');

        const emittedEvent = wrapper.emitted();
        expect(emittedEvent.change).toBeTruthy();
        expect(emittedEvent.change[0]).toEqual(['value2']);
    });
});