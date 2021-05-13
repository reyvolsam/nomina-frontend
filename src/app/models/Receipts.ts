import { Company } from './Company';
export class Receipts {
  public id: Number
  public date: String
  public company_id: number
  public period: String
  public obra: string
  public xml_payment: String
  public payment_transference_1: String
  public payment_transference_2: String
  public loader?: boolean = false
  public created_at?: String
  public updated_at?: String
  public deleted_at?: String
  public company?: Company
}
