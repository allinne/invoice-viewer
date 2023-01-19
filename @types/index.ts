export interface lineitem {
  description: string;
  price: number;
}

export interface invoiceJSON {
  id: string;
  email: string;
  fullName: string;
  company: string;
  createdAt: string;
  dueAt: string;

  lineItems: lineitem[];
}
