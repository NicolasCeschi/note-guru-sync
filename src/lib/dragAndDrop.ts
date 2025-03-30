
import { useBoardStore } from '@/store/boardStore';

export interface DragResult {
  source: {
    droppableId: string;
    index: number;
  };
  destination?: {
    droppableId: string;
    index: number;
  } | null;
  type: string;
  draggableId: string;
}

export const handleDragEnd = (result: DragResult) => {
  const { source, destination, type } = result;
  
  // Si no hay destino, la operación fue cancelada
  if (!destination) return;
  
  // Si el origen y el destino son iguales, no hacer nada
  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  ) {
    return;
  }

  // Manejar el arrastre de columnas
  if (type === 'column') {
    const { moveColumn } = useBoardStore.getState();
    moveColumn(source.index, destination.index);
    return;
  }

  // Manejar el arrastre de notas
  if (type === 'note') {
    const { moveNote } = useBoardStore.getState();
    const board = useBoardStore.getState();
    
    const sourceColumn = board.columns.find(col => col.id === source.droppableId);
    if (!sourceColumn) return;
    
    const noteId = sourceColumn.notes[source.index].id;
    moveNote(source.droppableId, destination.droppableId, noteId);
  }
};
