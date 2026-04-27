import type { Metadata } from 'next'
import { BoothClient } from './BoothClient'
import { CautionNotes } from '@/components/common/CautionNotes'
import { PaymentNotes } from '@/components/common/PaymentNotes'
import { MOCK_PROJECTS } from './data'
import { Project } from '@/components/project/ProjectDetailModal'

export const metadata: Metadata = {
  title: '模擬店',
}

export const dynamic = 'force-static'

export default function BoothPage() {
  const boothProjects = MOCK_PROJECTS.filter(
    p => p.type === 'class' || p.type === 'food'
  )

  return (
    <div className="flex flex-col">
      <BoothClient initialProjects={boothProjects as Project[]} />
      <CautionNotes />
      <PaymentNotes />
    </div>
  )
}