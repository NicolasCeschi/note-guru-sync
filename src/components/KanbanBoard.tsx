
import { DragDropContext } from '@hello-pangea/dnd';
import { useBoardStore } from '@/store/boardStore';
import { handleDragEnd, DragResult } from '@/lib/dragAndDrop';
import ColumnComponent from './ColumnComponent';
import AddColumnForm from './AddColumnForm';
import { useState } from 'react';
import { Button } from './ui/button';
import { ArrowDown, ArrowUp } from 'lucide-react';

const KanbanBoard = () => {
  const columns = useBoardStore((state) => state.columns);
  const [displayMode, setDisplayMode] = useState<'singleRow' | 'grid'>('singleRow');

  const toggleDisplayMode = () => {
    setDisplayMode(displayMode === 'singleRow' ? 'grid' : 'singleRow');
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end mb-2">
        <Button 
          onClick={toggleDisplayMode} 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2"
        >
          {displayMode === 'singleRow' ? (
            <>
              <ArrowDown className="h-4 w-4" />
              <span>Ver en cuadrícula</span>
            </>
          ) : (
            <>
              <ArrowUp className="h-4 w-4" />
              <span>Ver en fila</span>
            </>
          )}
        </Button>
      </div>
      
      <DragDropContext onDragEnd={(result) => handleDragEnd(result as DragResult)}>
        <div className={`
          ${displayMode === 'singleRow' 
            ? 'flex flex-row flex-nowrap gap-4 overflow-x-auto p-4' 
            : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'
          }
        `}>
          {columns.map((column, index) => (
            <ColumnComponent key={column.id} column={column} index={index} />
          ))}
          <div className={displayMode === 'singleRow' ? 'flex-shrink-0' : ''}>
            <AddColumnForm />
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
