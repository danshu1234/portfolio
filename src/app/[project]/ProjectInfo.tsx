'use client'

import { ChangeEvent, FC, useEffect, useState } from "react";
import db from "../../../DataBase";
import Link from "next/link";

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
        window.location.href = '/'
    }

    const validate = () => {
        if (input === project.name) {
            const getProjects = localStorage.getItem('projects')
            if (getProjects) {
                const paresedStorage = JSON.parse(getProjects)
                const filteredStorage = paresedStorage.filter((el: any) => el.name !== props.project)
                localStorage.setItem('projects', JSON.stringify(filteredStorage))
                deletePhotos()
            }
        } else {
            setWarn('Названия не совпадают')
        }
    }

    if (deleteForm) {
        remove = <div>
            <p>Введите название вашего проекта</p>
            <input onChange={(event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value)}/>
            {warn}
            <button onClick={validate}>Удалить</button>
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
        <div>
            <h2>{project?.name}</h2>
            <p>{project?.comment}</p>
            <Link href={project.href} target="_blank">{project.href} </Link>
            <p>{project?.stars}</p>
            <ul>{photos.map((item, index) => <li key={index}><img src={item} width={100} height={100}/></li>)}</ul>
            <button onClick={() => setDeleteForm(true)}>Удалить проект</button>
            {remove}
        </div>
    );
};

export default ProjectInfo;