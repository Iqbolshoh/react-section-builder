import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Link, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  value, 
  onChange, 
  placeholder = "Add image",
  className = ""
}) => {
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file' | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setIsUploading(true);
    
    try {
      // Create a preview URL for immediate display
      const previewUrl = URL.createObjectURL(file);
      onChange(previewUrl);
      
      // In a real app, you would upload to your server here
      // For now, we'll simulate the upload
      setTimeout(() => {
        setIsUploading(false);
        setUploadMethod(null);
      }, 1000);
    } catch (error) {
      console.error('Upload failed:', error);
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  if (value && !uploadMethod) {
    return (
      <div className={`relative group ${className}`}>
        <img 
          src={value} 
          alt="Uploaded" 
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
          <button
            onClick={() => setUploadMethod('url')}
            className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 px-4 py-2 rounded-lg font-medium"
          >
            Change Image
          </button>
        </div>
        <button
          onClick={() => onChange('')}
          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  if (uploadMethod === 'url') {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="flex items-center gap-2">
          <Link className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-gray-900">Add Image URL</span>
        </div>
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoFocus
        />
        <div className="flex gap-2">
          <button
            onClick={() => setUploadMethod(null)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setUploadMethod('file')}
            className="px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            Upload File Instead
          </button>
        </div>
      </div>
    );
  }

  if (uploadMethod === 'file') {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="flex items-center gap-2">
          <Upload className="w-5 h-5 text-green-600" />
          <span className="font-medium text-gray-900">Upload Image File</span>
        </div>
        
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          {isUploading ? (
            <div className="space-y-3">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-600">Uploading...</p>
            </div>
          ) : (
            <div className="space-y-3">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto" />
              <div>
                <p className="text-gray-600 mb-2">Drag and drop an image here, or</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Choose File
                </button>
              </div>
              <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex gap-2">
          <button
            onClick={() => setUploadMethod(null)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setUploadMethod('url')}
            className="px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            Use URL Instead
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600 mb-4">{placeholder}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setUploadMethod('url')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Link className="w-4 h-4" />
            Add URL
          </button>
          <button
            onClick={() => setUploadMethod('file')}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Upload File
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;