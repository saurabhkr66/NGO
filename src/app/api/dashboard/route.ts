import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { DashboardData } from "@/types";
import Report from "@/modal/report";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month");

    if (!month) {
      return NextResponse.json({ error: "Month is required" }, { status: 400 });
    }

    const aggregation = await Report.aggregate([
      { $match: { month } },
      {
        $group: {
          _id: null,
          total_ngo: { $addToSet: "$ngo_id" },
          total_people_helped: { $sum: "$people_helped" },
          total_events: { $sum: "$event_conducted" }, 
          total_funds: { $sum: "$fund_utilized" },   
        },
      },
    ]);

    const result = aggregation[0] || {
      total_ngo: [],
      total_people_helped: 0,
      total_events: 0,
      total_funds: 0,
    };

    const dashboardData: DashboardData = {
      month,
      total_ngo: result.total_ngo.length || 0,
      total_people_helped: result.total_people_helped || 0,
      total_event: result.total_events || 0,
      total_fund: result.total_funds || 0,
    };

    return NextResponse.json(
      {
        data: dashboardData,
        message: "Dashboard data fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
