import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import AllNotebooks from '../components/Notebooks/GetAllNotebooks';
import Layout from './Layout';
import CreateNotebook from '../components/Notebooks/CreateNewNotebook';
import AllNotes from '../components/Notes/GetAllNotes';
import MainPage from '../components/MainPage/MainPage'
import AllHandsOnDeckPage from '../components/AllHandsOnDeck/AllHandsOnDeckPage'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/home",
        element: <AllHandsOnDeckPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/notebooks",
        element: <AllNotebooks />,
      },
      {
        path: "/notebooks/new",
        element: <CreateNotebook />,
      },
      {
        path: "/notes",
        element: <AllNotes />,
      },
    ],

  },
]);
