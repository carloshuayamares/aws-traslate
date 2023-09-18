const { Translate } = require('@google-cloud/translate').v2;
const dotenv = require('dotenv');
dotenv.config();
const translate = new Translate();
translate.key = process.env.API_TRASLATE // process.env.DEEPL_KEY;

module.exports = async (reporte) => {

    try {

        let allkeys = Object.keys(reporte).join(',')
        let [_allkeys_traslate] = await translate.translate(allkeys, "es")

        const _key_traducida = _allkeys_traslate.split(',')
        const reporte_traslate = {}
        let i = 0
        for (let _key in reporte) {
            let temp = reporte[_key]
            reporte_traslate[_key_traducida[i]] = temp
            i++
        }

        return reporte_traslate
    
    } catch (e) {
        console.log(e)
        return 0
    }
}
