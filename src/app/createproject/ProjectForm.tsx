'use client'

import { ErrorMessage, Field, Form, Formik } from "formik"
import { ChangeEvent, FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Photos from "./Photos"
import db from "../../../DataBase"
import './create.css'

interface Errors {
name?: string,
comment?: string,
cover?: string,
href?: string,
photos?: string,
stars?: string,
}

interface Project {
name: string,
comment: string,
href: string,
stars: string,
}

interface Store {
projects: Project[],
}

const ProjectForm: FC = () => {
const projects = useSelector((state: Store) => state.projects)
const dispatch = useDispatch()
const [photos, setPhotos] = useState<string[]>([])
const [stars, setStars] = useState<string>('')
const [btn, setBtn] = useState<boolean>(true)
const [succes, setSucces] = useState<string>('')
const [findPhoto, setFindPhoto] = useState<string>('')

let button = btn ? <button type="submit" className="submit-btn">Опубликовать</button> : null

const afterSubmit = () => {
setSucces('Вы опубликовали проект!')
setTimeout(() => {
window.location.href = '/'
}, 2000);
}

useEffect(() => {
    console.log(stars)
}, [stars])

return (

<div className="create-contain"> <Formik initialValues={{ name: '', comment: '', href: '', photos: '', stars: '', }}
    validate={values => {
        const errors: Errors = {}
        const urlPattern = /^(https?:\/\/)?([a-z0-9.-]+)\.([a-z]{2,})(\/[^\s]*)?$/i;
        if (!urlPattern.test(values.href)) {
            errors.href = 'Введите корректную ссылку'
        }
        if (photos.length < 1) {
            errors.photos = 'Пожалуйста, добавьте хотя бы 1 скриншот вашего проекта'
        }
        if (!values.name) {
            errors.name = 'Это поле обязательно'
        } 
        if (!values.comment) {
            errors.comment = 'Это поле обязательно'
        }
        if (!values.href) {
            errors.href = 'Это поле обязательно'
        }   
        return errors
    }}

    onSubmit={async values => {
        dispatch({ type: 'CHANGE', payload: [...projects, {
            name: values.name,
            comment: values.comment,
            href: values.href,
        }]})
        await photos.map(item => {
            return db.images.add({ urlId: item, url: item, project: values.name, timestamp: Date.now() })               
        })
        const getProjects = localStorage.getItem('projects')
        if (getProjects === null) {
            if (stars === '') {
                localStorage.setItem('projects', JSON.stringify([{ name: values.name, comment: values.comment, href: values.href, stars: '★' }]))
            } else {
                localStorage.setItem('projects', JSON.stringify([{ name: values.name, comment: values.comment, href: values.href, stars: stars }]))
            }
        } else {
            const parsedProjects = JSON.parse(getProjects)
            if (stars === '') {
                localStorage.setItem('projects', JSON.stringify([{ name: values.name, comment: values.comment, href: values.href, stars: '★' }, ...parsedProjects]))
            } else {
                localStorage.setItem('projects', JSON.stringify([{ name: values.name, comment: values.comment, href: values.href, stars: stars }, ...parsedProjects]))
            }
        }
        setBtn(false)
        afterSubmit()
    }}
>
    {formik => (
        <Form>
            <div className="form-contain">
                <label htmlFor="name">
                    <Field id='name' name='name' placeholder='Название' className = "form-input"/>
                </label>
                <ErrorMessage name="name" component="div" className="error-message" />

                <label htmlFor="comment">
                    <Field id='comment' name='comment' placeholder='Описание' as = 'textarea' className = "form-input"/>
                </label>
                <ErrorMessage name="comment" component="div" className="error-message" />

                <label htmlFor="href">
                    <Field id='href' name='href' placeholder='Ссылка на репозиторий' className = "form-input"/>
                </label>
                <ErrorMessage name="href" component="div" className="error-message" />


                <Photos photos={photos} setPhotos={setPhotos} findPhoto={findPhoto} setFindPhoto={setFindPhoto} />
                <p className="photo-err">{findPhoto}</p>
                <ErrorMessage name="photos" component="div" className="error-message" />
            <select onChange={(event: ChangeEvent<HTMLSelectElement>) => setStars(event.target.value)} className="select">
                <option>★</option>
                <option>★★</option>
                <option>★★★</option>
                <option>★★★★</option>
                <option>★★★★★</option>
            </select><br/>
            <ErrorMessage name="stars" component="div" className="error-message" />
            {button}
            </div>
        </Form>
    )}
</Formik>
<h3 className="succes">{succes}</h3></div> 
)}

export default ProjectForm