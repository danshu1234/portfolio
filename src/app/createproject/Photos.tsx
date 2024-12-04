'use client'

import { FC } from "react";
import AddPhoto from "./AddPhoto";

interface Props {
    photos: string[],
    setPhotos: Function,
}

const Photos: FC <Props> = (props) => {

    let show;

    if (props.photos.length === 0) {
        show = <div>
            <AddPhoto photos = {props.photos} setPhotos = {props.setPhotos}/>
        </div>
    } else if (props.photos.length < 5) {
        show = <div>
            {props.photos.map((item, index) => <li key={index}>
                <div>
                <p onClick={() => {
                    const filteredArr = props.photos.filter(el => el !== item)  
                    props.setPhotos(filteredArr)               
                }}>X</p>
                <img src={item} width={100} height={100}/>
                </div></li>)}
            <AddPhoto photos = {props.photos} setPhotos = {props.setPhotos}/>
        </div>
    } else if (props.photos.length >= 5) {
        show = <div>
            {props.photos.map((item, index) => <li key={index}><img src={item} width={100} height={100}/></li>)}
        </div>
    }

    return (
        <div>
            {show}
        </div>
    )
}

export default Photos