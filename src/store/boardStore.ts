import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Board, Column, Note } from '@/types/kanban';

interface BoardState extends Board {
  addColumn: (title: string) => void;
  updateColumnTitle: (columnId: string, title: string) => void;
  deleteColumn: (columnId: string) => void;
  moveColumn: (fromIndex: number, toIndex: number) => void;
  addNote: (columnId: string, content: string) => void;
  updateNote: (columnId: string, noteId: string, content: string) => void;
  toggleNoteCompletion: (columnId: string, noteId: string) => void;
  deleteNote: (columnId: string, noteId: string) => void;
  moveNote: (fromColumnId: string, toColumnId: string, noteId: string) => void;
}

const initialBoard: Board = {
  columns: [
    {
      id: '1',
      title: 'Cosas para hacer todos los meses',
      notes: [
        {
          id: '1',
          content: 'Pagar facturas de servicios',
          completed: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          content: 'Revisar presupuesto mensual',
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ],
    },
    {
      id: '2',
      title: 'Cosas para hacer una única vez',
      notes: [
        {
          id: '3',
          content: 'Renovar licencia de conducir',
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ],
    },
    {
      id: '3',
      title: 'Cosas realizadas',
      notes: [
        {
          id: '4',
          content: 'Comprar material de oficina',
          completed: true,
          createdAt: new Date().toISOString(),
        },
      ],
    },
  ],
};

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      columns: initialBoard.columns,

      addColumn: (title) => 
        set((state) => ({
          columns: [
            ...state.columns,
            {
              id: Date.now().toString(),
              title,
              notes: [],
            }
          ]
        })),

      updateColumnTitle: (columnId, title) =>
        set((state) => ({
          columns: state.columns.map((column) =>
            column.id === columnId ? { ...column, title } : column
          ),
        })),

      deleteColumn: (columnId) =>
        set((state) => ({
          columns: state.columns.filter((column) => column.id !== columnId),
        })),

      moveColumn: (fromIndex, toIndex) =>
        set((state) => {
          const newColumns = Array.from(state.columns);
          const [movedColumn] = newColumns.splice(fromIndex, 1);
          newColumns.splice(toIndex, 0, movedColumn);
          
          return { columns: newColumns };
        }),

      addNote: (columnId, content) =>
        set((state) => ({
          columns: state.columns.map((column) => {
            if (column.id === columnId) {
              return {
                ...column,
                notes: [
                  ...column.notes,
                  {
                    id: Date.now().toString(),
                    content,
                    completed: false,
                    createdAt: new Date().toISOString(),
                  },
                ],
              };
            }
            return column;
          }),
        })),

      updateNote: (columnId, noteId, content) =>
        set((state) => ({
          columns: state.columns.map((column) => {
            if (column.id === columnId) {
              return {
                ...column,
                notes: column.notes.map((note) =>
                  note.id === noteId ? { ...note, content } : note
                ),
              };
            }
            return column;
          }),
        })),

      toggleNoteCompletion: (columnId, noteId) =>
        set((state) => ({
          columns: state.columns.map((column) => {
            if (column.id === columnId) {
              return {
                ...column,
                notes: column.notes.map((note) =>
                  note.id === noteId ? { ...note, completed: !note.completed } : note
                ),
              };
            }
            return column;
          }),
        })),

      deleteNote: (columnId, noteId) =>
        set((state) => ({
          columns: state.columns.map((column) => {
            if (column.id === columnId) {
              return {
                ...column,
                notes: column.notes.filter((note) => note.id !== noteId),
              };
            }
            return column;
          }),
        })),

      moveNote: (fromColumnId, toColumnId, noteId) =>
        set((state) => {
          const sourceColumn = state.columns.find((col) => col.id === fromColumnId);
          if (!sourceColumn) return state;
          
          const noteToMove = sourceColumn.notes.find((note) => note.id === noteId);
          if (!noteToMove) return state;

          return {
            columns: state.columns.map((column) => {
              if (column.id === fromColumnId) {
                return {
                  ...column,
                  notes: column.notes.filter((note) => note.id !== noteId),
                };
              }
              
              if (column.id === toColumnId) {
                return {
                  ...column,
                  notes: [...column.notes, noteToMove],
                };
              }
              
              return column;
            }),
          };
        }),
    }),
    {
      name: 'kanban-storage',
    }
  )
);
