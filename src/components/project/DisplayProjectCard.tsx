'use client'

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin } from 'lucide-react'
import { Project } from '@/components/project/ProjectDetailModal'



export const DisplayProjectCard = ({ project, hideClassId = false }: { project: Project; hideClassId?: boolean }) => {
    return (
        /* Link を削除し、親の DisplayClient 側でクリックイベントを拾えるようにします */
        <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:border-primary/50 flex flex-col bg-white py-0 pointer-events-none">
            {/* 画像エリア：4:3比率を維持 */}
            <div className="aspect-[4/3] w-full overflow-hidden bg-muted relative">
                <Image 
                    src={project.image_url || "/images/placeholder.jpg"} 
                    alt={project.title ?? ""    } 
                    fill 
                    className="object-cover" 
                />
            </div>

            <CardHeader className="px-7 pt-3 pb-3">
                <div className="flex items-center justify-between mb-2">
                    <Badge 
                        variant="outline" 
                        className="bg-emerald-50 text-emerald-700 border-emerald-200 font-medium rounded-full px-4"
                    >
                        展示
                    </Badge>
                </div>
                <CardTitle className="line-clamp-1 text-lg font-bold">{project.title}</CardTitle>
                {!hideClassId && project.class_id && (
                    <p className="text-sm font-medium text-muted-foreground">{project.class_id}</p>
                )}
            </CardHeader>

            <CardContent className="px-7 py-5 pt-0 flex-1 flex flex-col">
                {project.location && (
                    <div className="text-sm font-medium flex flex-col gap-1.5 mb-3 text-gray-700">
                        <div className="flex items-start gap-1.5">
                            <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
                            <span>{project.location}</span>
                        </div>
                    </div>
                )}
                
                <p className="line-clamp-3 text-sm text-gray-500 mt-auto leading-relaxed">
                    {project.description || '説明文がありません'}
                </p>
            </CardContent>
        </Card>
    )
}