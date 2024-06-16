'use client'

import React, { useState } from "react"
import styled from "styled-components"

import { AppContext } from "@/store/index"

const App = styled.div`
  margin: 0 2rem;
  max-width: 42rem;
`

export default function Component ({ children, hue: hueCookie }) {
  const [hue, setHue] = useState(hueCookie || 42)

  return (
    <AppContext.Provider value={{ hue, setHue }}>
      <App>
        { children }
      </App>
    </AppContext.Provider>
  )
}
