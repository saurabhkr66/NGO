export interface Report{
     
    ngo_id: string;
    month:string;
    people_helped:number;
    event_conducted:number;
    fund_utilized:number;
    created_at:string;
    updated_at:string;
}
export interface DashboardData{
    month:string;
    total_ngo:number;
    total_people_helped:number;
    total_event:number;
    total_fund:number;
}
export interface APIResponse<T>{
    data?: T;
    message?: string;
    error?: string;
    

}
export interface ReportFormData{
     
  ngo_id: string;
  month: string;
  people_helped: number;
  event_conducted: number;
  fund_utilized: number;

}