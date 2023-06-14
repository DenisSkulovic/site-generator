import { computed } from 'vue';
import type {ComputedRef} from "vue"
import type { Pagemeta } from '@admin_cls_module';
import { pagemetasCurrent, pagemetasEdit } from '@/state/pagemetas';

function usePagemetasMap(pagesArray: Pagemeta[] | null): ComputedRef<Map<string, Pagemeta>> {
    return computed(() => {
        const map: Map<string, Pagemeta> = new Map();
        const pages = pagesArray;
        if (pages) {
            pages.forEach((page) => {
                map.set(page.path, page);
            });
        }
        return map;
    });
}

export const pagemetasMapCurrent: ComputedRef<Map<string, Pagemeta>> = usePagemetasMap(pagemetasCurrent.value);
export const pagemetasMapEdit: ComputedRef<Map<string, Pagemeta>> = usePagemetasMap(pagemetasEdit.value);