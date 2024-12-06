'use client'

import { FC } from "react";
import AddPhoto from "./AddPhoto";
import './create.css'

interface Props {
    photos: string[],
    setPhotos: Function,
    findPhoto: string,
    setFindPhoto: Function,
}

const Photos: FC<Props> = (props) => {
    let show;

    if (props.photos.length === 0) {
        show = <div>
            <AddPhoto photos={props.photos} setPhotos={props.setPhotos} findPhoto={props.findPhoto} setFindPhoto={props.setFindPhoto} />
        </div>
    } else if (props.photos.length < 5) {
        show = (
            <div className="photos">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', overflowX: 'auto' }}>
                    {props.photos.map((item, index) => (
                        <li key={index} style={{ marginRight: '20px' }}>
                            <img src={item} width={100} height={100} className="photo" />
                        </li>
                    ))}
                </ul>
                <AddPhoto photos={props.photos} setPhotos={props.setPhotos} findPhoto={props.findPhoto} setFindPhoto={props.setFindPhoto} />
            </div>
        );
    } else if (props.photos.length >= 5) {
        show = (
            <div className="photos">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', overflowX: 'auto' }}>
                    {props.photos.map((item, index) => (
                        <li key={index} style={{ marginRight: '20px' }}>
                            <img src={item} width={100} height={100} className="photo" />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div className="photos-contain">
            {show}
        </div>
    )
}

export default Photos;
