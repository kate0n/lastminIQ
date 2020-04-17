/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from "react"
import { ContextProvider } from "./src/context/Context"
// import { withErrorBoundary } from "./src/utils/errorBoundary"

export const wrapRootElement = ({ element }) => {
  return <ContextProvider>{element}</ContextProvider>
}
