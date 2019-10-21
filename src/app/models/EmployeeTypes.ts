import { Company } from './Company'

export class EmployeeTypes{
  public id: Number
  public name: String
  public company_id: number
  public company: Company
  public loader?:Boolean = false
  public created_at?: String
  public updated_at?: String
  public deleted_at?: String
}
