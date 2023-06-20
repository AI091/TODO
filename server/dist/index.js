"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("./routers/auth"));
var todo_1 = __importDefault(require("./routers/todo"));
var prisma = new client_1.PrismaClient();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
app.use("/todo", todo_1.default);
app.listen(8000);
//# sourceMappingURL=index.js.map