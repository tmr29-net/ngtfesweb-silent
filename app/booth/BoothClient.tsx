'use client'

import { useState } from 'react'
import Image from 'next/image'
import { BoothProjectCard } from '@/components/project/BoothProjectCard'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { ProjectDetailModal } from '@/components/project/ProjectDetailModal'

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

interface BoothClientProps {
    initialProjects: Project[]
}

export const BoothClient = ({ initialProjects }: BoothClientProps) => {
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

    const filteredProjects = (initialProjects || []).filter((project) => {
        if (!project) return false
        const matchesSearch = 
            project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (project.class_id && project.class_id.toLowerCase().includes(searchTerm.toLowerCase()))
        const matchesTab = activeTab === 'all' ? true : project.type === activeTab
        return matchesSearch && matchesTab
    })

    return (
        <div className="w-full container mx-auto px-4 py-8 space-y-8">
            {/* タイトルエリア */}
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">模擬店</h1>
                <p className="text-muted-foreground">教室模擬・食品模擬の企画一覧です。</p>
            </div>
            
            {/* 会場マップ */}
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

            {/* 検索・絞り込みバー */}
            <div className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Category</span>
                        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full sm:w-auto">
                            <TabsList className="grid w-full grid-cols-3 sm:w-[360px] bg-white border">
                                <TabsTrigger value="all">全て</TabsTrigger>
                                <TabsTrigger value="class">教室模擬</TabsTrigger>
                                <TabsTrigger value="food">食品模擬</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                    
                    <div className="relative w-full lg:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            type="search"
                            placeholder="企画名・クラスで検索..."
                            className="pl-9 bg-white border-slate-200 focus-visible:ring-slate-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* 企画一覧 */}
                <div className="mt-8">
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
                                    <BoothProjectCard project={project} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* 詳細モーダル */}
            {selectedProject && (
    <ProjectDetailModal
    project={selectedProject}
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
  />
)}
        </div>
    )
}