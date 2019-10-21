import { Company } from './Company'

export class ContractTypes {
    public id: Number
    public name: String
    public loader?:Boolean = false
    public company_id: null
    public company: Company
    public created_at?: String
    public updated_at?: String
    public deleted_at?: String
}
