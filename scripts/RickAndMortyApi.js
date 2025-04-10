"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
function init() {
    axios_1.default.defaults.baseURL = 'https://rickandmortyapi.com/api/';
}
function fetchRandomCharacter() {
}
