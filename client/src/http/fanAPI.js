import { $host } from "./index"

export const createCharacter = async (character) => {
  const { data } = await $host.post("api/character", character)
  return data
}

export const updateCharacter = async (formData, id) => {
  const { data } = await $host.put("api/character/" + id, formData)
  return data
}

export const fetchCharacter = async () => {
  const { data } = await $host.get("api/character")
  return data
}

export const fetchOneCharacter = async (id) => {
  const { data } = await $host.get("api/character/" + id)
  return data
}

export const createEpisode = async (episode) => {
  const { data } = await $host.post("api/episode", episode)
  return data
}

export const updateEpisode = async (formData, id) => {
  const { data } = await $host.put("api/episode/" + id, formData)
  return data
}

export const fetchEpisode = async () => {
  const { data } = await $host.get("api/episode")
  return data
}
export const fetchOneEpisode = async (id) => {
  const { data } = await $host.get("api/episode/" + id)
  return data
}

export const createLocation = async (location) => {
  const { data } = await $host.post("api/location", location)
  return data
}

export const updateLocation = async (formData, id) => {
  const { data } = await $host.put("api/location/" + id, formData)
  return data
}

export const fetchLocation = async () => {
  const { data } = await $host.get("api/location")
  return data
}

export const fetchOneLocation = async (id) => {
  const { data } = await $host.get("api/location/" + id)
  return data
}

export const createFaculty = async (faculty) => {
  const { data } = await $host.post("api/faculty", faculty)
  return data
}

export const updateFaculty = async (formData, id) => {
  const { data } = await $host.put("api/faculty/" + id, formData)
  return data
}

export const fetchFaculty = async () => {
  const { data } = await $host.get("api/faculty")
  return data
}

export const fetchOneFaculty = async (id) => {
  const { data } = await $host.get("api/faculty/" + id)
  return data
}

export const search = async (searchQuery) => {
  const { data } = await $host.get("api?search=" + searchQuery) //????
  return data
}
