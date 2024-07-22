// types.ts
export interface Investment {
  pid: number
  creator: string
  name: string
  description: string
  coverage: string
  min_deposition_amount: string // Change this to string if you need to handle it as a string
  deposit_amount_monthwise: string
  duration: number
  totalamount: string
  no_of_investors: number
  insurance_type: string
  safe_fees: string
}
