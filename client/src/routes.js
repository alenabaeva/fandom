import Character from "./pages/Character"
import Faculty from "./pages/Faculty"
import Location from "./pages/Location"
import Serial from "./pages/Serial"
import Episode from "./pages/Episode"
import CharacterPage from "./pages/CharacterPage"
import FacultyPage from "./pages/FacultyPage"
import LocationPage from "./pages/LocationPage"
import EpisodePage from "./pages/EpisodePage"
import Create from "./pages/Create"
import Findresult from "./pages/Findresult"
import {
  CHARACTER_ROUTE,
  FACULTY_ROUTE,
  LOCATION_ROUTE,
  SERIAL_ROUTE,
  EPISODE_ROUTE,
  CREATE_ROUTE,
  SEARCH_ROUTE,
} from "./utils/consts"

export const publicRoutes = [
  {
    path: CHARACTER_ROUTE,
    Component: <Character />,
  },

  {
    path: CHARACTER_ROUTE + "/:id",
    Component: <CharacterPage />,
  },

  {
    path: FACULTY_ROUTE,
    Component: <Faculty />,
  },

  {
    path: FACULTY_ROUTE + "/:id",
    Component: <FacultyPage />,
  },

  {
    path: LOCATION_ROUTE,
    Component: <Location />,
  },

  {
    path: LOCATION_ROUTE + "/:id",
    Component: <LocationPage />,
  },

  {
    path: SERIAL_ROUTE,
    Component: <Serial />,
  },

  {
    path: EPISODE_ROUTE,
    Component: <Episode />,
  },

  {
    path: EPISODE_ROUTE + "/:id",
    Component: <EpisodePage />,
  },

  {
    path: CREATE_ROUTE,
    Component: <Create />,
  },

  {
    path: SEARCH_ROUTE,
    Component: <Findresult />,
  },
]
