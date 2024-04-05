import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import AllNotebooks from '../components/Notebooks/GetAllNotebooks';
import Layout from './Layout';
import CreateNotebook from '../components/Notebooks/CreateNewNotebook';
import AllNotes from '../components/Notes/HomeNotesContainer';
import MainPage from '../components/MainPage/MainPage'
import AllNotesAndTasks from '../components/HomePage/AllNotesAndTasks';
import NoteHomePage from '../components/HomePage/NotePage/Notes';
import HomeLayout from './HomeLayout';
import { ModalProvider, Modal } from '../context/Modal';
import IndividualNotebookInfo from '../components/HomePage/NotebookInfo/NotebookInfo';

export const router = createBrowserRouter([
  {
    element: <Layout />, // Main layout for most routes
    children: [
      {
        path: "/",
        element: <MainPage />,
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
  {
    // Specific layout for /home
    element: (
      <ModalProvider>
        <HomeLayout />
        <Modal />
      </ModalProvider>
    ),
    children: [
      {
        path: "/home", // Example child route for /home
        element: <AllNotesAndTasks />,
      },
      {
        path: "/home/notebook/:notebookId",
        element: <IndividualNotebookInfo />,
      },
      {
        path: "/home/note/:noteid",
        element: <NoteHomePage />,
      },
      // Add other child routes specific to /home here
    ],
  }
]);
