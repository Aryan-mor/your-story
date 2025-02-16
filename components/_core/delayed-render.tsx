import { motion } from 'framer-motion';
import { Fragment, type ReactNode, useEffect, useState } from 'react';

export default function DelayedRender({
  timeout,
  children,
  placeholder,
}: {
  timeout: number;
  children: ReactNode;
  placeholder?: undefined | ReactNode;
}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), timeout);
    return () => clearTimeout(timer);
  }, [timeout]);

  return isReady ? (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}>
      {children}
    </motion.div>
  ) : (
    (placeholder ?? <Fragment />)
  );
}
