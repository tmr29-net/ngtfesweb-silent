'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { MapPin, Clock } from 'lucide-react'

// Projectの型定義
interface Project {
    project_id: string | number;
    title: string;
    type: string;
    class_id: string;
    floor: number;
    schedule: string;
    location: string;
    description: string;
    image_url: string;
}

export const ProjectDetailModal = ({ project, isOpen, onClose }: { project: Project; isOpen: boolean; onClose: () => void }) => {
    if (!project) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl w-[95vw] overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <div className="mb-2">
                        <Badge className="rounded-full px-4">{project.type}</Badge>
                    </div>
                    <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    <div className="aspect-video relative rounded-lg overflow-hidden border">
                        <Image 
                            src={project.image_url || "/images/placeholder.jpg"} 
                            alt={project.title} 
                            fill 
                            className="object-cover"
                        />
                    </div>

                    <div className="grid gap-4 bg-slate-50 p-4 rounded-lg text-sm">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-500" />
                            <span className="font-bold w-16">場所</span>
                            <span>{project.location}</span>
                        </div>
                        {project.schedule && (
                            <div className="flex items-start gap-2">
                                <Clock className="w-4 h-4 text-slate-500 mt-0.5" />
                                <span className="font-bold w-16">出演時間</span>
                                <span className="whitespace-pre-wrap">{project.schedule}</span>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-bold border-l-4 border-slate-800 pl-2">企画紹介</h4>
                        <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                            {project.description || '詳細な説明文は準備中です。'}
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}