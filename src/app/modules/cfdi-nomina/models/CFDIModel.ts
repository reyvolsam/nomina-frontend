import { Company } from "src/app/models/Company";

export interface CFDIModel {
  id: number;
  date: string;
  company_id: number;
  period: string;
  obra: string;
  file_pdf: string;
  file_xml: string;
  file_name_pdf?: string;
  file_name_xml?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  file_pdf_route: string;
  file_xml_route: string;

  company?: Company;
}
