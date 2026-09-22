import { NextRequest, NextResponse } from 'next/server';
import { accountDataStore } from '@/lib/account/account.service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId') || 'default_user';

    const dossier = accountDataStore.getDossier(userId);
    return NextResponse.json({
      success: true,
      dossier,
    });
  } catch (error) {
    console.error('Error fetching dossier:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve profile dossier.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, scenario, profile, userId = 'default_user' } = body;

    if (action === 'set_test_scenario' && scenario) {
      const updated = accountDataStore.setTestScenario(scenario, userId);
      return NextResponse.json({
        success: true,
        message: `Scenario '${scenario}' applied successfully.`,
        dossier: updated,
      });
    }

    if (action === 'update_profile' && profile) {
      const dossier = accountDataStore.getDossier(userId);
      if (profile.name) dossier.name = profile.name;
      if (profile.phone) dossier.phone = profile.phone;
      if (profile.email) dossier.email = profile.email;
      return NextResponse.json({ success: true, dossier });
    }

    return NextResponse.json({ success: false, error: 'Invalid profile action.' }, { status: 400 });
  } catch (error) {
    console.error('Error processing profile request:', error);
    return NextResponse.json({ success: false, error: 'Failed to update profile.' }, { status: 500 });
  }
}
