"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_1 = require("./controullers/search");
const router = (0, express_1.Router)();
router.post('/search-cnpj', search_1.searchCnpj);
exports.default = router;
