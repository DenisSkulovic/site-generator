"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagemetaRURepository = void 0;
const PagemetaRepository_1 = require("./PagemetaRepository");
const TableEnum_1 = require("./TableEnum");
class PagemetaRURepository extends PagemetaRepository_1.PagemetaRepository {
    constructor() {
        super(TableEnum_1.TableEnum.PAGEMETA_RU);
    }
}
exports.PagemetaRURepository = PagemetaRURepository;
//# sourceMappingURL=PagemetaRURepository.js.map