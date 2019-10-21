import { Company } from './Company'
import { Department } from './Department'

export class Job {
  public id: number
  public name: String
  public company_id: number
  public company: Company
  public department_id: number
  public department: Department
  public loader?:Boolean = false
  public created_at?: String
  public updated_at?: String
  public deleted_at?: String
}
