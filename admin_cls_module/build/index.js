"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPagemetaMetadata = exports.PagemetaMetadata = exports.buildPagemeta = exports.Pagemeta = exports.buildSiteConfig = exports.SiteConfig = exports.mockFactories = void 0;
exports.mockFactories = __importStar(require("./mockFactories"));
var SiteConfig_1 = require("./SiteConfig");
Object.defineProperty(exports, "SiteConfig", { enumerable: true, get: function () { return SiteConfig_1.SiteConfig; } });
Object.defineProperty(exports, "buildSiteConfig", { enumerable: true, get: function () { return SiteConfig_1.buildSiteConfig; } });
var Pagemeta_1 = require("./Pagemeta");
Object.defineProperty(exports, "Pagemeta", { enumerable: true, get: function () { return Pagemeta_1.Pagemeta; } });
Object.defineProperty(exports, "buildPagemeta", { enumerable: true, get: function () { return Pagemeta_1.buildPagemeta; } });
var PagemetaMetadata_1 = require("./PagemetaMetadata");
Object.defineProperty(exports, "PagemetaMetadata", { enumerable: true, get: function () { return PagemetaMetadata_1.PagemetaMetadata; } });
Object.defineProperty(exports, "buildPagemetaMetadata", { enumerable: true, get: function () { return PagemetaMetadata_1.buildPagemetaMetadata; } });
//# sourceMappingURL=index.js.map