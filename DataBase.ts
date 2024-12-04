import Dexie, { Table } from 'dexie';

interface Image {
    urlId: string;
    url: string;
    project: string;
    timestamp: any;
}

class ImagesDataBase extends Dexie {
    images!: Table<Image>; 

    constructor() {
        super('imagesDataBase');

        this.version(1).stores({
            images: 'urlId, url, project, timestamp' 
        });
    }
}

const db = new ImagesDataBase();
export default db;
