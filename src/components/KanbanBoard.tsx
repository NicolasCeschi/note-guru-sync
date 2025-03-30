
import { DragDropContext } from '@hello-pangea/dnd';
import { useBoardStore } from '@/store/boardStore';
import { handleDragEnd, DragResult } from '@/lib/dragAndDrop';
import ColumnComponent from './ColumnComponent';
import AddColumnForm from './AddColumnForm';

const KanbanBoard = () => {
  const columns = useBoardStore((state) => state.columns);

  return (
    <DragDropContext onDragEnd={(result) => handleDragEnd(result as DragResult)}>
      <div className="flex flex-col md:flex-row gap-4 overflow-x-auto p-4">
        {columns.map((column, index) => (
          <ColumnComponent key={column.id} column={column} index={index} />
        ))}
        <AddColumnForm />
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
