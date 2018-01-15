// import { setTimeout } from "timers";

const JSON_GET = 'JSON_GET'

export function getPhotoJson (latest_json) {
        return {
            type: JSON_GET,
            value: {
                images: latest_json.images,
                tipcontents: latest_json.tipcontents,
                title:latest_json.title,
                subtitle:latest_json.subtitle,
                imgUrl:latest_json.imageUrl,
                sidebarSetting: latest_json.sidebarSetting,
                logoSetting : latest_json.logoSetting,
                bottombarSetting: latest_json.bottombarSetting    
            }
        } 
}

// export function getTipJson (tip_json) {

//     return {
//         type: TIP_GET,
//         value: {
//             tipcontents: tip_json.tipcontents,
//             title:tip_json.title,
//             subtitle:tip_json.subtitle,
//             imgUrl:tip_json.imageUrl,
//             sidebarSetting: tip_json.sidebarSetting,
//             logoSetting : tip_json.logoSetting,
//             bottombarSetting: tip_json.bottombarSetting

//         }
//     }
// }


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