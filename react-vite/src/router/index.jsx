import React, { useState } from 'react';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';
import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import AllNotebooks from '../components/Notebooks/GetAllNotebooks';
import Layout from './Layout';
import CreateNotebook from '../components/Notebooks/CreateNewNotebookModal';
import AllNotes from '../components/Notes/AllNotes';
import MainPage from '../components/MainPage/MainPage'
import AllNotesAndTasks from '../components/HomePage/AllNotesAndTasks';
import NoteHomePage from '../components/HomePage/NotePage/Notes';
import HomeLayout from './HomeLayout';
import { ModalProvider, Modal } from '../context/Modal';
import IndividualNotebookInfo from '../components/HomePage/NotebookInfo/NotebookInfo';

import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {SortableItem} from './SortableItem';
import {Item} from './Item';



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
        element: <NotesWithDragAndDrop />,
      },
      // Add other child routes specific to /home here
    ],
  }
]);

function NotesWithDragAndDrop(){
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState(['1', '2', '3']);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event) {
    const {active} = event;

    setActiveId(active.id);
  }

  function handleDragEnd(event) {
    const {active, over} = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map(id => <SortableItem key={id} id={id} />)}
      </SortableContext>
      <DragOverlay>
        {activeId ? <Item id={activeId} /> : null}
      </DragOverlay>
      <NoteHomePage />
    </DndContext>

  )
}
