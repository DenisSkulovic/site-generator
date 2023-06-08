import { computed } from "vue"
import type { ComputedRef } from "vue"
import loadingSet from "../state/loadingSet"


const guid = () => { // couldnt get uuid and crypto packages working, so found this simple function on stackoverflow 
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    // return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


export const stopLoadingAll = (): void => {
    loadingSet.value = new Set()
}
export const startLoadingId = (id: string): void => {
    loadingSet.value.add(id)
    loadingSet.value = new Set(loadingSet.value)
}
export const stopLoadingId = (id: string): void => {
    loadingSet.value.delete(id)
    loadingSet.value = new Set(loadingSet.value)
}

export const isLoadingAny: ComputedRef<boolean> = computed((): boolean => {
    return loadingSet.value.size > 0
})

export const isLoadingId = (id: string) => {
    return loadingSet.value.has(id)
}

const useLoading = (name?: string) => {
    if (name && loadingSet.value.has(name)) throw new Error(`there is already a loading process with this id: ${name}`)
    const id: string = name || guid()

    const startLoadingThis = (): void => {
        if (loadingSet.value.has(id)) {
            console.error(`loading process with id: "${id}" was already started`)
            return
        }
        loadingSet.value.add(id)
        loadingSet.value = new Set(loadingSet.value)
    }

    const stopLoadingThis = (): void => {
        if (!loadingSet.value.has(id)) {
            console.error(`loading process with id: "${id}" was already stopped`)
            return
        }
        loadingSet.value.delete(id)
        loadingSet.value = new Set(loadingSet.value)
    }

    const isLoadingThis: ComputedRef<boolean> = computed((): boolean => {
        return loadingSet.value.has(id)
    })

    const getLoadingId = (): string => {
        return id
    }
    return {
        startLoadingThis,
        stopLoadingThis,
        isLoadingThis,
        getLoadingId,
    }
}

export default useLoading