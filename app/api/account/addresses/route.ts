import { NextRequest, NextResponse } from 'next/server';
import { accountDataStore } from '@/lib/account/account.service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId') || 'default_user';

    const dossier = accountDataStore.getDossier(userId);
    return NextResponse.json({
      success: true,
      addresses: dossier.savedAddresses,
    });
  } catch (error) {
    console.error('Error fetching addresses:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve addresses.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address, userId = 'default_user' } = body;

    if (!address?.recipientName || !address?.addressLine1 || !address?.city || !address?.state || !address?.pincode) {
      return NextResponse.json({ success: false, error: 'All address fields are required.' }, { status: 400 });
    }

    const saved = accountDataStore.addAddress(address, userId);
    return NextResponse.json({ success: true, address: saved });
  } catch (error) {
    console.error('Error adding address:', error);
    return NextResponse.json({ success: false, error: 'Failed to save address.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { address, action, addressId, userId = 'default_user' } = body;

    if (action === 'set_default' && addressId) {
      accountDataStore.setDefaultAddress(addressId, userId);
      return NextResponse.json({ success: true, message: 'Default address updated.' });
    }

    if (address && address.id) {
      const ok = accountDataStore.updateAddress(address, userId);
      return NextResponse.json({ success: ok, address });
    }

    return NextResponse.json({ success: false, error: 'Invalid update payload.' }, { status: 400 });
  } catch (error) {
    console.error('Error updating address:', error);
    return NextResponse.json({ success: false, error: 'Failed to update address.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const addressId = searchParams.get('id');
    const userId = searchParams.get('userId') || 'default_user';

    if (!addressId) {
      return NextResponse.json({ success: false, error: 'Address ID required.' }, { status: 400 });
    }

    const ok = accountDataStore.deleteAddress(addressId, userId);
    return NextResponse.json({ success: ok });
  } catch (error) {
    console.error('Error deleting address:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete address.' }, { status: 500 });
  }
}
