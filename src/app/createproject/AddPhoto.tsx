'use client'

import { ChangeEvent, FC } from "react"

interface Props {
    photos: string[],
    setPhotos: Function,
}

const AddPhoto: FC <Props> = (props) => {
    return (
        <div>
            <input type="file" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const files = event.target.files;  
                if (files) {
                    const file = files[0];
                    if (file) {                  
                        const reader = new FileReader();               
                        reader.onload = (e) => {
                            const result = e.target?.result;
                            if (typeof result === "string") {
                                props.setPhotos([...props.photos, result])
                            }
                        };
                        reader.readAsDataURL(file); 
                    }
                }                             
            }}/>
        </div>
    )
}

export default AddPhoto