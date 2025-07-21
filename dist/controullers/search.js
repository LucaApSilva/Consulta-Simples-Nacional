"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCnpj = searchCnpj;
const sdk_1 = require("@cnpja/sdk");
function searchCnpj(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        let { cnpjs } = req.body;
        const listCnpjs = cnpjs.split(',').map((cnpj) => cnpj.trim());
        let response = [];
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        try {
            if (listCnpjs.length > 1) {
                for (let i = 0; i < listCnpjs.length; i++) {
                    const cnpj = listCnpjs[i];
                    const cnpja = new sdk_1.CnpjaOpen();
                    const office = yield cnpja.office.read({ taxId: cnpj });
                    response.push({
                        Cnpj: office.taxId,
                        SimplesNacional: (_b = (_a = office.company.simples) === null || _a === void 0 ? void 0 : _a.optant) !== null && _b !== void 0 ? _b : false
                    });
                    yield sleep(12000);
                }
                res.json(response);
            }
            else {
                yield sleep(12000);
                const cnpja = new sdk_1.CnpjaOpen();
                const office = yield cnpja.office.read({ taxId: listCnpjs[0] });
                res.json({
                    cnpj: office.taxId,
                    simplesNacional: (_d = (_c = office.company.simples) === null || _c === void 0 ? void 0 : _c.optant) !== null && _d !== void 0 ? _d : false
                });
            }
        }
        catch (error) {
            res.json({
                mensagem: 'Erro ao consultar os CNPJs',
                Error: console.log(error)
            });
        }
    });
}
