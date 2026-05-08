"use client";

import { useEffect } from "react";
import {
  ReactFlow,
  type Node,
  type Edge,
  Background,
  Controls,
  ControlButton,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomWorkNode from "./CustomWorkNode";
import { useGetAllRoadmapsQuery } from "../../features/roadmapApi";
import type {
  HandleConfig,
  HandleType,
  WorkNodeData,
  RoadmapResponse,
  RoadmapNode,
  RoadmapEdge,
} from "../../types/roadmap";
import { Card } from "../ui/card";

const nodeTypes = {
  workNode: CustomWorkNode,
};

// ✅ Custom Controls with hover tooltips
function CustomControls() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div className="absolute top-40 right-2 flex flex-col gap-2 z-10">
      {/* Zoom In */}
      <div className="group relative  ">
        <ControlButton className="!bg-[var(--row-2)] !border-none" onClick={() => zoomIn()}>
          +
        </ControlButton>
        <span className="absolute right-full mr-2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          Zoom In
        </span>
      </div>

      {/* Zoom Out */}
      <div className="group relative">
        <ControlButton className="!bg-[var(--row-2)] !border-none"  onClick={() => zoomOut()}>
          −
        </ControlButton>
        <span className="absolute right-full mr-2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          Zoom Out
        </span>
      </div>

      {/* Fit View */}
      <div className="group relative">
        <ControlButton className="!bg-[var(--row-2)] !border-none"  onClick={() => fitView()}>
          ⤢
        </ControlButton>
        <span className="absolute right-full mr-2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          Fit to View
        </span>
      </div>
    </div>
  );
}


export default function WorkNodeViewer({
  programUuid,
  programType = "programs",
}: {
  programUuid: string;
  programType?: "programs" | "opening-programs";
}) {
  const {
    data: apiData,
    isLoading,
    error,
  } = useGetAllRoadmapsQuery(
    { programType, programUuid },
    { skip: !programUuid }
  );

  const [nodes, setNodes] = useNodesState<Node<WorkNodeData>>([]);
  const [edges, setEdges] = useEdgesState<Edge>([]);

  useEffect(() => {
    if (!apiData || !apiData[0]) return;

    const roadmapData: RoadmapResponse[number] = apiData[0];

    const loadedNodes: Node<WorkNodeData>[] = roadmapData.nodes.map(
      (node: RoadmapNode, index: number) => {
        const parts = node.data.label.split(",").map((p: string) => p.trim());
        const title = parts[0];

        const handles: HandleConfig = {
          top: (parts[1] as HandleType) || "target",
          right: (parts[2] as HandleType) || "target",
          bottom: (parts[3] as HandleType) || "target",
          left: (parts[4] as HandleType) || "target",
        };

        const color = parts[5] || "";

        return {
          id: `${index + 1}`,
          type: "workNode",
          position: node.position,
          data: {
            title,
            color,
            tasks: node.data.description
              ? node.data.description
                  .split(", ")
                  .filter((t: string) => t.trim() !== "")
              : [],
            handles,
            onEdit: () => {},
            onDelete: () => {},
          },
          draggable: false,
          selectable: false,
        };
      }
    );

    const loadedEdges: Edge[] = roadmapData.edges.map((edge: RoadmapEdge) => {
      const [sourceId, sourceHandle] = edge.source.split(",").map((s: string) => s.trim());
      const [targetId, targetHandle] = edge.target.split(",").map((s: string) => s.trim());

      return {
        id: edge.id,
        source: sourceId,
        sourceHandle,
        target: targetId,
        targetHandle,
        type: "smoothstep",
        animated: edge.animated ?? true,
        style: { strokeWidth: 2, stroke: "#9333ea" },
      };
    });

    setNodes(loadedNodes);
    setEdges(loadedEdges);
  }, [apiData, setNodes, setEdges]);

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="flex-1">
        <Card className="h-full border-none p-0">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            zoomOnScroll={false}
            zoomOnPinch={true}
            zoomOnDoubleClick={true}
            className="bg-white dark:bg-gray-800"
          
          >
            <Background />
            {/* ✅ Custom tooltip controls */}
            <CustomControls />
          </ReactFlow>
        </Card>
      </div>
    </div>
  );
}
