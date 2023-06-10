import { mount } from '@vue/test-utils';
import Dropzone from '../Dropzone.vue';

jest.mock('../Dropzone.vue', () => ({
    emits: ['droppedFiles'],
    template: '<div />',
}));

describe('Dropzone', () => {
    let wrapper: any;

    beforeEach(() => {
        wrapper = mount(Dropzone);
    });

    it('renders correctly', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('displays the default slot text when not dragging', () => {
        expect(wrapper.text()).toContain('Drag and drop files here or click to upload');
    });

    it('emits "droppedFiles" event when files are dropped', async () => {
        const mockFileList = {
            length: 1,
            item: (index: number) => new File([''], 'filename.txt', { type: 'text/plain' }),
        } as FileList;

        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(mockFileList.item(0));

        const mockDragEvent = new DragEvent('drop', { dataTransfer });

        await wrapper.vm.onDrop(mockDragEvent);

        expect(wrapper.emitted().droppedFiles).toBeTruthy();
        expect(wrapper.emitted().droppedFiles[0]).toEqual([mockFileList]);
    });
});
