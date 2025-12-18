import { useState } from 'react';

/**
 * Хук для керування модалкою з редагуванням сутності (наприклад, нотатки чи поста)
 * @returns { isVisible, editing, open, close }
 */
export function useModalForm<T = null>() {
  const [isVisible, setVisible] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);

  const open = (item?: T) => {
    setEditing(item ?? null);
    setVisible(true);
  };
  const close = () => {
    setEditing(null);
    setVisible(false);
  };

  return { isVisible, editing, open, close };
}
