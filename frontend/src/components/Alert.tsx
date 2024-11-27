import { IoMdClose } from 'react-icons/io';

interface AlertProps {
  message: string;
  onClose: () => void;
}

const Alert = ({ message, onClose }: AlertProps) => {
  return (
    <div
      role='alert'
      className='mb-4 relative flex w-2/4 p-3 text-sm text-white bg-red-600 rounded-md'
    >
      {message}
      <button
        className='flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-1.5 right-1.5'
        type='button'
        onClick={onClose}
      >
        <IoMdClose />
      </button>
    </div>
  );
};

export default Alert;
