export class User {
  public id: number
  public name: string
  public email: string
  public group_id: number
  public group?: string
  public default_company_id: number
  public avatar?: string
  public created_at?: string
  public access_token?: string
  public loader?:Boolean = false

}
