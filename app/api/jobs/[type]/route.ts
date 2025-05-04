// app/api/jobs/[type]/route.ts

import { prisma } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(
  req: Request,
  { params }: { params: { type: string } }
) {
  const user = await currentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { jobId } = await req.json()
  const jobType = params.type.toUpperCase()

  if (!['SAVED', 'APPLIED'].includes(jobType)) {
    return NextResponse.json({ error: 'Invalid job type' }, { status: 400 })
  }

  const existing = await prisma.userJob.findFirst({
    where: { userId: user.id, jobId, type: jobType as any },
  })

  if (existing) {
    return NextResponse.json({ message: 'Already exists' }, { status: 200 })
  }

  const record = await prisma.userJob.create({
    data: {
      userId: user.id,
      jobId,
      type: jobType as any,
    },
  })

  return NextResponse.json(record, { status: 201 })
}
