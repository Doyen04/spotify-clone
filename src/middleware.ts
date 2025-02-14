import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(req: NextRequest): Promise<NextResponse> {
    // const authmodal = useAuthModal();
    const res: NextResponse = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const { data: { session } } = await supabase.auth.getSession();

    // Check if the user is trying to access the /liked route
    if (req.nextUrl.pathname.startsWith('/liked')) {
        // If there is no session, redirect to the login page
        if (!session) {
            // authmodal.onOpen()
            return NextResponse.redirect(new URL('/', req.url));

        }
    }
    return res;
}


export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}