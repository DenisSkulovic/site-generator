import { PagemetaRepository } from "./PagemetaRepository"
import {TableEnum} from "./TableEnum"

export class PagemetaRURepository extends PagemetaRepository {
    constructor() {
        super(TableEnum.PAGEMETA_RU)
    }
}