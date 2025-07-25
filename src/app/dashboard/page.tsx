'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardData } from '@/types';
import { Users, Calendar, Building, DollarSign } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  const { data, isLoading, error } = useQuery<DashboardData>({
    queryKey: ['dashboard', selectedMonth],
    queryFn: () =>
      axios
        .get(`/api/dashboard?month=${selectedMonth}`)
        .then((res) => res.data.data), // ✅ extract `data` directly
    enabled: !!selectedMonth,
  });

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const statsCards = [
    {
      title: 'NGOs Reporting',
      value: data?.total_ngo || 0,
      icon: Building,
      gradient: 'from-blue-500 to-blue-600',
      delay: 0.1
    },
    {
      title: 'People Helped',
      value: data?.total_people_helped || 0,
      icon: Users,
      gradient: 'from-green-500 to-green-600',
      delay: 0.2,
      format: 'number'
    },
    {
      title: 'Events Conducted',
      value: data?.total_event || 0,
      icon: Calendar,
      gradient: 'from-purple-500 to-purple-600',
      delay: 0.3
    },
    {
      title: 'Funds Utilized',
      value: data?.total_fund || 0,
      icon: DollarSign,
      gradient: 'from-orange-500 to-orange-600',
      delay: 0.4,
      format: 'currency'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <motion.div 
        className="container mx-auto px-6 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto">
          <Card className="shadow-2xl mb-8">
            <CardHeader>
              <CardTitle className="text-3xl text-center">Impact Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Month
                </label>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {isLoading && (
                <div className="text-center py-8">
                  <motion.div 
                    className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <p className="mt-4 text-gray-600">Loading dashboard data...</p>
                </div>
              )}

              {error && (
                <motion.div 
                  className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <p className="text-red-800">Error loading data: {(error as Error).message}</p>
                </motion.div>
              )}

              {data && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {statsCards.map((card) => {
                    const Icon = card.icon;
                    const displayValue = card.format === 'currency' 
                      ? formatCurrency(card.value)
                      : card.format === 'number'
                      ? card.value.toLocaleString()
                      : card.value.toString();

                    return (
                      <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: card.delay, duration: 0.5 }}
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                      >
                        <Card className={`bg-gradient-to-br ${card.gradient} text-white shadow-lg border-0`}>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-lg font-semibold opacity-90">{card.title}</h3>
                                <p className="text-3xl font-bold">{displayValue}</p>
                              </div>
                              <Icon className="h-8 w-8 opacity-80" />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {data && (
                <motion.div 
                  className="mt-8 text-center text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <p>Data for <strong>{data.month}</strong></p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>
      <div className=" flex flex-grid-2 text-center justify-center">
      <Link href="/submit" className=' hover:underline text-lg'>
                 go to Submit page
              </Link>
              <span className='mx-2'>|</span>
              
      <Link href="/" className=' hover:underline text-lg'>
                Home
              </Link>
            
              </div>
    </div>
  );
}
