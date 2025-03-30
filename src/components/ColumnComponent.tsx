
import { Column as ColumnType } from '@/types/kanban';
import { Droppable } from '@hello-pangea/dnd';
import NoteItem from './NoteItem';
import ColumnHeader from './ColumnHeader';
import AddNoteForm from './AddNoteForm';

interface ColumnProps {
  column: ColumnType;
  index: number;
}

const ColumnComponent = ({ column, index }: ColumnProps) => {
  return (
    <div className="w-full md:w-80 flex-shrink-0 bg-kanban-lightGray rounded-md shadow overflow-hidden">
      <ColumnHeader column={column} />
      
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="p-2 h-full min-h-[200px] max-h-[calc(100vh-220px)] overflow-y-auto"
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
  );
};

export default ColumnComponent;
