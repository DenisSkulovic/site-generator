import { PagemetaRepository } from "./PagemetaRepository"
import {TableEnum} from "./TableEnum"

export class PagemetaENRepository extends PagemetaRepository {
    constructor() {
        super(TableEnum.PAGEMETA_EN)
    }
}