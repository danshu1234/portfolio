import { FC } from "react";
import ProjectInfo from "./ProjectInfo";

interface Props {
    params: {
        project: string
    }
}

const Project: FC <Props> = ({params}) => {
    return (
        <div>
            <ProjectInfo project = {params.project}/>
        </div>
    )
}

export default Project