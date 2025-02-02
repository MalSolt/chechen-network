'use client'

import { authService } from '@/services/auth-service'
import { useAuthStore } from '@/stores/auth-store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function CheckAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { status, setStatus } = useAuthStore()

  useEffect(() => {
    if (status === 'unauthorized') {
      router.push('/auth/sign-in')
    }
  }, [status, router])

  useEffect(() => {
    async function verifyAuth() {
      try {
        await authService.refreshToken()
        setStatus('authorized')
      } catch (error) {
        setStatus('unauthorized')
        console.log(error)
      }
    }

    verifyAuth()
  }, [setStatus])

  if (status === 'idle') return <p>Loading...</p>

  return children
}
