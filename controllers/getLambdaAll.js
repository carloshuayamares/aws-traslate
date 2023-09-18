const fetch = require('node-fetch')
const { Translate } = require('@google-cloud/translate').v2;

const dotenv = require('dotenv');
dotenv.config();

const translate = new Translate();
translate.key = process.env.API_TRASLATE // process.env.DEEPL_KEY;

module.exports = async (apiRoute) => {
    const url = process.env.SWAPI // 'https://swapi.py4e.com/api'

    try {
        const _body = await fetch(`${url}/${apiRoute}`)
        const reporte = await _body.json()

        let allkeys = Object.keys(reporte).join(',')
        let [_allkeys_traslate] = await translate.translate(allkeys, "es")
        const _key_traducida = _allkeys_traslate.split(',')
        let reporte_traslate = {}

        let i = 0
        for (let _key in reporte) {
            let temp = reporte[_key]
            reporte_traslate[_key_traducida[i]] = temp
            i++
        }


        let oneResultKeys = Object.keys(reporte_traslate.resultados[0]).join(',')
        let [oneResultKeys_traslate] = await translate.translate(oneResultKeys, "es")
        const _onekey_traducida = oneResultKeys_traslate.split(',')

        let _results = []
        for (let one of reporte_traslate.resultados) {

            let _newOne = {}
            let j = 0
            for (let __key in one) {
                let _temp = one[__key]
                _newOne[_onekey_traducida[j]] = _temp
                j++
            }
            _results.push(_newOne)
        }
    
        reporte_traslate.resultados = _results
        return reporte_traslate
    
    } catch (e) {
        return {
            success: false,
            message: e.message,
        }
    }
}