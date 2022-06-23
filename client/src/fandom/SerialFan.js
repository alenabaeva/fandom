import { makeAutoObservable } from "mobx"

export default class FanStore {
  constructor() {
    this._characters = []
    this._faculties = []
    this._locations = []
    this._episodes = []

    this._characterCount = 0
    this._facultyCount = 0
    this._locationCount = 0
    this._episodeCount = 0

    this._selectedCharacter = {}
    this._selectedFaculy = {}
    this._selectedLocation = {}
    this._selectedEpisode = {}

    this._search = []
    makeAutoObservable(this)
  }

  setCharacters(characters) {
    this._characters = characters
  }
  setSelectedCharacter(character) {
    this._selectedCharacter = character
  }
  setCharacterCount(charactersCount) {
    this._characterCount = charactersCount
  }

  setFaculties(faculties) {
    this._faculties = faculties
  }
  setSelectedFaculty(faculty) {
    this._selectedFaculy = faculty
  }
  setFacultyCount(facultiesCount) {
    this._facultyCount = facultiesCount
  }

  setLocations(locations) {
    this._locations = locations
  }
  setSelectedLocation(location) {
    this._selectedLocation = location
  }
  setLocationCount(locationsCount) {
    this._locationCount = locationsCount
  }

  setEpisodes(episodes) {
    this._episodes = episodes
  }
  setSelectedEpisode(episode) {
    this._selectedEpisode = episode
  }
  setEpisodeCount(EpisodesCount) {
    this._episodeCount = EpisodesCount
  }

  setSearch(search) {
    this._search = search
  }

  get characters() {
    return this._characters
  }
  get selectedCharacter() {
    return this._selectedCharacter
  }
  get characterCount() {
    return this._characterCount
  }

  get faculties() {
    return this._faculties
  }
  get selectedFaculty() {
    return this._selectedFaculty
  }
  get facultyCount() {
    return this._facultyCount
  }

  get locations() {
    return this._locations
  }
  get selectedLocation() {
    return this._selectedLocation
  }
  get locationCount() {
    return this.locationCount
  }

  get episodes() {
    return this._episodes
  }
  get selectedEpisode() {
    return this._selectedEpisode
  }
  get episodeCount() {
    return this.episodeCount
  }

  get search() {
    return this._search
  }
}
