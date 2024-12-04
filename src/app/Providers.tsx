'use client'

import { Provider } from "react-redux"
import { store } from "./Projects"
import React from "react"

export function Providers ({children} : {children: React.ReactNode}) {
    return <Provider store = {store}>{children}</Provider>
}