import React from "react"
import Context from "../context/Context"

const Unsubscribe = facebook_id => {
  const { state, dispatch } = React.useContext(Context)

  const handleUnsubscribe = () => {
    fetch(`${state.url}/unsubscription`, {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: facebook_id,
    })
      .then(result => {
        return result.json()
      })
      .then(data => {
        data.status === "canceled" &&
          dispatch({ type: "ADD_SUBSCRIPTION", payload: false })
      })
  }
  return handleUnsubscribe
}

export default Unsubscribe
