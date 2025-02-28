// components/Tours/FilterModal.tsx
import { FC, useEffect, useRef } from 'react';

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const FilterModal: FC<FilterModalProps> = ({ isOpen, onClose, children }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Handle click outside of the modal to close it
    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            // Prevent background scroll
            document.body.style.overflow = 'hidden';
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            // Re-enable background scroll
            document.body.style.overflow = '';
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Cleanup
        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-start">
            <div
                ref={modalRef}
                className="bg-white dark:bg-darkmode rounded-lg shadow-lg w-full max-w-xs max-h-screen overflow-y-auto relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-xl font-bold text-black dark:text-white"
                >
                    &times;
                </button>
                <div className="">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
