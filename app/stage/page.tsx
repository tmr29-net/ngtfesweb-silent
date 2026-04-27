import type { Metadata } from 'next'
import { StageClient } from './StageClient'
import { CautionNotes } from '@/components/common/CautionNotes'
import { PaymentNotes } from '@/components/common/PaymentNotes'
import { STAGE_PROJECTS } from './data' // 作成したデータをインポート

interface StageProject {
    project_id: string
    title: string
    type: string
    location: string
    schedule?: string
    description?: string
    image_url?: string
    category: 'indoor' | 'outdoor'
    day: 1 | 2 | 'both'
}

export const metadata: Metadata = {
    title: 'ステージ',
}

// 静的ページとしてビルドするための設定
export const dynamic = 'force-static'

export default function StagePage() {
    // data.ts から全てのステージプロジェクトを取得
    const stageProjects = STAGE_PROJECTS

    return (
        <div className="flex flex-col">
            {/* データを渡す。型エラーが出る場合は as any で回避 */}
            <StageClient initialProjects={stageProjects as StageProject[]} />
            <CautionNotes />
            <PaymentNotes />
        </div>
    )
}