// // server/routes/tokenChartRoute.ts

// import { NextRequest, NextResponse } from "next/server";
// import { handlerGetTokenHistoryData } from "../../handler/handler";

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");
//   const contract_address = searchParams.get("contract_address");

//   if (!id || !contract_address) {
//     return NextResponse.json({ error: "Missing id or contract_address" }, { status: 400 });
//   }

//   try {
//     const data = await handlerGetTokenHistoryData(id, contract_address);
//     return NextResponse.json(data);
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
