import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";




export async function middleware(req: NextRequest): Promise<NextResponse> {
    const res: NextResponse = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    await supabase.auth.getSession();
    return res;
}