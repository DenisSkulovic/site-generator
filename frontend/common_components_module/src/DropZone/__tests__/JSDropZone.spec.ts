// @ts-nocheck
import { mount } from '@vue/test-utils';
import JSDropzone from '../JSDropzone.vue';

jest.mock('../Dropzone.vue', () => ({
    emits: ['droppedFiles'],
    template: '<div />',
}));

describe('JSDropzone', () => {
    let wrapper: any;
    const mockDownloadUrl = 'http://mock-url.com/file.js';

    beforeEach(() => {
        window.location.href = '';
        wrapper = mount(JSDropzone, {
            props: {
                downloadUrl: mockDownloadUrl,
                jsExists: true,
            },
        });
    });

    it('renders correctly', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('displays JS icon if jsExists is true', () => {
        expect(wrapper.find('img').attributes('src')).toBe('/path-to-your-js-icon.png');
    });

    it('downloads JS file on "Download JS" button click', async () => {
        const downloadButton = wrapper.find('button');
        await downloadButton.trigger('click');
        expect(window.location.href).toBe(mockDownloadUrl);
    });

    it('calls "changeFile" on "Change" button click', async () => {
        const changeButton = wrapper.find('button');
        await changeButton.trigger('click');
        expect(wrapper.vm.isDisplayDropzone).toBe(true);
    });

    it('emits "upload" event when files are dropped', async () => {
        const mockFileList = {
            length: 1,
            item: (index: number) => new File([''], 'filename.js', { type: 'text/javascript' }),
        } as FileList;
        await wrapper.vm.handleDroppedFiles(mockFileList);
        expect(wrapper.emitted().upload).toBeTruthy();
        expect(wrapper.emitted().upload[0]).toEqual([mockFileList.item(0)]);
    });
});
