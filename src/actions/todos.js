// import { setTimeout } from "timers";

const PHOTE_GET = 'PHOTO_GET'
const TIP_GET = 'TIP_GET'

export function getPhotoJson (latest_json) {
        return {
            type: PHOTE_GET,
            value: latest_json.images
        } 
}

export function getTipJson (tip_json) {console.log("LSADFASDFASDF",tip_json)
    return {
        type: TIP_GET,
        value: {
            tipcontents: tip_json.tipcontents,
            title:tip_json.title,
            subtitle:tip_json.subtitle,
            imgUrl:tip_json.imageUrl,
            sidebarSetting: tip_json.sidebarSetting,
            logoSetting : tip_json.logoSetting

        }
    }
}


// value: {
//     public: data.data_eg_php_s1.public,
//     meta_description: data.data_eg_php_s1.meta_description,
//     campaignId: data.data_eg_php_s1.campaignId,
//     campaignIds: data.data_eg_php_s1.campaignIds,
//     productId: data.data_eg_php_s1.productId,
//     shippingDiscountId: data.data_eg_php_s1.shippingDiscountId,
//     shippingDiscountPrice: data.data_eg_php_s1.shippingDiscountPrice,
//     shippingId: data.data_eg_php_s1.shippingId,
//     shippingOnRebills: data.data_eg_php_s1.shippingOnRebills,
//     CCsAccepted: data.data_eg_php_s1.CCsAccepted
// }