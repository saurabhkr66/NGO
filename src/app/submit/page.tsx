/* eslint-disable @typescript-eslint/no-explicit-any */
// app/submit/page.tsx
'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReportFormData, Report } from '@/types';
import axios from 'axios';
import Link from 'next/link';

export default function SubmitReport() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<ReportFormData>({
    ngo_id: '',
    month: '',
    people_helped: 0,
    event_conducted: 0,
    fund_utilized: 0
  });

  const submitReport = useMutation({
    mutationFn: (data: Partial<Report>) => axios.post('/api/reports', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      setFormData({
        ngo_id: '',
        month: '',
        people_helped: 0,
        event_conducted: 0,
        fund_utilized: 0
      });
      alert('Report submitted successfully!');
    },
    onError: (error: any) => {
      alert('Error submitting report: ' + (error.response?.data?.error || error.message));
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport.mutate({
      ngo_id: formData.ngo_id,
      month: formData.month,
      people_helped: Number(formData.people_helped),
      event_conducted: Number(formData.event_conducted),
      fund_utilized: Number(formData.fund_utilized)
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      {/* <Navigation /> */}
      
      <motion.div 
        className="container mx-auto px-6 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="text-3xl text-center">Submit Monthly Report</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NGO ID
                  </label>
                  <input
                    type="text"
                    name="ngo_id"
                    value={formData.ngo_id}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your NGO ID"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Month
                  </label>
                  <input
                    type="month"
                    name="month"
                    value={formData.month}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    People Helped
                  </label>
                  <input
                    type="number"
                    name="people_helped"
                    value={formData.people_helped}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Number of people helped"
                    min="0"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Events Conducted
                  </label>
                  <input
                    type="number"
                    name="event_conducted"
                    value={formData.event_conducted}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Number of events conducted"
                    min="0"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Funds Utilized (₹)
                  </label>
                  <input
                    type="number"
                    name="fund_utilized"
                    value={formData.fund_utilized}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Amount in rupees"
                    min="0"
                    step="0.01"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    type="submit"
                    disabled={submitReport.isPending}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg"
                  >
                    {submitReport.isPending ? 'Submitting...' : 'Submit Report'}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.div>
       <div className=" flex flex-grid-2 text-center justify-center">
      <Link href="/dashboard" className=' hover:underline text-lg'>
                 View Dashboard
              </Link>
              <span className='mx-2'>|</span>
              
      <Link href="/" className=' hover:underline text-lg'>
                Home
              </Link>
            
              </div>
    </div>
  );
}
