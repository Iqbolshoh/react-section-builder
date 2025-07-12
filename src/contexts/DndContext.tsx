import React, { createContext, useContext, ReactNode } from 'react';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useProject } from './ProjectContext';

interface DndContextType {
  // Add any additional DnD-related state or methods here
}

const DndContextProvider = createContext<DndContextType | undefined>(undefined);

export const DndProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentProject, reorderSections } = useProject();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || !currentProject) return;
    
    const activeId = active.id;
    const overId = over.id;
    
    if (activeId !== overId) {
      const sections = [...currentProject.sections];
      const activeIndex = sections.findIndex(section => section.id === activeId);
      const overIndex = sections.findIndex(section => section.id === overId);
      
      if (activeIndex !== -1 && overIndex !== -1) {
        const [removed] = sections.splice(activeIndex, 1);
        sections.splice(overIndex, 0, removed);
        
        // Update order values
        const updatedSections = sections.map((section, index) => ({
          ...section,
          order: index
        }));
        
        reorderSections(updatedSections);
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <DndContextProvider.Provider value={{}}>
        {children}
      </DndContextProvider.Provider>
    </DndContext>
  );
};

export const useDnd = () => {
  const context = useContext(DndContextProvider);
  if (!context) {
    throw new Error('useDnd must be used within a DndProvider');
  }
  return context;
};