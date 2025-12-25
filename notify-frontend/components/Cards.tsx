    'use client'

    import React from 'react'
    import { Pencil, Trash2 } from 'lucide-react'
    import { Button } from './ui/button'
    import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
    import { Badge } from './ui/badge'

    // Define the type for note prop
    interface NoteProps {
    note: {
        _id: string
        title: string
        description: string
        resource?: string
        revisionStatus: string
    }
    onEdit: (note: NoteProps['note']) => void
    onDelete: (id: string | number) => void
    }

    const NoteCard = ({ note , onEdit , onDelete }: NoteProps) => {
                    

    return (
        <Card className='w-[calc(33.333%-1rem)] h-64 relative overflow-hidden border-2 border-emerald-200/50 dark:border-emerald-800/50 hover:shadow-xl transition-all duration-200 hover:scale-[1.02]'>
        {/* Top gradient accent */}
        <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500'></div>
        
        <CardHeader className='pb-3 pt-4'>
            <div className='flex items-start justify-between'>
            <CardTitle className='text-lg font-bold text-emerald-900 dark:text-emerald-100 line-clamp-1'>
                {note.title}
            </CardTitle>
            {/* Action Buttons - Top Right */}
            <div className='flex gap-1 -mt-1'>
                <Button 
                variant='ghost' 
                size='icon' 
                onClick={() => onEdit(note)} 
                className='h-8 w-8 hover:bg-emerald-100 dark:hover:bg-emerald-900'
                >
                <Pencil className='h-4 w-4 text-emerald-600 dark:text-emerald-400' />
                </Button>
                <Button 
                variant='ghost' 
                size='icon' 
                onClick={() => onDelete(note._id)} 
                className='h-8 w-8 hover:bg-red-100 dark:hover:bg-red-900'
                >
                <Trash2 className='h-4 w-4 text-red-600 dark:text-red-400' />
                </Button>
            </div>
            </div>
        </CardHeader>

        <CardContent className='space-y-3'>
            {/* Description */}
            <p className='text-sm text-muted-foreground line-clamp-3'>
            {note.description}
            </p>

            {/* Resource Link */}
            {note.resource && (
            <a 
                href={note.resource} 
                target='_blank' 
                rel='noopener noreferrer'
                className='text-xs text-emerald-600 dark:text-emerald-400 hover:underline block truncate'
            >
                {note.resource}
            </a>
            )}

            {/* Confidence Status Badge */}
            <Badge 
            variant='secondary' 
            className='bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 text-emerald-700 dark:text-emerald-300 border-0'
            >
            {note.revisionStatus}
            </Badge>
        </CardContent>
        </Card>
    )
    }

    export default NoteCard