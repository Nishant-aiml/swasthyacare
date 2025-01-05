import React, { useState } from 'react';
import { Button } from "@/components/ui/Button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";
import { Camera } from 'lucide-react';

interface DocumentScannerProps {
  onScan: (file: File) => void;
  onClose: () => void;
}

export function DocumentScanner({ onScan, onClose }: DocumentScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsScanning(true);
      onScan(file);
      setIsScanning(false);
    }
  };

  const handleScanClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="w-full">
            <Camera className="mr-2 h-4 w-4" />
            Scan Document
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Scan Medical Document</AlertDialogTitle>
            <AlertDialogDescription>
              Please ensure the document is well-lit and clearly visible.
              You can either take a photo or upload an existing image.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleScanClick} disabled={isScanning}>
              {isScanning ? 'Scanning...' : 'Start Scan'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
