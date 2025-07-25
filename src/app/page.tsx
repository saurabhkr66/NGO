// app/page.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, BarChart3, Users, TrendingUp, Shield, Zap } from 'lucide-react';

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const features = [
    {
      icon: FileText,
      title: 'Easy Reporting',
      description: 'Submit monthly impact reports with our intuitive form interface',
      delay: 0.2
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Track aggregated impact data across all NGOs with live dashboards',
      delay: 0.3
    },
    {
      icon: Users,
      title: 'Multi-NGO Support',
      description: 'Manage reports from thousands of NGOs across India',
      delay: 0.4
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with MongoDB and TypeScript',
      delay: 0.5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      {/* <Navigation /> */}
      
      <main className="container mx-auto px-6">
        {/* Hero Section */}
        <motion.section 
          className="py-20 text-center text-white"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1 
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            NGO Impact Tracker
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Empowering NGOs across India to track, measure, and report their social impact. 
            Join thousands of organizations making a difference in communities nationwide.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            variants={fadeInUp}
          >
            <Button asChild size="lg" className="bg-white text-black hover:bg-purple-50 text-lg px-8 py-4">
              <Link href="/submit">
                <FileText className="mr-2 h-5 w-5" />
                Submit Report
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-white text-black hover:bg-white hover:text-purple-600 text-lg px-8 py-4">
              <Link href="/dashboard">
                <BarChart3 className="mr-2 h-5 w-5" />
                View Dashboard
              </Link>
            </Button>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20"
            variants={staggerContainer}
          >
            {[
              { number: '1000+', label: 'NGOs Registered', delay: 0.1 },
              { number: '50L+', label: 'People Helped', delay: 0.2 },
              { number: '₹10Cr+', label: 'Funds Tracked', delay: 0.3 }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: stat.delay, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-white bg-opacity-10 backdrop-blur-md border-white border-opacity-20 text-white">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold mb-2">{stat.number}</div>
                    <div className="text-sm opacity-90">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          className="pb-20"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-4xl font-bold text-white text-center mb-12"
            variants={fadeInUp}
          >
            Why Choose Our Platform?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: feature.delay, duration: 0.6 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <Card className="bg-white bg-opacity-10 backdrop-blur-md border-white border-opacity-20 text-white h-full">
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto mb-4 p-3 bg-white bg-opacity-20 rounded-full w-fit">
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-center opacity-90 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="pb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Card className="bg-white bg-opacity-15 backdrop-blur-md border-white border-opacity-20 text-white max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <TrendingUp className="h-16 w-16 mx-auto mb-6 text-white" />
              <h3 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h3>
              <p className="text-xl mb-8 opacity-90">
                Join our growing community of NGOs making a measurable difference across India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                  <Link href="/submit">
                    Get Started Today
                    <Zap className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </main>
    </div>
  );
}
