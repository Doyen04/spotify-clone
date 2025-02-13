import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { SupabaseClient } from "@supabase/supabase-js";




interface MiddlewareRequest extends NextRequest {}
interface MiddlewareResponse extends NextResponse {}
interface SupabaseMiddlewareClient extends SupabaseClient {}

export async function middleware(req: MiddlewareRequest): Promise<MiddlewareResponse> {
    const res: MiddlewareResponse = NextResponse.next();
    const supabase: SupabaseMiddlewareClient = createMiddlewareClient({
        req,
        res
    });

    await supabase.auth.getSession();
    return res;
}