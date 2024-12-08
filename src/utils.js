// for utility/helper functions
import { ayatList } from "../data/ayatList.js";

export const getNextAyah = (currentIndex, ayatList) => {
    if(!Array.isArray(ayatList) || ayatList.length === 0) {
        throw new Error("ayatList must be a non-empty array");
    }
    if (typeof currentIndex !== 'number' || currentIndex < 0 ) {
        throw new Error("currentIndex must be a valid index in ayatList")
    }
    return ayatList[(currentIndex + 1) % ayatList.length];
};









// Bunlar muhtemelen silinecek
export const ayatList = () => {
    // Ayah details as array of objects
    const ayatList = [

    ]
}
