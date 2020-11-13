export interface BackupSUAModel {
  id: number;
  date: string;
  period: string;
  file_backup: string;
  file_amount: string;
  file_name_backup?: string;
  file_name_amount?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  file_backup_route: string;
  file_amount_route: string;
}
