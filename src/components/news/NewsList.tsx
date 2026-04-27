'use client'

import { Badge } from '@/components/ui/badge'
import { CalendarDays } from 'lucide-react'

// 静的なお知らせデータ
const NEWS_DATA = [
    {
        id: '1',
        date: '2026/04/19',
        category: '',
        title: 'Sola公式サイト【静的版】完成！',
        content: 'Sola公式サイトの静的版が完成しました！現在は情報を随時更新中です。今後も最新情報をお届けしますので、ぜひご期待ください！',
        isCritical: true
    },
]

export const NewsList = () => {
    return (
        <div className="space-y-4">
            {NEWS_DATA.map((item) => (
                <div 
                    key={item.id} 
                    className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                        <div className="flex items-center text-slate-500 text-sm font-medium">
                            <CalendarDays className="w-4 h-4 mr-1" />
                            {item.date}
                        </div>
                        <Badge 
                            variant={item.isCritical ? "destructive" : "secondary"}
                            className="rounded-md px-2 py-0"
                        >
                            {item.category}
                        </Badge>
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg mb-2">
                        {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        {item.content}
                    </p>
                </div>
            ))}
        </div>
    )
}