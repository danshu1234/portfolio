import { FC } from "react";
import ProjectInfo from "./ProjectInfo";
import './project.css'

interface Props {
    params: {
        project: string
    }
}

const Project: FC <Props> = ({params}) => {
    return (
        <div className="main-project-info">
            <ProjectInfo project = {params.project}/>
        </div>
    )
}

export default Project