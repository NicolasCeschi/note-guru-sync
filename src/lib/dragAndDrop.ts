
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
}

export const handleDragEnd = (result: DragResult) => {
  const { source, destination } = result;
  
  // Si no hay destino, la operación fue cancelada
  if (!destination) return;
  
  // Si el origen y el destino son iguales, no hacer nada
  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  ) {
    return;
  }

  // Mover la nota usando el store
  const { moveNote } = useBoardStore.getState();
  moveNote(source.droppableId, destination.droppableId, sourceColumn.notes[source.index].id);
};
