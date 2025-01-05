import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Calendar } from '@/components/ui/Calendar';
import { DocumentScanner } from './DocumentScanner';
import { toast } from 'sonner';
import { FileText, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";

interface FormData {
  patientName: string;
  age: string;
  address: string;
  emergencyContact: string;
  problemDescription: string;
  preferredTime: string;
  tnaiNumber?: string;
  reason?: string;
  preferredNurse?: string;
  medicalHistory?: string;
  documents: File[];
}

interface HomeNursingFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

export function HomeNursingForm({ onSubmit }: HomeNursingFormProps) {
  const [formData, setFormData] = useState<FormData>({
    patientName: '',
    age: '',
    address: '',
    emergencyContact: '',
    problemDescription: '',
    preferredTime: '',
    tnaiNumber: '',
    reason: '',
    preferredNurse: '',
    medicalHistory: '',
    documents: []
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isScanning, setIsScanning] = useState(false);
  const [documentPreview, setDocumentPreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...newFiles]
      }));

      // Show preview of the first file
      const file = newFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setDocumentPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate TNAI Number
    if (formData.tnaiNumber && !formData.tnaiNumber.match(/^[A-Z]{2}\d{6}$/)) {
      toast.error('Please enter a valid TNAI number (Format: XX123456)');
      return;
    }

    // Validate required fields
    if (!formData.patientName || !formData.age || !formData.address || !formData.emergencyContact || !formData.problemDescription) {
      toast.error('Please fill in all required fields');
      return;
    }

    setShowConfirmation(true);
  };

  const confirmBooking = async () => {
    await onSubmit(formData);
    toast.success('You have successfully booked a home nurse');
    setShowConfirmation(false);
    setFormData({
      patientName: '',
      age: '',
      address: '',
      emergencyContact: '',
      problemDescription: '',
      preferredTime: '',
      tnaiNumber: '',
      reason: '',
      preferredNurse: '',
      medicalHistory: '',
      documents: []
    });
    setDocumentPreview(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Patient Details */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="patientName">Patient Name *</Label>
            <Input
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              placeholder="Enter patient name"
              required
            />
          </div>

          <div>
            <Label htmlFor="age">Age *</Label>
            <Input
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Enter patient age"
              required
            />
          </div>

          <div>
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter patient address"
              required
            />
          </div>

          <div>
            <Label htmlFor="emergencyContact">Emergency Contact *</Label>
            <Input
              id="emergencyContact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleInputChange}
              placeholder="Enter emergency contact number"
              required
            />
          </div>
        </div>

        {/* Care Details */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="problemDescription">Medical Problem Description *</Label>
            <Textarea
              id="problemDescription"
              name="problemDescription"
              value={formData.problemDescription}
              onChange={handleInputChange}
              placeholder="Describe the medical condition"
              required
            />
          </div>

          <div>
            <Label htmlFor="preferredTime">Preferred Nursing Time</Label>
            <Input
              id="preferredTime"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleInputChange}
              placeholder="e.g., Morning 9 AM - 6 PM"
            />
          </div>

          <div>
            <Label htmlFor="tnaiNumber">TNAI Number</Label>
            <Input
              id="tnaiNumber"
              name="tnaiNumber"
              value={formData.tnaiNumber}
              onChange={handleInputChange}
              placeholder="Format: XX123456"
            />
            <p className="text-sm text-gray-500 mt-1">
              TNAI: Trained Nurses Association of India
            </p>
          </div>

          <div>
            <Label htmlFor="reason">Reason for Home Nursing</Label>
            <Textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              placeholder="Why do you need home nursing care?"
            />
          </div>

          <div>
            <Label htmlFor="preferredNurse">Preferred Nurse</Label>
            <Input
              id="preferredNurse"
              name="preferredNurse"
              value={formData.preferredNurse}
              onChange={handleInputChange}
              placeholder="Enter preferred nurse name"
            />
          </div>

          <div>
            <Label htmlFor="medicalHistory">Medical History</Label>
            <Textarea
              id="medicalHistory"
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleInputChange}
              placeholder="Enter patient medical history"
            />
          </div>
        </div>
      </div>

      {/* Document Upload */}
      <div className="space-y-4">
        <Label>Upload Documents</Label>
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          <input
            type="file"
            id="documents"
            className="hidden"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
          />
          <label
            htmlFor="documents"
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="text-sm text-gray-500">
              Click to upload prescriptions or medical reports
            </span>
          </label>
        </div>

        {/* Document Preview */}
        {documentPreview && (
          <div className="mt-4">
            <Label>Document Preview</Label>
            <div className="relative mt-2 p-4 border rounded-lg">
              <img
                src={documentPreview}
                alt="Document preview"
                className="max-w-full h-auto rounded"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => setDocumentPreview(null)}
              >
                ✕
              </Button>
            </div>
          </div>
        )}

        {/* Document Scanner */}
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => setIsScanning(true)}
        >
          <FileText className="w-4 h-4 mr-2" />
          Scan Document
        </Button>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full">
        Book Home Nursing
      </Button>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Home Nursing Booking</DialogTitle>
            <DialogDescription>
              Please review your booking details before confirming.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p><strong>Patient Name:</strong> {formData.patientName}</p>
              <p><strong>Age:</strong> {formData.age}</p>
              <p><strong>Address:</strong> {formData.address}</p>
              <p><strong>Emergency Contact:</strong> {formData.emergencyContact}</p>
              <p><strong>Medical Problem Description:</strong> {formData.problemDescription}</p>
              <p><strong>Preferred Time:</strong> {formData.preferredTime || 'Not specified'}</p>
              <p><strong>TNAI Number:</strong> {formData.tnaiNumber || 'Not specified'}</p>
              <p><strong>Reason for Home Nursing:</strong> {formData.reason || 'Not specified'}</p>
              <p><strong>Preferred Nurse:</strong> {formData.preferredNurse || 'Not specified'}</p>
              <p><strong>Medical History:</strong> {formData.medicalHistory || 'Not specified'}</p>
              <p><strong>Documents:</strong> {formData.documents.length} file(s) uploaded</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button onClick={confirmBooking}>
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Document Scanner Dialog */}
      {isScanning && (
        <DocumentScanner
          onClose={() => setIsScanning(false)}
          onScan={(scannedDoc) => {
            setFormData(prev => ({
              ...prev,
              documents: [...prev.documents, scannedDoc]
            }));
            setIsScanning(false);
            toast.success('Document scanned successfully');
          }}
        />
      )}
    </form>
  );
}
