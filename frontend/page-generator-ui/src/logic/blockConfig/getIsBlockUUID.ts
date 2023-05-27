import allBlockConfigIdSet from "../../computed/pageConfig/allBlockConfigIdSet"

const getIsBlockUUID = (uuid: string): boolean => {
    return allBlockConfigIdSet.value.has(uuid)
}

export default getIsBlockUUID