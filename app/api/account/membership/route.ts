import { NextRequest, NextResponse } from 'next/server';
import { accountDataStore } from '@/lib/account/account.service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId') || 'default_user';

    const dossier = accountDataStore.getDossier(userId);
    return NextResponse.json({
      success: true,
      membership: dossier.membership,
    });
  } catch (error) {
    console.error('Error fetching membership:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve membership information.' },
      { status: 500 }
    );
  }
}
