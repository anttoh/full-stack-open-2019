import { useState, useEffect } from 'react'
import axios from 'axios'

export const seperateReset = input => {
  const { reset, ...output } = input
  return output
}

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    reset,
    type,
    value,
    onChange
  }
}

let token = null

export const useResource = baseUrl => {
  const [objects, setObjects] = useState([])

  useEffect(() => {
    getAll().then(initialObjects => {
      setObjects(initialObjects)
    })
  }, [])

  const setToken = newToken => {
    token = `bearer ${newToken}`
  }

  const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

  const create = async newObject => {
    const config = {
      headers: { Authorization: token }
    }

    const res = await axios.post(baseUrl, newObject, config)
    setObjects(objects.concat(res.data))
  }

  const update = async (id, newObject) => {
    const res = await axios.put(`${baseUrl}/${id}`, newObject)
    const updatedObjects = objects.map(object =>
      object.id === id ? res.data : object
    )
    setObjects(updatedObjects)
  }

  const remove = async id => {
    const config = {
      headers: { Authorization: token }
    }
    await axios.delete(`${baseUrl}/${id}`, config)
    const updatedObjects = objects.filter(object => object.id !== id)
    setObjects(updatedObjects)
  }

  const objectService = {
    setToken,
    create,
    update,
    remove
  }

  return [objects, objectService]
}
