

export default function jsonStore (state = {
    slideEnd : false,
    photoData : [],
    tipData : []
}, action) {
    switch (action.type) {
        case 'PHOTO_GET' :
            state = { ...state, photoData: action.value }
            break;
        case 'TIP_GET' :
            state = { ...state, tipData: action.value}
            break;
    }
    return state
}

