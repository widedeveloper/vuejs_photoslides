

export default function jsonStore (state = {
   
    photoData : [],
    tipData : {}
}, action) {
    switch (action.type) {
        case 'PHOTO_GET' :
            state = { ...state, photoData: action.value }
            break;
        case 'TIP_GET' :
            let actionValue = action.value
            state = {
                    ...state, tipData: {
                        ...state.tipData,
                        
                        tipcontents: actionValue.tipcontents,
                        sidebarTitle:actionValue.title,
                        sidebarSubTitle:actionValue.subtitle,
                        imgUrl:actionValue.imgUrl,
                        sidebarSetting: actionValue.sidebarSetting,
                        logoSetting : actionValue.logoSetting
                    } 
                }
            break;
    }
    return state
}

// state = {
//     ...state, order_info: {
//         ...state.order_info,
//         page: formstate.page,
//         firstName: formstate.firstName,
//         lastName: formstate.lastName,
//         address1: formstate.address1,
//         zip: formstate.zip,
//         city: formstate.city,
//         state: formstate.state,
//         phone: formstate.phone,
//         email: formstate.email,
//         country: formstate.country,
//         campaignId: formstate.campaignId,
//         prospectId: formstate.prospectId
//     }
// }
// break;