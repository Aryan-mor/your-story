import { ImgHTMLAttributes, Suspense, useState } from 'react';
import { tw } from '@/utils/tw';
import { useOpen } from '@/utils/use-open';

export default function Image({
  className,
  src,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const {
    isOpen: isError,
    onOpen: onShowError,
    onClose: onHideError,
  } = useOpen();

  const [retryKey, setRetryKey] = useState(0);

  const handleRetry = () => {
    setRetryKey((prev) => prev + 1);
    onHideError();
  };

  if (!src) return null;

  return (
    <Suspense fallback={<span>Loading...</span>}>
      <div className={tw('relative w-full h-full', className)}>
        {!isError ? (
          <img
            key={retryKey}
            src={src}
            alt="your story"
            loading="lazy"
            onError={onShowError}
            {...props}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </Suspense>
  );
}
