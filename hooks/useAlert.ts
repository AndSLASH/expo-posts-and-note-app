import { AlertConfig } from '@/types';
import { useState } from 'react';

export function useAlert() {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState<AlertConfig>({
    title: '',
    message: '',
    buttons: [],
  });

  const open = (cfg: AlertConfig) => {
    setConfig(cfg);
    setVisible(true);
  };
  const close = () => setVisible(false);

  return { visible, config, open, close };
}
