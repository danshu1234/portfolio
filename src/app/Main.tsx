'use client'

import Link from "next/link";
import { FC, useState, useEffect, ChangeEvent } from "react";
import db from "../../DataBase";
import './main.css'

const Main: FC = () => {

    const [projectArr, setProjectArr] = useState <any> ([])
    const [sort, setSort] = useState <string> ('')
    const [isProjects, setIsProjects] = useState <string> ('')

    const getData = async () => {
        const getStorage = await localStorage.getItem('projects')
        if (getStorage !== null && JSON.parse(getStorage).length !== 0) {
            setIsProjects('Ваши проекты загружаются...')
            const getProjects = await JSON.parse(getStorage)
            const images = await db.images.toArray()
            const newProjects = await getProjects.map((item: any) => {
                const findPhoto = images.find((el: any) => el.project === item.name)
                return {name: item.name, comment: item.comment, href: item.href, cover: findPhoto?.url, timestamp: findPhoto?.timestamp, stars: item.stars}
            })
            setProjectArr(newProjects)
            setIsProjects('')
        } else {
            setIsProjects('Проектов пока нет')
        }
    }

    useEffect(() => {   
        getData()
    }, [])

    useEffect(() => {
        if (sort === 'Сначала новые') {
            const sortProjects = projectArr.toSorted((a: any, b: any) => b.timestamp - a.timestamp)
            setProjectArr(sortProjects)
        } else if (sort === 'Сначала старые') {
            const sortProjects = projectArr.toSorted((a: any, b: any) => a.timestamp - b.timestamp)
            setProjectArr(sortProjects)
        } else if (sort === 'Сложности ↓') {
            const sortProjects = projectArr.toSorted((a: any, b: any) => b.stars.length - a.stars.length) 
            setProjectArr(sortProjects)
        } else if (sort === 'Сложности ↑') {
            const sortProjects = projectArr.toSorted((a: any, b: any) => a.stars.length - b.stars.length) 
            setProjectArr(sortProjects)
        }
    }, [sort])

    return (
        <div className="main-contain">
           <div className="main-el">
           <Link href={'/createproject'}>+</Link>
           </div>
           <div className="main-el">
           <ul>
            {projectArr.map((item: any, index: any) => <li key={index}>
                <div style={{backgroundImage: `url(${item.cover})`}} className="backround-img"><Link href={`${item.name}`}>{item.name}</Link>
                </div></li>)}
        </ul>
        </div>
        <div className="main-el">
        <p>Сортиртировка</p>
        </div>
        <select onChange={(event: ChangeEvent<HTMLSelectElement>) => setSort(event.target.value)}>
            <option>Сначала новые</option>
            <option>Сначала старые</option>
            <option>Сложности ↓</option>
            <option>Сложности ↑</option>
        </select><br/>
        {isProjects}
        </div>
    )
}

export default Main