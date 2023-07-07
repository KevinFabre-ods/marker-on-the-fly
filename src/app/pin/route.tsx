import { ImageResponse } from 'next/server';

import Pin from '../components/Pin';

export const runtime = 'edge';

const DEFAULT_SIZE = 36;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const color = searchParams.get('color') || 'black';
    const size = Number.parseInt(searchParams.get("size") || '') || DEFAULT_SIZE;
    const icon = searchParams.get("icon") || null;
    const iconColor =  searchParams.get("iconColor") || 'black';
    const iconSvg = icon ? await fetch(`/static/icons/${icon}.svg`) : null;
    console.log(iconSvg)
  
 
    return new ImageResponse(
      (
        <div
          style={{
            height: size,
            width: size,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
          }}
        >
            <Pin color={color} width={size} height={size} />
           {iconSvg || null }
        </div>
      ),
      {
        width: size,
        height: size,
      },
    );
  } catch (e) {
    console.log(e)
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
