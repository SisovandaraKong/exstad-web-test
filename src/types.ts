export interface CourseData {
    course_tile: string;
    courses_content: string
    subject: string[]
    name_over: string
    node_width?: number
    node_height?: number
    input_handles?: number
    output_handles?: number
}

export interface QuarterGroup {
    id: string
    label: string
    color: string
    bgColor: string
    borderColor: string
}