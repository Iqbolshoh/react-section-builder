import React, { createContext, ReactNode, useContext } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useProject } from './ProjectContext';

// Optional: You can expand this interface in future
type DndContextType = Record<string, never>;

const DndContextProvider = createContext<DndContextType | undefined>(undefined);

interface DndProviderProps {
  children: ReactNode;
}

export const DndProvider: React.FC<DndProviderProps> = ({ children }) => {
  const { currentProject, reorderSections } = useProject();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !currentProject) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const sections = [...currentProject.sections];
    const activeIndex = sections.findIndex((s) => s.id === activeId);
    const overIndex = sections.findIndex((s) => s.id === overId);

    if (activeIndex === -1 || overIndex === -1) return;

    const [moved] = sections.splice(activeIndex, 1);
    sections.splice(overIndex, 0, moved);

    const updatedSections = sections.map((section, index) => ({
      ...section,
      order: index
    }));

    reorderSections(updatedSections);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <DndContextProvider.Provider value={{}}>
        {children}
      </DndContextProvider.Provider>
    </DndContext>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDnd = () => {
  const context = useContext(DndContextProvider);
  if (!context) {
    throw new Error('useDnd must be used within a DndProvider');
  }
  return context;
};