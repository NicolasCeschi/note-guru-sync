
import { useState } from 'react';
import { useBoardStore } from '@/store/boardStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, X, Edit, Trash } from 'lucide-react';
import { Column } from '@/types/kanban';
import { useToast } from '@/components/ui/use-toast';

interface ColumnHeaderProps {
  column: Column;
}

const ColumnHeader = ({ column }: ColumnHeaderProps) => {
  const { updateColumnTitle, deleteColumn } = useBoardStore();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);

  const handleEdit = () => {
    setIsEditing(true);
    setTitle(column.title);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTitle(column.title);
  };

  const handleSave = () => {
    if (title.trim()) {
      updateColumnTitle(column.id, title);
      setIsEditing(false);
      toast({
        title: "Columna actualizada",
        description: "El título de la columna se ha actualizado",
      });
    }
  };

  const handleDelete = () => {
    if (column.notes.length > 0) {
      const confirm = window.confirm(
        "Esta columna contiene notas. ¿Estás seguro de que quieres eliminarla?"
      );
      if (!confirm) return;
    }
    
    deleteColumn(column.id);
    toast({
      title: "Columna eliminada",
      description: "La columna ha sido eliminada del tablero",
    });
  };

  return (
    <div className="flex items-center justify-between p-2 bg-white rounded-t-md border-b">
      {isEditing ? (
        <div className="flex items-center w-full gap-1">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-8 flex-1"
            autoFocus
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="p-1 h-8 w-8"
          >
            <X size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className="p-1 h-8 w-8"
          >
            <Check size={16} />
          </Button>
        </div>
      ) : (
        <>
          <h3 className="font-medium text-sm">{column.title}</h3>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="p-1 h-8 w-8"
            >
              <Edit size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="p-1 h-8 w-8 text-red-500 hover:text-red-700"
            >
              <Trash size={16} />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ColumnHeader;
