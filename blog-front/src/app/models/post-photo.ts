export class PostPhoto {
    _id: string;
    caption: string;
    fileName: string;

    //assign vals from json to properties
    constructor(values: Object = {}) { 
        Object.assign(this, values);
    }
}