"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFrontEndSettings = exports.Translate = exports.DetectLanguage = exports.GetLanguages = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var Language_1 = require("./Language");
var LanguageDetectionResult_1 = require("./LanguageDetectionResult");
var FrontendSettings_1 = require("./FrontendSettings");
function GetLanguages() {
    return new Promise(function (resolve, reject) {
        (0, node_fetch_1.default)("https://translate.mentality.rip/languages").then(function (v) {
            if (!v.ok)
                reject(v);
            v.text().then(function (str) {
                resolve(Language_1.Convert.toLanguages(str));
            });
        });
    });
}
exports.GetLanguages = GetLanguages;
function DetectLanguage(text) {
    return new Promise(function (resolve, reject) {
        var b = { q: text };
        (0, node_fetch_1.default)("https://translate.mentality.rip/detect", { "method": "POST", headers: { 'Content-Type': 'application/json' }, "body": JSON.stringify(b) }).then(function (v) {
            if (!v.ok)
                reject(v);
            v.text().then(function (str) {
                resolve(LanguageDetectionResult_1.Convert2.toLanguageDetectionResult(str));
            });
        });
    });
}
exports.DetectLanguage = DetectLanguage;
function Translate(text, sourcelanguage, targetlanguage) {
    return new Promise(function (resolve, reject) {
        var b = { q: text, source: sourcelanguage.code, target: targetlanguage.code, format: "text" };
        (0, node_fetch_1.default)("https://translate.mentality.rip/translate", { "method": "POST", headers: { 'Content-Type': 'application/json' }, "body": JSON.stringify(b) }).then(function (v) {
            if (!v.ok)
                reject(v);
            v.text().then(function (str) {
                resolve(JSON.parse(str).translatedText);
            });
        });
    });
}
exports.Translate = Translate;
function GetFrontEndSettings() {
    return new Promise(function (resolve, reject) {
        (0, node_fetch_1.default)("https://translate.mentality.rip/languages").then(function (v) {
            if (!v.ok)
                reject(v);
            v.text().then(function (str) {
                resolve(FrontendSettings_1.Convert3.toFrontEndSettings(str));
            });
        });
    });
}
exports.GetFrontEndSettings = GetFrontEndSettings;
DetectLanguage("Hola amigo!").then(function (v) {
    console.log(v[0].language);
});
