import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }
  if (req.nextUrl.locale === 'default') {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || 'en';
    
    return NextResponse.redirect(
      new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
      );
    }
    const token = req.cookies.get('access_token');
    const token_type = req.cookies.get('token_type');

 
  // const non_auth = ['login', 'register', 'reset_password', '404', 'report'];
  // if (non_auth.includes(req.nextUrl.pathname.substring(1)) && token) {
  //   return NextResponse.redirect(new URL(`/dashboard/index_dashboard`, req.url));
  // } else if (!non_auth.includes(req.nextUrl.pathname.substring(1)) && !token) {
  //   return NextResponse.redirect(new URL(`/login`, req.url));
  // }
  if (token?.value) {
    // const API_URL = process.env.NEXT_PUBLIC_API_URL;
    // const auth = token_type?.value + ' ' + token?.value;
    // axios
    //   .post(API_URL + 'refresh-token', {
    //     headers: {
    //       Authorization: auth,
    //     },
    //   })
    //   .then((res) => {
    //     if (res.status == 200) {
    //       const expires = new Date();
    //       expires.setTime(expires.getTime() + res.data.data.expires_in * 1000);
    //       req.cookies.set('access_token', res.data.data.access_token);
    //       req.cookies.set('token_type', res.data.data.token_type);
    //     }
    //   });
  }
}
