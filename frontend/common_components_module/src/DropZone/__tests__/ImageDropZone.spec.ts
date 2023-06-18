// @ts-nocheck
import { mount } from '@vue/test-utils';
import ImageDropzone from '../ImageDropzone.vue';

jest.mock('../Dropzone.vue', () => ({
    emits: ['droppedFiles'],
    template: '<div />',
}));

describe('ImageDropzone', () => {
    let wrapper: any;
    const mockImageUrl = 'http://mock-image-url.com/image.png';

    beforeEach(() => {
        wrapper = mount(ImageDropzone, {
            props: {
                imageUrl: mockImageUrl,
            },
        });
    });

    it('renders correctly', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('displays image if imageUrl is provided', () => {
        expect(wrapper.find('img').attributes('src')).toBe(mockImageUrl);
    });

    it('calls "changeImage" on "Change Image" button click', async () => {
        const changeImageButton = wrapper.find('button');
        await changeImageButton.trigger('click');
        expect(wrapper.vm.isDisplayDropzone).toBe(true);
    });

    it('emits "upload" event when files are dropped', async () => {
        const mockFileList = {
            length: 1,
            item: (index: number) => new File([''], 'filename.png', { type: 'image/png' }),
        } as FileList;
        await wrapper.vm.handleDroppedFiles(mockFileList);
        expect(wrapper.emitted().upload).toBeTruthy();
        expect(wrapper.emitted().upload[0]).toEqual([mockFileList.item(0)]);
    });
});
