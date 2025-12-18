import { deletePost, getPosts, savePost } from '@/services/storage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function usePostsData() {
  const queryClient = useQueryClient();
  const postsQuery = useQuery({ queryKey: ['posts'], queryFn: getPosts });
  const saveMutation = useMutation({
    mutationFn: savePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  });
  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  });
  return { ...postsQuery, saveMutation, deleteMutation };
}
