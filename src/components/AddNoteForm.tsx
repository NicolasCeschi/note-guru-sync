
import { useState } from 'react';
import { useBoardStore } from '@/store/boardStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface AddNoteFormProps {
  columnId: string;
}

const AddNoteForm = ({ columnId }: AddNoteFormProps) => {
  const { addNote } = useBoardStore();
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddNote = () => {
    if (content.trim()) {
      addNote(columnId, content);
      setContent('');
      setIsAdding(false);
      toast({
        title: "Nota añadida",
        description: "La nota se ha añadido a la columna",
      });
    }
  };

  return (
    <div className="mt-2">
      {isAdding ? (
        <div className="p-2 bg-white rounded-md shadow-sm">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe una nota..."
            className="w-full p-2 border rounded-md text-sm min-h-[80px]"
            autoFocus
          />
          <div className="flex justify-end gap-1 mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAdding(false)}
              className="h-8"
            >
              Cancelar
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleAddNote}
              className="h-8 bg-kanban-blue hover:bg-kanban-darkBlue"
            >
              Añadir
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAdding(true)}
          className="w-full flex items-center gap-1 text-kanban-darkGray"
        >
          <Plus size={16} />
          <span>Añadir nota</span>
        </Button>
      )}
    </div>
  );
};

export default AddNoteForm;
