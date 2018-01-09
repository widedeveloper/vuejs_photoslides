

export default function jsonStore (state = {
    slideEnd : false,
    photoData : []
}, action) {
    switch (action.type) {
        case 'PHOTO_GET' :
            state = { ...state, photoData: action.value }
            break;
    }
    return state
}

