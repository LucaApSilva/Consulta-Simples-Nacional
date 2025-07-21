"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const routers_1 = __importDefault(require("./routers"));
const porta = process.env.PORT || 3000;
app_1.default.use(routers_1.default);
app_1.default.listen(porta, () => console.log(`API rodando na porta ${porta}`));
