
import React, { useState, useRef, ChangeEvent } from 'react';
import { UploadIcon, TrashIcon } from './Icons';

interface ImageUploaderProps {
  label: string;
  onFileSelect: (file: File | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ label, onFileSelect }) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    onFileSelect(selectedFile);
     // Reset the input value to allow re-uploading the same file
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleRemove = () => {
      setFile(null);
      onFileSelect(null);
  }

  return (
    <div className="grid grid-cols-2 items-center gap-4">
        <label className="text-sm font-medium text-gray-400">{label}</label>
        <div>
            <input ref={fileInputRef} onChange={handleFileChange} type="file" className="sr-only" accept="image/*" />
            {!file ? (
                <button
                    type="button"
                    onClick={handleButtonClick}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-gray-200 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                >
                    <UploadIcon className="w-4 h-4" />
                    Upload
                </button>
            ) : (
                <div className="flex items-center justify-between text-sm bg-gray-700/80 rounded-md h-9">
                    <span className="truncate px-3 text-gray-300">{file.name}</span>
                    <button onClick={handleRemove} className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                        <TrashIcon className="w-4 h-4"/>
                    </button>
                </div>
            )}
        </div>
    </div>
  );
};