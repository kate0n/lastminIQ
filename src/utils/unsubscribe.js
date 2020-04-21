import React from "react"
import Context from "../context/Context"

const Unsubscribe = () => {
  const { state, dispatch } = useContext(Context)

  const handleUnsubscribe = () => {
    console.log("handleUnsubscribe")
    // fetch("https://lastmin.makaroff.tech/unsubscribe", {
    //   method: "POST",
    // }).then(reponse => console.log("UNSUBSCRIBE reponse:", reponse))
    dispatch({ type: "ADD_SUBSCRIPTION", payload: false })
  }

  return handleUnsubscribe
}

export default Unsubscribe
