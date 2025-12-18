import { deleteNote, getNotes, saveNote } from '@/services/storage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useNotesData() {
  const queryClient = useQueryClient();
  const notesQuery = useQuery({ queryKey: ['notes'], queryFn: getNotes });
  const saveMutation = useMutation({
    mutationFn: saveNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  });
  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  });
  return { ...notesQuery, saveMutation, deleteMutation };
}
