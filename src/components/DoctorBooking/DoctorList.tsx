import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDoctors } from '../../hooks/useDoctors';
import DoctorCard from './DoctorCard';
import DoctorFilters from './DoctorFilters';

export default function DoctorList() {
  const { doctors, loading, error, fetchDoctors } = useDoctors();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      fetchDoctors();
    }
  }, [inView, fetchDoctors]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <DoctorFilters />
      </div>

      <div className="lg:col-span-3">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 p-4">
            {error}
          </div>
        ) : (
          <div ref={ref} className="space-y-4">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}