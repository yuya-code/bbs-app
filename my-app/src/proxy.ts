import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./utils/jwt";

const PUBLIC_PATHS = ['/login', '/signup'];

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const cookie = request.cookies.get('session');
    const session = await decrypt(cookie?.value);

    // !!はboolean型に変換
    // セッションが存在しているかつユーザーIDが存在する場合はtrue
    const isAuthenticated = !!session?.userId;
    const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));


    if (isAuthenticated && isPublicPath) {
        // NextResponse.redirectはリダイレクトを行う。フルパスを指定しなきゃいけない
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (!isAuthenticated && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    

    // NextResponseとは
    // 処理を先に進めてよしと言う意味
    return NextResponse.next();
}

// matcherはどのパスにアクセスしてきた際にこちらのPROXYを動かすかという設定を書くことができる。
// apiや_next/imageなどのURLの場合は動かさない
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}