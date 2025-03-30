
import { useState } from 'react';
import { useBoardStore } from '@/store/boardStore';
import { Note } from '@/types/kanban';
import { Draggable } from '@hello-pangea/dnd';
import { Check, Trash, Edit, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface NoteItemProps {
  note: Note;
  columnId: string;
  index: number;
}

const NoteItem = ({ note, columnId, index }: NoteItemProps) => {
  const { toggleNoteCompletion, updateNote, deleteNote } = useBoardStore();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(note.content);

  const handleToggleCompletion = () => {
    toggleNoteCompletion(columnId, note.id);
  };

  const handleStartEditing = () => {
    setEditContent(note.content);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editContent.trim()) {
      updateNote(columnId, note.id, editContent);
      setIsEditing(false);
      toast({
        title: "Nota actualizada",
        description: "La nota se ha actualizado correctamente",
      });
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(note.content);
  };

  const handleDelete = () => {
    deleteNote(columnId, note.id);
    toast({
      title: "Nota eliminada",
      description: "La nota se ha eliminado correctamente",
    });
  };

  return (
    <Draggable draggableId={note.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-3 mb-2 rounded-md shadow-sm ${
            note.completed ? 'bg-kanban-lightGray' : 'bg-white'
          }`}
        >
          <div className="flex items-start gap-2">
            <button
              onClick={handleToggleCompletion}
              className={`flex-shrink-0 w-5 h-5 mt-1 border rounded-sm ${
                note.completed
                  ? 'bg-kanban-green border-kanban-green text-white'
                  : 'border-kanban-gray'
              }`}
            >
              {note.completed && <Check size={16} className="m-auto" />}
            </button>

            {isEditing ? (
              <div className="flex-1">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-1 border rounded text-sm min-h-[60px]"
                  autoFocus
                />
                <div className="flex justify-end gap-1 mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancelEdit}
                    className="h-7 px-2"
                  >
                    <X size={14} />
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleSaveEdit}
                    className="h-7 px-2 bg-kanban-blue hover:bg-kanban-darkBlue"
                  >
                    <Check size={14} />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex-1">
                <p
                  className={`text-sm ${
                    note.completed ? 'line-through text-kanban-gray' : ''
                  }`}
                >
                  {note.content}
                </p>
              </div>
            )}

            {!isEditing && (
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleStartEditing}
                  className="h-7 w-7 p-0"
                >
                  <Edit size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                >
                  <Trash size={14} />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default NoteItem;
