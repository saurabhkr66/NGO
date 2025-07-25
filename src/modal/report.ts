// models/Report.ts
import mongoose, { Document, Schema } from 'mongoose';
import { Report } from '@/types';

export interface IReport extends Report, Document {}

const reportSchema = new Schema<IReport>({
  ngo_id: {
    type: String,
    required: [true, 'NGO ID is required'],
    trim: true,
  },
  month: {
    type: String,
    required: [true, 'Month is required'],
    match: [/^\d{4}-\d{2}$/, 'Month must be in YYYY-MM format'],
  },
  people_helped: {
    type: Number,
    required: [true, 'People helped count is required'],
    min: [0, 'People helped must be a positive number'],
  },
  event_conducted: {
    type: Number,
    required: [true, 'Events conducted count is required'],
    min: [0, 'Events conducted must be a positive number'],
  },
  fund_utilized: {
    type: Number,
    required: [true, 'Funds utilized amount is required'],
    min: [0, 'Funds utilized must be a positive number'],
  },
}, {
  timestamps: true,
});

export default mongoose.models.Report || mongoose.model<IReport>('Report', reportSchema);
