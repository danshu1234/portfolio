import { createStore } from "redux"

interface Project {
    name: string,
    comment: string,
    href: string,
    starts: string,
}

interface Store {
    projects: Project[],
}

const data: Store = {
    projects: [],
}

const reducer = (state = data, action: {type: string, payload: Project[]}): Store => {
    switch (action.type) {
        case 'CHANGE':
            return {...state, projects: action.payload}  
        default:
            return state    
    }
}

export const store = createStore(reducer)