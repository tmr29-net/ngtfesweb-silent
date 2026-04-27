'use client'

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin } from 'lucide-react'
import { getProjectTypeBadgeClassName, getProjectTypeLabel } from '@/lib/projectDisplay'
import { Project } from '@/components/project/ProjectDetailModal'

export const BoothProjectCard = ({ project }: { project: Project }) => {
    return (
        /* Linkタグを削除：遷移を止めてモーダル表示に専念させる */
        <Card className="h-full overflow-hidden transition-all hover:shadow-md hover:border-primary/50 flex flex-col bg-white py-0 pointer-events-none">
            {/* 画像エリア */}
            <div className="aspect-[4/3] w-full overflow-hidden bg-muted relative">
                <Image 
                    src={project.image_url || "/images/placeholder.jpg"} 
                    alt={project.title ?? ""}
                    fill 
                    className="object-cover" 
                />
            </div>

            <CardHeader className="px-7 pt-3 pb-3">
                <div className="mb-2">
                    {/* プロジェクトタイプに応じたバッジ表示 */}
                    <Badge 
                        variant="outline" 
                        className={`${getProjectTypeBadgeClassName(project.type ?? "", project.location ?? "")}`}
                    >
                        {getProjectTypeLabel(project.type ?? "", project.location ?? "")}
                    </Badge>
                </div>
                <CardTitle className="line-clamp-1 text-lg font-bold">{project.title}</CardTitle>
                {project.class_id && (
                    <p className="text-sm font-medium text-muted-foreground">{project.class_id}</p>
                )}
            </CardHeader>

            <CardContent className="px-7 py-5 pt-0 flex-1 flex flex-col">
                <div className="text-sm font-medium text-foreground flex flex-col gap-1 mb-3">
                    {project.location && (
                        <div className="flex items-start gap-1.5 align-middle text-gray-700">
                            <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
                            <span>{project.location}</span>
                        </div>
                    )}
                </div>

                {/* 説明文 */}
                <p className="line-clamp-2 text-sm text-gray-500 mt-auto leading-relaxed">
                    {project.description || '説明文がありません'}
                </p>
            </CardContent>
        </Card>
    )
}