'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DisplayProjectCard } from '@/components/project/DisplayProjectCard'
import { ProjectDetailModal } from '@/components/project/ProjectDetailModal'

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

export const DisplayClient = ({ initialProjects }: { initialProjects: Project[] }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [activeTab, setActiveTab] = useState('all')

    // モーダル管理用の状態
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // カードクリック時のハンドラ
    const handleCardClick = (project: Project) => {
        setSelectedProject(project)
        setIsModalOpen(true)
    }

    // DB通信を行わず、ローカルでフィルタリング
    const filteredProjects = (initialProjects || []).filter((project) => {
        if (!project) return false;
        
        const matchesSearch = project.title?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesTab =
            activeTab === 'all'
                ? true
                : (activeTab === '20' && project.floor_number === 2) ||
                  (activeTab === '30' && project.floor_number === 3) ||
                  (activeTab === '40' && project.floor_number === 4)
        return matchesSearch && matchesTab
    })

    return (
        <div className="w-full container mx-auto px-4 py-8 space-y-8">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">文化部展示</h1>
                <p className="text-muted-foreground">各文化部、委員会の展示企画一覧です。</p>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2">会場マップ</h2>
                <div className="w-full aspect-video bg-muted rounded-md border flex items-center justify-center overflow-hidden relative">
                    <Image
                        src="/images/venue-map-boothv2.png"
                        alt="会場マップ"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Floor</span>
                        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full sm:w-auto">
                            <TabsList className="grid w-full grid-cols-4 sm:w-[300px] bg-white border">
                                <TabsTrigger value="all">全て</TabsTrigger>
                                <TabsTrigger value="20">2F</TabsTrigger>
                                <TabsTrigger value="30">3F</TabsTrigger>
                                <TabsTrigger value="40">4F</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                    
                    <div className="relative w-full lg:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            type="search"
                            placeholder="企画名で検索..."
                            className="pl-9 bg-white border-slate-200 focus-visible:ring-slate-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-6">
                    {filteredProjects.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground border rounded-lg bg-card/50">
                            該当する企画が見つかりませんでした。
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects.map((project) => (
                                <div 
                                    key={project.project_id} 
                                    onClick={() => handleCardClick(project)}
                                    className="cursor-pointer transition-all duration-200 hover:translate-y-[-4px] active:scale-[0.98]"
                                >
                                    <DisplayProjectCard
                                        project={project}
                                        hideClassId={true}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* 詳細モーダル */}
            <ProjectDetailModal 
                project={selectedProject} 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    )
}