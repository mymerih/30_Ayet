// for utility/helper functions
import { ayahList } from "./data/ayahList.js";

export const getNextAyah = (currentIndex, ayahList) => {
    if(!Array.isArray(ayahList) || ayahList.length === 0) {
        throw new Error("ayahList must be a non-empty array");
    }
    if (typeof currentIndex !== 'number' || currentIndex < 0 ) {
        throw new Error("currentIndex must be a valid index in ayahList")
    }
    return ayahList[(currentIndex + 1) % ayahList.length];
};









// Bunlar muhtemelen silinecek
export const fetchAyatData = () => {
    // Ayat details as array of objects
    const ayatList = [

    ]
}
