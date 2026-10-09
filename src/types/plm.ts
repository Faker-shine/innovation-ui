export type PartLifecycleStatus = 'Draft' | 'InReview' | 'Released' | 'Obsolete';

export interface PartItem {
  id: string; // Long-term stable internal ID
  code: string; // e.g. PART-001, GMB-MTR-102
  name: string;
  category: string;
  revision: string; // Formal revision: A, B, C
  workingRevision: string; // Working iteration: A.1, A.2
  status: PartLifecycleStatus;
  owner: string;
  unit: string;
  makeOrBuy: '自制' | '外购';
  isCheckedOut: boolean;
  checkedOutBy?: string;
  updatedAt: string;
  description?: string;
}

export interface BOMNode {
  rowId: string;
  partId: string;
  code: string;
  name: string;
  revision: string;
  quantity: number;
  unit: string;
  designators?: string; // e.g. "R101, R102"
  makeOrBuy: '自制' | '外购';
  status: PartLifecycleStatus;
  level: number;
  children?: BOMNode[];
  isModified?: boolean;
}

export interface ChangeOrder {
  id: string; // e.g. ECO-2026-0042
  type: 'ECR' | 'ECO' | 'ECN';
  title: string;
  reason: string;
  status: 'Draft' | 'InReview' | 'Approved' | 'Implemented';
  initiator: string;
  createDate: string;
  effectiveDate: string;
  affectedCount: number;
  impactLevel: 'High' | 'Medium' | 'Low';
}

export interface BOMDiffRow {
  rowId: string;
  code: string;
  name: string;
  diffType: 'added' | 'removed' | 'modified' | 'unchanged';
  fieldChanges?: {
    field: string;
    oldValue: string | number;
    newValue: string | number;
  }[];
  revA: {
    quantity?: number;
    designators?: string;
    status?: string;
  };
  revB: {
    quantity?: number;
    designators?: string;
    status?: string;
  };
}
