"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagemetaENRepository = void 0;
const PagemetaRepository_1 = require("./PagemetaRepository");
const TableEnum_1 = require("./TableEnum");
class PagemetaENRepository extends PagemetaRepository_1.PagemetaRepository {
    constructor() {
        super(TableEnum_1.TableEnum.PAGEMETA_EN);
    }
}
exports.PagemetaENRepository = PagemetaENRepository;
//# sourceMappingURL=PagemetaENRepository.js.map