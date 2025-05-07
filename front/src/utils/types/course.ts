export type Lesson = {
  id: string
  title: string
  link: string | null
  icon: string | null
  chapterId: string
  createdAt: string
  updatedAt: string
}

export type Chapter = {
  id: string
  title: string
  open: boolean
  courseId: string
  createdAt: string
  updatedAt: string
  lessons: Lesson[]
}

export type Course = {
  id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  chapters: Chapter[]
}
