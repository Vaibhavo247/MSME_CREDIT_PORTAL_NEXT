import { NextResponse } from 'next/server';

function clearCookies(response) {
  response.cookies.set({
    name: 'agent_token',
    value: '',
    path: '/',
    maxAge: 0,
  });
  response.cookies.set({
    name: 'access_token',
    value: '',
    path: '/',
    maxAge: 0,
  });
}

export async function POST() {
  const response = NextResponse.redirect('');
  clearCookies(response);
  return response;
}

export async function GET() {
  const response = NextResponse.redirect('/');
  clearCookies(response);
  return response;
}
