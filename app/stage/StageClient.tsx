'use client'

import { useState } from 'react'
import Image from 'next/image'
import { StageProjectCard } from '@/components/project/StageProjectCard'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { ProjectDetailModal } from '@/components/project/ProjectDetailModal'

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

interface StageClientProps {
    initialProjects: StageProject[]
}

export const StageClient = ({ initialProjects }: StageClientProps) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [activeTab, setActiveTab] = useState('all') // 場所
    const [activeDay, setActiveDay] = useState('all') // 日程

    // モーダル管理用の状態
    const [selectedProject, setSelectedProject] = useState<StageProject | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // カードクリック時のハンドラ
    const handleCardClick = (project: StageProject) => {
        setSelectedProject(project)
        setIsModalOpen(true)
    }

    const filteredProjects = initialProjects.filter((project) => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesLocation = activeTab === 'all' ? true : project.category === activeTab
        const matchesDay = activeDay === 'all' ? true : project.day === parseInt(activeDay) || project.day === 'both'
        return matchesSearch && matchesLocation && matchesDay
    })

    return (
        <div className="w-full container mx-auto px-4 py-8 space-y-8">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">ステージ</h1>
                <p className="text-muted-foreground">野外ステージ・講堂ステージのタイムテーブルと企画一覧です。</p>
            </div>
            
            <div className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2">タイムテーブル</h2>
                <div className="w-full aspect-video bg-muted rounded-md border flex items-center justify-center overflow-hidden relative">
                    <Image 
                        src="/images/timetable-stage.png" 
                        alt="タイムテーブル" 
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            {/* 絞り込みバーセクション */}
            <div className="bg-slate-50 p-4 rounded-xl space-y-4 shadow-sm border border-slate-100">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    
                    {/* 左側: タブグループ */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        {/* 日程 */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Day</span>
                            <Tabs defaultValue="all" onValueChange={setActiveDay} className="w-auto">
                                <TabsList className="bg-white border">
                                    <TabsTrigger value="all">全て</TabsTrigger>
                                    <TabsTrigger value="1">1日目</TabsTrigger>
                                    <TabsTrigger value="2">2日目</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>

                        {/* 分切り線（PCのみ） */}
                        <div className="hidden md:block h-6 w-[1px] bg-slate-200" />

                        {/* 場所 */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Place</span>
                            <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-auto">
                                <TabsList className="bg-white border">
                                    <TabsTrigger value="all">全て</TabsTrigger>
                                    <TabsTrigger value="outdoor">野外</TabsTrigger>
                                    <TabsTrigger value="indoor">講堂</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    </div>

                    {/* 右側: 検索バー */}
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
                                <StageProjectCard project={project} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 詳細モーダルコンポーネント */}
            <ProjectDetailModal 
                project={selectedProject} 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    )
}