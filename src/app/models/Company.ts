export class Company {
  public id: Number
  public name: String
  public contact: String
  public rfc: String
  public telephone: String
  public loader?:Boolean = false
  public default_company?:Boolean = false
  public default_company_ind?: Number = null
  public created_at?: String
  public updated_at?: String
  public deleted_at?: String
}
