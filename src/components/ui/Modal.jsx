import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

function Modal({ title = 'Modal', children, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose, isOpen]);

  const handleClickOutside = (event) => {
    if (event.target.getAttribute('role') === 'presentation') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role='presentation'
      onClick={handleClickOutside}
      className='fixed inset-0 z-10000 flex items-center justify-center bg-slate-950/70 p-6'
    >
      <section
        role='dialog'
        aria-modal='true'
        aria-labelledby={title ? 'modal-title' : undefined}
        className='relative w-full max-w-lg rounded-2xl bg-slate-100 p-6 text-slate-900 shadow-2xl dark:bg-slate-900 dark:text-slate-100'
      >
        <div className='mb-5 flex items-center justify-between'>
          {title && (
            <h2 id='modal-title' className='text-xl font-bold'>
              {title}
            </h2>
          )}

          <button
            type='button'
            onClick={onClose}
            aria-label='Close modal'
            className='ml-auto rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer'
          >
            <FiX aria-hidden='true' />
          </button>
        </div>

        {children}
      </section>
    </div>
  );
}

export default Modal;
