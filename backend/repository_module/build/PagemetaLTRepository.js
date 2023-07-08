"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagemetaLTRepository = void 0;
const PagemetaRepository_1 = require("./PagemetaRepository");
const TableEnum_1 = require("./TableEnum");
class PagemetaLTRepository extends PagemetaRepository_1.PagemetaRepository {
    constructor() {
        super(TableEnum_1.TableEnum.PAGEMETA_LT);
    }
}
exports.PagemetaLTRepository = PagemetaLTRepository;
//# sourceMappingURL=PagemetaLTRepository.js.map