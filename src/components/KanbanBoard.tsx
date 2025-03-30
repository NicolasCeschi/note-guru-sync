
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useBoardStore } from '@/store/boardStore';
import { handleDragEnd, DragResult } from '@/lib/dragAndDrop';
import ColumnComponent from './ColumnComponent';
import AddColumnForm from './AddColumnForm';
import { MoveHorizontal } from 'lucide-react';

const KanbanBoard = () => {
  const columns = useBoardStore((state) => state.columns);

  return (
    <div className="flex flex-col gap-4">
      <div className="p-1">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MoveHorizontal size={16} />
          <span>Arrastra las columnas para reorganizarlas</span>
        </div>
      </div>
      
      <DragDropContext onDragEnd={(result) => handleDragEnd(result as DragResult)}>
        <Droppable droppableId="columns" direction="horizontal" type="column">
          {(provided) => (
            <div 
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
            >
              {columns.map((column, index) => (
                <ColumnComponent key={column.id} column={column} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        
        <div className="px-4">
          <AddColumnForm />
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
