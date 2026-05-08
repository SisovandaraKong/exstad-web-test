"use client"

import { Handle, Position } from "reactflow"
import type { CourseData } from "@/types"
import { useMemo } from "react"
import {FaAngleDoubleRight, FaRegFileCode} from "react-icons/fa"

interface ViewOnlyCourseNodeProps {
    data: CourseData
}

export function ViewOnlyCourseNode({ data }: ViewOnlyCourseNodeProps) {
    // Memoize all calculations to prevent re-renders
    const nodeConfig = useMemo(() => {


        const nodeWidth = data.node_width || 280
        const nodeHeight = data.node_height || 200

        // Calculate max subjects based on node height
        // Estimated height for header, labels, and footer badges: ~114px
        // Estimated height per subject list item (text-xs + space-y-0.5): ~18px
        const availableSubjectHeight = nodeHeight - 114
        const maxSubjects = Math.max(0, Math.floor(availableSubjectHeight / 18))

        return {
            nodeWidth,
            nodeHeight,
            maxSubjects,
            showOwner: data.name_over && nodeWidth > 250,
            showDate: nodeHeight > 160,
            inputHandles: data.input_handles || 1,
            outputHandles: data.output_handles || 3,
        }
    }, [data])

    const nodeStyle = useMemo(
        () => ({
            width: `${nodeConfig.nodeWidth}px`,
            height: `${nodeConfig.nodeHeight}px`,
            minWidth: `${nodeConfig.nodeWidth}px`,
            minHeight: `${nodeConfig.nodeHeight}px`,
        }),
        [nodeConfig.nodeWidth, nodeConfig.nodeHeight],
    )

    const getVerticalHandlePosition = (index: number, total: number, nodeHeight: number) => {
        if (total === 1) return nodeHeight / 2
        const spacing = nodeHeight / (total + 1)
        return spacing * (index + 1)
    }

    // Distribute output handles across right, top, and bottom
    const getOutputHandleConfig = (totalOutputs: number) => {
        const configs = []

        for (let i = 0; i < totalOutputs; i++) {
            if (i === 0) {
                // First handle always on the right
                configs.push({
                    position: Position.Right,
                    style: {
                        top: `${nodeConfig.nodeHeight / 2}px`,
                        transform: "translateY(-50%)",
                    },
                })
            } else if (i === 1 && totalOutputs >= 2) {
                // Second handle on top
                configs.push({
                    position: Position.Top,
                    style: {
                        left: `${nodeConfig.nodeWidth / 2}px`,
                        transform: "translateX(-50%)",
                    },
                })
            } else if (i === 2 && totalOutputs >= 3) {
                // Third handle on bottom
                configs.push({
                    position: Position.Bottom,
                    style: {
                        left: `${nodeConfig.nodeWidth / 2}px`,
                        transform: "translateX(-50%)",
                    },
                })
            } else {
                // Additional handles distributed on right side
                const rightHandleIndex = i - 2 // Subtract the top and bottom handles
                configs.push({
                    position: Position.Right,
                    style: {
                        top: `${getVerticalHandlePosition(rightHandleIndex, totalOutputs - 2, nodeConfig.nodeHeight)}px`,
                        transform: "translateY(-50%)",
                    },
                })
            }
        }

        return configs
    }

    const outputHandleConfigs = getOutputHandleConfig(nodeConfig.outputHandles)

    return (
        <div
            className={`bg-white text-gray-900 rounded-lg p-3 shadow-lg border-2 border-gray-300 cursor-default overflow-hidden`}
            style={nodeStyle}
        >
            {/* Input Handles - Always on the left */}
            {Array.from({ length: nodeConfig.inputHandles }).map((_, index) => (
                <Handle
                    key={`input-${index}`}
                    type="target"
                    position={Position.Left}
                    id={`input-${index}`}
                    className="w-3 h-3"
                    style={{
                        pointerEvents: "none",
                        top: `${getVerticalHandlePosition(index, nodeConfig.inputHandles, nodeConfig.nodeHeight)}px`,
                        transform: "translateY(-50%)",
                    }}
                />
            ))}

            {/* Output Handles - Distributed across right, top, and bottom */}
            {outputHandleConfigs.map((config, index) => (
                <Handle
                    key={`output-${index}`}
                    type="source"
                    position={config.position}
                    id={`output-${index}`}
                    className="w-3 h-3"
                    style={{
                        pointerEvents: "none",
                        ...config.style,
                    }}
                />
            ))}

            <div className="space-y-2 h-full flex flex-col">
                <div className="flex items-start justify-between flex-shrink-0">
                    <div className="flex min-w-0">
                        <FaRegFileCode className="w-10 h-10"/>
                        <div>
                            <h2 className="font-semibold text-lg leading-tight truncate">{data.course_tile}jave</h2>
                            <h4 className="font-semibold text-sm leading-tight truncate">{data.courses_content}Start</h4>
                        </div>
                    </div>

                </div>
                <hr className="border border-gray-400 rounded-lg" />
                {/* Subjects */}
                <div className="space-y-1 flex-1 min-h-0">
                    <ul className="list-disc list-inside text-xs pl-2 space-y-0.5">
                        {data.subject.slice(0, nodeConfig.maxSubjects).map((subject) => (
                            <li key={subject} className="truncate flex items-center">
                                <FaAngleDoubleRight />
                                {subject}
                            </li>
                        ))}
                        {data.subject.length > nodeConfig.maxSubjects && (
                            <li className="">+{data.subject.length - nodeConfig.maxSubjects} more</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}