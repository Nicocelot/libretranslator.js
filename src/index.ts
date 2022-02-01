import fetch from "node-fetch"
import {Languages, Convert} from "./Language"
import {LanguageDetectionResult, Convert2} from "./LanguageDetectionResult"
import {FrontEndSettings, Convert3} from "./FrontendSettings"

/**
 * Returns compatible languages!
 * @return {Promise<Languages[]>}
 */
export function GetLanguages(): Promise<Languages[]> {
    return new Promise((resolve, reject) => {
        fetch("https://translate.mentality.rip/languages").then((v) => {
            if (!v.ok) reject(v);
            v.text().then((str) => {
                resolve(Convert.toLanguages(str))
            })
        })
    })
}

/**
 * Detect languages from text!
 * @param {string} text
 * @return {Promise<LanguageDetectionResult[]>}
 */
export function DetectLanguage(text:string): Promise<LanguageDetectionResult[]> {
    return new Promise((resolve, reject) => {
        let b = {q: text}
        fetch("https://translate.mentality.rip/detect", {"method": "POST", headers: {'Content-Type': 'application/json'},"body": JSON.stringify(b)}).then((v) => {
            if (!v.ok) reject(v);
            v.text().then((str) => {
                resolve(Convert2.toLanguageDetectionResult(str));
            })
        })
    })
}
/**
 * Translate text from a language to another language!
 * @param {string} text
 * @param {Languages} sourcelanguage
 * @param {Languages} targetlanguage
 * @return {Promise<string>}
 */
export function Translate(text: string, sourcelanguage: Languages, targetlanguage: Languages): Promise<string> {
    return new Promise((resolve, reject) => {
        let b = {q: text, source: sourcelanguage.code, target: targetlanguage.code, format: "text"}
        fetch("https://translate.mentality.rip/translate", {"method": "POST", headers: {'Content-Type': 'application/json'},"body": JSON.stringify(b)}).then((v) => {
            if (!v.ok) reject(v);
            v.text().then((str) => {
                resolve(JSON.parse(str).translatedText);
            })
        })
    })
}

/**
 * Get front end settings of the api!
 * @return {Promise<FrontEndSettings>}
 */
export function GetFrontEndSettings(): Promise<FrontEndSettings> {
    return new Promise((resolve, reject) => {
        fetch("https://translate.mentality.rip/languages").then((v) => {
            if (!v.ok) reject(v);
            v.text().then((str) => {
                resolve(Convert3.toFrontEndSettings(str))
            })
        })
    })
}