import { PagemetaRepository } from "./PagemetaRepository"
import {TableEnum} from "./TableEnum"

export class PagemetaLTRepository extends PagemetaRepository {
    constructor() {
        super(TableEnum.PAGEMETA_LT)
    }
}