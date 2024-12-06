'use client'

import { ChangeEvent, FC } from "react"
import db from "../../../DataBase"
import { useRef } from "react"
import './create.css'

interface Props {
    photos: string[],
    setPhotos: Function,
    findPhoto: string,
    setFindPhoto: Function,
}

const AddPhoto: FC <Props> = (props) => {
    const photoInputRef = useRef<HTMLInputElement | null>(null); 

    const checkPhoto = async (result: string) => {
        const allPhotos = await db.images.toArray();
        const findFromDb = await allPhotos.find(item => item.urlId === result);
        const findFromPhotos = await props.photos.find(item => item === result);
        if (findFromDb === undefined && findFromPhotos === undefined) {
            props.setPhotos([...props.photos, result]);
        } else {
            props.setFindPhoto('Вы уже добавляли это фото ранее');
            setTimeout(() => {
                props.setFindPhoto('');
            }, 1500);
        }
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;  
        if (files) {
            const file = files[0];
            if (file) {                  
                const reader = new FileReader();               
                reader.onload = (e) => {
                    const result = e.target?.result;
                    if (typeof result === "string") {
                        checkPhoto(result);
                    }
                };
                reader.readAsDataURL(file); 
            }
        }                             
    }

    const handleButtonClick = () => {
        photoInputRef.current?.click(); 
    }

    return (
        <div className="add-photo-contain">
            <input
                type="file"
                ref={photoInputRef} 
                onChange={handleFileChange}
                style={{ display: 'none' }} 
            />
            <button type="button" onClick={handleButtonClick} className="add-photo-btn">+</button>
        </div>
    )
}

export default AddPhoto;
