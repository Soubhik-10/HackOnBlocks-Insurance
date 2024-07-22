// Modal.tsx
import React from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-teal-100 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{content}</p>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default Modal
