
import Header from '@/components/Header';
import KanbanBoard from '@/components/KanbanBoard';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto overflow-hidden px-4">
        <div className="py-6">
          <h2 className="text-2xl font-semibold mb-6">Mi Tablero de Notas</h2>
          <KanbanBoard />
        </div>
      </main>
    </div>
  );
};

export default Index;
