export interface PaymentResult {
  aid: string;
  partner_order_id: string;
  partner_user_id: string;
  payment_method_type: string;
  item_name: string;
  item_code: string;
  quantity: number;
  amount: Amount;
  created_at: string;
  approved_at: string;
  msg?: string;
  code: number;
}

interface Amount {
  total: number;
  tax_free: number;
  vat: number;
  point: number;
  discount: number;
  green_deposit: number;
}
