
import { useState } from 'react';
import { useBoardStore } from '@/store/boardStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AddColumnForm = () => {
  const { addColumn } = useBoardStore();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddColumn = () => {
    if (title.trim()) {
      addColumn(title);
      setTitle('');
      setIsAdding(false);
      toast({
        title: "Columna añadida",
        description: "Se ha añadido una nueva columna al tablero",
      });
    }
  };

  return (
    <div className="flex-shrink-0 w-full md:w-80">
      {isAdding ? (
        <div className="p-3 bg-white rounded-md shadow">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título de la columna"
            className="mb-2"
            autoFocus
          />
          <div className="flex justify-end gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAdding(false)}
            >
              <X size={16} />
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleAddColumn}
              className="bg-kanban-blue hover:bg-kanban-darkBlue"
            >
              Añadir
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          className="w-full h-12 flex items-center gap-1 border-dashed border-2"
          onClick={() => setIsAdding(true)}
        >
          <Plus size={16} />
          <span>Añadir columna</span>
        </Button>
      )}
    </div>
  );
};

export default AddColumnForm;
