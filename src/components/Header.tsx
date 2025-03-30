
import { Button } from '@/components/ui/button';
import { Cloud } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Cloud className="h-6 w-6 text-kanban-blue" />
          <h1 className="text-xl font-semibold">Note Guru Sync</h1>
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          disabled
        >
          <span>Iniciar sesión</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
