import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Report as ReportType } from "@/types";
import Report from "@/modal/report";


export async function POST(request:NextRequest){
    try{
        await connectDB();
        const body:Partial<ReportType>=await request.json();
        const{ngo_id,month,people_helped,event_conducted,fund_utilized}=body;

        if(!ngo_id|| !month||!people_helped||!event_conducted||!fund_utilized){
            return new Response(JSON.stringify({error:"All fields are required"}),{status:400});
        }
        
    const report = new Report({
      ngo_id,
      month,
      people_helped: Number(people_helped),
      event_conducted: Number(event_conducted),
      fund_utilized: Number(fund_utilized),
    });
    const savedReport = await report.save();

    return NextResponse.json({
        message:"Report created successfully",
        id: savedReport._id,
    },{status:201})
      

        }

    

    catch (error: unknown ){
    console.error('Error saving report:', error);
    return NextResponse.json(
      { error: 'Failed to save report' },
      { status: 500 }
    );
}
}