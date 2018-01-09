// import { setTimeout } from "timers";

const PHOTE_GET = 'PHOTO_GET'
const TIP_GET = 'TIP_GET'

export function getPhotoJson (latest_json) {
        return {
            type: PHOTE_GET,
            value: latest_json.images
        } 
}

export function getTipJson () {
    return {
        type: TIP_GET
    }
}
