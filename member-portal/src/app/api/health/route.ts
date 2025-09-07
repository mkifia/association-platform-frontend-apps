import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const bffUrl = process.env.PLATFORM_BFF_URL || 'http://localhost:3001'
    console.log('Proxying health check to:', `${bffUrl}/health`)
    
    const response = await fetch(`${bffUrl}/health`)
    
    if (!response.ok) {
      throw new Error(`BFF health check failed with status: ${response.status}`)
    }
    
    const healthData = await response.json()
    return NextResponse.json(healthData)
  } catch (error) {
    console.error('Health check proxy error:', error)
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to connect to BFF service',
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}
