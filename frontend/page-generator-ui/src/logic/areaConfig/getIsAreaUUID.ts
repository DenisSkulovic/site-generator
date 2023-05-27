import allAreaConfigIdSet from "../../computed/pageConfig/allAreaConfigIdSet"

const getIsAreaUUID = (uuid: string): boolean => {
    return allAreaConfigIdSet.value.has(uuid)
}

export default getIsAreaUUID