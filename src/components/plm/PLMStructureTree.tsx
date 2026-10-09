import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import {
  ChevronRight,
  ChevronDown,
  Layers,
  Folder,
  FolderOpen,
  Cog,
  Settings,
  Lock,
  Search,
  Plus,
  RefreshCw,
  Box,
  Copy,
  ArrowUp,
  ArrowDown,
  GripVertical,
  ArrowRightLeft,
  CheckCircle2,
  Trash2,
  GitBranch,
  Factory
} from 'lucide-react';

export interface PLMTreeNode {
  id: string;
  code: string;
  name: string;
  revision: string;
  workingRevision?: string;
  type: 'assembly' | 'subassembly' | 'part' | 'standard';
  quantity: number;
  unit: string;
  makeOrBuy: '自制' | '外购';
  isCheckedOut?: boolean;
  checkedOutBy?: string;
  isReused?: boolean;
  designators?: string;
  status: 'Released' | 'InReview' | 'Draft' | 'Obsolete';
  children?: PLMTreeNode[];
}

// Tree 1: EBOM Engineering Tree
export const INITIAL_EBOM_TREE: PLMTreeNode = {
  id: 'ebom-root',
  code: 'ASM-GMB-001',
  name: '工业三轴高精度增稳云台总成 (EBOM)',
  revision: 'B',
  workingRevision: 'B.0',
  type: 'assembly',
  quantity: 1,
  unit: 'SET',
  makeOrBuy: '自制',
  status: 'Released',
  children: [
    {
      id: 'ebom-pch',
      code: 'ASM-PCH-100',
      name: '俯仰轴直驱总成 (Pitch Unit)',
      revision: 'B',
      workingRevision: 'B.1',
      type: 'subassembly',
      quantity: 1,
      unit: 'SET',
      makeOrBuy: '自制',
      status: 'Released',
      children: [
        {
          id: 'ebom-pch-1',
          code: 'PART-001',
          name: '2804H 工业无刷直驱动力电机',
          revision: 'A',
          workingRevision: 'A.2',
          type: 'part',
          quantity: 1,
          unit: 'PCS',
          makeOrBuy: '自制',
          designators: 'M1',
          status: 'Released'
        },
        {
          id: 'ebom-pch-2',
          code: 'PART-004',
          name: 'M2.5×8 TC4钛合金螺栓',
          revision: 'A',
          workingRevision: 'A.0',
          type: 'standard',
          quantity: 4,
          unit: 'PCS',
          makeOrBuy: '外购',
          designators: 'SCR-1~SCR-4',
          status: 'Released'
        },
        {
          id: 'ebom-pch-3',
          code: 'PART-005',
          name: '17位绝对值磁编码器靶盘',
          revision: 'A',
          workingRevision: 'A.3',
          type: 'part',
          quantity: 1,
          unit: 'PCS',
          makeOrBuy: '自制',
          isCheckedOut: true,
          checkedOutBy: '张工',
          designators: 'ENC-P',
          status: 'InReview'
        }
      ]
    },
    {
      id: 'ebom-rol',
      code: 'ASM-ROL-200',
      name: '横滚轴悬臂总成 (Roll Arm Unit)',
      revision: 'B',
      workingRevision: 'B.0',
      type: 'subassembly',
      quantity: 1,
      unit: 'SET',
      makeOrBuy: '自制',
      status: 'Released',
      children: [
        {
          id: 'ebom-rol-1',
          code: 'PART-002',
          name: '3.2mm 碳纤维减震支臂',
          revision: 'B',
          workingRevision: 'B.1',
          type: 'part',
          quantity: 1,
          unit: 'PCS',
          makeOrBuy: '自制',
          designators: 'ARM-R1',
          status: 'Released'
        },
        {
          id: 'ebom-rol-2',
          code: 'PART-001',
          name: '2804H 工业无刷直驱动力电机',
          revision: 'A',
          workingRevision: 'A.2',
          type: 'part',
          quantity: 1,
          unit: 'PCS',
          makeOrBuy: '自制',
          isReused: true,
          designators: 'M2',
          status: 'Released'
        },
        {
          id: 'ebom-rol-3',
          code: 'PART-004',
          name: 'M2.5×8 TC4钛合金螺栓',
          revision: 'A',
          workingRevision: 'A.0',
          type: 'standard',
          quantity: 6,
          unit: 'PCS',
          makeOrBuy: '外购',
          isReused: true,
          designators: 'SCR-5~SCR-10',
          status: 'Released'
        }
      ]
    },
    {
      id: 'ebom-yaw',
      code: 'ASM-YAW-300',
      name: '航向基座与主控单元 (Yaw Base)',
      revision: 'A',
      workingRevision: 'A.0',
      type: 'subassembly',
      quantity: 1,
      unit: 'SET',
      makeOrBuy: '自制',
      status: 'Released',
      children: [
        {
          id: 'ebom-yaw-1',
          code: 'PART-003',
          name: '六轴差分惯导传感器 (IMU)',
          revision: 'A',
          workingRevision: 'A.0',
          type: 'part',
          quantity: 2,
          unit: 'PCS',
          makeOrBuy: '外购',
          designators: 'U101, U102',
          status: 'Released'
        },
        {
          id: 'ebom-yaw-2',
          code: 'PART-006',
          name: '航空铝7075 快速锁紧挂架',
          revision: 'C',
          workingRevision: 'C.0',
          type: 'part',
          quantity: 1,
          unit: 'PCS',
          makeOrBuy: '自制',
          designators: 'MNT-01',
          status: 'Released'
        }
      ]
    }
  ]
};

// Tree 2: MBOM Manufacturing Process Tree
export const INITIAL_MBOM_TREE: PLMTreeNode = {
  id: 'mbom-root',
  code: 'MFG-GMB-001',
  name: '工艺装配制造总成 (MBOM)',
  revision: 'A',
  workingRevision: 'A.1',
  type: 'assembly',
  quantity: 1,
  unit: 'SET',
  makeOrBuy: '自制',
  status: 'Released',
  children: [
    {
      id: 'mbom-st-10',
      code: 'OP-100',
      name: '工步 10：直驱无刷动力预组装工序',
      revision: 'A',
      workingRevision: 'A.0',
      type: 'subassembly',
      quantity: 1,
      unit: 'STN',
      makeOrBuy: '自制',
      status: 'Released',
      children: [
        {
          id: 'mbom-item-1',
          code: 'PRT-MAT-01',
          name: '高导热绝缘相变导热垫片',
          revision: 'A',
          workingRevision: 'A.0',
          type: 'standard',
          quantity: 2,
          unit: 'PCS',
          makeOrBuy: '外购',
          designators: 'PAD-1',
          status: 'Released'
        },
        {
          id: 'mbom-item-2',
          code: 'PRT-WIR-02',
          name: '0.8mm 特种铁氟龙耐折弯同轴线束',
          revision: 'A',
          workingRevision: 'A.0',
          type: 'part',
          quantity: 1,
          unit: 'PCS',
          makeOrBuy: '自制',
          designators: 'HARN-01',
          status: 'Released'
        }
      ]
    },
    {
      id: 'mbom-st-20',
      code: 'OP-200',
      name: '工步 20：传感器标定与动平衡工序',
      revision: 'A',
      workingRevision: 'A.0',
      type: 'subassembly',
      quantity: 1,
      unit: 'STN',
      makeOrBuy: '自制',
      status: 'Released',
      children: [
        {
          id: 'mbom-item-3',
          code: 'PRT-CAL-03',
          name: '高精度绝对值编码器激光标定夹具',
          revision: 'A',
          workingRevision: 'A.0',
          type: 'standard',
          quantity: 1,
          unit: 'SET',
          makeOrBuy: '自制',
          designators: 'FIX-01',
          status: 'Released'
        },
        {
          id: 'mbom-item-4',
          code: 'PRT-BAL-04',
          name: '微型黄铜动平衡配重微调螺柱',
          revision: 'A',
          workingRevision: 'A.1',
          type: 'part',
          quantity: 8,
          unit: 'PCS',
          makeOrBuy: '外购',
          designators: 'WT-1~8',
          status: 'Released'
        }
      ]
    }
  ]
};

// Deep clone helper
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// Find node and its parent inside a tree
function findNodeAndParent(
  tree: PLMTreeNode,
  targetId: string,
  parent: PLMTreeNode | null = null
): { node: PLMTreeNode; parent: PLMTreeNode | null; index: number } | null {
  if (tree.id === targetId) {
    return { node: tree, parent, index: 0 };
  }
  if (tree.children) {
    for (let i = 0; i < tree.children.length; i++) {
      const child = tree.children[i];
      if (child.id === targetId) {
        return { node: child, parent: tree, index: i };
      }
      const found = findNodeAndParent(child, targetId, tree);
      if (found) return found;
    }
  }
  return null;
}

export interface PLMStructureTreeProps {
  onSelectNode?: (node: PLMTreeNode) => void;
}

export const PLMStructureTree: React.FC<PLMStructureTreeProps> = ({
  onSelectNode
}) => {
  const { config } = useTheme();

  // Dual trees state
  const [tree1, setTree1] = useState<PLMTreeNode>(deepClone(INITIAL_EBOM_TREE));
  const [tree2, setTree2] = useState<PLMTreeNode>(deepClone(INITIAL_MBOM_TREE));

  // Expanded nodes map
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'ebom-root': true,
    'ebom-pch': true,
    'ebom-rol': true,
    'ebom-yaw': true,
    'mbom-root': true,
    'mbom-st-10': true,
    'mbom-st-20': true
  });

  // Selected node
  const [selectedNode, setSelectedNode] = useState<PLMTreeNode>(INITIAL_EBOM_TREE);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Drag and Drop state
  const [draggedNodeInfo, setDraggedNodeInfo] = useState<{
    nodeId: string;
    sourceTree: 'ebom' | 'mbom';
    nodeName: string;
    nodeCode: string;
  } | null>(null);

  const [dragOverNodeId, setDragOverNodeId] = useState<string | null>(null);
  const [dragActionToast, setDragActionToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setDragActionToast(msg);
    setTimeout(() => {
      setDragActionToast(null);
    }, 4000);
  };

  const toggleExpand = (nodeId: string) => {
    setExpandedNodes(prev => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    const traverse = (node: PLMTreeNode) => {
      allExpanded[node.id] = true;
      if (node.children) node.children.forEach(traverse);
    };
    traverse(tree1);
    traverse(tree2);
    setExpandedNodes(allExpanded);
  };

  const collapseAll = () => {
    setExpandedNodes({
      'ebom-root': true,
      'mbom-root': true
    });
  };

  const handleCopy = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1800);
  };

  const resetTrees = () => {
    setTree1(deepClone(INITIAL_EBOM_TREE));
    setTree2(deepClone(INITIAL_MBOM_TREE));
    setSelectedNode(INITIAL_EBOM_TREE);
    showToast('已恢复工程 EBOM 与制造 MBOM 初始结构');
  };

  // Sibling movement: Move Up
  const moveSiblingUp = (treeType: 'ebom' | 'mbom', nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const tree = treeType === 'ebom' ? tree1 : tree2;
    const newTree = deepClone(tree);
    const result = findNodeAndParent(newTree, nodeId);

    if (!result || !result.parent || !result.parent.children) return;
    const { index } = result;
    const siblings = result.parent.children;

    if (index > 0) {
      const temp = siblings[index];
      siblings[index] = siblings[index - 1];
      siblings[index - 1] = temp;

      if (treeType === 'ebom') {
        setTree1(newTree);
      } else {
        setTree2(newTree);
      }
      showToast(`已将节点 [${temp.code}] 同级上移至第 ${index} 位`);
    }
  };

  // Sibling movement: Move Down
  const moveSiblingDown = (treeType: 'ebom' | 'mbom', nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const tree = treeType === 'ebom' ? tree1 : tree2;
    const newTree = deepClone(tree);
    const result = findNodeAndParent(newTree, nodeId);

    if (!result || !result.parent || !result.parent.children) return;
    const { index } = result;
    const siblings = result.parent.children;

    if (index < siblings.length - 1) {
      const temp = siblings[index];
      siblings[index] = siblings[index + 1];
      siblings[index + 1] = temp;

      if (treeType === 'ebom') {
        setTree1(newTree);
      } else {
        setTree2(newTree);
      }
      showToast(`已将节点 [${temp.code}] 同级下移至第 ${index + 2} 位`);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (
    e: React.DragEvent,
    node: PLMTreeNode,
    sourceTree: 'ebom' | 'mbom'
  ) => {
    // Root nodes cannot be dragged
    if (node.id === tree1.id || node.id === tree2.id) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('application/json', JSON.stringify({ nodeId: node.id, sourceTree }));
    e.dataTransfer.effectAllowed = 'move';
    setDraggedNodeInfo({
      nodeId: node.id,
      sourceTree,
      nodeName: node.name,
      nodeCode: node.code
    });
  };

  const handleDragOver = (e: React.DragEvent, targetNode: PLMTreeNode) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedNodeInfo && draggedNodeInfo.nodeId !== targetNode.id) {
      setDragOverNodeId(targetNode.id);
    }
  };

  const handleDragLeave = () => {
    setDragOverNodeId(null);
  };

  const handleDrop = (
    e: React.DragEvent,
    targetNode: PLMTreeNode,
    targetTreeType: 'ebom' | 'mbom'
  ) => {
    e.preventDefault();
    setDragOverNodeId(null);

    if (!draggedNodeInfo) return;
    const { nodeId, sourceTree, nodeCode } = draggedNodeInfo;

    if (nodeId === targetNode.id) {
      setDraggedNodeInfo(null);
      return;
    }

    // Step 1: Clone both trees
    const newTree1 = deepClone(tree1);
    const newTree2 = deepClone(tree2);

    const sourceTreeObj = sourceTree === 'ebom' ? newTree1 : newTree2;
    const sourceResult = findNodeAndParent(sourceTreeObj, nodeId);

    if (!sourceResult || !sourceResult.parent || !sourceResult.parent.children) {
      setDraggedNodeInfo(null);
      return;
    }

    // Extract node to move
    const [extractedNode] = sourceResult.parent.children.splice(sourceResult.index, 1);

    // Step 2: Target insertion
    const targetTreeObj = targetTreeType === 'ebom' ? newTree1 : newTree2;
    const targetResult = findNodeAndParent(targetTreeObj, targetNode.id);

    if (!targetResult) {
      setDraggedNodeInfo(null);
      return;
    }

    // If target node is assembly or subassembly, append to its children
    if (targetNode.type === 'assembly' || targetNode.type === 'subassembly') {
      if (!targetResult.node.children) {
        targetResult.node.children = [];
      }
      targetResult.node.children.push(extractedNode);
      // Auto expand target node so user sees the dropped child
      setExpandedNodes(prev => ({ ...prev, [targetResult.node.id]: true }));
    } else {
      // If target node is a leaf part, insert as sibling after target node
      if (targetResult.parent && targetResult.parent.children) {
        targetResult.parent.children.splice(targetResult.index + 1, 0, extractedNode);
      } else {
        // Fallback: put in root
        if (!targetTreeObj.children) targetTreeObj.children = [];
        targetTreeObj.children.push(extractedNode);
      }
    }

    // Update state
    setTree1(newTree1);
    setTree2(newTree2);
    setSelectedNode(extractedNode);
    if (onSelectNode) onSelectNode(extractedNode);

    const sourceTreeLabel = sourceTree === 'ebom' ? 'EBOM 工程树' : 'MBOM 制造树';
    const targetTreeLabel = targetTreeType === 'ebom' ? 'EBOM 工程树' : 'MBOM 制造树';

    showToast(
      `✅ 已成功将节点 [${nodeCode}] 从【${sourceTreeLabel}】拖拽至【${targetTreeLabel} -> ${targetNode.name}】！`
    );
    setDraggedNodeInfo(null);
  };

  const getNodeIcon = (type: PLMTreeNode['type'], isExpanded: boolean) => {
    switch (type) {
      case 'assembly':
        return <Box className="w-4 h-4 text-[var(--plm-primary)] shrink-0" />;
      case 'subassembly':
        return isExpanded ? (
          <FolderOpen className="w-4 h-4 text-[var(--plm-bom-accent)] shrink-0" />
        ) : (
          <Folder className="w-4 h-4 text-[var(--plm-bom-accent)] shrink-0" />
        );
      case 'standard':
        return <Settings className="w-4 h-4 text-slate-500 shrink-0" />;
      case 'part':
      default:
        return <Cog className="w-4 h-4 text-slate-600 dark:text-slate-400 shrink-0" />;
    }
  };

  // Render node with Drag & Drop and Sibling Up/Down controls
  const renderTreeNode = (
    node: PLMTreeNode,
    treeType: 'ebom' | 'mbom',
    level: number = 0,
    siblingIndex: number = 0,
    totalSiblings: number = 1
  ): React.ReactNode => {
    const isExpanded = !!expandedNodes[node.id];
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedNode?.id === node.id;
    const isDragOver = dragOverNodeId === node.id;
    const isBeingDragged = draggedNodeInfo?.nodeId === node.id;
    const isRoot = level === 0;

    const isMatched =
      searchKeyword &&
      (node.code.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        node.name.toLowerCase().includes(searchKeyword.toLowerCase()));

    return (
      <div key={node.id} className="relative select-none">
        {/* Node Row with DND */}
        <div
          draggable={!isRoot}
          onDragStart={e => handleDragStart(e, node, treeType)}
          onDragOver={e => handleDragOver(e, node)}
          onDragLeave={handleDragLeave}
          onDrop={e => handleDrop(e, node, treeType)}
          onClick={() => {
            setSelectedNode(node);
            if (onSelectNode) onSelectNode(node);
          }}
          className={`flex items-center justify-between px-2.5 py-1.5 transition-all cursor-pointer group rounded-xs border-l-2 relative ${
            isBeingDragged ? 'opacity-40 border-dashed border-slate-400 bg-slate-100' : ''
          } ${
            isDragOver
              ? 'ring-2 ring-[var(--plm-primary)] bg-[var(--plm-primary)]/10 border-l-[var(--plm-primary)]'
              : isSelected
              ? 'bg-[var(--plm-selected-bg)]/60 border-[var(--plm-primary)] font-medium shadow-2xs'
              : isMatched
              ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-500'
              : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-900/40'
          }`}
          style={{
            paddingLeft: `${Math.max(10, level * 18 + 6)}px`
          }}
        >
          {/* Left section: drag handle, expand arrow, icon, code & name */}
          <div className="flex items-center gap-1.5 min-w-0 pr-1">
            {/* Drag Handle (for non-root items) */}
            {!isRoot ? (
              <span
                title="拖拽可迁移至另一棵树或调整层级"
                className="cursor-grab active:cursor-grabbing text-slate-300 dark:text-slate-600 hover:text-[var(--plm-primary)] p-0.5 shrink-0"
              >
                <GripVertical className="w-3.5 h-3.5" />
              </span>
            ) : (
              <span className="w-2" />
            )}

            {/* Expand / Collapse toggle */}
            {hasChildren ? (
              <button
                onClick={e => {
                  e.stopPropagation();
                  toggleExpand(node.id);
                }}
                className="w-4 h-4 flex items-center justify-center text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)]"
              >
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
              </button>
            ) : (
              <span className="w-4 h-4 flex items-center justify-center text-slate-300">·</span>
            )}

            {/* Type Icon */}
            {getNodeIcon(node.type, isExpanded)}

            {/* Sequence index indicator for child items */}
            {!isRoot && (
              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 shrink-0">
                #{siblingIndex + 1}
              </span>
            )}

            {/* Part Code */}
            <span
              className={`font-mono text-xs ${
                node.type === 'assembly'
                  ? 'font-bold text-[var(--plm-primary)]'
                  : node.type === 'subassembly'
                  ? 'font-semibold text-[var(--plm-bom-accent)]'
                  : 'font-medium text-[var(--plm-text)]'
              }`}
            >
              {node.code}
            </span>

            {/* Part Name */}
            <span className="text-xs text-[var(--plm-text)] truncate max-w-[130px] sm:max-w-[160px]">
              {node.name}
            </span>

            {/* Quantity tag */}
            <span className="text-[10px] font-mono font-semibold text-[var(--plm-text-secondary)] bg-slate-100 dark:bg-slate-800 px-1 py-0.2 rounded-xs border border-slate-200 dark:border-slate-700 shrink-0">
              ×{node.quantity}
            </span>

            {/* Reused Indicator */}
            {node.isReused && (
              <span className="text-[9px] font-medium text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 px-1 py-0.2 rounded-xs shrink-0">
                复用
              </span>
            )}

            {/* Check out lock */}
            {node.isCheckedOut && (
              <span title={`被 ${node.checkedOutBy || '用户'} 检出锁定`} className="shrink-0 flex items-center">
                <Lock className="w-3 h-3 text-amber-500" />
              </span>
            )}
          </div>

          {/* Right section: Sibling Move Up/Down buttons, status, and hover actions */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Sibling Reordering Controls (同级上下移动) */}
            {!isRoot && (
              <div className="flex items-center gap-0.5 opacity-40 group-hover:opacity-100 transition-opacity bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-xs p-0.5">
                <button
                  type="button"
                  title="同级上移"
                  disabled={siblingIndex === 0}
                  onClick={e => moveSiblingUp(treeType, node.id, e)}
                  className={`p-0.5 rounded-xs transition-colors ${
                    siblingIndex === 0
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-[var(--plm-primary)]'
                  }`}
                >
                  <ArrowUp className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  title="同级下移"
                  disabled={siblingIndex === totalSiblings - 1}
                  onClick={e => moveSiblingDown(treeType, node.id, e)}
                  className={`p-0.5 rounded-xs transition-colors ${
                    siblingIndex === totalSiblings - 1
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-[var(--plm-primary)]'
                  }`}
                >
                  <ArrowDown className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Quick Status Tag */}
            <Badge status={node.status} size="xs" showIcon={false} />

            {/* Quick Copy code button */}
            <button
              onClick={e => handleCopy(node.code, e)}
              className="p-1 text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)] opacity-0 group-hover:opacity-100 transition-opacity"
              title="复制物料编码"
            >
              {copiedCode === node.code ? (
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
          </div>

          {/* Drag over drop cue */}
          {isDragOver && (
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[var(--plm-primary)] animate-pulse" />
          )}
        </div>

        {/* Children Rows */}
        {hasChildren && isExpanded && (
          <div className="border-l border-slate-200 dark:border-slate-800 ml-4">
            {node.children!.map((child, idx) =>
              renderTreeNode(child, treeType, level + 1, idx, node.children!.length)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="border border-[var(--plm-border)] rounded-sm bg-[var(--plm-surface)] overflow-hidden shadow-2xs">
      {/* Component Header & Action Bar */}
      <div className="p-3.5 border-b border-[var(--plm-border)] bg-[var(--plm-bg)] flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[var(--plm-bom-accent)]" />
            <span className="text-sm font-bold text-[var(--plm-text)]">
              双树拓扑对比工作台 (Cross-Tree Drag & Drop Workspace)
            </span>
            <span className="text-[11px] font-mono px-1.5 py-0.2 rounded-xs bg-[var(--plm-primary)]/10 text-[var(--plm-primary)] border border-[var(--plm-primary)]/30 font-medium">
              支持跨树拖拽 · 同级上下移动
            </span>
          </div>
          <p className="text-xs text-[var(--plm-text-secondary)]">
            可将左侧 EBOM 子级节点直接拖拽至右侧 MBOM 树中；每级子项均可通过【↑/↓】按钮实现同级无缝上下移动。
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Tree search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[var(--plm-text-secondary)] absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="快速检索两棵树节点..."
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
              className="pl-7 pr-2.5 py-1 text-xs bg-[var(--plm-surface)] border border-[var(--plm-input-border)] rounded-xs outline-none focus:border-[var(--plm-primary)] text-[var(--plm-text)] w-36 sm:w-48"
            />
          </div>

          <button
            onClick={expandAll}
            className="px-2.5 py-1 text-xs border border-[var(--plm-border)] rounded-xs bg-[var(--plm-surface)] text-[var(--plm-text)] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            全部展开
          </button>
          <button
            onClick={collapseAll}
            className="px-2.5 py-1 text-xs border border-[var(--plm-border)] rounded-xs bg-[var(--plm-surface)] text-[var(--plm-text)] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            收起全部
          </button>
          <button
            onClick={resetTrees}
            className="px-2.5 py-1 text-xs border border-[var(--plm-border)] rounded-xs bg-[var(--plm-surface)] text-[var(--plm-text)] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3 text-slate-500" />
            <span>重置双树</span>
          </button>
        </div>
      </div>

      {/* Real-time Toast Feedback */}
      {dragActionToast && (
        <div className="bg-emerald-50 dark:bg-emerald-950/50 border-b border-emerald-300 dark:border-emerald-800 px-4 py-2 text-xs text-emerald-800 dark:text-emerald-200 flex items-center justify-between transition-all">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">{dragActionToast}</span>
          </div>
          <button
            onClick={() => setDragActionToast(null)}
            className="text-emerald-700 hover:text-emerald-900 text-xs"
          >
            关闭
          </button>
        </div>
      )}

      {/* Main Dual Trees + Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[var(--plm-border)]">
        {/* Left Tree: EBOM */}
        <div className="lg:col-span-4 p-3 bg-[var(--plm-surface)]">
          <div className="mb-2.5 pb-2 border-b border-[var(--plm-border)] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-[var(--plm-primary)]" />
              <span className="text-xs font-bold text-[var(--plm-text)]">
                树 1: 工程设计 EBOM 树
              </span>
            </div>
            <span className="text-[11px] font-mono text-[var(--plm-text-secondary)]">
              {tree1.code}
            </span>
          </div>
          <div className="max-h-[460px] overflow-y-auto space-y-0.5">
            {renderTreeNode(tree1, 'ebom', 0, 0, 1)}
          </div>
        </div>

        {/* Right Tree: MBOM (Accepts drag drop from EBOM) */}
        <div className="lg:col-span-5 p-3 bg-[var(--plm-surface)]">
          <div className="mb-2.5 pb-2 border-b border-[var(--plm-border)] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Factory className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span className="text-xs font-bold text-[var(--plm-text)]">
                树 2: 制造工艺 MBOM 树 (支持接收拖入)
              </span>
            </div>
            <span className="text-[11px] font-mono text-[var(--plm-text-secondary)]">
              {tree2.code}
            </span>
          </div>
          <div className="max-h-[460px] overflow-y-auto space-y-0.5">
            {renderTreeNode(tree2, 'mbom', 0, 0, 1)}
          </div>
        </div>

        {/* Inspector & Interactive Details */}
        <div className="lg:col-span-3 p-4 bg-[var(--plm-bg)] space-y-4">
          <div>
            <span className="text-[11px] font-semibold text-[var(--plm-text-secondary)] uppercase tracking-wider block">
              当前选中节点参数 (Node Inspector)
            </span>
            <div className="mt-2 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-base font-mono font-bold text-[var(--plm-text)]">
                  {selectedNode.code}
                </span>
                <Badge status={selectedNode.status} size="xs" />
              </div>
              <p className="text-xs text-[var(--plm-text)] font-medium leading-snug">
                {selectedNode.name}
              </p>
            </div>
          </div>

          {/* Key Attributes */}
          <div className="space-y-1.5 text-xs border border-[var(--plm-border)] p-3 rounded-xs bg-[var(--plm-surface)] font-mono">
            <div className="flex justify-between">
              <span className="text-[var(--plm-text-secondary)] font-sans">节点类型:</span>
              <span className="capitalize">{selectedNode.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--plm-text-secondary)] font-sans">受控修订:</span>
              <span>Rev {selectedNode.revision} ({selectedNode.workingRevision || 'A.0'})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--plm-text-secondary)] font-sans">装配用量:</span>
              <span>{selectedNode.quantity} {selectedNode.unit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--plm-text-secondary)] font-sans">自制/外购:</span>
              <span className="font-sans">{selectedNode.makeOrBuy}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--plm-text-secondary)] font-sans">安装位号:</span>
              <span>{selectedNode.designators || '无'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--plm-text-secondary)] font-sans">复用状态:</span>
              <span className="font-sans">{selectedNode.isReused ? '跨总成复用件' : '单一装配点'}</span>
            </div>
          </div>

          {/* Interactive DND Instruction Guide Card */}
          <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 rounded-xs space-y-2">
            <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-semibold text-xs">
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>拖拽与顺序调整指南</span>
            </div>
            <ul className="text-[11px] text-amber-900/80 dark:text-amber-200/80 space-y-1 list-disc list-inside leading-relaxed">
              <li>按住节点左侧握柄即可跨树拖拽至另一棵树的工步/总成下。</li>
              <li>悬停同级节点时，使用 <strong>↑/↓</strong> 按钮可实时上下重排次序。</li>
              <li>系统自动拦截根节点拖拽并维护稳定层级。</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tree Component Technical Specs Strip */}
      <div className="px-4 py-2 border-t border-[var(--plm-border)] bg-[var(--plm-surface)] text-[11px] text-[var(--plm-text-secondary)] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span>缩进模数: <strong className="font-mono text-[var(--plm-text)]">18px / 阶</strong></span>
          <span>·</span>
          <span>同级移动: <strong className="text-emerald-600 font-mono">已启用 (↑/↓)</strong></span>
          <span>·</span>
          <span>跨树拖拽: <strong className="text-blue-600 font-mono">已启用 (HTML5 Drag & Drop)</strong></span>
        </div>
        <div className="font-mono text-[10px]">
          PLM-SPEC-DUAL-TREE · 零卡顿重构
        </div>
      </div>
    </div>
  );
};
