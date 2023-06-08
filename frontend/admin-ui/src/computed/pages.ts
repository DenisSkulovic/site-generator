import { computed } from 'vue';
import type {ComputedRef} from "vue"
import type { PageHTMLObject } from '@page_cls_module';
import { pagesCurrent, pagesEdit } from '@/state/pages';

function usePagesMap(pagesArray: PageHTMLObject[] | null): ComputedRef<Map<string, PageHTMLObject>> {
    return computed(() => {
        const map: Map<string, PageHTMLObject> = new Map();
        const pages = pagesArray;
        if (pages) {
            pages.forEach((page) => {
                map.set(page.uuid, page);
            });
        }
        return map;
    });
}

export const pagesMapCurrent: ComputedRef<Map<string, PageHTMLObject>> = usePagesMap(pagesCurrent.value);
export const pagesMapEdit: ComputedRef<Map<string, PageHTMLObject>> = usePagesMap(pagesEdit.value);