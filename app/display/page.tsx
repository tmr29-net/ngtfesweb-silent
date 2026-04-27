import type { Metadata } from 'next'
import { DisplayClient } from './DisplayClient'
import { CautionNotes } from '@/components/common/CautionNotes'
import { PaymentNotes } from '@/components/common/PaymentNotes'
import { DISPLAY_PROJECTS } from './data' // 作成したデータをインポート

// Projectの型定義
interface Project {
    project_id: string;
    title: string;
    type: string;
    location: string;
    floor_number: number;
    description: string;
    image_url: string;
}

export const metadata: Metadata = {
    title: '展示',
}

// 静的ページとしてビルドするための設定
export const dynamic = 'force-static'

export default function DisplayPage() {
    // data.ts から全ての展示プロジェクトを取得
    // もしデータ側で filter が必要ならここで行いますが、基本は全表示でOKです
    const displayProjects = DISPLAY_PROJECTS

    return (
        <div className="flex flex-col">
            <DisplayClient initialProjects={displayProjects as Project[]} />
            <CautionNotes />
            <PaymentNotes />
        </div>
    )
}