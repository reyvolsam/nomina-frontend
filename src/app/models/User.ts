import { Company } from './Company'

export class User {
  public id: number
  public name: String
  public email: String
  public group_id: number
  public profile_id?: number
  public group?: String
  public active: Boolean
  public default_company_id: number
  public assigned_companies: Company[]
  public avatar?: String
  public created_at?: String
  public access_token?: String
  public loader?:Boolean = false

}
