import React, { useState } from 'react';
import { format } from 'date-fns';
import { Clock, Star, Video, MapPin, GraduationCap, Calendar, Globe } from 'lucide-react';
import { Doctor } from '../../types';

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const formatSlot = (slot: string) => {
    return format(new Date(slot), 'MMM d, h:mm a');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex gap-4">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{doctor.name}</h3>
                <p className="text-gray-600">{doctor.specialization}</p>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <span>{doctor.experience} years exp.</span>
                  <span className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 inline" />
                    {doctor.rating}
                  </span>
                </div>
              </div>
              <div className="text-emerald-600 font-semibold">
                ₹{doctor.consultationFee}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {doctor.location}
              </div>
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                {doctor.languages.map((lang) => lang.toUpperCase()).join(', ')}
              </div>
            </div>
          </div>
        </div>

        {showDetails && (
          <div className="mt-4 space-y-3 border-t border-gray-200 pt-4">
            <div>
              <h4 className="font-medium flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-gray-500" />
                Education
              </h4>
              <ul className="mt-1 space-y-1 text-sm text-gray-600">
                {doctor.education.map((edu, index) => (
                  <li key={index}>{edu}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                Available Slots
              </h4>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {doctor.availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    className="px-3 py-1.5 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700"
                  >
                    {formatSlot(slot)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-emerald-600 text-sm hover:text-emerald-700"
          >
            {showDetails ? 'Show less' : 'Show more'}
          </button>
          
          <div className="flex-1 flex justify-end gap-2">
            {doctor.isAvailableOnline && (
              <button className="flex items-center gap-2 px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50">
                <Video className="h-4 w-4" />
                Video Consult
              </button>
            )}
            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
              <Calendar className="h-4 w-4" />
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}