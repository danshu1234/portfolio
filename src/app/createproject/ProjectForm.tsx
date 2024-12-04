'use client'

import { ErrorMessage, Field, Form, Formik } from "formik"
import { ChangeEvent, FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Photos from "./Photos"
import db from "../../../DataBase"

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
    const [photos, setPhotos] = useState <string[]> ([])
    const [stars, setStars] = useState <string> ('')
    const [btn, setBtn] = useState <boolean> (true)
    const [succes, setSucces] = useState <string> ('')
    let button;

    if (btn) {
        button = <button type="submit">Save</button>
    } else {
        button = null
    }

    const afterSubmit = () => {
        setSucces('Вы опубликовали проект!')
        setTimeout(() => {
            window.location.href = '/'
        }, 2000);
    }

    return (
        <div>
        <Formik
        initialValues={{
        name: '',
        comment: '',
        href: '',
        photos: '',
        stars: '',
    }}

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
        if (stars === '') {
            errors.stars = 'Пожалуйста, укажите сложность вашего проекта'
        }    
        return errors
    }}

    onSubmit={async values => {
        dispatch({type: 'CHANGE', payload: [...projects, {
            name: values.name,
            comment: values.comment,
            href: values.href,
        }]})
            await photos.map(item => {
                return db.images.add({urlId: item, url: item, project: values.name, timestamp: Date.now()})               
            })
        const getProjects = localStorage.getItem('projects')
        if (getProjects === null) {
            localStorage.setItem('projects', JSON.stringify([{name: values.name, comment: values.comment, href: values.href, stars: stars}]))
        } else if (getProjects !== null) {
            const parsedProjects = JSON.parse(getProjects)
            localStorage.setItem('projects', JSON.stringify([{name: values.name, comment: values.comment, href: values.href, stars: stars}, ...parsedProjects]))
        }
        setBtn(false)
        afterSubmit()
    }}
>
    {formik => (
        <Form>
            <div>
                <label htmlFor="name">
                    <Field id='name' name='name' placeholder='name'/>
                    <ErrorMessage name="name"/>
                </label>

                <label htmlFor="comment">
                    <Field id='comment' name='comment' placeholder='description'/>
                    <ErrorMessage name="comment"/>
                </label>

                <label htmlFor="href">
                    <Field id='href' name='href' placeholder='GitHub'/>
                    <ErrorMessage name="href"/>
                </label>
                
                {formik.errors.photos && <div>{formik.errors.photos}</div>} 
            </div>
            {button}
            <ErrorMessage name="stars"/>
        </Form>
    )}
</Formik>
            <select onChange={(event: ChangeEvent<HTMLSelectElement>) => setStars(event.target.value)}>
                <option>★</option>
                <option>★★</option>
                <option>★★★</option>
                <option>★★★★</option>
                <option>★★★★★</option>
            </select>  
            <Photos photos = {photos} setPhotos = {setPhotos}/>
            {succes}
        </div>
    )
}

export default ProjectForm