import { mount } from '@vue/test-utils';
import CheckBoxField from '../CheckBoxField.vue';

describe('CheckBoxField.vue', () => {
    it('checkbox reflects the value prop', () => {
        const wrapper = mount(CheckBoxField, {
            props: {
                label: 'Test Checkbox',
                value: true
            }
        });

        const checkbox = wrapper.find('input[type="checkbox"]');
        expect(checkbox.element.checked).toBe(true);
    });

    it('emits change event with new value when clicked', async () => {
        const wrapper = mount(CheckBoxField, {
            props: {
                label: 'Test Checkbox',
                value: false
            }
        });

        const checkbox = wrapper.find('input[type="checkbox"]');
        await checkbox.trigger('click');

        const emittedEvent = wrapper.emitted();
        expect(emittedEvent.change).toBeTruthy();
        expect(emittedEvent.change[0]).toEqual([true]);
    });
});
