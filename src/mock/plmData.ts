import { PartItem, BOMNode, ChangeOrder, BOMDiffRow } from '../types/plm';

export const MOCK_PARTS: PartItem[] = [
  {
    id: 'PRT-1001',
    code: 'PART-001',
    name: '2804H 工业无刷直驱动力电机',
    category: '机电动力',
    revision: 'A',
    workingRevision: 'A.2',
    status: 'Released',
    owner: '张工 (结构研发)',
    unit: 'PCS',
    makeOrBuy: '自制',
    isCheckedOut: false,
    updatedAt: '2026-10-08 14:30',
    description: '14极12槽高精度高响应伺服电机，配套霍尔传感器及抗电磁干扰外壳'
  },
  {
    id: 'PRT-1002',
    code: 'PART-002',
    name: '3.2mm 高模量碳纤维减震支臂',
    category: '结构件',
    revision: 'B',
    workingRevision: 'B.1',
    status: 'Released',
    owner: '李工 (材料工程)',
    unit: 'PCS',
    makeOrBuy: '自制',
    isCheckedOut: true,
    checkedOutBy: '李工',
    updatedAt: '2026-10-07 18:20',
    description: '采用T700级3K斜纹碳纤维热压固化，经CNC五轴联动铣削成型'
  },
  {
    id: 'PRT-1003',
    code: 'PART-003',
    name: '六轴差分惯导传感器 (IMU)',
    category: '电子元器件',
    revision: 'A',
    workingRevision: 'A.0',
    status: 'Released',
    owner: '王工 (硬件电控)',
    unit: 'PCS',
    makeOrBuy: '外购',
    isCheckedOut: false,
    updatedAt: '2026-10-05 09:15',
    description: 'I2C/SPI低噪声陀螺仪+加速度计，工作温区 -40℃ ~ +105℃'
  },
  {
    id: 'PRT-1004',
    code: 'PART-004',
    name: 'M2.5×8 航空级TC4钛合金内六角螺栓',
    category: '紧固标准件',
    revision: 'A',
    workingRevision: 'A.0',
    status: 'Released',
    owner: '刘工 (标准化室)',
    unit: 'PCS',
    makeOrBuy: '外购',
    isCheckedOut: false,
    updatedAt: '2026-09-28 11:00',
    description: 'GB/T 70.1 钛合金，抗拉强度 >= 900MPa，表面微弧氧化处理'
  },
  {
    id: 'PRT-1005',
    code: 'PART-005',
    name: '17位绝对值磁编码器转子靶盘',
    category: '传感机电',
    revision: 'A',
    workingRevision: 'A.3',
    status: 'InReview',
    owner: '张工 (结构研发)',
    unit: 'PCS',
    makeOrBuy: '自制',
    isCheckedOut: false,
    updatedAt: '2026-10-09 10:12',
    description: '多极充磁稀土强磁环，径向跳动 <= 0.005mm，正在走ECO审批流程'
  },
  {
    id: 'PRT-1006',
    code: 'PART-006',
    name: '航空铝7075 快速锁紧机械云台挂架',
    category: '机构件',
    revision: 'C',
    workingRevision: 'C.0',
    status: 'Released',
    owner: '陈工 (工艺工装)',
    unit: 'PCS',
    makeOrBuy: '自制',
    isCheckedOut: false,
    updatedAt: '2026-10-02 16:45',
    description: '快速卡扣自锁结构，防误触安全保险栓，静态承重测试通过45kg'
  }
];

export const MOCK_BOM_TREE: BOMNode = {
  rowId: 'row-root',
  partId: 'PRT-0000',
  code: 'ASM-GMB-001',
  name: '工业三轴高精度增稳云台总成',
  revision: 'B',
  quantity: 1,
  unit: 'SET',
  makeOrBuy: '自制',
  status: 'Released',
  level: 0,
  children: [
    {
      rowId: 'row-1',
      partId: 'PRT-SUB-10',
      code: 'ASM-PCH-100',
      name: '俯仰轴直驱总成 (Pitch Unit)',
      revision: 'B',
      quantity: 1,
      unit: 'SET',
      makeOrBuy: '自制',
      status: 'Released',
      level: 1,
      children: [
        {
          rowId: 'row-1-1',
          partId: 'PRT-1001',
          code: 'PART-001',
          name: '2804H 工业无刷直驱动力电机',
          revision: 'A',
          quantity: 1,
          unit: 'PCS',
          designators: 'M1',
          makeOrBuy: '自制',
          status: 'Released',
          level: 2
        },
        {
          rowId: 'row-1-2',
          partId: 'PRT-1004',
          code: 'PART-004',
          name: 'M2.5×8 航空级TC4钛合金内六角螺栓',
          revision: 'A',
          quantity: 4,
          unit: 'PCS',
          designators: 'SCR-1, SCR-2, SCR-3, SCR-4',
          makeOrBuy: '外购',
          status: 'Released',
          level: 2
        },
        {
          rowId: 'row-1-3',
          partId: 'PRT-1005',
          code: 'PART-005',
          name: '17位绝对值磁编码器转子靶盘',
          revision: 'A',
          quantity: 1,
          unit: 'PCS',
          designators: 'ENC-P',
          makeOrBuy: '自制',
          status: 'InReview',
          level: 2
        }
      ]
    },
    {
      rowId: 'row-2',
      partId: 'PRT-SUB-20',
      code: 'ASM-ROL-200',
      name: '横滚轴悬臂总成 (Roll Arm Unit)',
      revision: 'B',
      quantity: 1,
      unit: 'SET',
      makeOrBuy: '自制',
      status: 'Released',
      level: 1,
      children: [
        {
          rowId: 'row-2-1',
          partId: 'PRT-1002',
          code: 'PART-002',
          name: '3.2mm 高模量碳纤维减震支臂',
          revision: 'B',
          quantity: 1,
          unit: 'PCS',
          designators: 'ARM-R1',
          makeOrBuy: '自制',
          status: 'Released',
          level: 2
        },
        {
          rowId: 'row-2-2',
          partId: 'PRT-1001',
          code: 'PART-001',
          name: '2804H 工业无刷直驱动力电机 (复用件)',
          revision: 'A',
          quantity: 1,
          unit: 'PCS',
          designators: 'M2',
          makeOrBuy: '自制',
          status: 'Released',
          level: 2
        },
        {
          rowId: 'row-2-3',
          partId: 'PRT-1004',
          code: 'PART-004',
          name: 'M2.5×8 航空级TC4钛合金内六角螺栓',
          revision: 'A',
          quantity: 6,
          unit: 'PCS',
          designators: 'SCR-5 至 SCR-10',
          makeOrBuy: '外购',
          status: 'Released',
          level: 2
        }
      ]
    },
    {
      rowId: 'row-3',
      partId: 'PRT-SUB-30',
      code: 'ASM-YAW-300',
      name: '航向基座与主控单元 (Yaw Base & PCBA)',
      revision: 'A',
      quantity: 1,
      unit: 'SET',
      makeOrBuy: '自制',
      status: 'Released',
      level: 1,
      children: [
        {
          rowId: 'row-3-1',
          partId: 'PRT-1003',
          code: 'PART-003',
          name: '六轴差分惯导传感器 (IMU)',
          revision: 'A',
          quantity: 2,
          unit: 'PCS',
          designators: 'U101, U102',
          makeOrBuy: '外购',
          status: 'Released',
          level: 2
        },
        {
          rowId: 'row-3-2',
          partId: 'PRT-1006',
          code: 'PART-006',
          name: '航空铝7075 快速锁紧机械云台挂架',
          revision: 'C',
          quantity: 1,
          unit: 'PCS',
          designators: 'MNT-01',
          makeOrBuy: '自制',
          status: 'Released',
          level: 2
        }
      ]
    }
  ]
};

export const MOCK_CHANGE_ORDERS: ChangeOrder[] = [
  {
    id: 'ECO-2026-0042',
    type: 'ECO',
    title: '减震碳臂由 3.0mm 升级为 3.2mm 厚度 (抗扭刚度提升24%)',
    reason: '振动台 45Hz 共振测试中发现应力集中，增强厚度以保证长航时稳定性',
    status: 'InReview',
    initiator: '张工 (结构室)',
    createDate: '2026-10-08',
    effectiveDate: '2026-10-25',
    affectedCount: 3,
    impactLevel: 'High'
  },
  {
    id: 'ECO-2026-0039',
    type: 'ECO',
    title: '紧固件表面工艺变更为微弧氧化防盐雾腐蚀',
    reason: '满足 GB/T 2423.17 96小时盐雾试验要求，供海防巡检机型选装',
    status: 'Approved',
    initiator: '刘工 (标准化室)',
    createDate: '2026-10-01',
    effectiveDate: '2026-10-15',
    affectedCount: 8,
    impactLevel: 'Medium'
  },
  {
    id: 'ECR-2026-0015',
    type: 'ECR',
    title: '客户反馈极端高温环境编码器零位轻微漂移变更申请',
    reason: '需将磁极充磁材料由 N42H 提升至 N52SH 耐温规格',
    status: 'Draft',
    initiator: '王工 (售后质量)',
    createDate: '2026-10-09',
    effectiveDate: '待定',
    affectedCount: 1,
    impactLevel: 'Low'
  }
];

export const MOCK_DIFF_ROWS: BOMDiffRow[] = [
  {
    rowId: 'diff-1',
    code: 'PART-002',
    name: '减震碳纤维支臂',
    diffType: 'modified',
    fieldChanges: [
      { field: '规格描述', oldValue: '厚度 3.0mm 标准板', newValue: '厚度 3.2mm 高模量板' },
      { field: '单重 (g)', oldValue: '42.5', newValue: '45.1' }
    ],
    revA: { quantity: 1, designators: 'ARM-R1', status: 'Rev A (旧版已冻结)' },
    revB: { quantity: 1, designators: 'ARM-R1', status: 'Rev B (生效新版)' }
  },
  {
    rowId: 'diff-2',
    code: 'PART-004',
    name: 'TC4钛合金螺栓 M2.5×8',
    diffType: 'modified',
    fieldChanges: [
      { field: '用量 (PCS)', oldValue: '8', newValue: '10' }
    ],
    revA: { quantity: 8, designators: 'SCR-1~SCR-8', status: 'Rev A' },
    revB: { quantity: 10, designators: 'SCR-1~SCR-10', status: 'Rev B' }
  },
  {
    rowId: 'diff-3',
    code: 'PART-005',
    name: '17位磁编码器转子靶盘',
    diffType: 'added',
    fieldChanges: [
      { field: '装配节点', oldValue: '无 (原版使用电位器)', newValue: '新增数字磁编码器靶盘' }
    ],
    revA: { quantity: 0, designators: '-', status: '未引用' },
    revB: { quantity: 1, designators: 'ENC-P', status: '新增零件 (Rev A)' }
  },
  {
    rowId: 'diff-4',
    code: 'PART-OLD-09',
    name: '模拟量导电塑料电位器',
    diffType: 'removed',
    fieldChanges: [
      { field: '生命周期', oldValue: 'Rev A (生产中)', newValue: '废弃移除 (Obsolete)' }
    ],
    revA: { quantity: 1, designators: 'VR-1', status: '旧版装配' },
    revB: { quantity: 0, designators: '-', status: '已从BOM剔除' }
  },
  {
    rowId: 'diff-5',
    code: 'PART-001',
    name: '2804H 直驱动力电机',
    diffType: 'unchanged',
    revA: { quantity: 2, designators: 'M1, M2', status: 'Rev A' },
    revB: { quantity: 2, designators: 'M1, M2', status: 'Rev A' }
  }
];
