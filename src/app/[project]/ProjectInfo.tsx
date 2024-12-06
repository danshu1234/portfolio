'use client'

import { ChangeEvent, FC, useEffect, useState } from "react";
import db from "../../../DataBase";
import Link from "next/link";
import './project.css'

interface Props{
    project: string,
}

interface Project {
    name: string,
    comment: string,
    href: string,
    stars: string,
}

const ProjectInfo: FC<Props> = (props) => {

    const [deleteForm, setDeleteForm] = useState <boolean> (false)
    const [project, setProject] = useState <Project> ({name: '', comment: '', href: '', stars: ''})
    const [photos, setPhotos] = useState <string[]> ([])
    const [input, setInput] = useState <string> ('')
    const [warn, setWarn] = useState <string> ('')
    let remove;

    const deletePhotos = async () => {
        const allPhotos = await db.images.toArray()
        const filteredDB = await allPhotos.filter(item => item.project !== props.project)
        await db.images.clear()
        await db.images.bulkAdd(filteredDB)
    }

    const validate = () => {
        if (input === project.name) {
            const getProjects = localStorage.getItem('projects')
            if (getProjects) {
                const paresedStorage = JSON.parse(getProjects)
                const filteredStorage = paresedStorage.filter((el: any) => el.name !== props.project)
                localStorage.setItem('projects', JSON.stringify(filteredStorage))
                window.location.href = '/'
                deletePhotos()
            }
        } else {
            setWarn('Названия не совпадают')
        }
    }

    if (deleteForm) {
        remove = <div className="confirm-delete-contain">
            <p>Название вашего проекта:</p>
            <input onChange={(event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value)} className="confirm-input"/>
            <p className="not-confirm">{warn}</p>
            <button onClick={validate} className="confirm-delete-btn">Удалить</button>
        </div>
    }   

    const getPhotos = async () => {
        const allPhotos = await db.images.toArray()
        const thisProject = await allPhotos.filter(item => item.project === props.project)
        const thisPhotos = await thisProject.map(item => item.url)
        setPhotos(thisPhotos)
    }

    useEffect(() => {
        const getStorage = localStorage.getItem('projects')
        if (getStorage) {
            const getProjects = JSON.parse(getStorage)
            const findProject = getProjects.find((item: any) => item.name === props.project)
            if (findProject !== undefined) {
                setProject(findProject)
            } 
        }
        getPhotos()
    }, [])

    return (
        <div className="project-contain">
            <h2 className="head">{project?.name}</h2>
            <p className="stars">{project?.stars}</p>
            <div className="comment-contain">
            <h3 className="comment">{project?.comment}</h3>
            </div>
            <Link href={project.href} target="_blank" className="href"><h3>Репозиторий</h3></Link>
            <h4>Галерея</h4>
            <ul className="list-img">{photos.map((item, index) => <li key={index}><img src={item} width={150} height={150} className="img"/></li>)}</ul>
            <button onClick={() => setDeleteForm(true)} className="delete-btn">Удалить проект</button>
            {remove}
        </div>
    );
};

export default ProjectInfo;