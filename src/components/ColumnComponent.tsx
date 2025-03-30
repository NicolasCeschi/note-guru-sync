
import { Column as ColumnType } from '@/types/kanban';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import NoteItem from './NoteItem';
import ColumnHeader from './ColumnHeader';
import AddNoteForm from './AddNoteForm';
import { Move } from 'lucide-react';

interface ColumnProps {
  column: ColumnType;
  index: number;
}

const ColumnComponent = ({ column, index }: ColumnProps) => {
  return (
    <Draggable draggableId={column.id} index={index} type="column">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="w-full md:w-80 flex-shrink-0 bg-kanban-lightGray rounded-md shadow overflow-hidden h-full"
        >
          <div 
            {...provided.dragHandleProps}
            className="px-2 py-1 bg-kanban-lightGray flex justify-between items-center cursor-move border-b border-gray-200"
          >
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Move size={14} className="text-gray-400" />
              <span>Mover columna</span>
            </div>
          </div>
          
          <ColumnHeader column={column} />
          
          <Droppable droppableId={column.id} type="note">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="p-2 h-full min-h-[200px] max-h-[calc(100vh-270px)] overflow-y-auto"
              >
                {column.notes.map((note, index) => (
                  <NoteItem 
                    key={note.id} 
                    note={note} 
                    columnId={column.id} 
                    index={index} 
                  />
                ))}
                {provided.placeholder}
                <AddNoteForm columnId={column.id} />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default ColumnComponent;
