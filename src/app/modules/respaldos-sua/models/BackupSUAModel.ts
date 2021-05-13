import { Company } from '../../../models/Company';
export interface BackupSUAModel {
  id: number;
  date: string;
  company_id: number;
  period: string;
  obra: string;
  file_backup: null;
  file_amount: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  file_backup_route: string;
  file_amount_route: string;
  file_name_backup: string;
  file_name_amount: string;
  monthly_files_new: any[];
  monthly_files_current: MonthlyFilesCurrent[];
  company?: Company
}

export interface MonthlyFilesNew {
  file_name: string;
  file_base: any;
}

export interface MonthlyFilesCurrent {
  id: number;
  backup_sua_id: number;
  file_name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  delete_file: boolean;
  file_route: string;
}
