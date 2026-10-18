import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'Systems Portfolio';
    const name = searchParams.get('name') || 'Abhijay Singh';
    const tag = searchParams.get('tag') || 'DISTRIBUTED SYSTEMS // CREATIVE TECH';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#05070B',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #1E6BFF 2%, transparent 0%), radial-gradient(circle at 75px 75px, #38D6FF 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            padding: '60px 80px',
            fontFamily: 'sans-serif',
            color: '#FFFFFF',
            position: 'relative',
          }}
        >
          {/* Top Monospace Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#38D6FF',
                  borderRadius: '2px',
                  boxShadow: '0 0 10px #38D6FF',
                }}
              />
              <span style={{ fontSize: '20px', letterSpacing: '4px', color: '#7ADFFF', fontWeight: 600 }}>
                FIG. 01 // ARCHITECTURAL FEED
              </span>
            </div>
            <div
              style={{
                fontSize: '18px',
                color: '#FF8FB8',
                backgroundColor: 'rgba(255, 143, 184, 0.1)',
                padding: '6px 16px',
                borderRadius: '999px',
                border: '1px solid rgba(255, 143, 184, 0.3)',
              }}
            >
              構造 // SYSTEM
            </div>
          </div>

          {/* Center Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
            <div style={{ fontSize: '24px', color: '#38D6FF', letterSpacing: '2px', fontWeight: 700 }}>
              {tag}
            </div>
            <div
              style={{
                fontSize: '68px',
                fontWeight: 900,
                letterSpacing: '-2px',
                lineHeight: 1.1,
                color: '#FFFFFF',
                textShadow: '0 0 30px rgba(30, 107, 255, 0.6)',
              }}
            >
              {name}
            </div>
            <div style={{ fontSize: '32px', color: '#B8D3FF', fontStyle: 'italic' }}>
              {title}
            </div>
          </div>

          {/* Footer Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid rgba(56, 214, 255, 0.3)',
              paddingTop: '24px',
            }}
          >
            <span style={{ fontSize: '20px', color: '#7ADFFF' }}>
              REACTIVE 3D // DISTRIBUTED ENGINES // KERNEL TELEMETRY
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '32px', height: '6px', backgroundColor: '#1E6BFF' }} />
              <div style={{ width: '32px', height: '6px', backgroundColor: '#38D6FF' }} />
              <div style={{ width: '32px', height: '6px', backgroundColor: '#FF8FB8' }} />
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate image: ${e.message}`, { status: 500 });
  }
}
