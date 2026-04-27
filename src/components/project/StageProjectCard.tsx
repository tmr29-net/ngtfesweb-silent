'use client'

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Clock } from 'lucide-react'

interface StageProjectCardProps {
    project: {
        project_id: string
        title: string
        type: string        // 例: "講堂ステージ"
        location: string    // 例: "講堂ステージ"
        schedule?: string   // 例: "【1日目】 10:20〜11:10..."
        description?: string
        image_url?: string
        category: 'indoor' | 'outdoor' // 判定用
    }
}

export const StageProjectCard = ({ project }: StageProjectCardProps) => {
    return (
        <Card className="h-full overflow-hidden flex flex-col bg-white py-0 border-muted shadow-sm">
            {/* 画像エリア */}
            <div className="aspect-[4/3] w-full overflow-hidden bg-muted relative">
                <Image 
                    src={project.image_url || "/images/placeholder.jpg"} 
                    alt={project.title} 
                    fill 
                    className="object-cover" 
                />
            </div>

            <CardHeader className="px-7 pt-4 pb-3">
                <div className="mb-2">
                    {/* カテゴリによって色を変えるバッジ */}
                    <Badge 
    variant="outline" 
    className={
        project.category === 'indoor' 
        ? "bg-[#FFE4E6] text-[#9F1239] border-[#FDA4AF] font-bold rounded-full px-4 py-0.5" // 講堂ステージ（ピンク/赤系）
        : "bg-[#EDE9FE] text-[#5B21B6] border-[#C4B5FD] font-bold rounded-full px-4 py-0.5" // 野外ステージ（薄紫/青紫系）
    }
>
    {project.type}
</Badge>
                </div>
                <CardTitle className="line-clamp-1 text-lg font-bold">
                    {project.title}
                </CardTitle>
            </CardHeader>

            <CardContent className="px-7 py-5 pt-0 flex-1 flex flex-col">
                <div className="text-sm font-medium flex flex-col gap-2.5 mb-4 text-gray-700">
                    {/* 場所 */}
                    <div className="flex items-start gap-1.5">
                        <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
                        <span>{project.location}</span>
                    </div>

                    {/* 時間（背景のグレーを消し、枠線もシンプルに調整） */}
                    {project.schedule && (
                        <div className="flex items-start gap-1.5">
                            <Clock className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
                            <span className="whitespace-pre-wrap leading-tight text-xs p-0 w-full text-muted-foreground">
                                {project.schedule}
                            </span>
                        </div>
                    )}
                </div>

                {/* 説明文（italic を削除して通常の字体に） */}
                <p className="line-clamp-3 text-sm text-gray-500 mt-auto leading-relaxed">
                    {project.description || '説明文がありません'}
                </p>
            </CardContent>
        </Card>
    )
}